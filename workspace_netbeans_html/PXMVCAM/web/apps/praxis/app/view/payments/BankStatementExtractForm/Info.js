Ext.define('Ext.Praxis.view.payments.BankStatementExtractForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F4F7FD;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '15px 0 0 0',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
            },
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    height: 635,
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: 150
                            },
                            bodyStyle: 'background: transparent',
                            border: false,
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    height: 575,
                                    width: 1762,
                                    hidden: false,
                                    columnLines: true,
                                    features: [{
                                            dock: 'bottom',
                                            ftype: 'summary'
                                        }
                                    ], 
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Day',
                                                width: 70,
                                                dataIndex: 'DAY_NAME',
                                                align: 'center',
                                                style: 'padding: 6px; background: #6C87A8;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Monthly',
                                                width: 80,
                                                dataIndex: 'MONTH_NAME',
                                                align: 'center',
                                                style: 'padding: 6px; background: #6C87A8;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Holidays',
                                                menuDisabled: true,
                                                style: 'background: #A89C6C;',
                                                columns: [
                                                    {
                                                        text: 'WP UK',
                                                        width: 110,
                                                        dataIndex: 'HOLIDAY_WP_UK',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #A89C6C;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'WP Bancard',
                                                        width: 110,
                                                        dataIndex: 'HOLIDAY_WP_BANCARD',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #A89C6C;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amex',
                                                        width: 110,
                                                        dataIndex: 'HOLIDAY_AMEX',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #A89C6C;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Discover',
                                                        width: 110,
                                                        dataIndex: 'HOLIDAY_DISCOVER',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #A89C6C;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'References Dates',
                                                menuDisabled: true,
                                                style: 'background: #D18F77;',
                                                columns: [
                                                    {
                                                        text: 'From',
                                                        width: 80,
                                                        dataIndex: 'DATE_FROM',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Year Week',
                                                        width: 85,
                                                        dataIndex: 'NUMBER_WEAK',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Eked',
                                                        width: 55,
                                                        dataIndex: 'DAY_NUMBER_EKED',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Curr',
                                                width: 70,
                                                dataIndex: 'CURRENCY',
                                                align: 'center',
                                                style: 'padding: 6px; background: #6C87A8;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amounts',
                                                menuDisabled: true,
                                                style: 'background: #7A7A7A;',
                                                columns: [
                                                    {
                                                        text: 'USAVflow II Colombian NY Pass Through (AV)',
                                                        menuDisabled: true,
                                                        style: 'background: #7A88A2;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_WP_UK_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_BANCARD_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_AMEX_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                dataIndex: 'TOTAL_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_TOTAL_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'USAVflow II Salvadorian NY Pass Through (TA)',
                                                        menuDisabled: true,
                                                        style: 'background: #95A3B7;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_WP_UK_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_BANCARD_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_AMEX_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                dataIndex: 'TOTAL_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_TOTAL_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 110,
                                                        dataIndex: 'TOTAL_CO_AND_SA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            value = Ext.util.Format.number(data.TOTAL_TOTAL_CO_AND_SA, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Averages',
                                                menuDisabled: true,
                                                style: 'background: #5F7A6F;',
                                                columns: [
                                                    {
                                                        text: 'USAVflow II Colombian NY Pass Through (AV)',
                                                        menuDisabled: true,
                                                        style: 'background: #5F7A6F;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 100,
                                                                dataIndex: 'AVG_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    metaData.tdAttr = 'data-qtip="Dividor por : ' + '' + '"';
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_WP_UK_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'AVG_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_BANCARD_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 100,
                                                                dataIndex: 'AVG_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_AMEX_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 100,
                                                                dataIndex: 'AVG_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                dataIndex: 'AVG_TOTAL_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'USAVflow II Salvadorian NY Pass Through (TA)',
                                                        menuDisabled: true,
                                                        style: 'background: #92AC9E;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 100,
                                                                dataIndex: 'AVG_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_WP_UK_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'AVG_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_BANCARD_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 100,
                                                                dataIndex: 'AVG_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_AMEX_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 100,
                                                                dataIndex: 'AVG_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_DISCOVER_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                dataIndex: 'AVG_TOTAL_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 110,
                                                        dataIndex: 'AVG_TOTAL_CO_SA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_CO_SA, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Variation (%)',
                                                menuDisabled: true,
                                                style: 'background: #5F6A7A;',
                                                columns: [
                                                    {
                                                        text: 'USAVflow II Colombian NY Pass Through (AV)',
                                                        menuDisabled: true,
                                                        style: 'background: #5F6A7A;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 80,
                                                                dataIndex: 'VAR_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_WP_UK_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'VAR_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_BANCARD_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 80,
                                                                dataIndex: 'VAR_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_AMEX_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 80,
                                                                dataIndex: 'VAR_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_DISCOVER_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 80,
                                                                dataIndex: 'VAR_TOTAL_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'USAVflow II Salvadorian NY Pass Through (TA)',
                                                        menuDisabled: true,
                                                        style: 'background: #909EAD;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 80,
                                                                dataIndex: 'VAR_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_WP_UK_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'VAR_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_BANCARD_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 80,
                                                                dataIndex: 'VAR_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_AMEX_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 80,
                                                                dataIndex: 'VAR_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_DISCOVER_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 80,
                                                                dataIndex: 'VAR_TOTAL_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 90,
                                                        dataIndex: 'VAR_TOTAL_CO_SA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '%'+ '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            value = data.TOTAL_VAR_TOTAL_CO_SA;
                                                            return '<b>' + value + '%'+ '</b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataUsaflowWeekly',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: 150
                            },
                            bodyStyle: 'background: transparent',
                            border: false,
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataUsaflowWeekly',
                                    height: 575,
                                    width: 1762,
                                    hidden: false,
                                    columnLines: true,
                                    features: [{
                                            dock: 'bottom',
                                            ftype: 'summary'
                                        }
                                    ], 
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'References Dates',
                                                menuDisabled: true,
                                                style: 'background: #D18F77;',
                                                columns: [
                                                    {
                                                        text: 'From',
                                                        width: 80,
                                                        dataIndex: 'WEEK_START_DATE',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'To',
                                                        width: 80,
                                                        dataIndex: 'WEEK_END_DATE',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Week',
                                                        width: 85,
                                                        dataIndex: 'NUMBERWEAK',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amounts',
                                                menuDisabled: true,
                                                style: 'background: #7A7A7A;',
                                                columns: [
                                                    {
                                                        text: 'USAVflow II Colombian NY Pass Through (AV)',
                                                        menuDisabled: true,
                                                        style: 'background: #7A88A2;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_WP_UK_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_BANCARD_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_AMEX_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                dataIndex: 'TOTAL_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_TOTAL_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'USAVflow II Salvadorian NY Pass Through (TA)',
                                                        menuDisabled: true,
                                                        style: 'background: #95A3B7;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_WP_UK_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_BANCARD_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_AMEX_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 100,
                                                                dataIndex: 'AMOUNT_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                dataIndex: 'TOTAL_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_TOTAL_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 110,
                                                        dataIndex: 'TOTAL_CO_AND_SA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                            value = Ext.util.Format.number(data.TOTAL_TOTAL_CO_AND_SA, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Averages',
                                                menuDisabled: true,
                                                style: 'background: #5F7A6F;',
                                                columns: [
                                                    {
                                                        text: 'USAVflow II Colombian NY Pass Through (AV)',
                                                        menuDisabled: true,
                                                        style: 'background: #5F7A6F;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 100,
                                                                dataIndex: 'AVG_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    metaData.tdAttr = 'data-qtip="Dividor por : ' + '' + '"';
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_WP_UK_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'AVG_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_BANCARD_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 100,
                                                                dataIndex: 'AVG_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_AMEX_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 100,
                                                                dataIndex: 'AVG_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                dataIndex: 'AVG_TOTAL_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_CO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'USAVflow II Salvadorian NY Pass Through (TA)',
                                                        menuDisabled: true,
                                                        style: 'background: #92AC9E;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 100,
                                                                dataIndex: 'AVG_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_WP_UK_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'AVG_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_BANCARD_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 100,
                                                                dataIndex: 'AVG_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_AMEX_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 100,
                                                                dataIndex: 'AVG_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_DISCOVER_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                dataIndex: 'AVG_TOTAL_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 110,
                                                        dataIndex: 'AVG_TOTAL_CO_SA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                            value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_CO_SA, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Variation (%)',
                                                menuDisabled: true,
                                                style: 'background: #5F6A7A;',
                                                columns: [
                                                    {
                                                        text: 'USAVflow II Colombian NY Pass Through (AV)',
                                                        menuDisabled: true,
                                                        style: 'background: #5F6A7A;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 80,
                                                                dataIndex: 'VAR_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_WP_UK_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'VAR_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_BANCARD_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 80,
                                                                dataIndex: 'VAR_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_AMEX_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 80,
                                                                dataIndex: 'VAR_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_DISCOVER_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 80,
                                                                dataIndex: 'VAR_TOTAL_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_CO;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'USAVflow II Salvadorian NY Pass Through (TA)',
                                                        menuDisabled: true,
                                                        style: 'background: #909EAD;',
                                                        columns: [
                                                            {
                                                                text: 'WP UK',
                                                                width: 80,
                                                                dataIndex: 'VAR_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_WP_UK_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'WP Bancard',
                                                                width: 100,
                                                                dataIndex: 'VAR_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_BANCARD_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amex',
                                                                width: 80,
                                                                dataIndex: 'VAR_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_AMEX_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discover',
                                                                width: 80,
                                                                dataIndex: 'VAR_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_DISCOVER_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 80,
                                                                dataIndex: 'VAR_TOTAL_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_SA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 90,
                                                        dataIndex: 'VAR_TOTAL_CO_SA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '%'+ '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                            value = data.TOTAL_VAR_TOTAL_CO_SA;
                                                            return '<b>' + value + '%'+ '</b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataTaca',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: 150
                            },
                            bodyStyle: 'background: transparent',
                            border: false,
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTaca',
                                    height: 575,
                                    width: 840,
                                    hidden: false,
                                    columnLines: true,
                                    features: [{
                                            dock: 'bottom',
                                            ftype: 'summary'
                                        }
                                    ], 
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Holidays',
                                                menuDisabled: true,
                                                style: 'background: #A89C6C;',
                                                columns: [
                                                    {
                                                        text: 'BAC',
                                                        width: 110,
                                                        dataIndex: 'HOLIDAY_TACA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #A89C6C;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Day',
                                                width: 70,
                                                dataIndex: 'DAY_NAME',
                                                align: 'center',
                                                style: 'padding: 6px; background: #6C87A8;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Monthly',
                                                width: 80,
                                                dataIndex: 'MONTH_NAME',
                                                align: 'center',
                                                style: 'padding: 6px; background: #6C87A8;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'References Dates',
                                                menuDisabled: true,
                                                style: 'background: #D18F77;',
                                                columns: [
                                                    {
                                                        text: 'From',
                                                        width: 80,
                                                        dataIndex: 'DATE_FROM',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Year Week',
                                                        width: 85,
                                                        dataIndex: 'NUMBER_WEAK',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Eked',
                                                        width: 55,
                                                        dataIndex: 'DAY_NUMBER_EKED',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amounts',
                                                menuDisabled: true,
                                                style: 'background: #7A88A2;',
                                                columns: [
                                                    {
                                                        text: 'TacaFlow',
                                                        menuDisabled: true,
                                                        style: 'background: #7A88A2;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 120,
                                                                dataIndex: 'AMOUNT_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_TACA !== '-') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_TACA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 120,
                                                                hidden: true,
                                                                dataIndex: 'TOTAL_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_TOTAL_TACA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'TacaFlow (CRC)',
                                                        menuDisabled: true,
                                                        hidden: true,
                                                        style: 'background: #95A3B7;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 120,
                                                                dataIndex: 'AMOUNT_CRC',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #95A3B7;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_CRC, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 120,
                                                                hidden: true,
                                                                dataIndex: 'TOTAL_CRC',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_TOTAL_CRC, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 120,
                                                        hidden:true,
                                                        dataIndex: 'TOTAL_TACA_CRC',
                                                        align: 'center',
                                                        hidden: true,
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                            value = Ext.util.Format.number(data.TOTAL_TOTAL_TACA_CRC, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Averages',
                                                menuDisabled: true,
                                                style: 'background: #5F7A6F;',
                                                columns: [
                                                    {
                                                        text: 'TacaFlow',
                                                        menuDisabled: true,
                                                        style: 'background: #5F7A6F;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 120,
                                                                dataIndex: 'AVG_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    metaData.tdAttr = 'data-qtip="Dividor por : ' + '' + '"';
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TACA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 120,
                                                                dataIndex: 'AVG_TOTAL_TACA',
                                                                hidden: true,
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_TACA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'TacaFlow (CRC)',
                                                        menuDisabled: true,
                                                        hidden: true,
                                                        style: 'background: #92AC9E;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 120,
                                                                dataIndex: 'AVG_CRC',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #92AC9E;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_CRC, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 120,
                                                                dataIndex: 'AVG_TOTAL_CRC',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_CRC, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 120,
                                                        hidden: true,
                                                        dataIndex: 'AVG_TOTAL_TACA_CRC',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                            value = Ext.util.Format.number(data.TOTAL_AVG_TOTAL_TACA_CRC, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Variation (%)',
                                                menuDisabled: true,
                                                style: 'background: #5F6A7A;',
                                                columns: [
                                                    {
                                                        text: 'TacaFlow',
                                                        menuDisabled: true,
                                                        style: 'background: #5F6A7A;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 120,
                                                                dataIndex: 'VAR_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TACA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 120,
                                                                hidden: true,
                                                                dataIndex: 'VAR_TOTAL_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TACA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'TacaFlow (CRC)',
                                                        menuDisabled: true,
                                                        hidden: true,
                                                        style: 'background: #909EAD;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 120,
                                                                dataIndex: 'VAR_CRC',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #909EAD;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_CRC;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 120,
                                                                dataIndex: 'VAR_TOTAL_CRC',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_CRC;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Grant Total',
                                                        width: 120,
                                                        hidden: true,
                                                        dataIndex: 'VAR_TOTAL_TACA_CRC',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #C45C4D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '%'+ '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            value = data.TOTAL_VAR_TOTAL_TACA_CRC;
                                                            return '<b>' + value + '%'+ '</b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataTacaWeekly',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: 150
                            },
                            bodyStyle: 'background: transparent',
                            border: false,
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTacaWeekly',
                                    height: 575,
                                    width: 637,
                                    hidden: false,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ], 
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'References Dates',
                                                menuDisabled: true,
                                                style: 'background: #D18F77;',
                                                columns: [
                                                    {
                                                        text: 'From',
                                                        width: 80,
                                                        dataIndex: 'WEEK_START_DATE',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'To',
                                                        width: 80,
                                                        dataIndex: 'WEEK_END_DATE',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Week',
                                                        width: 85,
                                                        dataIndex: 'NUMBERWEAK',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #D18F77;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amounts',
                                                menuDisabled: true,
                                                style: 'background: #7A88A2;',
                                                columns: [
                                                    {
                                                        text: 'TacaFlow',
                                                        menuDisabled: true,
                                                        style: 'background: #7A88A2;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 130,
                                                                dataIndex: 'AMOUNT_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A88A2;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTacaWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_TACA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                hidden: true,
                                                                dataIndex: 'AMOUNT_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTacaWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AMOUNT_TACA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Averages',
                                                menuDisabled: true,
                                                style: 'background: #5F7A6F;',
                                                columns: [
                                                    {
                                                        text: 'TacaFlow',
                                                        menuDisabled: true,
                                                        style: 'background: #5F7A6F;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 130,
                                                                dataIndex: 'AVG_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F7A6F;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    metaData.tdAttr = 'data-qtip="Dividor por : ' + '' + '"';
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTacaWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TACA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 100,
                                                                hidden: true,
                                                                dataIndex: 'AVG_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTacaWeekly').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_AVG_TACA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Variation (%)',
                                                menuDisabled: true,
                                                style: 'background: #5F6A7A;',
                                                columns: [
                                                    {
                                                        text: 'TacaFlow',
                                                        menuDisabled: true,
                                                        style: 'background: #5F6A7A;',
                                                        columns: [
                                                            {
                                                                text: 'BAC',
                                                                width: 130,
                                                                dataIndex: 'VAR_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #5F6A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTacaWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TACA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 80,
                                                                hidden: true,
                                                                dataIndex: 'VAR_TACA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #C45C4D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTacaWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TACA;
                                                                    return '<b>' + value + '%'+ '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            hidden: false,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            hidden: true,
                            width: 550, // Aumenté el ancho para acomodar el texto más grande
                            height: 35, // Aumenté el alto para que el texto no se vea apretado
                            margin: '10 0 0 0', // Margen superior aumentado
                            defaults: {
                                border: false
                            },
                            style: 'border-radius: 10px;',
                            items: [
                                {
                                    bodyStyle: 'background: #6C87A8; border-radius: 10px;', // Estilo mejorado
                                    xtype: 'panel',
                                    width: '100%',
                                    height: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center',
                                        align: 'middle' // Alineación vertical al centro
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        style: 'color: white; font-weight: bold; margin-top: 7px; font-size: 14px;' // Tamaño de letra aumentado a 14px
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 60 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 60 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {
                                            text: 'OF',
                                            width: 50 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {xtype: 'tbspacer', width: 60}, // Aumenté el ancho del espaciador
                                        {
                                            text: 'Total Found',
                                            width: 90 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 60 // Aumenté ligeramente el ancho
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
