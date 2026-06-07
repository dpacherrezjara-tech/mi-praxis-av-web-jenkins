/**
 * NivelLineasDetalle — Nivel 3 del drilldown
 * --------------------------------------------
 * Muestra las líneas de error individuales (SPMDP00020) con:
 *  - Barra "Aplicar a todos": aplica un mensaje genérico a toda la lista (SPMDP00021)
 *  - Grid con todas las líneas del depósito seleccionado
 *  - Acción de fila para editar el DESCBPO individual (abre EditDescbpoWindow)
 *
 * Config:
 *   parentRecord {Ext.data.Model}  Fila del Nivel 2 (SPMDP00019)
 */
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.NivelLineasDetalle', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.NivelLineasDetalle',

    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.NivelLineasDetalleController',
        'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.EditDescbpoWindow'
    ],

    controller: 'NivelLineasDetalleController',
    border:     false,
    layout:     'border',

    parentRecord: null,

    initComponent: function () {
        var me = this;

        me.items = [

            // ── Barra "Aplicar a todos" ───────────────────────────────────
            {
                xtype:     'panel',
                itemId:    'bulkApplyBar',
                region:    'north',
                border:    true,
                bodyStyle: 'background-color:#E3EAF9;padding:4px 8px;',
                layout:    { type: 'hbox', align: 'middle' },
                height:    36,
                items: [
                    {
                        xtype:     'textfield',
                        itemId:    'bulkMsgField',
                        emptyText: 'Mensaje para todos los registros del grupo...',
                        flex:      1,
                        maxLength: 150
                    },
                    {
                        xtype:   'button',
                        itemId:  'btnAplicarTodos',
                        text:    'Aplicar a todos',
                        iconCls: 'x-fa fa-send',
                        margin:  '0 0 0 4',
                        handler: 'onAplicarTodosClick'
                    }
                ]
            },

            // ── Grid de líneas ────────────────────────────────────────────
            {
                xtype:       'gridpanel',
                itemId:      'lineasGrid',
                region:      'center',
                border:      false,
                cls:         'praxis-storeprocgrid-grid',
                columnLines: true,
                viewConfig: {
                    stripeRows:          true,
                    enableTextSelection: true,
                    markDirty:           false,
                    loadMask:            true
                },
                columns: {
                    defaults: { align: 'center', menuDisabled: true, sortable: true },
                    items: [
                        { text: 'Doc. SAP',     dataIndex: 'BANDOC',  width: 120 },
                        { text: 'Cód. Error',   dataIndex: 'CODVAL',  width: 90 },
                        { text: 'Desc. Error',  dataIndex: 'DESCVAL', flex: 1, minWidth: 180, align: 'left' },
                        {
                            text: 'Tipo Validac.', dataIndex: 'TIPOVAL', width: 105,
                            renderer: function (val) {
                                var v = (val || '').trim();
                                var m = { REG: { l: 'Regular', c: '#1971c2' }, DEB: { l: 'Débitos', c: '#7048e8' } };
                                var o = m[v] || { l: v, c: '#868e96' };
                                return '<span style="background:' + o.c + ';color:#fff;padding:1px 6px;border-radius:3px;font-size:11px;">' + o.l + '</span>';
                            }
                        },
                        {
                            text: 'Estado', dataIndex: 'STBPO', width: 90,
                            renderer: function (val) {
                                var v = (val || '').trim();
                                var m = { N: { l: 'Pendiente', c: '#f08c00' }, Y: { l: 'Revisado', c: '#1971c2' } };
                                var o = m[v] || { l: v, c: '#868e96' };
                                return '<span style="background:' + o.c + ';color:#fff;padding:1px 6px;border-radius:3px;font-size:11px;">' + o.l + '</span>';
                            }
                        },
                        { text: 'Mensaje BPO', dataIndex: 'DESCBPO', flex: 1, minWidth: 200, align: 'left' },
                        { text: 'Usu. Crea',   dataIndex: 'USCR',    width: 90 },
                        { text: 'Fec. Crea',   dataIndex: 'FECR',    width: 80 },
                        { text: 'Hora Crea',   dataIndex: 'HOCR',    width: 70 },
                        { text: 'Usu. Upd',    dataIndex: 'USUP',    width: 90 },
                        { text: 'Fec. Upd',    dataIndex: 'FEUP',    width: 80 },
                        { text: 'Hora Upd',    dataIndex: 'HOUP',    width: 70 },
                        {
                            xtype:       'actioncolumn',
                            text:        '',
                            width:       32,
                            align:       'center',
                            menuDisabled: true,
                            sortable:    false,
                            items: [{
                                iconCls: 'x-fa fa-pencil',
                                tooltip: 'Editar Mensaje BPO',
                                handler: function (grid, rowIndex, colIndex, item, e, record) {
                                    var panel = grid.up('[alias~=widget.NivelLineasDetalle]') || grid.up('panel');
                                    panel.getController().onEditDescbpo(record);
                                }
                            }]
                        }
                    ]
                }
            }
        ];

        me.callParent(arguments);
    },

    listeners: {
        afterrender: 'onAfterRender'
    }
});
