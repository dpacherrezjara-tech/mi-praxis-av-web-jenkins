Ext.create('Ext.Component', {
    renderTo: Ext.getBody(),
    html: '<style type="text/css">' +
            '.button-off {' +
            '  background-color: #f44336;' + // Red color for OFF
            '  color: white;' +
            '  border-radius: 50%;' +
            '  border: none;' +
            '  font-size: 12px;' +
            '  cursor: pointer;' +
            '  text-align: center;' +
            '  line-height: 50px;' + // Ensure text is vertically centered
            '}' +
            '.button-on {' +
            '  background-color: #4CAF50;' + // Green color for ON
            '  color: white;' +
            '  border-radius: 50%;' +
            '  border: none;' +
            '  font-size: 12px;' +
            '  cursor: pointer;' +
            '  text-align: center;' +
            '  line-height: 50px;' + // Ensure text is vertically centered
            '}' +
            '</style>'
});

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
                    height: 690,
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_WP_UK_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_BANCARD_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_AMEX_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_DISCOVER_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_WP_UK_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_BANCARD_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_AMEX_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_DISCOVER_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                            return '<b>' + value + '%' + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            value = data.TOTAL_VAR_TOTAL_CO_SA;
                                                            return '<b>' + value + '%' + '</b>';
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
                            id: prototype.id + '-panelUSAFLOWDiaryDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '0 10 0 10',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                border: false,
                                width: 1762,
                            },
                            border: false,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    padding: '10 10 10 10',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Data Table',
                                            margin: '0 5 0 0',
                                            width: 60,
                                            id: prototype.id + '-COL'
                                        },
                                        {
                                            xtype: 'component',
                                            id: prototype.id + '-btnToggleSwitch',
                                            margin: '0 5 0 0',
                                            html: `<style>
                                                .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                .toggle-input{opacity:0;width:0;height:0;}
                                                .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                            </style>
                                            <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`,
                                            tooltip: 'Export to Report',
                                            listeners: {
                                                change: 'chgBash',
                                                click: 'chgBash'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Chart View',
                                            margin: '0 0 0 5',
                                            width: 60,
                                            id: prototype.id + '-EXT'
                                        },
                                    ]
                                },
                                {
    xtype: 'panel',
    id: prototype.id + '-panelDashboard',
    hidden: true,
    height: 575, // Puedes ajustar este valor
    scrollable: 'y',
    margin: '0 0 5 0',
    border: false,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'start'
    },
    bodyStyle: 'background-color: transparent;',
    items: [
        // --------- COLOMBIA ---------
        {
            xtype: 'panel',
            width: 1560,
            border: false,
            layout: 'vbox',
            bodyStyle: 'background-color: #E3EAEF;',
            padding: 10,
            items: [
                {
                    xtype: 'component',
                    html: '<div style="text-align:center; font-size: 16px; font-weight: bold;">USAVflow II Colombian NY Pass Through (AV)</div>',
                    margin: '0 0 10 0'
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: 1560,
                    border: false,
                    items: [
                        {
                            xtype: 'cartesian',
                            id: prototype.id + '-chartColombia-WP',
                            width: 600,
                            height: 400,
                            margin: '0 20 0 0',
                            background: '#E0F8F7',
                            legend: { docked: 'bottom' },
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'left',
                                    fields: ['statement', 'settlement', 'sale'],
                                    grid: true,
                                    title: '',
                                    renderer: function (obj, value) {
                                        return Ext.util.Format.number(value, '0.0');
                                    }
                                },
                                {
                                    type: 'category3d',
                                    position: 'bottom',
                                    fields: ['processor'],
                                    title: {
                                        text: 'Processor',
                                        translationX: -30
                                    }
                                }
                            ],
                            series: [
                                {
                                    type: 'bar3d',
                                    stacked: false,
                                    title: ['Statement', 'Settlement', 'Sale'],
                                    xField: 'processor',
                                    yField: ['statement', 'settlement', 'sale'],
                                    highlight: true,
                                    style: {
                                        inGroupGapWidth: -7,
                                        minGapWidth: 2,
                                        maxBarWidth: 300
                                    },
                                    subStyle: {
                                        fill: ['#ff7f0e', '#1f77b4', '#2ca02c']
                                    },
                                    tooltip: {
                                        trackMouse: true,
                                        height: 28,
                                        renderer: function (toolTip, record, ctx) {
                                            var label = ctx.field === 'sale'
                                                ? 'Sale'
                                                : (ctx.field === 'settlement'
                                                    ? 'Settlement'
                                                    : 'Statement');
                                            toolTip.setHtml(label + ' : <b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'cartesian',
                            id: prototype.id + '-chartColombia-Others',
                            width: 920,
                            height: 400,
                            background: '#E0F8F7',
                            legend: { docked: 'bottom' },
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'left',
                                    fields: ['statement', 'settlement', 'sale'],
                                    grid: true,
                                    title: '',
                                    renderer: function (obj, value) {
                                        return Ext.util.Format.number(value, '0.0');
                                    }
                                },
                                {
                                    type: 'category3d',
                                    position: 'bottom',
                                    fields: ['processor'],
                                    title: {
                                        text: 'Processor',
                                        translationX: -30
                                    }
                                }
                            ],
                            series: [
                                {
                                    type: 'bar3d',
                                    stacked: false,
                                    title: ['Statement', 'Settlement', 'Sale'],
                                    xField: 'processor',
                                    yField: ['statement', 'settlement', 'sale'],
                                    highlight: true,
                                    style: {
                                        inGroupGapWidth: -7,
                                        minGapWidth: 2,
                                        maxBarWidth: 500
                                    },
                                    subStyle: {
                                        fill: ['#ff7f0e', '#1f77b4', '#2ca02c']
                                    },
                                    tooltip: {
                                        trackMouse: true,
                                        height: 28,
                                        renderer: function (toolTip, record, ctx) {
                                            var label = ctx.field === 'sale'
                                                ? 'Sale'
                                                : (ctx.field === 'settlement'
                                                    ? 'Settlement'
                                                    : 'Statement');
                                            toolTip.setHtml(label + ' : <b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        // --------- SALVADOR ---------
        {
            xtype: 'panel',
            width: 1560,
            border: false,
            layout: 'vbox',
            bodyStyle: 'background-color: #E3EAEF;',
            padding: 10,
            items: [
                {
                    xtype: 'component',
                    html: '<div style="text-align:center; font-size: 16px; font-weight: bold;">USAVflow II Salvadorian NY Pass Through (TA)</div>',
                    margin: '20 0 10 0'
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: 1560,
                    border: false,
                    items: [
                        {
                            xtype: 'cartesian',
                            id: prototype.id + '-chartSalvador-WP',
                            width: 600,
                            height: 400,
                            margin: '0 20 0 0',
                            background: '#E0F8F7',
                            legend: { docked: 'bottom' },
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'left',
                                    fields: ['statement', 'settlement', 'sale'],
                                    grid: true,
                                    title: '',
                                    renderer: function (obj, value) {
                                        return Ext.util.Format.number(value, '0.0');
                                    }
                                },
                                {
                                    type: 'category3d',
                                    position: 'bottom',
                                    fields: ['processor'],
                                    title: {
                                        text: 'Processor',
                                        translationX: -30
                                    }
                                }
                            ],
                            series: [
                                {
                                    type: 'bar3d',
                                    stacked: false,
                                    title: ['Statement', 'Settlement', 'Sale'],
                                    xField: 'processor',
                                    yField: ['statement', 'settlement', 'sale'],
                                    highlight: true,
                                    style: {
                                        inGroupGapWidth: -7,
                                        minGapWidth: 2,
                                        maxBarWidth: 300
                                    },
                                    subStyle: {
                                        fill: ['#ff7f0e', '#1f77b4', '#2ca02c']
                                    },
                                    tooltip: {
                                        trackMouse: true,
                                        height: 28,
                                        renderer: function (toolTip, record, ctx) {
                                            var label = ctx.field === 'sale'
                                                ? 'Sale'
                                                : (ctx.field === 'settlement'
                                                    ? 'Settlement'
                                                    : 'Statement');
                                            toolTip.setHtml(label + ' : <b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'cartesian',
                            id: prototype.id + '-chartSalvador-Others',
                            width: 920,
                            height: 400,
                            background: '#E0F8F7',
                            legend: { docked: 'bottom' },
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'left',
                                    fields: ['statement', 'settlement', 'sale'],
                                    grid: true,
                                    title: '',
                                    renderer: function (obj, value) {
                                        return Ext.util.Format.number(value, '0.0');
                                    }
                                },
                                {
                                    type: 'category3d',
                                    position: 'bottom',
                                    fields: ['processor'],
                                    title: {
                                        text: 'Processor',
                                        translationX: -30
                                    }
                                }
                            ],
                            series: [
                                {
                                    type: 'bar3d',
                                    stacked: false,
                                    title: ['Statement', 'Settlement', 'Sale'],
                                    xField: 'processor',
                                    yField: ['statement', 'settlement', 'sale'],
                                    highlight: true,
                                    style: {
                                        inGroupGapWidth: -7,
                                        minGapWidth: 2,
                                        maxBarWidth: 500
                                    },
                                    subStyle: {
                                        fill: ['#ff7f0e', '#1f77b4', '#2ca02c']
                                    },
                                    tooltip: {
                                        trackMouse: true,
                                        height: 28,
                                        renderer: function (toolTip, record, ctx) {
                                            var label = ctx.field === 'sale'
                                                ? 'Sale'
                                                : (ctx.field === 'settlement'
                                                    ? 'Settlement'
                                                    : 'Statement');
                                            toolTip.setHtml(label + ' : <b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridUSAFLOWDiaryDetail',
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
                                                text: 'From',
                                                width: 85,
                                                dataIndex: 'DATE_FROM',
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
                                                text: 'Curr',
                                                width: 55,
                                                dataIndex: 'CURRENCY',
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
                                                text: 'USAVflow II Colombian NY Pass Through (AV) - Amounts',
                                                menuDisabled: true,
                                                style: 'background: #C45C4D;',
                                                columns: [
                                                    {
                                                        text: 'WP UK',
                                                        menuDisabled: true,
                                                        style: 'background: #6C87A8;',
                                                        columns: [
                                                            {
                                                                text: 'Statement',
                                                                width: 90,
                                                                dataIndex: 'STATEMENT_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_STATEMENT_WP_UK_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission',
                                                                width: 100,
                                                                dataIndex: 'COMISION_WP_UK_CO_SUM',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION_WP_UK_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Others',
                                                                width: 80,
                                                                dataIndex: 'OTHERS_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_OTHERS_WP_UK_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                width: 90,
                                                                dataIndex: 'SETTLEMENT_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SETTLEMENT_WP_UK_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                width: 80,
                                                                dataIndex: 'SALE_WP_UK_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SALE_WP_UK_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rate',
                                                                width: 50,
                                                                dataIndex: 'VAR_WP_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                                            value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'WP Bancard',
                                                        menuDisabled: true,
                                                        style: 'background: #7D9F7D;',
                                                        columns: [
                                                            {
                                                                text: 'Statement',
                                                                width: 90,
                                                                dataIndex: 'STATEMENT_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_STATEMENT_BANCARD_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission',
                                                                width: 100,
                                                                dataIndex: 'COMISION_BANCARD_CO_SUM',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION_BANCARD_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Others',
                                                                width: 80,
                                                                dataIndex: 'OTHERS_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_OTHERS_BANCARD_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                width: 90,
                                                                dataIndex: 'SETTLEMENT_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SETTLEMENT_BANCARD_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                width: 80,
                                                                dataIndex: 'SALE_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SALE_BANCARD_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rate',
                                                                width: 50,
                                                                dataIndex: 'VAR_BANCARD_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                                            value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Amex',
                                                        menuDisabled: true,
                                                        style: 'background: #D18F77;',
                                                        columns: [
                                                            {
                                                                text: 'Statement',
                                                                width: 90,
                                                                dataIndex: 'STATEMENT_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_STATEMENT_AMEX_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission',
                                                                width: 100,
                                                                dataIndex: 'COMISION_AMEX_CO_SUM',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION_AMEX_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Others',
                                                                width: 80,
                                                                dataIndex: 'OTHERS_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_OTHERS_AMEX_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                width: 90,
                                                                dataIndex: 'SETTLEMENT_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SETTLEMENT_AMEX_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                width: 80,
                                                                dataIndex: 'SALE_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SALE_AMEX_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rate',
                                                                width: 50,
                                                                dataIndex: 'VAR_AMEX_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                                            value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Discover',
                                                        menuDisabled: true,
                                                        style: 'background: #7A7A7A;',
                                                        columns: [
                                                            {
                                                                text: 'Statement',
                                                                width: 90,
                                                                dataIndex: 'STATEMENT_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_STATEMENT_DISCOVER_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission',
                                                                width: 100,
                                                                dataIndex: 'COMISION_DISCOVER_CO_SUM',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION_DISCOVER_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Others',
                                                                width: 80,
                                                                dataIndex: 'OTHERS_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_OTHERS_DISCOVER_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                width: 90,
                                                                dataIndex: 'SETTLEMENT_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SETTLEMENT_DISCOVER_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                width: 80,
                                                                dataIndex: 'SALE_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SALE_DISCOVER_CO, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rate',
                                                                width: 50,
                                                                dataIndex: 'VAR_DISCOVER_CO',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                                            value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'USAVflow II Salvadorian NY Pass Through (TA) - Amounts',
                                                menuDisabled: true,
                                                style: 'background: #3A1F1C;',
                                                columns: [
                                                    {
                                                        text: 'WP UK',
                                                        menuDisabled: true,
                                                        style: 'background: #6C87A8;',
                                                        columns: [
                                                            {
                                                                text: 'Statement',
                                                                width: 90,
                                                                dataIndex: 'STATEMENT_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_STATEMENT_WP_UK_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission',
                                                                width: 100,
                                                                dataIndex: 'COMISION_WP_UK_SA_SUM',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION_WP_UK_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Others',
                                                                width: 80,
                                                                dataIndex: 'OTHERS_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_OTHERS_WP_UK_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                width: 90,
                                                                dataIndex: 'SETTLEMENT_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SETTLEMENT_WP_UK_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                width: 80,
                                                                dataIndex: 'SALE_WP_UK_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SALE_WP_UK_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rate',
                                                                width: 50,
                                                                dataIndex: 'VAR_WP_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                                            value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'WP Bancard',
                                                        menuDisabled: true,
                                                        style: 'background: #7D9F7D;',
                                                        columns: [
                                                            {
                                                                text: 'Statement',
                                                                width: 90,
                                                                dataIndex: 'STATEMENT_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_STATEMENT_BANCARD_SA, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission',
                                                                width: 100,
                                                                dataIndex: 'COMISION_BANCARD_SA_SUM',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION_BANCARD_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Others',
                                                                width: 80,
                                                                dataIndex: 'OTHERS_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_OTHERS_BANCARD_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                width: 90,
                                                                dataIndex: 'SETTLEMENT_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SETTLEMENT_BANCARD_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                width: 80,
                                                                dataIndex: 'SALE_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SALE_BANCARD_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rate',
                                                                width: 50,
                                                                dataIndex: 'VAR_BANCARD_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                                            value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Amex',
                                                        menuDisabled: true,
                                                        style: 'background: #D18F77;',
                                                        columns: [
                                                            {
                                                                text: 'Statement',
                                                                width: 90,
                                                                dataIndex: 'STATEMENT_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_STATEMENT_AMEX_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission',
                                                                width: 100,
                                                                dataIndex: 'COMISION_AMEX_SA_SUM',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION_AMEX_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Others',
                                                                width: 80,
                                                                dataIndex: 'OTHERS_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_OTHERS_AMEX_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                width: 90,
                                                                dataIndex: 'SETTLEMENT_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SETTLEMENT_AMEX_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                width: 80,
                                                                dataIndex: 'SALE_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SALE_AMEX_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rate',
                                                                width: 50,
                                                                dataIndex: 'VAR_AMEX_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #D18F77;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                                            value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Discover',
                                                        menuDisabled: true,
                                                        style: 'background: #7A7A7A;',
                                                        columns: [
                                                            {
                                                                text: 'Statement',
                                                                width: 90,
                                                                dataIndex: 'STATEMENT_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_STATEMENT_DISCOVER_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission',
                                                                width: 100,
                                                                dataIndex: 'COMISION_DISCOVER_SA_SUM',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION_DISCOVER_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Others',
                                                                width: 80,
                                                                dataIndex: 'OTHERS_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_UK.trim() !== '-' && record.data.HOLIDAY_WP_UK.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }

                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridUSAFLOWDiaryDetail').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_OTHERS_DISCOVER_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                width: 90,
                                                                dataIndex: 'SETTLEMENT_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_WP_BANCARD.trim() !== '-' && record.data.HOLIDAY_WP_BANCARD.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SETTLEMENT_DISCOVER_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                width: 80,
                                                                dataIndex: 'SALE_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_AMEX.trim() !== '-' && record.data.HOLIDAY_AMEX.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = Ext.util.Format.number(data.TOTAL_SALE_DISCOVER_SA, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rate',
                                                                width: 50,
                                                                dataIndex: 'VAR_DISCOVER_SA',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7A7A7A;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.HOLIDAY_DISCOVER.trim() !== '-' && record.data.HOLIDAY_DISCOVER.trim() !== '') {
                                                                        metaData.style = "text-align:right;background:yellow";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                                            value = Ext.util.Format.number(data.TOTAL_AMOUNT_DISCOVER_CO, '0,000.00');
                                                                    return '<b>' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_WP_UK_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_BANCARD_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_AMEX_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_DISCOVER_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_CO;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_WP_UK_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_BANCARD_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_AMEX_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_DISCOVER_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_SA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                            return '<b>' + value + '%' + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataUsaflowWeekly').getStore().getData().items[0].data;
                                                            value = data.TOTAL_VAR_TOTAL_CO_SA;
                                                            return '<b>' + value + '%' + '</b>';
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
                                                        hidden: true,
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTaca').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TACA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TACA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_CRC;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TOTAL_CRC;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                            return '<b>' + value + '%' + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            value = data.TOTAL_VAR_TOTAL_TACA_CRC;
                                                            return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTacaWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TACA;
                                                                    return '<b>' + value + '%' + '</b>';
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
                                                                    return '<b>' + value + '%' + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTacaWeekly').getStore().getData().items[0].data;
                                                                    value = data.TOTAL_VAR_TACA;
                                                                    return '<b>' + value + '%' + '</b>';
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
