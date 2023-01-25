
Ext.define('Ext.Praxis.view.sales.InterlineAnalysisForm.Info', {
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
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            //height: 530,
                            height: 385,
                            columnLines: true,
                            features: [{
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }],
                            columns: {
                                items: [
                                    {text: 'Date', dataIndex: 'MES', width: 90, renderer: 'onMonthStringRenderer'},
                                    {
                                        text: '100% Data',
                                        columns: [
                                            {text: 'On',
                                                columns: [
                                                    {text: 'Cpn', dataIndex: 'QTY_ON_ALL', width: 90, align: 'right', renderer: 'onAmountResumeRenderer', 
                                                        summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Miles', dataIndex: 'KM_ON_ALL', width: 90, renderer: 'onAmountResumeRenderer', align: 'right', 
                                                        summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'FARE_ON_ALL', width: 90, align: 'right', renderer: 'onAmountResumeRenderer', 
                                                        summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Off',
                                                columns: [
                                                    {text: 'Cpn', dataIndex: 'QTY_OFF_ALL', width: 90, align: 'right', renderer: 'onAmountResumeRenderer', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Miles', dataIndex: 'KM_OFF_ALL', width: 90, renderer: 'onAmountResumeRenderer', align: 'right', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'FARE_OFF_ALL', width: 90, align: 'right', renderer: 'onAmountResumeRenderer', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Exceptions',
                                        columns: [
                                            {text: 'On',
                                                columns: [
                                                    {text: 'Cpn', dataIndex: 'QTY_ON', width: 70, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Miles', dataIndex: 'KM_ON', width: 90, renderer: 'onAmountRenderer', align: 'right', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'FARE_ON', width: 90, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Off',
                                                columns: [
                                                    {text: 'Cpn', dataIndex: 'QTY_OFF', width: 60, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Miles', dataIndex: 'KM_OFF', width: 85, renderer: 'onAmountRenderer', align: 'right', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'FARE_OFF', width: 80, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Estimated<br>Value', dataIndex: 'VAL_EST_OFF', width: 85, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Diff', dataIndex: 'DIFF', width: 85, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                        summaryRenderer: function(value, summaryData, dataIndex) {
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
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
                                trackOver: true,
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-pie',
//                            width: prototype.widthGrid,
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
//                            border: true,
//                            height: 25,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            defaults: {
//                                border: true
//                            },
//                            padding: '1px 1px 1px 1px',
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    width: prototype.widthGrid,
//                                    height: 25,
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        margin: '3px 0px 0px 5px'
//                                    },
//                                    items: [
//                                        {
//                                            text: 'Page',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-total',
//                                            text: '0',
//                                            width: 50
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
//        {
//            region: 'south',
//            layout: 'border',
//            height: 0,
//            defaults: {
//                style: 'margin: 2px;',
//                bodyStyle: 'background: transparent;',
//                border: false
//            },
//            items: [
//            ]
//        }
    ]
});