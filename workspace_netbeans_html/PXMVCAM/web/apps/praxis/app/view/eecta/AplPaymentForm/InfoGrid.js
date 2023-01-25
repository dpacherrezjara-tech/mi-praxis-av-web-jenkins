
Ext.define('Ext.Praxis.view.eecta.AplPaymentForm.InfoGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
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
                            id: prototype.id + '-gridData',
                            columnLines: true,                            
                            width: '100%',
                            height: 490,
                            padding: '0px 5px 1px 5px',
//                            features: [
//                                {
//                                    dock: 'bottom',
//                                    ftype: 'summary'
//                                }
//                            ],
                            selModel: {                                
                                selType: 'checkboxmodel',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {
                                        return true;
                                        if (Ext.String.trim(record.get('FLAG')) === 'Y')
                                            return false;
                                    }
                                }
                            },
                            columns: {
                                items: [                                    
                                    {text: 'Nº Reporte', dataIndex: 'A3957NRRPT', width: 80, align: 'center', locked: true},
                                    {text: 'Id Cliente', dataIndex: 'A3957CDCLI', align: 'center', width: 80, locked: true},
                                    {text: 'Nombre Cliente', dataIndex: 'A3953RSOCI', align: 'left', width: 200, locked: true},
                                    {
                                        xtype: 'actioncolumn',
                                        text:'Ver<br>Detalle',
                                        sortable: false,
                                        width: 55,
                                        align: 'center',
                                        locked: true,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle de boletos',
                                                handler: 'onDetailClick'
                                            }
                                        ]

                                    },
                                    {
                                        text: 'Periodo',
                                        columns: [
                                            {text: 'Desde', dataIndex: 'A3957INIPR', width: 70, align: 'left'},
                                            {text: 'Hasta', dataIndex: 'A3957FINPR', width: 70, align: 'left'}
                                        ]
                                    },
                                    {text: 'Mda.', dataIndex: 'A3957MDLOC', width: 50, align: 'center'},
                                    {text: 'Tarifa', dataIndex: 'A3957FARE', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Iva', dataIndex: 'A3957IVA', width: 70, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'TUA', dataIndex: 'A3957TUA', width: 70, align: 'right',
//                                      summaryType: 'sum',
//                                      summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(val_AVG, '0,000.00');
//                                        }
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            if (record.get('IS_TOTAL'))
//                                                metaData.tdStyle = 'font-weight: bold;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }                                        
                                    },
                                    {
                                        text: 'YR', dataIndex: 'A3957YR', width: 70, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Other', dataIndex: 'A3957OTR', width: 70, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Total', dataIndex: 'A3957TOT', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Pagos', dataIndex: 'A3957TOTAP', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {                                            
                                            metaData.style = 'font-weight:bold;color:green;';                                            
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Saldo por<br>pagar', dataIndex: 'A3957SALDP', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Estado<br>Pago', dataIndex: 'A3957STSPG', width: 70, align: 'left'},
                                    {text: 'Ref. Pago', dataIndex: 'A3957REFBC', width: 70, align: 'left'},
                                    {text: 'Banco', dataIndex: 'A3953BANCO', width: 70, align: 'left'},                                    
                                    {text: 'Cta. Bancaria', dataIndex: 'A3953CTABC', width: 70, align: 'left'},
                                    {
                                        xtype: 'actioncolumn',
                                        text:'Detalle<br>Pagos',
                                        sortable: false,
                                        width: 55,
                                        align: 'center',                                        
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle de boletos',
                                                handler: 'onDetailPagoClick'
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
                                markDirty: false
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
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total Records',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
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
