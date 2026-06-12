/**
 * StoreProcGrid — Widget reutilizable de grid paginado con Stored Procedure
 * -------------------------------------------------------------------------
 * Renderiza un Ext.grid.Panel paginado que consume automáticamente un stored
 * procedure via el endpoint genérico /Generic/CallStorePaggin/{library}/{procedure}.
 *
 * ─── CONFIGS REQUERIDAS ──────────────────────────────────────────────────────
 *
 *   library         {String}  Librería del SP              (e.g. 'PRAXISMP')
 *   storeProcedure  {String}  Nombre del SP                (e.g. 'SPACR002')
 *   gridColumns     {Array|Object} Columnas del grid
 *
 * ─── CONFIGS OPCIONALES ──────────────────────────────────────────────────────
 *
 *   storeParams      {Object}  Params fijos al SP (no vienen del filtro)
 *   customController {String}  Clase del controller delegado para acciones de fila
 *   rowActions       {Array}   Botones de acción por fila. Ver formato abajo.
 *   pageSize         {Number}  Registros por página (default: 20)
 *   gridTitle        {String}  Título del panel (default: '')
 *   height           {Number}  Alto del widget (default: 450)
 *   showExcelButton  {Boolean} Muestra botón Excel (default: true)
 *   showRefreshBtn   {Boolean} Muestra botón Refresh (default: true)
 *
 *   ── Filtro integrado (opcional) ─────────────────────────────────────────
 *   filterItems      {Array}   Campos del filtro. Mismo formato que items de
 *                              Ext.form.Panel. El atributo `name` de cada campo
 *                              se usa como clave del parámetro enviado al SP.
 *   autoSearch       {Boolean} Ejecuta búsqueda al renderizar con valores default
 *                              del filtro (default: true)
 *   searchOnEnter    {Boolean} Enter en cualquier campo del filtro dispara búsqueda
 *                              (default: true)
 *   filterCollapsible {Boolean} El panel de filtros puede colapsarse (default: false)
 *
 * ─── rowActions FORMAT ───────────────────────────────────────────────────────
 *
 *   rowActions: [
 *       { action: 'edit',   icon: 'x-fa fa-pencil', tooltip: 'Edit'   },
 *       { action: 'delete', icon: 'x-fa fa-trash',  tooltip: 'Delete' }
 *   ]
 *   → El controller (base o custom) recibe: onRowAction(action, record, rowIndex, grid)
 *
 * ─── EJEMPLO: filtro externo (filtro en otro componente) ─────────────────────
 *
 *   // En la view contenedora:
 *   { xtype: 'storeprocgrid',
 *     library: 'PRAXISMP', storeProcedure: 'SPACR002',
 *     storeParams: { IN_CIA: '001' },
 *     gridColumns: [...] }
 *
 *   // En el controller contenedor, al hacer Search:
 *   Ext.getCmp('my-grid').getController().reload({ IN_CCUST: '134', IN_TIPOCON: 'REG' });
 *
 * ─── EJEMPLO: filtro integrado ───────────────────────────────────────────────
 *
 *   { xtype: 'storeprocgrid',
 *     library: 'PRAXISMP', storeProcedure: 'SPACR002',
 *     autoSearch: true,
 *     filterItems: [
 *         { xtype: 'combobox', fieldLabel: 'Client', name: 'IN_CCUST',
 *           value: '134', store: myStore, valueField: 'code', displayField: 'name',
 *           width: 190 },
 *         { xtype: 'datefield', fieldLabel: 'From', name: 'IN_FCONTF',
 *           format: 'Ymd', value: new Date(), width: 150 }
 *     ],
 *     gridColumns: [...] }
 *
 * ─── EJEMPLO: controller custom para acciones de fila ────────────────────────
 *
 *   Ext.define('Ext.Praxis.controller.mymodule.MyRowController', {
 *       extend: 'Ext.Base',
 *       baseCtrl:   null,   // StoreProcGridController — asignado automáticamente
 *       widgetView: null,   // View del widget        — asignada automáticamente
 *
 *       onRowAction: function(action, record, rowIndex, gridView) {
 *           var params = this.baseCtrl.getFilterParams(); // acceso a filtros actuales
 *           if (action === 'view') { ... }
 *       },
 *       onWidgetReady: function(widgetView) { }
 *   });
 *
 *   Config: { customController: 'Ext.Praxis.controller.mymodule.MyRowController', ... }
 */
Ext.define('Ext.Praxis.view.widgets.StoreProcGrid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.storeprocgrid',

    requires: [
        'Ext.Praxis.controller.widgets.StoreProcGridController',
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel'
    ],

    controller: 'StoreProcGridController',

    // ─────────────────────────────────────────────────────────────────────────
    // Configs públicas
    // ─────────────────────────────────────────────────────────────────────────

    /** @cfg {String} library Librería del stored procedure */
    library: '',

    /** @cfg {String} storeProcedure Nombre del stored procedure */
    storeProcedure: '',

    /**
     * @cfg {Object} storeParams
     * Parámetros fijos enviados al SP (no provienen del filtro).
     * Si hay filtro interno, se mezclan con los valores del form al ejecutar.
     */
    storeParams: null,

    /**
     * @cfg {String} customController
     * Nombre completo de la clase del controller delegado para acciones de fila.
     */
    customController: null,

    /**
     * @cfg {Array} rowActions
     * Botones de acción por fila.
     * Formato: [{ action: 'edit', icon: 'x-fa fa-pencil', tooltip: 'Edit' }, ...]
     */
    rowActions: null,

    /**
     * @cfg {Array|Object} gridColumns
     * Definición de columnas para el grid interno.
     * Acepta array simple o formato con defaults: { defaults: {...}, items: [...] }
     * NOTA: No usar 'columns' directamente — es una propiedad reservada de
     * Ext.container.Container (layout table) y causaría conflicto.
     */
    gridColumns: null,

    /**
     * @cfg {Array} filterItems
     * Campos del filtro integrado (encima del grid).
     * Si está vacío o es null, no se renderiza el panel de filtro.
     * El atributo `name` de cada campo se usa como clave del parámetro al SP.
     */
    filterItems: null,

    /**
     * @cfg {Boolean} autoSearch
     * Si true y hay filterItems, ejecuta la búsqueda al renderizar con los
     * valores por defecto de los campos. Ignorado si no hay filterItems.
     */
    autoSearch: true,

    /**
     * @cfg {Boolean} searchOnEnter
     * Si true, presionar Enter en cualquier campo del filtro dispara la búsqueda.
     */
    searchOnEnter: true,

    /**
     * @cfg {Boolean} filterCollapsible
     * Si true, el panel de filtros tiene un toggle para colapsarse.
     */
    filterCollapsible: false,

    /** @cfg {Number} pageSize Registros por página */
    pageSize: 20,

    /** @cfg {String} gridTitle Título del panel contenedor */
    gridTitle: '',

    /** @cfg {String} excelTitle Nombre del módulo en el archivo Excel descargado. Si se omite usa gridTitle, luego storeProcedure. */
    excelTitle: '',

    /** @cfg {Boolean} showExcelButton Muestra botón de descarga Excel */
    showExcelButton: true,

    /** @cfg {Boolean} showEmptyMsg Muestra el mensaje "No records found" cuando el grid no tiene datos */
    showEmptyMsg: true,

    /**
     * @cfg {Array} excelColumns
     * Layout de columnas para la descarga Excel.
     * Cada entrada acepta { header, dataIndex } o { text, dataIndex } (text es alias de header).
     * Si se omite, se deriva automáticamente de gridColumns.
     *
     * Ejemplo:
     *   excelColumns: [
     *       { header: 'Cliente',  dataIndex: 'CCUST'  },
     *       { header: 'Fecha',    dataIndex: 'FCONTF' },
     *       { header: 'Importe',  dataIndex: 'AMOUNT' }
     *   ]
     */
    excelColumns: null,

    /**
     * @cfg {Boolean} memoryPaging
     * Si true, carga todos los registros de una vez y pagina en memoria (client-side).
     * Útil cuando el SP no soporta paginación server-side (devuelve todo el resultado).
     */
    memoryPaging: false,

    // ─────────────────────────────────────────────────────────────────────────
    // Defaults del panel
    // ─────────────────────────────────────────────────────────────────────────

    border: false,
    height: 450,
    bodyStyle: 'background-color: #f5f5f5;',

    // ─────────────────────────────────────────────────────────────────────────
    // Construcción dinámica
    // ─────────────────────────────────────────────────────────────────────────

    initComponent: function () {
        var me = this;

        me.storeParams = me.storeParams || {};

        var hasFilter = me.filterItems && me.filterItems.length > 0;

        // Layout: border si hay filtro (north + center), fit si no lo hay
        me.layout = hasFilter ? 'border' : 'fit';

        me.items = [];

        // ── Panel de filtro (norte) ──────────────────────────────────────────
        if (hasFilter) {
            me.items.push(me._buildFilterPanel());
        }

        // ── Grid panel (centro o único item) ────────────────────────────────
        me.items.push(me._buildGridPanel(hasFilter));

        // Título
        if (me.gridTitle) {
            me.title = me.gridTitle;
        }

        me.callParent(arguments);
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Builders privados
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @private
     * Construye el panel de filtro (región north en layout border).
     */
    _buildFilterPanel: function () {
        var me = this;

        // Agregar listener specialkey a cada campo si searchOnEnter está activo
        if (me.searchOnEnter) {
            Ext.each(me.filterItems, function (item) {
                if (!item.listeners) {
                    item.listeners = {};
                }
                item.listeners.specialkey = 'onFilterFieldSpecialKey';
            });
        }

        return {
            xtype: 'form',
            itemId: 'filterForm',
            region: 'north',
            border: true,
            bodyStyle: 'background-color: #E3EAF9; padding: 4px 8px;',
            collapsible: me.filterCollapsible,
            collapseDirection: 'top',
            title: me.filterCollapsible ? 'Filters' : false,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                labelAlign: 'right',
                padding: '0 4px 0 0'
            },
            items: me.filterItems.concat([
                { xtype: 'tbseparator' },
                {
                    xtype: 'button',
                    text: 'Search',
                    iconCls: 'prx-icon-search',
                    handler: 'onSearchClick'
                },
                {
                    xtype: 'button',
                    text: 'Clear',
                    iconCls: 'prx-icon-clear',
                    margin: '0 0 0 4',
                    handler: 'onClearClick'
                }
            ])
        };
    },

    /**
     * @private
     * Construye el grid panel (con su tbar y bbar).
     * @param {Boolean} hasFilter  Si true, se configura como region:'center'
     */
    _buildGridPanel: function (hasFilter) {
        var me = this;

        return {
            xtype: 'gridpanel',
            itemId: 'mainGrid',
            region: hasFilter ? 'center' : undefined,
            border: false,
            cls: 'praxis-storeprocgrid-grid',
            columns: me._buildColumns(),
            viewConfig: {
                loadMask: true,
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false,
                emptyText: me.showEmptyMsg ? 'No data to display' : ''
            },
            columnLines: true,
            tbar: {
                xtype: 'toolbar',
                width: '100%',
                flex: 1,
                layout: {
                    type: 'hbox',
                    pack: 'end'
                },
                items: me._buildTopToolbar()
            },
            bbar: {
                xtype: 'pagingtoolbar',
                itemId: 'pagingBar',
                displayInfo: true,
                displayMsg: 'Records {0} - {1} of {2}',
                emptyMsg: me.showEmptyMsg ? 'No records found' : '',
                pageSize: me.pageSize
            },
            listeners: {
                itemdblclick: 'onRowDblClick'
            }
        };
    },

    /**
     * @private
     * Construye las columnas del grid normalizadas a un array plano.
     *
     * Soporta dos formatos para gridColumns:
     *   1. Array:             gridColumns: [ col1, col2, ... ]
     *   2. Objeto con items:  gridColumns: { defaults: {...}, items: [ col1, col2, ... ] }
     *
     * En el formato 2 los defaults de nivel raíz se aplican a cada columna de primer
     * nivel con Ext.applyIf (la columna tiene prioridad sobre el default).
     * Los defaults de columnas agrupadas { text, columns: [...] } son procesados
     * internamente por ExtJS al crear el header container — no se tocan aquí.
     *
     * NOTA: No se usa Ext.clone sobre el objeto completo porque ExtJS no procesa
     * correctamente el formato { defaults, items } cuando se pasa como config de
     * instancia a un gridpanel (sólo funciona bien a nivel de clase Ext.define).
     */
    _buildColumns: function () {
        var me = this;
        var src = me.gridColumns;

        if (!src) {
            return [];
        }

        // ── Normalizar a array ──────────────────────────────────────────────
        var columns;
        if (Ext.isArray(src)) {
            columns = src.slice();                    // copia superficial del array
        } else {
            var outerDefs = src.defaults || {};
            columns = Ext.Array.map(src.items || [], function (col) {
                // col tiene prioridad sobre los defaults del nivel raíz
                return Ext.applyIf(Ext.apply({}, col), outerDefs);
            });
        }

        if (me.rowActions && me.rowActions.length > 0) {
            var actionItems = [];

            Ext.each(me.rowActions, function (actionCfg) {
                var item = {
                    tooltip: actionCfg.tooltip || actionCfg.action || '',
                    handler: function (grid, rowIndex, colIndex, _item, _e, record) {
                        var ctrl = grid.up('storeprocgrid').getController();
                        ctrl.onRowAction(actionCfg.action, record, rowIndex, grid);
                    }
                };
                if (Ext.isFunction(actionCfg.getClass)) {
                    item.getClass = actionCfg.getClass;
                } else {
                    item.iconCls = actionCfg.icon || 'prx-icon-detail';
                }
                if (Ext.isFunction(actionCfg.isDisabled)) { item.isDisabled = actionCfg.isDisabled; }
                if (Ext.isFunction(actionCfg.getTip)) { item.getTip = actionCfg.getTip; }
                actionItems.push(item);
            });

            columns.push({
                xtype: 'actioncolumn',
                text: 'Actions',
                width: (me.rowActions.length * 30) + 30,
                align: 'center',
                menuDisabled: true,
                sortable: false,
                items: actionItems
            });
        }

        return columns;
    },

    /**
     * @private
     * Construye los items del toolbar superior del grid.
     */
    _buildTopToolbar: function () {
        var me = this;
        var items = ['->'];

        if (me.showExcelButton) {
            items.push({
                xtype: 'button',
                text: 'Excel',
                iconCls: 'prx-icon-excel',
                tooltip: 'Download full report as Excel',
                handler: 'onExcelClick'
            });
        }

        if (me.tbarItems && me.tbarItems.length) {
            Ext.each(me.tbarItems, function (item) { items.push(item); });
        }

        return items;
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Listeners
    // ─────────────────────────────────────────────────────────────────────────

    listeners: {
        afterrender: 'onWidgetAfterRender'
    }
});
