
Ext.define('Ext.Praxis.view.eecta.ControlUATPForm.Info01', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id01 + '-info01',
    align: 'left',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id01 + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id01 + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridData',
                            columnLines: true,
                            width: 990,
                            height: 475,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [                                    
                                    {
                                        text: 'Ticket', dataIndex: 'A3981NREDO', width: 110, align: 'center', locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return record.get('A3535CIA') + record.get('A3535FORMA') + record.get('A3535SERIE');
                                        }
                                    },
                                    {
                                        text: 'Estado', dataIndex: 'A3535ESTA', align: 'center', width: 60, locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var VL_A1272DES = record.get('A1272DES');
                                            var html = '<img src="resources/img/semaforo/Circle_Green.png" title="OK" >';
                                            if (value === '2')
                                                var html = '<img src="resources/img/semaforo/Circle_Red.png" title="' + VL_A1272DES + '" >';
                                            return html;
                                        }
                                    },
                                    {text: 'Fecha<br>Emisión', dataIndex: 'A3535FEVTA', align: 'center', width: 70, locked: true},
                                    {text: 'PNR', dataIndex: 'A3535PNR', align: 'left', width: 60, locked: true},
                                    {text: 'Trx.', dataIndex: 'A3535TRNCU', align: 'center', width: 60, locked: true},
                                    {text: 'Pax', dataIndex: 'A3535PAX', align: 'left', width: 140, locked: true},
                                    {
                                        text: 'Información FOP',
                                        columns: [
                                            {
                                                text: 'FOP', dataIndex: 'A3535CFOP', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return record.get('A3535CFOP')+record.get('A3535TTARJ');
                                                }
                                            },
                                            {text: 'Tarj.', dataIndex: 'A3535NTARJ', width: 110, align: 'left'},
                                            {
                                                text: 'Total', dataIndex: 'A3535VFOP', width: 90, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Importes',
                                        columns: [
                                            {text: 'Moneda', dataIndex: 'A3535MDLOC', width: 60, align: 'center'},
                                            {
                                                text: 'Fare', dataIndex: 'A3535FARE', width: 80, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'IVA', dataIndex: 'A3535IVA', width: 80, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'TUA', dataIndex: 'A3535TUA', width: 90, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'YR', dataIndex: 'A3535YR', width: 90, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'YQ', dataIndex: 'A3535YQ', width: 90, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'OTR.', dataIndex: 'A3535OTR', width: 90, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Total', dataIndex: 'A3535TOTAL', width: 90, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }                                    
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-pie',
                            width: 990,
                            height: 35,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id01 + '-boxPaginacion',
                                    width: '99%',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id01 + '-paggin',
                                                    pageSize: 20,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
