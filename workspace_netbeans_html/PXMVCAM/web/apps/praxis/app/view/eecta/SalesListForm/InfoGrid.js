
Ext.define('Ext.Praxis.view.eecta.SalesListForm.InfoGrid', {
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
                        // <editor-fold defaultstate="collapsed" desc="gridTree">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            columnLines: true,
                            //width: 990,
                            width: '99%',
                            height: 510,
                            padding: '0px 5px 1px 5px',                           
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Nbr Report', dataIndex: 'A3957NRRPT', width: 80, align: 'center'},
                                    {text: 'Client Id', dataIndex: 'A3957CDCLI', align: 'center', width: 80},
                                    {text: 'Client', dataIndex: 'A3953RSOCI', align: 'left', flex: 1},                                    
                                    {
                                        text: 'Periodo',
                                        columns: [
                                            {text: 'Desde', dataIndex: 'A3957INIPR', width: 70, align: 'center'},
                                            {text: 'Hasta', dataIndex: 'A3957FINPR', width: 70, align: 'center'}
                                        ]
                                    },
                                    {text: 'Curr.', dataIndex: 'A3957MDLOC', width: 50, align: 'center'},
                                    {text: 'Fare', dataIndex: 'A3957FARE', width: 90, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'IVA', dataIndex: 'A3957IVA', width: 70, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'TUA', dataIndex: 'A3957TUA', width: 70, align: 'right',
                                        summaryType: 'sum',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            if (record.get('IS_TOTAL'))
                                                metaData.tdStyle = 'font-weight: bold;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            var grid = Ext.getCmp(prototype.id + '-gridData72');
//                                            var store = grid.getStore();
//                                            var val_AVG = 0.0;
//                                            var val_NET = 0;
//                                            var val_BN = 0;
//                                            store.each(function (value, index) {
//                                                //if ( Ext.String.trim(value.get('DESCRIPTION').toUpperCase()) != 'OVERCHARGE' ){
//                                                val_NET += parseFloat(value.get('NET'));
//                                                val_BN += parseFloat(value.get('BN'));
//                                                //}
//                                            });
//                                            //console.log('val_NET', val_NET);
//                                            //console.log('val_BN', val_BN);                                    
//                                            if (val_BN > 0)
//                                                val_AVG = parseFloat(val_NET / val_BN);
                                            return Ext.util.Format.number(val_AVG, '0,000.00');

                                        }
                                    },
                                    {
                                        text: 'YR', dataIndex: 'A3957YR', width: 70, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Other', dataIndex: 'A3957OTR', width: 90, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Total', dataIndex: 'A3957TOT', width: 90, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        items: [
//                                            {
//                                                iconCls: 'prx-icon-detail',
//                                                tooltip: 'Click for view detail',
//                                                handler: 'onDetailClick',
//                                                isDisabled: 'onDetailIsDisabled'
//                                            },
                                            {
                                                iconCls: 'prx-icon-pdf',
                                                tooltip: 'Report for PDF',
                                                handler: 'onReportVentaUATP_PDF'
                                                //isDisabled: 'onDetailIsDisabled'
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
                                    if (rowIndex % 2 == 0)
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
