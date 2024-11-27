Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.SummaryMonthGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SummaryMonthGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.SummaryMonthGridController'
    ],
    controller: 'SummaryMonthGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    features: [
        {
            ftype: 'summary' // Agrega la característica de resumen al grid
        }
    ],
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {
                text: 'RN',
                locked: true,
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {text: 'Client', dataIndex: 'CCUST', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if (!value) {
                        value = 'All';
                    }
                    return value;
                }
            },
            {text: 'Days', dataIndex: 'VALDATE', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value;
                }
            },
            {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1},
            {text: 'Documents', dataIndex: 'QTY', width: 120,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = 'text-align:center; margin-right:3px;font-weight:bold;';
                    return '<b>' + value + '<b>';
                }
            },
            {text: 'Total', dataIndex: 'TOTAL', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = 'text-align:right; margin-right:3px;';
                    value = Ext.util.Format.number(value, '0,000.00');
                    return '<b>' + value + '<b>';
                }
            },
            {text: 'Currency', dataIndex: 'LOCRENCY2', width: 120},
            {
                text: 'Accounting',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#89e45f;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Documents<br>Accounted', dataIndex: 'T_ACCOUNTED', width: 120,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:center; margin-right:3px;';
                            return '<b>' + value + '<b>';
                        }
                    },
                    {text: 'Value<br>Accounted', dataIndex: 'V_ACCOUNTED', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#89e45f;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right; margin-right:3px;';
                            value = Ext.util.Format.number(value, '0,000.00');
                            return '<b>' + value + '<b>';
                        }
                    },
                    {text: 'Documents<br>No Accounted', dataIndex: 'T_NACCOUNTED', width: 120,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:center; margin-right:3px;';
                            return '<b>' + value + '<b>';
                        }
                    },
                    {text: 'Value<br>No Accounted', dataIndex: 'V_NACCOUNTED', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#89e45f;text-align:right;";
                            if (value !== 0) {
                                metaData.style += 'color:red;font-weight:bold';
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right; margin-right:3px;color:red;';
                            value = Ext.util.Format.number(value, '0,000.00');
                            return '<b>' + value + '<b>';
                        }
                    }
                ]
            },
            {
                text: 'Match',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#dae45f;";
                        return value;
                    },
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                        metaData.style = 'text-align:center; margin-right:3px;';
                        return '<b>' + value + '<b>';
                    }
                },
                columns: [
                    {text: 'Documents', dataIndex: 'T_MATCH', width: 120,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:center; margin-right:3px;';
                            return '<b>' + value + '<b>';
                        }
                    },
                    {text: 'Value', dataIndex: 'V_MATCH', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#dae45f;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right; margin-right:3px;';
                            value = Ext.util.Format.number(value, '0,000.00');
                            return '<b>' + value + '<b>';
                        }
                    }
                ]
            },
            {
                text: 'Pending BPO',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#fa7156;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Total', dataIndex: 'T_PENDING', width: 120,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:center; margin-right:3px;';
                            return '<b>' + value + '<b>';
                        }
                    },
                    {text: 'Value', dataIndex: 'V_PENDING', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#fa7156;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right; margin-right:3px;';
                            value = Ext.util.Format.number(value, '0,000.00');
                            return '<b>' + value + '<b>';
                        }
                    }

                ]
            }

            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                scale: 'small',
                id: prototype.id + '-msumm-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    }
});


