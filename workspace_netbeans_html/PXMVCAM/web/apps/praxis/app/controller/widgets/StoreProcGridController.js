/**
 * StoreProcGridController
 * -----------------------
 * Controller base para el widget reutilizable StoreProcGrid.
 *
 * Responsabilidades:
 *  - Carga el store paginado usando global.callStorePaggin(library, storeProcedure, storeParams)
 *  - Descarga Excel sin paginar usando GET con excel=true&limit=-1
 *  - Soporta filtro integrado opcional (filterItems en la view)
 *  - Delega las acciones de fila a un controller custom si se configura via `customController`
 *
 * ─── CONTROLLER CUSTOM ──────────────────────────────────────────────────────
 *
 *   Ext.define('Ext.Praxis.controller.mymodule.MyRowActionsController', {
 *       extend: 'Ext.Base',
 *       baseCtrl:   null,   // ← StoreProcGridController, asignado automáticamente
 *       widgetView: null,   // ← view del widget, asignada automáticamente
 *
 *       onRowAction: function(action, record, rowIndex, gridView) {
 *           if (action === 'edit') { ... }
 *       },
 *       // Opcional: se invoca cuando el widget terminó de renderizar
 *       onWidgetReady: function(widgetView) { }
 *   });
 *
 *   Config del widget:
 *     customController: 'Ext.Praxis.controller.mymodule.MyRowActionsController'
 *
 * ─── RECARGA EXTERNA (filtro en componente separado) ─────────────────────────
 *
 *   var ctrl = Ext.getCmp('myWidgetId').getController();
 *   ctrl.reload({ IN_YEAR: '2026', IN_MONTH: '03' });
 *
 * ─── ACCESO A FILTROS INTERNOS DESDE customController ───────────────────────
 *
 *   var params = this.baseCtrl.getFilterParams();
 */
Ext.define('Ext.Praxis.controller.widgets.StoreProcGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StoreProcGridController',

    /** @private Instancia del controller custom delegado */
    customCtrl: null,

    // ─────────────────────────────────────────────────────────────────────────
    // Ciclo de vida
    // ─────────────────────────────────────────────────────────────────────────

    init: function (view) {
        var me = this;
        me.view = view;

        // Instanciar controller custom si se proporcionó
        var customControllerClass = view.customController;
        if (customControllerClass) {
            try {
                me.customCtrl = Ext.create(customControllerClass);
                me.customCtrl.baseCtrl   = me;
                me.customCtrl.widgetView = view;
            } catch (e) {
                Ext.log.warn('[StoreProcGridController] No se pudo instanciar customController: ' + customControllerClass);
                Ext.log.warn(e);
            }
        }
    },

    /**
     * Invocado desde el listener afterrender de la view.
     *
     * - Si hay filterItems + autoSearch → lee valores del filtro interno y carga
     * - Si NO hay filterItems            → carga directamente con storeParams
     */
    onWidgetAfterRender: function () {
        var me   = this;
        var view = me.getView();

        var hasFilter = view.filterItems && view.filterItems.length > 0;

        if (hasFilter && view.autoSearch) {
            me._buildStore(me.getFilterParams());
        } else if (!hasFilter) {
            me._buildStore(view.storeParams || {});
        }
        // Si hay filterItems pero autoSearch === false, espera que el usuario presione Search

        // Notificar al controller custom
        if (me.customCtrl && Ext.isFunction(me.customCtrl.onWidgetReady)) {
            me.customCtrl.onWidgetReady(view);
        }
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Store
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @private
     * Construye el store paginado y lo enlaza al grid y al paging toolbar.
     * @param {Object} params
     */
    _buildStore: function (params) {
        var me   = this;
        var view = me.getView();
        var grid = view.down('gridpanel');

        if (!grid) { return; }

        var library   = view.library;
        var procedure = view.storeProcedure;

        if (!library || !procedure) {
            Ext.log.warn('[StoreProcGridController] Faltan configs "library" o "storeProcedure".');
            return;
        }
        var store = global.callStorePaggin(library, procedure, Ext.apply({}, params));
        grid.setStore(store);

        var pagingBar = view.down('pagingtoolbar');
        if (pagingBar) {
            pagingBar.setStore(store);
        }

        // Locking grids created dynamically need an explicit layout pass after load
        store.on('load', function () {
            if (!grid.isDestroyed) {
                grid.updateLayout();
            }
        });
    },

    /**
     * Recarga el grid.
     *
     * - Si se pasan newParams, reemplazan (merge) los storeParams actuales.
     * - Si no se pasan y hay filtro interno, toma los valores del form.
     * - Si no se pasan y no hay filtro interno, recarga con los storeParams actuales.
     *
     * @param {Object} [newParams]
     */
    reload: function (newParams) {
        var me   = this;
        var view = me.getView();

        // Determinar params efectivos
        var params;
        if (newParams) {
            view.storeParams = Ext.apply(view.storeParams || {}, newParams);
            params = view.storeParams;
        } else if (view.filterItems && view.filterItems.length > 0) {
            params = Ext.apply(view.storeParams || {}, me.getFilterParams());
        } else {
            params = view.storeParams || {};
        }

        me._buildStore(params);
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Filtro interno
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Handler del botón Search del filtro interno.
     * También puede ser llamado desde el Enter en un campo (searchOnEnter).
     */
    onSearchClick: function () {
        this.reload();
    },

    /**
     * Handler del botón Clear del filtro interno.
     * Resetea el form a los valores por defecto y recarga si autoSearch === true.
     */
    onClearClick: function () {
        var me   = this;
        var view = me.getView();
        var filterForm = view.down('#filterForm');
        if (filterForm) {
            filterForm.reset();
            if (view.autoSearch) {
                me.reload();
            }
        }
    },

    /**
     * Retorna los valores actuales del filtro interno como objeto {name: value}.
     * Si no hay filtro interno retorna {}.
     * Puede ser llamado desde el customController: this.baseCtrl.getFilterParams()
     *
     * @returns {Object}
     */
    getFilterParams: function () {
        var view       = this.getView();
        var filterForm = view.down('#filterForm');
        if (filterForm) {
            return filterForm.getForm().getValues();
        }
        return Ext.apply({}, view.storeParams || {});
    },

    /**
     * Handler de Enter en campos del filtro interno (searchOnEnter).
     */
    onFilterFieldSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Excel
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Descarga el resultado completo del SP (sin paginación) como Excel.
     * Usa excelColumns si está configurado; de lo contrario deriva las columnas de gridColumns.
     */
    onExcelClick: function () {
        var me   = this;
        var view = me.getView();

        var params;
        if (view.filterItems && view.filterItems.length > 0) {
            params = Ext.apply(Ext.apply({}, view.storeParams || {}), me.getFilterParams());
        } else {
            params = Ext.apply({}, view.storeParams || {});
        }

        Ext.getBody().mask('Generating Excel...');

        global.exportExcelFromStore(
            view.library,
            view.storeProcedure,
            params,
            me._resolveExcelColumns(),
            view.gridTitle || view.storeProcedure
        ).finally(function () {
            Ext.getBody().unmask();
        });
    },

    /**
     * @private
     * Resuelve las columnas para el Excel.
     * Prioridad: view.excelColumns → derivado de view.gridColumns.
     * Normaliza ambas fuentes al formato { header, dataIndex }.
     *
     * @returns {Array} [{header, dataIndex}, ...]
     */
    _resolveExcelColumns: function () {
        var view = this.getView();

        // ── Layout explícito ───────────────────────────────────────────────────
        if (view.excelColumns && view.excelColumns.length > 0) {
            return Ext.Array.map(view.excelColumns, function (col) {
                return {
                    header:    col.header || col.text || col.dataIndex,
                    dataIndex: col.dataIndex
                };
            });
        }

        // ── Derivado de gridColumns ────────────────────────────────────────────
        var src     = view.gridColumns;
        var rawCols = Ext.isArray(src) ? src : (src ? (src.items || []) : []);
        var columns = [];

        Ext.each(rawCols, function (col) {
            if (col.dataIndex && col.xtype !== 'actioncolumn') {
                columns.push({
                    header:    col.text || col.dataIndex,
                    dataIndex: col.dataIndex
                });
            }
        });

        return columns;
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Acciones de fila
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Handler central de acciones de fila. Delega al customCtrl si está configurado.
     *
     * @param {String}         action    Identificador de la acción (e.g. 'edit', 'view')
     * @param {Ext.data.Model} record    Registro de la fila
     * @param {Number}         rowIndex  Índice de la fila
     * @param {Ext.grid.Panel} gridView  Referencia al grid
     */
    onRowAction: function (action, record, rowIndex, gridView) {
        var me = this;
        if (me.customCtrl && Ext.isFunction(me.customCtrl.onRowAction)) {
            me.customCtrl.onRowAction(action, record, rowIndex, gridView);
        }
    },

    /**
     * Handler de doble clic en fila.
     */
    onRowDblClick: function (grid, record, tr, rowIndex) {
        this.onRowAction('dblclick', record, rowIndex, grid);
    }
});
