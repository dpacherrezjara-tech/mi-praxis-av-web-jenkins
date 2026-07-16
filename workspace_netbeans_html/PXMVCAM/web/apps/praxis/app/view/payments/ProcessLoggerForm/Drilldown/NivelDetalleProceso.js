/**
 * NivelDetalleProceso — Nivel 2 del drilldown
 * ---------------------------------------------
 * Muestra el detalle del proceso (SPMDP00019) con:
 *  - Filtros: Depósito, Referencia, Solo Errores
 *  - Grid paginado con checkboxmodel
 *  - Botón "Actualizar Códigos" (abre ActualizarCodigosWindow)
 *  - Acción de fila para navegar al Nivel 3 (QTY_ERROR > 0)
 *
 * Config:
 *   parentRecord {Ext.data.Model}  Fila del grid principal (SPMDP00018)
 */
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.NivelDetalleProceso', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.NivelDetalleProceso',

    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.NivelDetalleController',
        'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.ActualizarCodigosWindow'
    ],

    controller: 'NivelDetalleController',
    border: false,
    layout: 'border',

    parentRecord: null,

    initComponent: function () {
        var me = this;

        me.items = [

            // ── Barra de filtros ──────────────────────────────────────────
            {
                xtype: 'form',
                itemId: 'filterFormDetalle',
                region: 'north',
                border: true,
                bodyStyle: 'background-color:#E3EAF9;padding:4px 8px;',
                layout: { type: 'hbox', align: 'middle' },
                defaults: { labelAlign: 'right', padding: '0 4px 0 0' },
                height: 36,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'IN_BANDOC',
                        fieldLabel: 'Depósito',
                        labelWidth: 70,
                        width: 200,
                        listeners: { specialkey: 'onFilterSpecialKey' }
                    },
                    {
                        xtype: 'textfield',
                        name: 'IN_REFER',
                        fieldLabel: 'Referencia',
                        labelWidth: 80,
                        width: 200,
                        listeners: { specialkey: 'onFilterSpecialKey' }
                    },
                    {
                        xtype: 'checkbox',
                        name: 'IN_ERRORS',
                        boxLabel: 'Solo Errores',
                        inputValue: 'X',
                        uncheckedValue: '',
                        padding: '0 8px 0 8px'
                    },
                    { xtype: 'tbseparator' },
                    {
                        xtype: 'button',
                        text: 'Buscar',
                        iconCls: 'prx-icon-search',
                        handler: 'onSearch'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnActualizarCodigos',
                        text: 'Actualizar Códigos',
                        iconCls: 'prx-icon-edit',
                        margin: '0 0 0 4',
                        disabled: true,
                        handler: 'onActualizarCodigos'
                    }
                ]
            },

            // ── Grid paginado con checkbox ────────────────────────────────
            {
                xtype: 'gridpanel',
                itemId: 'detalleGrid',
                region: 'center',
                border: false,
                cls: 'praxis-storeprocgrid-grid',
                columnLines: true,
                selModel: {
                    type: 'checkboxmodel',
                    mode: 'MULTI',
                    checkOnly: false
                },
                viewConfig: {
                    stripeRows: true,
                    enableTextSelection: true,
                    markDirty: false,
                    loadMask: true
                },
                columns: {
                    defaults: { align: 'center', menuDisabled: true, sortable: true },
                    items: [
                        { text: 'Sociedad', dataIndex: 'SOCIETY', width: 70 },
                        {
                            text: 'Tipo Doc', dataIndex: 'TDOC', width: 70,
                            renderer: function (val) {
                                var v = (val || '').trim();
                                var m = { S: { l: 'Sale', c: '#1971c2' }, D: { l: 'Debit', c: '#e03131' } };
                                var o = m[v] || { l: v, c: '#868e96' };
                                return '<span style="background:' + o.c + ';color:#fff;padding:1px 6px;border-radius:3px;font-size:11px;">' + o.l + '</span>';
                            }
                        },
                        { text: 'Procesador', dataIndex: 'CODPRO', width: 90 },
                        { text: 'Cuenta', dataIndex: 'ACCOUNT', width: 100 },
                        { text: 'Doc. SAP', dataIndex: 'BANDOC', width: 120 },
                        { text: 'Referencia', dataIndex: 'REFER', width: 120 },
                        { text: 'Val. Date', dataIndex: 'VALDATE', width: 80 },
                        { text: 'Moneda', dataIndex: 'SCURRENCY', width: 60 },
                        {
                            text: 'Neto', dataIndex: 'NETO', width: 110, align: 'right',
                            renderer: function (val) {
                                return Ext.util.Format.number(parseFloat(val || 0), '0,000.00');
                            }
                        },
                        {
                            text: 'Errores', dataIndex: 'QTY_ERROR', width: 70,
                            renderer: function (val) {
                                var qty = parseInt(val || 0);
                                var color = qty > 0 ? '#e03131' : '#37b24d';
                                return '<span style="background:' + color + ';color:#fff;padding:1px 6px;border-radius:3px;font-size:11px;">' + qty + '</span>';
                            }
                        },
                        {
                            text: 'Pendientes', dataIndex: 'QTY_PENDING', width: 80,
                            renderer: function (val) {
                                var qty = parseInt(val || 0);
                                var color = qty > 0 ? '#e8590c' : '#74b816';
                                return '<span style="background:' + color + ';color:#fff;padding:1px 6px;border-radius:3px;font-size:11px;">' + qty + '</span>';
                            }
                        },
                        {
                            text: 'Tipo Validac.', dataIndex: 'TIPOVAL', width: 105,
                            renderer: function (val) {
                                var v = (val || '').trim();
                                var m = { REG: { l: 'Regular', c: '#1971c2' }, DEB: { l: 'Débitos', c: '#7048e8' } };
                                var o = m[v] || { l: v, c: '#868e96' };
                                return '<span style="background:' + o.c + ';color:#fff;padding:1px 6px;border-radius:3px;font-size:11px;">' + o.l + '</span>';
                            }
                        },
                        { text: 'Códigos', dataIndex: 'CODIGOS', width: 80 },
                        {
                            xtype: 'actioncolumn',
                            text: '',
                            width: 32,
                            align: 'center',
                            menuDisabled: true,
                            sortable: false,
                            items: [{
                                tooltip: 'Ver líneas de detalle',
                                getClass: function (v, meta, record) {
                                    return parseInt(record.get('QTY_ERROR') || 0) > 0
                                        ? 'prx-icon-detail'
                                        : Ext.baseCSSPrefix + 'hidden-display';
                                },
                                handler: function (grid, rowIndex, colIndex, item, e, record) {
                                    var panel = grid.up('[alias~=widget.NivelDetalleProceso]') || grid.up('panel');
                                    panel.getController().onDrilldownRow(record);
                                }
                            }]
                        }
                    ]
                },
                bbar: {
                    xtype: 'pagingtoolbar',
                    itemId: 'detalleGridPaging',
                    displayInfo: true,
                    displayMsg: 'Registros {0} - {1} de {2}',
                    emptyMsg: 'Sin registros',
                    pageSize: 20
                },
                listeners: {
                    selectionchange: 'onSelectionChange'
                }
            }
        ];

        me.callParent(arguments);
    },

    listeners: {
        afterrender: 'onAfterRender'
    }
});
