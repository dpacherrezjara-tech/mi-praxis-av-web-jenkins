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
            // Merge storeParams + filter-form values so fixed params (e.g. IN_FILEID, IN_MODE)
            // are not lost when the grid also has filterItems.
            var initParams = Ext.apply(Ext.apply({}, view.storeParams || {}), me.getFilterParams());
            me._buildStore(initParams);
        } else if (!hasFilter && view.autoSearch !== false) {
            me._buildStore(view.storeParams || {});
        }
        // autoSearch === false detiene la carga automática sin importar si hay filterItems o no

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
     * Construye el store y lo enlaza al grid y al paging toolbar.
     * Si view.memoryPaging === true, delega en _buildMemoryStore (client-side paging).
     * @param {Object} params
     */
    _buildStore: function (params) {
        var me   = this;
        var view = me.getView();

        if (view.memoryPaging) {
            me._buildMemoryStore(params);
            return;
        }

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
     * @private
     * Carga TODOS los registros del SP en una sola llamada (limit=-1) y pagina
     * client-side usando Ext.data.proxy.Memory con enablePaging:true.
     * @param {Object} params
     */
    _buildMemoryStore: function (params) {
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

        view.setLoading(true);

        var fetchParams = Ext.apply({}, params, { start: 0, limit: -1 });

        var request = axios.create({
            baseURL: CONTEXTPATH + '/Generic',
            timeout: 600000
        });

        request.get('CallStorePaggin/' + library + '/' + procedure, { params: fetchParams })
            .then(function (res) {
                view._allData = (res.data && res.data.response) ? res.data.response : [];
                me._applyMemoryFilter({});
            })
            .catch(function () {
                global.Msg({ msg: 'Data not Found' });
            })
            .finally(function () {
                if (!view.isDestroyed) {
                    view.setLoading(false);
                }
            });
    },

    /**
     * @private
     * Filtra view._allData por coincidencia parcial (case-insensitive) sobre cada
     * valor no-vacío de filterValues, mapeando IN_XXX → campo XXX del registro.
     * Crea un store de memoria nuevo y recarga desde la página 1.
     * @param {Object} filterValues  { IN_SEQ: '123', IN_CERROR: '', ... }
     */
    _applyMemoryFilter: function (filterValues) {
        var me   = this;
        var view = me.getView();
        var grid = view.down('gridpanel');
        if (!grid || !view._allData) { return; }

        var data = view._allData.filter(function (row) {
            for (var key in filterValues) {
                if (!filterValues.hasOwnProperty(key)) { continue; }
                var term = String(filterValues[key] || '').trim();
                if (!term) { continue; }
                var field = key.replace(/^IN_/, '');
                var cell  = String(row[field] !== undefined ? row[field] : '').toLowerCase();
                if (cell.indexOf(term.toLowerCase()) === -1) { return false; }
            }
            return true;
        });

        var store = Ext.create('Ext.data.Store', {
            pageSize: view.pageSize || 20,
            data: data,
            proxy: { type: 'memory', enablePaging: true, reader: { type: 'json' } }
        });

        grid.setStore(store);
        store.loadPage(1);

        var pagingBar = view.down('pagingtoolbar');
        if (pagingBar) { pagingBar.setStore(store); }
        if (!grid.isDestroyed) { grid.updateLayout(); }
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
        var me   = this;
        var view = me.getView();
        if (view.memoryPaging && view._allData) {
            me._applyMemoryFilter(me.getFilterParams());
            return;
        }
        me.reload();
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
            if (view.memoryPaging && view._allData) {
                me._applyMemoryFilter({});
                return;
            }
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

        var now    = new Date();
        var pad    = function (n) { return String(n).padStart(2, '0'); };
        var dateStr = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
        var timeStr = pad(now.getHours()) + '-' + pad(now.getMinutes()) + '-' + pad(now.getSeconds());
        var moduleName = view.excelTitle || view.gridTitle || view.storeProcedure;
        var fileName = moduleName + ' ' + dateStr + ' ' + timeStr;

        var maskTarget = view.up('window') || Ext.getBody();
        maskTarget.mask('Generating Excel...');

        global.exportExcelFromStore(
            view.library,
            view.storeProcedure,
            params,
            me._resolveExcelColumns(),
            fileName
        ).finally(function () {
            maskTarget.unmask();
        });
    },

    /**
     * @private
     * Resuelve las columnas para el Excel.
     * Prioridad: view.excelColumns → derivado de view.gridColumns.
     * Normaliza al formato { header, dataIndex, formatter? }.
     * - Recursa en columnas agrupadas (col.columns).
     * - Envuelve col.renderer como formatter, stripeando HTML para texto plano.
     *
     * @returns {Array} [{header, dataIndex, formatter?}, ...]
     */
    _resolveExcelColumns: function () {
        var view = this.getView();

        // ── Layout explícito ───────────────────────────────────────────────────
        if (view.excelColumns && view.excelColumns.length > 0) {
            return Ext.Array.map(view.excelColumns, function (col) {
                var resolved = {
                    header:    col.header || col.text || col.dataIndex,
                    dataIndex: col.dataIndex
                };
                if (typeof col.formatter === 'function') {
                    resolved.formatter = col.formatter;
                }
                return resolved;
            });
        }

        // ── Derivado de gridColumns ────────────────────────────────────────────
        var src     = view.gridColumns;
        var rawCols = Ext.isArray(src) ? src : (src ? (src.items || []) : []);

        var stripHtml = function (str) {
            return String(str || '').replace(/<[^>]+>/g, '').trim();
        };

        var flatten = function (cols) {
            var result = [];
            Ext.each(cols, function (col) {
                // Grouped column — recurse
                if (col.columns && col.columns.length) {
                    result = result.concat(flatten(col.columns));
                    return;
                }
                if (!col.dataIndex || col.xtype === 'actioncolumn') { return; }

                var entry = { header: col.text || col.dataIndex, dataIndex: col.dataIndex };

                if (typeof col.renderer === 'function') {
                    // IIFE to capture renderer in closure
                    entry.formatter = (function (renderer) {
                        return function (val, row) {
                            var rendered = renderer(val, {}, row);
                            var text = stripHtml(rendered !== undefined && rendered !== null ? rendered : val);
                            return text !== '' ? text : String(val !== null && val !== undefined ? val : '');
                        };
                    })(col.renderer);
                }

                result.push(entry);
            });
            return result;
        };

        return flatten(rawCols);
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
