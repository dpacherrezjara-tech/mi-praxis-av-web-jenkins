Ext.define('Ext.Praxis.view.payments.TemplateReconciliaCreditForm.Info', {
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
                border: false
            },
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1850,
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'start'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {type: 'hbox', align: 'start'},
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridBandoc',
                                            height: 595,
                                            width: 680,
                                            columnLines: true,
                                            margin: '0 20 20 20',
                                            viewConfig: {
                                                enableTextSelection: true
                                            },
                                            features: [{
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                store: null,
                                                displayInfo: true,
                                                displayMsg: 'Page {0} - {1} of {2}',
                                                emptyMsg: 'No records found'
                                            },
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'Statement',
                                                        menuDisabled: true,
                                                        style: 'background: #6C87A8;',
                                                        columns: [
                                                            {
                                                                xtype: 'checkcolumn',
                                                                text: 'Select',
                                                                width: 60,
                                                                dataIndex: 'checkActive',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                menuDisabled: true,
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                },
                                                                listeners: {
                                                                    checkchange: 'updateGridBandocWMH'
                                                                }
                                                            },
                                                            {
                                                                text: 'Bandoc',
                                                                width: 90,
                                                                dataIndex: 'BANDOC',
                                                                align: 'center',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Doc',
                                                                width: 55,
                                                                dataIndex: 'TDOC',
                                                                align: 'center',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                renderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";

                                                                    return value === 'D' || value === 'd' ? 'Debits' :
                                                                            value === 'S' || value === 's' ? 'Sale' :
                                                                            'No identificado';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Status',
                                                                width: 120,
                                                                dataIndex: 'STVAL',
                                                                align: 'center',
                                                                hidden: true,
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value === "3") {
                                                                        metaData.style = 'background:#EF5350; color:white;';
                                                                        return '<span style="font-weight:bold;">Pending</span>';
                                                                    } else if (value === "1") {
                                                                        metaData.style = 'background:#4CAF50; color:white;';
                                                                        return '<span style="font-weight:bold;">Match</span>';
                                                                    } else if (value === "5") {
                                                                        metaData.style = 'background:#4CAF50; color:white;';
                                                                        return '<span style="font-weight:bold;">Match Manual</span>';
                                                                    } else {
                                                                        metaData.style = 'background:#B0B0B0; color:#2B2B2B;';
                                                                        return '<span style="font-weight:bold;">Unknown</span>';
                                                                    }
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Country',
                                                                width: 90,
                                                                dataIndex: 'SCOUNTRY',
                                                                menuDisabled: true,
                                                                hidden: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Val Date',
                                                                width: 80,
                                                                dataIndex: 'VALDATE',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Date',
                                                                width: 80,
                                                                menuDisabled: true,
                                                                dataIndex: 'ADATE',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Account',
                                                                menuDisabled: true,
                                                                width: 70,
                                                                dataIndex: 'ACCOUNT',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Society',
                                                                width: 70,
                                                                menuDisabled: true,
                                                                dataIndex: 'SOCIETY',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Currency',
                                                                width: 70,
                                                                menuDisabled: true,
                                                                dataIndex: 'SCURRENCY',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Neto',
                                                                menuDisabled: true,
                                                                width: 90,
                                                                dataIndex: 'NETO',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var tam = Ext.getCmp(prototype.id + '-gridBandoc').getStore().getData().items.length;
                                                                    var data = Ext.getCmp(prototype.id + '-gridBandoc').getStore().getData().items[tam - 1].data;
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            defaults: {
                                                sortable: true,
                                                menuDisabled: false,
                                                align: 'center'
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataVentas',
                                            width: 860,
                                            hidden: true,
                                            height: 595,
                                            margin: '0 20 20 0',
                                            columnLines: true,
                                            features: [{
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                store: null,
                                                displayInfo: true,
                                                displayMsg: 'Page {0} - {1} of {2}',
                                                emptyMsg: 'No records found'
                                            },
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'Sales',
                                                        style: 'background: #6C87A8;border-color:white',
                                                        columns: [
                                                            {
                                                                xtype: 'checkcolumn',
                                                                text: 'Sel',
                                                                width: 50,
                                                                dataIndex: 'checkActive',
                                                                align: 'center',
                                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                listeners: {
                                                                    checkchange: 'updateGridSaleWMH'
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rn',
                                                                width: 40,
                                                                menuDisabled: true,
                                                                dataIndex: 'RN',
                                                                align: 'center',
                                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Details',
                                                                style: 'background: #6C87A8;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Ticket',
                                                                        width: 110,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'TKT',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Agent',
                                                                        width: 80,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SAGENT',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Country',
                                                                        width: 65,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCOUNTRY',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author',
                                                                        width: 70,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SAUTHOC',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            //                                                value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Card Nu',
                                                                        width: 70,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCARDN',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Sale Date',
                                                                        width: 80,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SDATE',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Local',
                                                                style: 'background: #6C87A8;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Currency',
                                                                        width: 70,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCURREVEN',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 70,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SVFOP',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataVentas').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataVentas').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_SVFOP, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Converted',
                                                                style: 'background: #6C87A8;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Currency',
                                                                        width: 70,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCURREVENCONVERT',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 70,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SVFOPCON',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataVentas').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataVentas').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_SVFOP_CONVERTED, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                defaults: {
                                                    sortable: true,
                                                    menuDisabled: false,
                                                    align: 'center'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCabecera',
                                            width: 860,
                                            height: 595,
                                            columnLines: true,
                                            margin: '0 20 20 0',
                                            viewConfig: {
                                                enableTextSelection: true
                                            },
                                            features: [{
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                store: null,
                                                displayInfo: true,
                                                displayMsg: 'Page {0} - {1} of {2}',
                                                emptyMsg: 'No records found'
                                            },
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'Header',
                                                        menuDisabled: true,
                                                        style: 'background: #6C87A8;',
                                                        columns: [
                                                            {
                                                                xtype: 'checkcolumn',
                                                                text: 'Select',
                                                                width: 60,
                                                                dataIndex: 'checkActive',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                menuDisabled: true,
                                                                listeners: {
                                                                    checkchange: 'updateTotalsHeaderWMH'
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Fliquidaci',
                                                                width: 90,
                                                                dataIndex: 'FLIQUIDACI',
                                                                align: 'center',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Merchand',
                                                                width: 90,
                                                                dataIndex: 'MERCHAND',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: ' background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Liquidacio',
                                                                width: 90,
                                                                menuDisabled: true,
                                                                dataIndex: 'LIQUIDACIO',
                                                                align: 'center',
                                                                style: ' background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Moneda',
                                                                width: 110,
                                                                menuDisabled: true,
                                                                dataIndex: 'MONEDA',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                menuDisabled: true,
                                                                width: 110,
                                                                dataIndex: 'TOTAL',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var tam = Ext.getCmp(prototype.id + '-gridCabecera').getStore().getData().items.length;
                                                                    var data = Ext.getCmp(prototype.id + '-gridCabecera').getStore().getData().items[tam - 1].data;
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    value = Ext.util.Format.number(data.SUM_TOTAL, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Comision',
                                                                menuDisabled: true,
                                                                width: 110,
                                                                dataIndex: 'COMISION',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var tam = Ext.getCmp(prototype.id + '-gridCabecera').getStore().getData().items.length;
                                                                    var data = Ext.getCmp(prototype.id + '-gridCabecera').getStore().getData().items[tam - 1].data;
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    value = Ext.util.Format.number(data.SUM_COMISION, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Neto',
                                                                menuDisabled: true,
                                                                width: 110,
                                                                dataIndex: 'NETO',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var tam = Ext.getCmp(prototype.id + '-gridCabecera').getStore().getData().items.length;
                                                                    var data = Ext.getCmp(prototype.id + '-gridCabecera').getStore().getData().items[tam - 1].data;
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    value = Ext.util.Format.number(data.SUM_NETO, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Moneda Pago',
                                                                width: 110,
                                                                menuDisabled: true,
                                                                dataIndex: 'MONEDAPAGO',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Importe Pag',
                                                                menuDisabled: true,
                                                                width: 110,
                                                                dataIndex: 'IMPORTEPAG',
                                                                align: 'center',
                                                                style: 'background: #6C87A8 ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var tam = Ext.getCmp(prototype.id + '-gridCabecera').getStore().getData().items.length;
                                                                    var data = Ext.getCmp(prototype.id + '-gridCabecera').getStore().getData().items[tam - 1].data;
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    value = Ext.util.Format.number(data.SUM_IMPORTEPAG, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            defaults: {
                                                sortable: true,
                                                menuDisabled: false,
                                                align: 'center'
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            width: 250,
                                            height: 600,
                                            border: false,
                                            margin: '4 8 0 0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'start'
                                            },
                                            id: 'panelResumenTotalesSales',
                                            bodyPadding: 5,
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    style: 'background:#E6ECF5; border:1px solid #99A9C4; padding:8px; border-radius:4px;',
                                                    width: 235,
                                                    defaults: {
                                                        margin: '4 0 4 0',
                                                        labelAlign: 'left',
                                                        labelStyle: 'font-size:12px; font-weight:bold;',
                                                        fieldStyle: 'font-size:12px; text-align:center;'
                                                    },
                                                    items: [
                                                        // Panel Total Depósitos
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Deposito',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalDeposito',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Total Ventas
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Total',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotal',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Total Comision
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Comision',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalComision',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Total Descuentos
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Descuentos',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalDescuentos',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },

                                                        // Panel Total Ventas
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Ventas',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtVentas',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Cálculo 
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            style: 'border-top:3px solid #6C87A8; padding-top:4px;',
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Calculo',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalCalculo',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    margin: '10 0 0 0',
                                                    style: 'background:#E6ECF5; border:1px solid #99A9C4; padding:8px; border-radius:4px;',
                                                    width: 235,
                                                    defaults: {
                                                        margin: '4 0 4 0',
                                                        labelAlign: 'left',
                                                        labelStyle: 'font-size:12px; font-weight:bold;',
                                                        fieldStyle: 'font-size:12px; text-align:center;'
                                                    },
                                                    items: [
                                                        // Panel Porcentaje  Permitido
                                                        {
                                                            xtype: 'panel',
                                                            itemId: prototype.id + '-panelPercentReview',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Porcentaje',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtPercentVenta',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Diferencia
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Diferencia',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalDiff',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Botón Execute alineado a la derecha
                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'hbox',
                                                                pack: 'end'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: prototype.id + '-chkMarkForced',
                                                                    fieldLabel: '<span>Forced</span>',
                                                                    labelAlign: 'left',
                                                                    labelWidth: 40,
                                                                    checked: false,
                                                                    margin: '0 10px 0 0',
                                                                    listeners: {
                                                                        afterrender: function (cmp) {
                                                                            Ext.tip.QuickTipManager.register({
                                                                                target: cmp.getEl(),
                                                                                title: 'Forzado',
                                                                                text: 'Al marcar esta opción, el proceso se ejecutará en modo forzado ignorando algunas validaciones.',
                                                                                width: 300,
                                                                                dismissDelay: 5000
                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-btnExecute',
                                                                    width: 110,
                                                                    html: '<span style="color:white;font-size:12px;font-weight:bold">Execute</span>',
                                                                    style: 'background:#6C87A8; border-radius:4px; padding:4px 8px;',
                                                                    border: false
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
                                    xtype: 'container',
                                    layout: {type: 'hbox', align: 'start'},
                                    items: [
                                        {
                                            xtype: 'container',
                                            id: prototype.id + '-panelDescuento',
                                            layout: {type: 'hbox', align: 'start'},
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataSettlement',
                                                    width: 990,
                                                    height: 590,
                                                    margin: '20px 5px 0 20',
                                                    columnLines: true,
                                                    features: [{
                                                            dock: 'bottom',
                                                            ftype: 'summary'
                                                        }
                                                    ],
                                                    bbar: {
                                                        xtype: 'pagingtoolbar',
                                                        store: null,
                                                        displayInfo: true,
                                                        displayMsg: 'Page {0} - {1} of {2}',
                                                        emptyMsg: 'No records found'
                                                    },
                                                    columns: {
                                                        items: [
                                                            {
                                                                text: 'Settlements',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8;',
                                                                columns: [
                                                                    {
                                                                        xtype: 'checkcolumn',
                                                                        text: 'Sel',
                                                                        width: 45,
                                                                        dataIndex: 'checkActive',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        },
                                                                        listeners: {
                                                                            checkchange: 'updateTotalsOnCheckWMH'
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rn',
                                                                        width: 45,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'RN',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amounts A',
                                                                        menuDisabled: true,
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        columns: [
                                                                            {
                                                                                text: 'Curr',
                                                                                width: 50,
                                                                                dataIndex: 'SCURRENCY',
                                                                                menuDisabled: true,
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    return '';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Total',
                                                                                width: 80,
                                                                                dataIndex: 'TOTAL',
                                                                                menuDisabled: true,
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var tam = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items.length;
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[tam - 1].data;
                                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                                    value = Ext.util.Format.number(data.TOTAL_LIQ, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Comision',
                                                                                width: 85,
                                                                                dataIndex: 'COMISION',
                                                                                menuDisabled: true,
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var tam = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items.length;
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[tam - 1].data;
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    value = Ext.util.Format.number(data.TOTAL_COMISION, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Comistota',
                                                                                width: 84,
                                                                                menuDisabled: true,
                                                                                dataIndex: 'COMISTOTA',
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var tam = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items.length;
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[tam - 1].data;
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    value = Ext.util.Format.number(data.TOTAL_COMISTOTA, '0,000.00');
                                                                                    return '<b>' + value + '</b>';

                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Neto',
                                                                                width: 90,
                                                                                dataIndex: 'NETO',
                                                                                menuDisabled: true,
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var tam = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items.length;
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[tam - 1].data;
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Amounts B',
                                                                        menuDisabled: true,
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        columns: [
                                                                            {
                                                                                text: 'Curr',
                                                                                width: 50,
                                                                                dataIndex: 'MONEDAPAGO',
                                                                                menuDisabled: true,
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    return '';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Im. Pag',
                                                                                width: 70,
                                                                                dataIndex: 'IMPORTEPAG',
                                                                                menuDisabled: true,
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var tam = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items.length;
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[tam - 1].data;
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    value = Ext.util.Format.number(data.TOTAL_IMPORTEPAG, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Status',
                                                                        width: 65,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'STVAL',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (value === "3") {
                                                                                metaData.style = 'background: #EF5350; color: white;'; // Rojo coral
                                                                                return '<span style="font-weight: bold;">Pending</span>';
                                                                            } else {
                                                                                metaData.style = 'background: #4CAF50; color: white;'; // Verde para "Ok"
                                                                                return '<span style="font-weight: bold;">Match</span>';
                                                                            }
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Liquidation <br> Date',
                                                                        width: 89,
                                                                        dataIndex: 'ADATE',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Liquidation',
                                                                        width: 110,
                                                                        dataIndex: 'LIQUIDACIO',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Merchand',
                                                                        width: 80,
                                                                        dataIndex: 'MERCHAND',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Cod',
                                                                        width: 45,
                                                                        dataIndex: 'CODPRO',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        defaults: {
                                                            sortable: true,
                                                            menuDisabled: false,
                                                            align: 'center'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataDescuentos',
                                                    width: 673,
                                                    height: 590,
                                                    margin: '20px 5px 0 0',
                                                    columnLines: true,
                                                    features: [{
                                                            dock: 'bottom',
                                                            ftype: 'summary'
                                                        }],
                                                    bbar: {
                                                        xtype: 'pagingtoolbar',
                                                        store: null,
                                                        displayInfo: true,
                                                        displayMsg: 'Page {0} - {1} of {2}',
                                                        emptyMsg: 'No records found'
                                                    },
                                                    columns: {
                                                        items: [
                                                            {
                                                                text: 'Discounts',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                columns: [
                                                                    {
                                                                        xtype: 'checkcolumn',
                                                                        text: 'Sel',
                                                                        width: 45,
                                                                        dataIndex: 'checkActive',
                                                                        align: 'center',
                                                                        menuDisabled: true,
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        },
                                                                        listeners: {
                                                                            checkchange: 'updateGridDiscountWMH'
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rn', // Título de la columna
                                                                        width: 45, // Ancho de la columna
                                                                        menuDisabled: true,
                                                                        dataIndex: 'RN',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (record.data.blockChange) {
                                                                                metaData.style = 'background:#eeeeee ;'
                                                                            }
                                                                            return value
                                                                        },
                                                                    },
                                                                    {
                                                                        text: 'Amounts A',
                                                                        menuDisabled: true,
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        columns: [
                                                                            {
                                                                                text: 'Curr',
                                                                                width: 50,
                                                                                dataIndex: 'MONEDA',
                                                                                menuDisabled: true,
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    return '';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Import',
                                                                                width: 60,
                                                                                menuDisabled: true,
                                                                                dataIndex: 'IMPORTECeba',
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    if (record.data.blockChange) {
                                                                                        metaData.style = 'text-align:right;background:#eeeeee ;';
                                                                                    } else {
                                                                                        metaData.style = "text-align:right;";
                                                                                    }
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var tam = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items.length;
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items[tam - 1].data;
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    value = Ext.util.Format.number(data.TOTAL_IMPORTE, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Amounts B',
                                                                        menuDisabled: true,
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        columns: [
                                                                            {
                                                                                text: 'Cur',
                                                                                width: 50,
                                                                                menuDisabled: true,
                                                                                dataIndex: 'MONEDAPAGO',
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    if (record.data.blockChange) {
                                                                                        metaData.style = 'background:#eeeeee ;';
                                                                                    }
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    return '';
                                                                                },
                                                                            },
                                                                            {
                                                                                text: 'Im. Pag',
                                                                                width: 60,
                                                                                menuDisabled: true,
                                                                                dataIndex: 'IMPORTEPAG',
                                                                                align: 'center',
                                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    if (record.data.blockChange) {
                                                                                        metaData.style = 'text-align:right;background:#eeeeee ;';
                                                                                    } else {
                                                                                        metaData.style = "text-align:right;";
                                                                                    }
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var tam = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items.length;
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items[tam - 1].data;
                                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                                    value = Ext.util.Format.number(data.TOTAL_IMPORTEPAG, '0,000.00');
                                                                                    return '<b>' + value + '</b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Liquidation <br> Date',
                                                                        width: 80,
                                                                        dataIndex: 'FLIQUIDACI',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (record.data.blockChange) {
                                                                                metaData.style = 'background:#eeeeee ;';
                                                                            }
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Liquidation',
                                                                        width: 110,
                                                                        dataIndex: 'LIQUIDACIO',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (record.data.blockChange) {
                                                                                metaData.style = 'background:#eeeeee ;'
                                                                            }
                                                                            return value
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Merchand',
                                                                        width: 80,
                                                                        dataIndex: 'MERCHAND',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (record.data.blockChange) {
                                                                                metaData.style = 'background:#eeeeee ;'
                                                                            }
                                                                            return value
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Cod',
                                                                        width: 45,
                                                                        dataIndex: 'CODPRO',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (record.data.blockChange) {
                                                                                metaData.style = 'background:#eeeeee ;';
                                                                            }
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        sortable: false,
                                                                        xtype: 'actioncolumn',
                                                                        disabled: true,
                                                                        width: 45,
                                                                        text: '<span style="color:white;font-weight:bold;">Edit</span>',
                                                                        style: 'background:#6C87A8; border-color:white',
                                                                        align: 'center',
                                                                        items: [
                                                                            {
                                                                                iconCls: 'prx-icon-edit',
                                                                                tooltip: 'Edit',
                                                                                disabled: true,
                                                                                handler: 'onEditClick'
                                                                            }
                                                                        ],
                                                                        summaryRenderer: function (v, s, d, meta) {
                                                                            meta.style = "background:#6C87A8;color:white";
                                                                            return "";
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1700,
                            id: prototype.id + '-panelGridDataReview',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'start'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {type: 'hbox', align: 'start'},
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {type: 'vbox', align: 'stretch'},
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridBandocReview',
                                                    height: 150,
                                                    width: 772,
                                                    columnLines: true,
                                                    margin: '0 0 20 0',
                                                    viewConfig: {
                                                        enableTextSelection: true
                                                    },
                                                    features: [{
                                                            dock: 'bottom',
                                                            ftype: 'summary'
                                                        }
                                                    ],
                                                    bbar: {
                                                        xtype: 'pagingtoolbar',
                                                        store: null,
                                                        displayInfo: true,
                                                        displayMsg: 'Page {0} - {1} of {2}',
                                                        emptyMsg: 'No records found'
                                                    },
                                                    columns: {
                                                        items: [
                                                            {
                                                                text: 'Statement',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8;',
                                                                columns: [
                                                                    {
                                                                        xtype: 'checkcolumn',
                                                                        text: 'Select',
                                                                        width: 60,
                                                                        dataIndex: 'checkActive',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        menuDisabled: true,
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        },
                                                                        listeners: {
                                                                            checkchange: 'checkBandocReview'
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Bandoc',
                                                                        width: 90,
                                                                        dataIndex: 'BANDOC',
                                                                        align: 'center',
                                                                        menuDisabled: true,
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Status',
                                                                        width: 120,
                                                                        dataIndex: 'STVAL',
                                                                        align: 'center',
                                                                        menuDisabled: true,
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (value === "3") {
                                                                                metaData.style = 'background:#EF5350; color:white;';
                                                                                return '<span style="font-weight:bold;">Pending</span>';
                                                                            } else if (value === "1") {
                                                                                metaData.style = 'background:#4CAF50; color:white;';
                                                                                return '<span style="font-weight:bold;">Match</span>';
                                                                            } else if (value === "5") {
                                                                                metaData.style = 'background:#4CAF50; color:white;';
                                                                                return '<span style="font-weight:bold;">Match Manual</span>';
                                                                            } else {
                                                                                metaData.style = 'background:#B0B0B0; color:#2B2B2B;'; // ⬅️ PLOMO para desconocidos
                                                                                return '<span style="font-weight:bold;">Unknown</span>';
                                                                            }
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Country',
                                                                        width: 90,
                                                                        dataIndex: 'SCOUNTRY',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Val Date',
                                                                        width: 95,
                                                                        dataIndex: 'VALDATE',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Date',
                                                                        width: 95,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'ADATE',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Account',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'ACCOUNT',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Society',
                                                                        width: 110,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SOCIETY',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Currency',
                                                                        width: 110,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCURRENCY',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Neto',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'NETO',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridBandocReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridBandocReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    defaults: {
                                                        sortable: true,
                                                        menuDisabled: false,
                                                        align: 'center'
                                                    }
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridCabeceraReview',
                                                    height: 150,
                                                    width: 992,
                                                    hidden: false,
                                                    columnLines: true,
                                                    viewConfig: {
                                                        enableTextSelection: true
                                                    },
                                                    features: [{
                                                            dock: 'bottom',
                                                            ftype: 'summary'
                                                        }
                                                    ],
                                                    bbar: {
                                                        xtype: 'pagingtoolbar',
                                                        store: null,
                                                        displayInfo: true,
                                                        displayMsg: 'Page {0} - {1} of {2}',
                                                        emptyMsg: 'No records found'
                                                    },
                                                    columns: {
                                                        items: [
                                                            {
                                                                text: 'Header',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8;',
                                                                columns: [
                                                                    {
                                                                        xtype: 'checkcolumn',
                                                                        text: 'Select',
                                                                        width: 60,
                                                                        dataIndex: 'checkActive',
                                                                        align: 'center',
                                                                        disabled: true,
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        menuDisabled: true,
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Fliquidaci',
                                                                        width: 90,
                                                                        dataIndex: 'FLIQUIDACI',
                                                                        align: 'center',
                                                                        menuDisabled: true,
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Merchand',
                                                                        width: 90,
                                                                        dataIndex: 'MERCHAND',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: ' background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Liquidacio',
                                                                        width: 90,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'LIQUIDACIO',
                                                                        align: 'center',
                                                                        style: ' background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Moneda',
                                                                        width: 110,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'MONEDA',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'TOTAL',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridCabeceraReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridCabeceraReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.SUM_TOTAL, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Comision',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'COMISION',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridCabeceraReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridCabeceraReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.SUM_COMISION, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Neto',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'NETO',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridCabeceraReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridCabeceraReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.SUM_NETO, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Moneda Pago',
                                                                        width: 110,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'MONEDAPAGO',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Importe Pag',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'IMPORTEPAG',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridCabeceraReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridCabeceraReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.SUM_IMPORTEPAG, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    defaults: {
                                                        sortable: true,
                                                        menuDisabled: false,
                                                        align: 'center'
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            width: 250,
                                            height: 280,
                                            border: false,
                                            margin: '4 8 0 30',
                                            layout: {
                                                type: 'hbox',
                                                align: 'start'
                                            },
                                            id: 'panelResumenTotalesSalesReview',
                                            bodyPadding: 5,
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    style: 'background:#E6ECF5; border:1px solid #99A9C4; padding:8px; border-radius:4px;',
                                                    width: 235,
                                                    defaults: {
                                                        margin: '4 0 4 0',
                                                        labelAlign: 'left',
                                                        labelStyle: 'font-size:12px; font-weight:bold;',
                                                        fieldStyle: 'font-size:12px; text-align:center;'
                                                    },
                                                    items: [
                                                        // Panel Total Depósitos
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Deposito',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalDepositoReview',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Total Ventas
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Total',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalReview',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Total Comision
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Comision',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalComisionReview',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Total Descuentos
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Descuentos',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalDescuentosReview',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },

                                                        // Panel Total Ventas
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Ventas',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtVentasReview',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Cálculo 
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            style: 'border-top:3px solid #6C87A8; padding-top:4px;',
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Calculo',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalCalculoReview',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            width: 400,
                                            height: 250,
                                            border: false,
                                            margin: '4 8 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'start'
                                            },
                                            id: 'panelResumenTotalesDiffReview',
                                            bodyPadding: 5,
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    style: 'background:#E6ECF5; border:1px solid #99A9C4; padding:8px; border-radius:4px;',
                                                    width: 235,
                                                    defaults: {
                                                        margin: '4 0 4 0',
                                                        labelAlign: 'left',
                                                        labelStyle: 'font-size:12px; font-weight:bold;',
                                                        fieldStyle: 'font-size:12px; text-align:center;'
                                                    },
                                                    items: [
                                                        // Panel Porcentaje  Permitido
                                                        {
                                                            xtype: 'panel',
                                                            itemId: prototype.id + '-panelPercentReview',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Porcentaje',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtPercentVentaReview',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Panel Diferencia
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    value: 'Diferencia',
                                                                    style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-txtTotalDiffReview',
                                                                    width: '110px',
                                                                    value: Ext.util.Format.number(0, '0,000.00'),
                                                                    style: 'font-size:14px; font-weight: bold; width: 104px; text-align: right; padding: 4px 10px;'
                                                                }
                                                            ]
                                                        },
                                                        // Botón Execute alineado a la derecha
                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'hbox',
                                                                pack: 'end'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-btnExecuteReview',
                                                                    width: 110,
                                                                    disabled: true,
                                                                    html: '<span style="color:white;font-size:12px;font-weight:bold">Execute</span>',
                                                                    style: 'background:#6C87A8; border-radius:4px; padding:4px 8px;',
                                                                    border: false
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
                                    xtype: 'container',
                                    id: prototype.id + '-panelDescuentoReview',
                                    layout: {type: 'hbox', align: 'start'},
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataSettlementReview',
                                            width: 992,
                                            height: 590,
                                            margin: '20px 5px 0 0',
                                            columnLines: true,
                                            features: [{
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                store: null,
                                                displayInfo: true,
                                                displayMsg: 'Page {0} - {1} of {2}',
                                                emptyMsg: 'No records found'
                                            },
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'Settlements',
                                                        menuDisabled: true,
                                                        style: 'background: #6C87A8;',
                                                        columns: [
                                                            {
                                                                xtype: 'checkcolumn',
                                                                text: 'Sel',
                                                                width: 45,
                                                                menuDisabled: true,
                                                                dataIndex: 'checkActive',
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                disabled: true,
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rn',
                                                                width: 45,
                                                                menuDisabled: true,
                                                                dataIndex: 'RN',
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amounts A',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Curr',
                                                                        width: 50,
                                                                        dataIndex: 'SCURRENCY',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        width: 80,
                                                                        dataIndex: 'TOTAL',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_LIQ, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Comision',
                                                                        width: 85,
                                                                        dataIndex: 'COMISION',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_COMISION, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Comistota',
                                                                        width: 84,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'COMISTOTA',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_COMISTOTA, '0,000.00');
                                                                            return '<b>' + value + '</b>';

                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Neto',
                                                                        width: 90,
                                                                        dataIndex: 'NETO',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Amounts B',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Curr',
                                                                        width: 50,
                                                                        dataIndex: 'MONEDAPAGO',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Im. Pag',
                                                                        width: 70,
                                                                        dataIndex: 'IMPORTEPAG',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlementReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_IMPORTEPAG, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Status',
                                                                width: 65,
                                                                menuDisabled: true,
                                                                dataIndex: 'STVAL',
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value === "3") {
                                                                        metaData.style = 'background: #EF5350; color: white;'; // Rojo coral
                                                                        return '<span style="font-weight: bold;">Pending</span>';
                                                                    } else {
                                                                        metaData.style = 'background: #4CAF50; color: white;'; // Verde para "Ok"
                                                                        return '<span style="font-weight: bold;">Match</span>';
                                                                    }
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Liquidation <br> Date',
                                                                width: 89,
                                                                dataIndex: 'ADATE',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Liquidation',
                                                                width: 110,
                                                                dataIndex: 'LIQUIDACIO',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Merchand',
                                                                width: 80,
                                                                dataIndex: 'MERCHAND',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Cod',
                                                                width: 45,
                                                                dataIndex: 'CODPRO',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ],
                                                defaults: {
                                                    sortable: true,
                                                    menuDisabled: false,
                                                    align: 'center'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataDescuentosReview',
                                            width: 673,
                                            height: 590,
                                            margin: '20px 5px 0 0',
                                            columnLines: true,
                                            features: [{
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }],
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                store: null,
                                                displayInfo: true,
                                                displayMsg: 'Page {0} - {1} of {2}',
                                                emptyMsg: 'No records found'
                                            },
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'Discounts',
                                                        menuDisabled: true,
                                                        style: 'background: #6C87A8  ;border-color:white',
                                                        columns: [
                                                            {
                                                                xtype: 'checkcolumn',
                                                                text: 'Sel',
                                                                width: 45,
                                                                dataIndex: 'checkActive',
                                                                align: 'center',
                                                                menuDisabled: true,
                                                                disabled: true,
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                },
                                                            },
                                                            {
                                                                text: 'Rn', // Título de la columna
                                                                width: 45, // Ancho de la columna
                                                                menuDisabled: true,
                                                                dataIndex: 'RN',
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.blockChange) {
                                                                        metaData.style = 'background:#eeeeee ;'
                                                                    }
                                                                    return value
                                                                },
                                                            },
                                                            {
                                                                text: 'Amounts A',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Curr',
                                                                        width: 50,
                                                                        dataIndex: 'MONEDA',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Import',
                                                                        width: 60,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'IMPORTECeba',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (record.data.blockChange) {
                                                                                metaData.style = 'text-align:right;background:#eeeeee ;';
                                                                            } else {
                                                                                metaData.style = "text-align:right;";
                                                                            }
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataDescuentosReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataDescuentosReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_IMPORTE, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Amounts B',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Cur',
                                                                        width: 50,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'MONEDAPAGO',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (record.data.blockChange) {
                                                                                metaData.style = 'background:#eeeeee ;';
                                                                            }
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            return '';
                                                                        },
                                                                    },
                                                                    {
                                                                        text: 'Im. Pag',
                                                                        width: 60,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'IMPORTEPAG',
                                                                        align: 'center',
                                                                        style: 'background: #6C87A8  ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (record.data.blockChange) {
                                                                                metaData.style = 'text-align:right;background:#eeeeee ;';
                                                                            } else {
                                                                                metaData.style = "text-align:right;";
                                                                            }
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataDescuentosReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataDescuentosReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_IMPORTEPAG, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Liquidation <br> Date',
                                                                width: 80,
                                                                dataIndex: 'FLIQUIDACI',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.blockChange) {
                                                                        metaData.style = 'background:#eeeeee ;';
                                                                    }
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Liquidation',
                                                                width: 110,
                                                                dataIndex: 'LIQUIDACIO',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.blockChange) {
                                                                        metaData.style = 'background:#eeeeee ;'
                                                                    }
                                                                    return value
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Merchand',
                                                                width: 80,
                                                                dataIndex: 'MERCHAND',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.blockChange) {
                                                                        metaData.style = 'background:#eeeeee ;'
                                                                    }
                                                                    return value
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Cod',
                                                                width: 45,
                                                                dataIndex: 'CODPRO',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'background: #6C87A8  ;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.blockChange) {
                                                                        metaData.style = 'background:#eeeeee ;';
                                                                    }
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8  ;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                sortable: false,
                                                                xtype: 'actioncolumn',
                                                                width: 45,
                                                                text: '<span style="color:white;font-weight:bold;">Edit</span>',
                                                                style: 'background:#6C87A8; border-color:white',
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        iconCls: 'prx-icon-edit',
                                                                        tooltip: 'Edit',
                                                                        handler: 'onEditClick'
                                                                    }
                                                                ],
                                                                summaryRenderer: function (v, s, d, meta) {
                                                                    meta.style = "background:#6C87A8;color:white";
                                                                    return "";
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnAddDiscount',
                                            iconCls: 'prx-icon-add',
                                            tooltip: 'New Discount'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: prototype.id + '-panelTicketsReview',
                                    layout: {type: 'hbox', align: 'start'},
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataVentasReview',
                                            width: 992,
                                            height: 590,
                                            margin: '20px 5px 0 0',
                                            columnLines: true,
                                            features: [{
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                store: null,
                                                displayInfo: true,
                                                displayMsg: 'Page {0} - {1} of {2}',
                                                emptyMsg: 'No records found'
                                            },
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'Sales',
                                                        style: 'background: #6C87A8;border-color:white',
                                                        columns: [
                                                            {
                                                                xtype: 'checkcolumn',
                                                                text: 'Sel',
                                                                width: 50,
                                                                dataIndex: 'checkActive',
                                                                align: 'center',
                                                                menuDisabled: true,
                                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                listeners: {
                                                                    checkchange: 'updateGridSaleWMH'
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Rn',
                                                                width: 45,
                                                                menuDisabled: true,
                                                                dataIndex: 'RN',
                                                                align: 'center',
                                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                    return '';
                                                                }
                                                            },
                                                            {
                                                                text: 'Details',
                                                                style: 'background: #6C87A8;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Ticket',
                                                                        width: 120,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'TKT',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Agent',
                                                                        width: 80,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SAGENT',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Country',
                                                                        width: 75,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCOUNTRY',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Authorization',
                                                                        width: 100,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SAUTHOC',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            //                                                value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Card Number',
                                                                        width: 140,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCARDN',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Sale Date',
                                                                        width: 80,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SDATE',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Local',
                                                                style: 'background: #6C87A8;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Currency',
                                                                        width: 70,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCURREVEN',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 80,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SVFOP',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataVentasReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataVentasReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_SVFOP, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Converted',
                                                                style: 'background: #6C87A8;border-color:white',
                                                                columns: [
                                                                    {
                                                                        text: 'Currency',
                                                                        width: 70,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SCURREVENCONVERT',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 80,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SVFOPCON',
                                                                        align: 'center',
                                                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                        summaryType: 'sum',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridDataVentasReview').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataVentasReview').getStore().getData().items[tam - 1].data;
                                                                            metaData.style = "text-align:right;background: #6C87A8;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_SVFOP_CONVERTED, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                defaults: {
                                                    sortable: true,
                                                    menuDisabled: false,
                                                    align: 'center'
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
        }
    ]
}
);


Ext.util.CSS.createStyleSheet(`
    .section-title {
        font-weight: bold;
        font-size: 13px;
        color: #0B333C;
        text-decoration: underline;
        background-color: #E5ECEF;
        padding: 4px 8px;
        border-radius: 3px;
        display: block;
        margin: 8px 0 4px 8px;
    }
`, 'section-title-style');