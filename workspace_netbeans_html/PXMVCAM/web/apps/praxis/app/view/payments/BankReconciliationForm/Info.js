valor = '0';
Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.Info', {
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
            margin: '15px 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1815,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1475,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 1462,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                id: prototype.id + '-columnName01', text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', sortable: false, menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridCountry'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardSMain'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardS'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardSMain'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, hidden: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardSMain'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardSMain'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridTotalCORE'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accounted', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIPE, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sales Reconciliation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'by Ticket', dataIndex: 'lngQTICKET', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTICKET, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Automatic', dataIndex: 'lngQTMATCH', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMATCH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MANUAL',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMANUAL, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'w/o Reconcili.', dataIndex: 'lngQTPEND', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTPEND, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cargo',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS2', width: 80,
                                                                listeners: {
                                                                    click: 'onGridDetalleCargo',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS2, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI2', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI2, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Mail',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS3', width: 80,
                                                                listeners: {
                                                                    click: 'onGridDetalleCorreo',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS3, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI3', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI3, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGraf',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1500,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 'auto',
                                    width: 1500,
                                    margin: '10 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYearGraf',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: 'From',
                                            width: 120,
                                            labelWidth: 45,
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'cbxDateFromYear_changeHandlerGraf'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonthGraf',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: '',
                                            width: 65,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {minWidth: 60},
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            listeners: {
                                                change: 'cbxDateFromMonth_changeHandlerGraf'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYearGraf',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: 'To',
                                            width: 106,
                                            labelWidth: 31,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 70},
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToMonthGraf',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: '',
                                            width: 65,
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {minWidth: 60},
                                            maxLength: 3,
                                            enforceMaxLength: true
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-rbChart_IA',
                                            fieldLabel: '',
                                            horizontal: true,
                                            items: [
                                                {boxLabel: '<strong >Fase I</strong>', name: 'rb', inputValue: 'rbF1', width: 100},
                                                {boxLabel: '<strong >Fase II</strong>', name: 'rb', inputValue: 'rbF2', width: 100, checked: true},
                                            ],
                                            listeners: {
                                                change: 'btnChangeGraf'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Colombia',
                                            margin: '3 0 0 3',
                                            id: prototype.id + '-COLGraf',
                                            width: 60
                                        },
                                        {
                                            xtype: 'component',
                                            id: prototype.id + '-btnToggleSwitchFTGraf',
                                            margin: '3 0 0 3',
                                            html: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Modo Alternancia</title><style>.toggle-container{display:inline-block;position:relative;width:30px;height:16px;}.toggle-input{opacity:0;width:0;height:0;}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}.toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}.toggle-input:checked+.toggle-slider{background-color:#4c7daf;}.toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}</style></head><body><label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label></body></html>',
                                            tooltip: 'Export to Report',
                                            listeners: {
                                                change: 'chgBash',
                                                click: 'clickToggleSwitch'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Exterior',
                                            margin: '3 0 0 13',
                                            id: prototype.id + '-EXTGraf',
                                            width: 60
                                        },
                                        {
                                            xtype: 'label',
                                            text: ' ',
                                            margin: '13 0 0 0',
                                            id: prototype.id + '-TESTGraf',
                                            hidden: true,
                                            width: 1
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearchGraf',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search'
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnBackGraf',
                                            iconCls: 'prx-icon-back',
                                            tooltip: 'Back'
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 'auto',
                                    hidden: true,
                                    width: 1442,
                                    margin: '10 0 0 0 ',
                                    id: prototype.id + '-rbFaseI',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            height: 'auto',
                                            width: 1442,
                                            margin: '10 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataGrafLiqI',
                                                    width: 542,
                                                    columnLines: true,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Payment',
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', sortable: false, menuDisabled: true, //flex: 1
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqI').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                                            return '<b>' + 'Total' + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Statement Reconciliation',
                                                                columns: [
                                                                    {
                                                                        text: 'Match', menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqI').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center";
                                                                                    value = Ext.util.Format.number(value, '0,000.00') + '%';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqI').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqI').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, hidden: true, //flex: 1
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqI').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Statement', menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqI').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngTOTALE', width: 100, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqI').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px';
                                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGrafLiqI',
                                                    width: 900,
                                                    border: false,
                                                    height: 300,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['lngQMATCH', 'lngQPEND'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            grid: true,
                                                            title: {
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            xField: 'strFormatDate',
                                                            yField: ['lngQMATCH', 'lngQPEND'],
                                                            colors: ['#2ca7d8', '#5dd92d'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            height: 'auto',
                                            width: 1442,
                                            margin: '10 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataGrafSaleI',
                                                    width: 542,
                                                    columnLines: true,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Payment',
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', sortable: false, menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleI').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                                            return '<b>' + 'Total' + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Settlement Reconciliation',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Automatic', dataIndex: 'lngQTMATCH', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleI').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center";
                                                                                    value = Ext.util.Format.number(value, '0,000.00') + '%';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleI').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleI').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Settlement',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o State.', dataIndex: 'lngQTPEND', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleI').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngTOTALL', width: 100, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleI').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px;';
                                                                            return '<b>' + Ext.util.Format.number(data.lngTotTOTALL, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGrafSaleI',
                                                    width: 900,
                                                    border: false,
                                                    height: 300,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['lngQTMATCH', 'lngQTPEND'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            grid: true,
                                                            title: {
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            xField: 'strFormatDate',
                                                            yField: ['lngQTMATCH', 'lngQTPEND'],
                                                            colors: ['#2ca7d8', '#5dd92d'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 'auto',
                                    hidden: true,
                                    width: 1442,
                                    margin: '10 0 0 0 ',
                                    id: prototype.id + '-rbFaseII',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            height: 'auto',
                                            width: 1442,
                                            margin: '10 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataGrafLiqII',
                                                    width: 542,
                                                    columnLines: true,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Sales',
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', sortable: false, menuDisabled: true, //flex: 1
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqII').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                                            return '<b>' + 'Total' + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Settlement Reconciliation',
                                                                columns: [
                                                                    {
                                                                        text: 'Match', menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqII').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center";
                                                                                    value = Ext.util.Format.number(value, '0,000.00') + '%';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqII').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqII').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, hidden: true, //flex: 1
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqII').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Settlement', menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqII').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataGrafLiqII').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px';
                                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGrafLiqII',
                                                    width: 900,
                                                    border: false,
                                                    height: 300,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['lngQMATCH', 'lngQPEND'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            grid: true,
                                                            title: {
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            xField: 'strFormatDate',
                                                            yField: ['lngQMATCH', 'lngQPEND'],
                                                            colors: ['#2ca7d8', '#5dd92d'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            height: 'auto',
                                            width: 1442,
                                            margin: '10 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataGrafSaleII',
                                                    width: 542,
                                                    columnLines: true,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Sales',
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', sortable: false, menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleII').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                                            return '<b>' + 'Total' + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Sales Reconciliation',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Automatic', dataIndex: 'lngQTMATCH', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleII').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center";
                                                                                    value = Ext.util.Format.number(value, '0,000.00') + '%';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleII').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleII').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o Reconcili.', dataIndex: 'lngQTPEND', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleII').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQTICKET', width: 100, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataGrafSaleII').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px;';
                                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTICKET, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGrafSaleII',
                                                    width: 900,
                                                    border: false,
                                                    height: 300,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['lngQTMATCH', 'lngQTPEND'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            grid: true,
                                                            title: {
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            xField: 'strFormatDate',
                                                            yField: ['lngQTMATCH', 'lngQTPEND'],
                                                            colors: ['#2ca7d8', '#5dd92d'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDebitsData',
                            hidden: true,
//                            width: '100%',
                            width: 1650,
                            bodyStyle: 'background: transparent;',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDebitsData',
                                    width: 1440,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Trans.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                        listeners: {
                                                            click: 'gridDetCountry_clickHandler_DEBITS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardSMain_DEBITS_MATCH'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true, //flex: 1
                                                                //                                                                listeners: {
                                                                //                                                                    click: 'onGridDetCardS'
                                                                //                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardSMain_DEBITS_MATCH_MANUAL'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                //                                                                                listeners: {
                                                                //                                                                                    click: 'onGridDetCardSMain_DEBITS'
                                                                //                                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardSMain_DEBITS_PEND'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Reconciliation By Refund',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCHRF', width: 80,
                                                                listeners: {
                                                                    click: 'gridDetCountry_clickHandler_MATCH_REFND',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMATCHRF, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: '%', dataIndex: 'lngQMATCHPercentRF', width: 70, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
//                                                                    return value;
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentRF, '0,000.00') + '%<b>';
//                                                                }
//                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUALRF', width: 80,
                                                                listeners: {
                                                                    click: 'gridDetCountry_clickHandler_MANUAL_REFND',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMANUALRF, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: 'Diff', dataIndex: 'lngQDIFFRF', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_DIFF_REFND',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//    //                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//    //                                                                                    metaData.style = "text-align:right;";
//    //                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//    //                                                                                    return Ext.util.Format.number(data.lngTotQMANUALRF, '0,000');
//    //                                                                                }
//                                                            }
                                                        ]
                                                    },
//                                                    {
//                                                        text: 'Ticket',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: false,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
//                                                            {
//                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDRF', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND_REFND',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    metaData.style = "text-align:right;";
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    return Ext.util.Format.number(data.lngTotQPENDRF, '0,000');
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Total<br>Trans.', dataIndex: 'lngQSALESRF', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSALESRF, '0,000');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Reconciliation By Chgbak',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCHCH', width: 80,
                                                                listeners: {
                                                                    click: 'gridDetCountry_clickHandler_MATCH_CHGBAK',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMATCHCH, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: '%', dataIndex: 'lngQMATCHPercentCH', width: 70, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#FFFFFF;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
//                                                                    return value;
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentCH, '0,000.00') + '%<b>';
//                                                                }
//                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUALCH', width: 80,
                                                                listeners: {
                                                                    click: 'gridDetCountry_clickHandler_MANUAL_CHGBAK',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMANUALCH, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: 'Diff', dataIndex: 'lngQDIFFCH', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_DIFF_CHGBAK',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//    //                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//    //                                                                                    metaData.style = "text-align:right;";
//    //                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//    //                                                                                    return Ext.util.Format.number(data.lngTotQMANUALCH, '0,000');
//    //                                                                                }
//                                                            }
                                                        ]
                                                    },
//                                                    {
//                                                        text: 'Trans.',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: false,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
//                                                            {
//                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDCH', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND_CHGBAK',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    metaData.style = "text-align:right;";
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    return Ext.util.Format.number(data.lngTotQPENDCH, '0,000');
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Total<br>Trans.', dataIndex: 'lngQSALESCH', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSALESCH, '0,000');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Reconciliation By Acredit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCHAC', width: 80,
                                                                listeners: {
                                                                    click: 'gridDetCountry_clickHandler_MATCH_ACREDIT',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMATCHAC, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: '%', dataIndex: 'lngQMATCHPercentAC', width: 70, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#A4E7EC;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
//                                                                    return value;
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentAC, '0,000.00') + '%<b>';
//                                                                }
//                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUALAC', width: 80,
                                                                listeners: {
                                                                    click: 'gridDetCountry_clickHandler_MANUAL_ACREDIT',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMANUALAC, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: 'Diff', dataIndex: 'lngQDIFFAC', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_DIFF_ACREDIT',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//    //                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//    //                                                                                    metaData.style = "text-align:right;";
//    //                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//    //                                                                                    return Ext.util.Format.number(data.lngTotQMANUALAC, '0,000');
//    //                                                                                }
//                                                            }
                                                        ]
                                                    },
//                                                    {
//                                                        text: 'Trans.',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: false,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
//                                                            {
//                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDAC', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND_ACREDIT',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    metaData.style = "text-align:right;";
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    return Ext.util.Format.number(data.lngTotQPENDAC, '0,000');
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Total<br>Trans.', dataIndex: 'lngQSALESAC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSALESAC, '0,000');
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDebitsDataCountry',
                            hidden: true,
//                            width: '100%',
                            width: 1600,
                            bodyStyle: 'background: transparent;',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDebitsDataCountry',
                                    width: 1600,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                        listeners: {
                                                            click: 'gridDet_DEBITS_clickHandler_2'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'NAME', width: 198,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true, //flex: 1
                                                                //                                                                listeners: {
                                                                //                                                                    click: 'onGridDetCardS'
                                                                //                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                //                                                                                listeners: {
                                                                //                                                                                    click: 'onGridDetCardSMain_DEBITS'
                                                                //                                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Reconciliation By Refund',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCHRF', width: 80,
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMATCHRF, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: '%', dataIndex: 'lngQMATCHPercentRF', width: 70, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
//                                                                    return value;
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentRF, '0,000.00') + '%<b>';
//                                                                }
//                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUALRF', width: 80,
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMANUALRF, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: 'Diff', dataIndex: 'lngQDIFFRF', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_DIFF_REFND',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//    //                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//    //                                                                                    metaData.style = "text-align:right;";
//    //                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//    //                                                                                    return Ext.util.Format.number(data.lngTotQMANUALRF, '0,000');
//    //                                                                                }
//                                                            }
                                                        ]
                                                    },
//                                                    {
//                                                        text: 'Ticket',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: false,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
//                                                            {
//                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDRF', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND_REFND',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    metaData.style = "text-align:right;";
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    return Ext.util.Format.number(data.lngTotQPENDRF, '0,000');
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Total<br>Trans.', dataIndex: 'lngQSALESRF', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSALESRF, '0,000');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Reconciliation By Chgbak',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCHCH', width: 80,
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMATCHCH, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: '%', dataIndex: 'lngQMATCHPercentCH', width: 70, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#FFFFFF;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
//                                                                    return value;
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentCH, '0,000.00') + '%<b>';
//                                                                }
//                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUALCH', width: 80,
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMANUALCH, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: 'Diff', dataIndex: 'lngQDIFFCH', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_DIFF_CHGBAK',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//    //                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//    //                                                                                    metaData.style = "text-align:right;";
//    //                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//    //                                                                                    return Ext.util.Format.number(data.lngTotQMANUALCH, '0,000');
//    //                                                                                }
//                                                            }
                                                        ]
                                                    },
//                                                    {
//                                                        text: 'Trans.',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: false,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
//                                                            {
//                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDCH', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND_CHGBAK',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    metaData.style = "text-align:right;";
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    return Ext.util.Format.number(data.lngTotQPENDCH, '0,000');
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Total<br>Trans.', dataIndex: 'lngQSALESCH', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSALESCH, '0,000');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Reconciliation By Acredit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCHAC', width: 80,
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMATCHAC, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: '%', dataIndex: 'lngQMATCHPercentAC', width: 70, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#A4E7EC;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
//                                                                    return value;
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentAC, '0,000.00') + '%<b>';
//                                                                }
//                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUALAC', width: 80,
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler_2',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQMANUALAC, '0,000');
                                                                }
                                                            },
//                                                            {
//                                                                text: 'Diff', dataIndex: 'lngQDIFFAC', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_DIFF_ACREDIT',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//    //                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//    //                                                                                    metaData.style = "text-align:right;";
//    //                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//    //                                                                                    return Ext.util.Format.number(data.lngTotQMANUALAC, '0,000');
//    //                                                                                }
//                                                            }
                                                        ]
                                                    },
//                                                    {
//                                                        text: 'Trans.',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: false,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
//                                                            {
//                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDAC', width: 80,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND_ACREDIT',
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    metaData.style = "text-align:right;";
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                    return Ext.util.Format.number(data.lngTotQPENDAC, '0,000');
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Total<br>Trans.', dataIndex: 'lngQSALESAC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsDataCountry').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSALESAC, '0,000');
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetCardByS_Debits',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 392,
                            margin: '0 0 0 0 ',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetCardByS_Debits',
                                    width: 392,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'gridDet_DEBITS_clickHandler'
                                                }

                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardByS_Debits').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardByS_Debits').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetalle_DEBITS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden: true,
                            width: 1373,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle3_DEBITS',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetalle_DEBITS',
                                    width: 1373,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 140, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Process', dataIndex: 'COREP', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcionCOREP + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc. Type', dataIndex: 'descTDOC', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, align: 'center', id: prototype.id + '-ColumnDateDetalle_DEBITS',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
//                                                        text: 'Author.',
//                                                        columns: [
//                                                            {
                                                        text: 'Author.<br>Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
//                                                            }
//                                                        ]
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Merchant',
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetalle_DEBITS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Poliza',
                                                columns: [
                                                    {
                                                        text: 'ID', dataIndex: 'BANDOC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flag ', dataIndex: 'STCON', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYTKT', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalle_DEBITS').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYTKT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEdit_DEBITS',
                                                width: 40,
                                                text: 'View',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'View',
                                                        handler: 'onEditClick'
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
                            id: prototype.id + '-panelGridDataCountry',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            height: 'auto',
                            width: 1680,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle1',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCountry',
                                    width: 1680,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                        listeners: {
                                                            click: 'onGridDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'NAME', width: 198,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accounted', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIPE, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sales Reconciliation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'by Ticket', dataIndex: 'lngQTICKET', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTICKET, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Automatic', dataIndex: 'lngQTMATCH', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMATCH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MANUAL',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMANUAL, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'w/o Reconcili.', dataIndex: 'lngQTPEND', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTPEND, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cargo',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS2', width: 80,
                                                                listeners: {
                                                                    click: 'onGridDetalleCargo'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS2, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI2', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI2, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Mail',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS3', width: 80,
                                                                listeners: {
                                                                    click: 'onGridDetalleCorreo'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS3, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI3', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI3, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataTotalCORE',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            height: 'auto',
                            width: 1640,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitleTotalCORE',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTotalCORE',
                                    width: 1640,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Procesor',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'COREP', width: 60,
//                                                        listeners: {
//                                                            click: 'onGridDetCardSMain'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'NAME', width: 198,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardS'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, hidden: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
//                                                        listeners: {
//                                                            click: 'onGridTotalCORE'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accounted', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIPE, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sales Reconciliation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'by Ticket', dataIndex: 'lngQTICKET', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTICKET, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Automatic', dataIndex: 'lngQTMATCH', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMATCH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MANUAL',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMANUAL, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'w/o Reconcili.', dataIndex: 'lngQTPEND', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTPEND, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cargo',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS2', width: 80,
//                                                                listeners: {
//                                                                    click: 'onGridDetalleCargo'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS2, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI2', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI2, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Mail',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS3', width: 80,
//                                                                listeners: {
//                                                                    click: 'onGridDetalleCorreo'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS3, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI3', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataTotalCORE').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI3, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 592,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle2',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDay',
                                    width: 592,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                id: prototype.id + '-adghFechaDay', text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Day', dataIndex: 'SDATE', width: 90, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetalle'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'setGridDataDayBySTVAL'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'setGridDataDayBySTVAL'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'setGridDataDayBySTVAL'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'setGridDataDayBySTVAL'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales Reconciliation',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'by Ticket', dataIndex: 'lngQTICKET', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTICKET, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Automatic', dataIndex: 'lngQTMATCH', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMATCH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MANUAL',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMANUAL, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'w/o Reconcili.', dataIndex: 'lngQTPEND', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTPEND, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetalle2',
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
                                    id: prototype.id + '-gridDataDetalle2',
                                    height: 565,
                                    width: 1712,
                                    hidden: false,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 140, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Process', dataIndex: 'COREP', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcionCOREP + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc. Type', dataIndex: 'descTDOC', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, align: 'center', id: prototype.id + '-ColumnDateDetalle1',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Merchant',
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetalle2').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Pay. Date', dataIndex: 'PAYDATE', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Termi', dataIndex: 'TERMI', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Poliza',
                                                columns: [
                                                    {
                                                        text: 'ID', dataIndex: 'BANDOC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flag ', dataIndex: 'STCON', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Rule  <br> Conciliation', dataIndex: 'FREGLA', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'BANDOC', dataIndex: 'BANDOC', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'REFER', dataIndex: 'REFER', width: 120, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Interface', dataIndex: 'USERA4545', width: 190, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Day Send <br> Interface', dataIndex: 'DCONTA4545', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
//                                            {
//                                                sortable: false,
//                                                xtype: 'actioncolumn',
//                                                id: prototype.id + '-gridEdit',
//                                                width: 40,
//                                                text: 'View',
//                                                align: 'center',
//                                                items: [
//                                                    {
//                                                        iconCls: 'prx-icon-edit',
//                                                        tooltip: 'View',
//                                                        handler: 'onEditClick'
//                                                    }
//                                                ]
//                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetalle',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1815,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle3',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetalle',
                                    width: 1813,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 140, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Process', dataIndex: 'COREP', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcionCOREP + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc. Type', dataIndex: 'descTDOC', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, align: 'center', id: prototype.id + '-ColumnDateDetalle',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Merchant',
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Rule  <br> Conciliation', dataIndex: 'FREGLA', width: 70, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetalle').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Pay. Date', dataIndex: 'PAYDATE', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Account', dataIndex: 'ACCNUMBER', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Termi', dataIndex: 'TERMI', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },

                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Settl.', dataIndex: 'lngQTYDOC', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridSett'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strCERROR + '"';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalle').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOC, '0,000') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYTKT', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strCERROR + '"';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalle').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYTKT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
//                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    console.log(data.STVAL, 'data.STVAL')
                                                    if (data.STVAL === '3' && data.PENDINGDAYS >= 4) {
                                                        metaData.style += "background-color:#fcec82;";
                                                    }
                                                    if (['1', '4', '5'].includes(data.STVAL)) {
                                                        metaData.style += "background-color:#ddf0d3;";
                                                        value = ''
                                                    }

                                                    return value;
                                                }
                                            },

                                            {
                                                text: 'BANDOC', dataIndex: 'BANDOC', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'REFER', dataIndex: 'REFER', width: 120, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Interface', dataIndex: 'HEADEA4545', width: 190, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Day Send <br> Interface', dataIndex: 'DCONTA4545', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Poliza',
                                                columns: [
//                                                    {
//                                                        text: 'ID', dataIndex: 'BANDOC', width: 90, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;";
//                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
//                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Flag ', dataIndex: 'STCON', width: 90, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;";
//                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
//                                                            return value;
//                                                        }
//                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'A4545DOCD', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                                    {
                                                        text: 'BPO  <br> Comment', dataIndex: 'CERROR', width: 70, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(data.strCERROR) + '"';
                                                            return value;
                                                        }
                                                    }
                                            ,
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEdit',
                                                width: 40,
                                                text: 'View',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'View',
                                                        handler: 'onEditClick'
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
                            id: prototype.id + '-panelGridDataTicket',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1187,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTicket',
                                    width: 1187,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 140, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.',
                                                        columns: [
                                                            {
                                                                    text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataTicket').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 62, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {//ticketxd
                                                text: 'Ticket', dataIndex: 'A1531TKT', width: 112, align: 'center',
                                                listeners: {
                                                    click: 'onGridDataViewTktFinal',
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB";
                                                    ;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return '<a <a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Invoice', dataIndex: 'INVOICE', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Doc. SAP Bank', dataIndex: 'BANDOC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetCardByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 903,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetCardByS',
                                    width: 903,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
//                                                        listeners: {
//                                                            click: 'onGridDetDayByS'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'NAMEBANK', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.NAMEBANK + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescCard', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetDayByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
//                            width: 550,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    bodyStyle: 'background:#E5ECEF;',
//                                    margin: '5 0 0 0',
//                                    width: 550,
//                                    defaults: {
//                                        anchor: '100%'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'label',
//                                            text: '',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            id: prototype.id + 'lblTitulo',
//                                            width: 550
//                                        }
//                                    ]
//                                },
                                {
                                    xtype: 'label',
                                    text: '',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    id: prototype.id + 'lblTitulo',
//                                    width: 550
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetDayByS',
                                    width: 403,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Day', dataIndex: 'SDATE', width: 90, align: 'center',
                                                listeners: {
                                                    click: 'onGridDetCardNbrByS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDayByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDayByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetCardNbrByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1587,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetCardNbrByS',
                                    width: 1587,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Merchant', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'SPNR', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onViewDet'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            if (data.SCARCOD == 'AX' && data.SCOUNTRY == 'MX') {
                                                                return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            } else {
                                                                return value;
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Pay. Date', dataIndex: 'PAYDATE', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Account', dataIndex: 'ACCNUMBER', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Termi', dataIndex: 'TERMI', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Poliza',
                                                columns: [
                                                    {
                                                        text: 'ID', dataIndex: 'BANDOC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flag ', dataIndex: 'STCON', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'A4545DOCD', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Settl.', dataIndex: 'lngQTYDOC', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridSett'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strCERROR + '"';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        //                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalle').getStore().getData().items[0].data;
                                                        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOC, '0,000') + '<b>';
                                                        //                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Tkts', dataIndex: 'lngQTYTKT', width: 50, align: 'center', menuDisabled: true,
                                                listeners: {
                                                    click: 'onGridTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTYTKT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    if (data.STVAL === '3' && data.PENDINGDAYS >= 4) {
                                                        metaData.style += "background-color:#fcec82;";
                                                    }
                                                    if (['1', '4', '5'].includes(data.STVAL)) {
                                                        metaData.style += "background-color:#ddf0d3;";
                                                        value = ''
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-editActionDE',
                                                width: 40,
                                                text: 'View',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'View',
                                                        handler: 'onEditClick'
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
                            id: prototype.id + '-panelGridDataMainCASH',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1262,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainCASH',
                                    width: 1542,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                id: prototype.id + '-columnName01CASH', text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', sortable: false, menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridCountryCash'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'EECC', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Match', dataIndex: 'lngQEECC', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: ''
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTYECC, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    ///aqui validamos 
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridCountryCash'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardS'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridCountryCash'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, hidden: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridCountryCash'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridCountryCash'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 80, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridTotalCORE'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                    
                                                    {
                                                        text: 'Accounted', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 80, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIPE, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sales Reconciliation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'by Ticket', dataIndex: 'lngQTICKET', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTICKET, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Automatic', dataIndex: 'lngQTMATCH', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMATCH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MANUAL',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMANUAL, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'w/o Reconcili.', dataIndex: 'lngQTPEND', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTPEND, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        id: prototype.id + '-editActionAdjustCash',
                                                        width: 60,
                                                        text: 'Adjust.',
                                                        align: 'center',

                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-eye',
                                                                tooltip: 'View',
                                                                handler: 'onGridMPF199',
//                                                                style: 'background-color:#d5f4d5;',
                                                                bodyStyle: 'background-color: #d5f4d5;',

                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Settlement',
                                                hidden:true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cargo',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS2', width: 80,
                                                                listeners: {
                                                                    click: 'onGridDetalleCargo',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS2, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI2', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCASH').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI2, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Mail',
                                                        hidden:true,
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS3', width: 80,
                                                                listeners: {
                                                                    click: 'onGridDetalleCorreo',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS3, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI3', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI3, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataCountryCash',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            height: 'auto',
                            width: 1600,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitleCash',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCountryCash',
                                    width: 1370,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                        listeners: {
                                                            click: 'onGridDayCash'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'NAME', width: 198,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDayCash'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDayCash'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDayCash'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDayCash'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accounted', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                listeners: {
//                                                                    click: 'onGridDetCardSMain'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPOLIPE, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sales Reconciliation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'by Ticket', dataIndex: 'lngQTICKET', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTICKET, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Automatic', dataIndex: 'lngQTMATCH', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMATCH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MANUAL',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTMANUAL, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'w/o Reconcili.', dataIndex: 'lngQTPEND', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_PEND',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryCash').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTPEND, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement',
                                                hidden:true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cargo',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS2', width: 80,
                                                                listeners: {
                                                                    click: 'onGridDetalleCargo'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS2, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI2', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b5f8f9";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI2, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Mail',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTS3', width: 80,
                                                                listeners: {
                                                                    click: 'onGridDetalleCorreo'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQTOTS3, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Contab.', dataIndex: 'lngQPOLI3', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d9fcf3";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountry').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQPOLI3, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        
                        
                        /////////////PAE+NEL MPF199/////////////////////
                        
                        ////////////////////////////////////////////////
                        ////////////////////////////////////////////////////
                        
                        
                        
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMPF199',
                            bodyStyle: 'background: transparent;',
                            border: false,
//                            height: 'auto',
                            width: 1478,
                            height:620,
//                            scrollable: 'vertical',
                            
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bodyPadding: 10,
                            
                            items: [                        
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelMPF199',
                                    labelAlign: 'center',
                                    style: 'font-weight: bold; color: #231223; text-align: center; display: block;',
                                    
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hidden: true
                                },
                                
                                
                                //FILTROS
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'start' ,
                                        margin: '15px 0 15px 15px'
                                    },
                                    margin: '10 0 10 10', // 🔹 margen: arriba, derecha, abajo, izquierda
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Agent :',
                                            padding: '2 0 0 20',
                                            width: 80,
                                            style: {
                                                    'text-align': 'right',
                                                    'font-weight': 'bold'
                                                },
                                        },
                                         { xtype: 'tbspacer', width: 20 },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtINSAGENT',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            width: 100,
                                            enableKeyEvents: false
                                //          listeners: {
                                //              keypress: 'btnSearchMPF199_click'
                                //          }
                                        },
                                        
                                        //fecha
                                        
                                        {
                                            xtype: 'tbspacer',
                                            width: 20
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Date Picker',
                                            layout: 'hbox',
                                            labelStyle: 'font-weight: bold;',
                                            defaults: {
                                                xtype: 'datefield',
                                                format: 'd/m/Y', // formato visible para el usuario
                                                submitFormat: 'Ymd', // formato que se envía al backend (ej. 20251024)
                                                editable: false,
                                                allowBlank: true,
                                                width: 160,
                                                fieldStyle: 'text-align:center'
                                            },
                                            items: [
                                                {
                                                    id: prototype.id + '-txtDATEPICKER',
                                                    name: 'IN_ADATE',
                                                    emptyText: 'Seleccione fecha'
                                                }
                                            ]
                                        },

                                        
                                        
                                        
                                    ]
                                },

                           

                                
                                
                                
                                
                                
                                
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMPF199',
                                    width: 1454,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status',
                                                dataIndex: 'O_STVAL',
                                                width: 100,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";

                                                    switch (value) {
                                                        
                                                        case '3':
                                                        case 3:
                                                            return 'Pending';
                                                        default:
                                                            return 'Match'; // Si no coincide, muestra el valor original
                                                    }
                                                }
                                            },
                                            {
                                                text: 'Value <br> Date',
                                                dataIndex: 'O_ADATE',
                                                width: 120,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Concept',
                                                dataIndex: 'O_CONCEPT',
                                                width: 100,
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";

                                                    const concept = (record.get('O_CONCEPT') || '').trim();
                                                    if (value === 'P') {
                                                        value = 'Positive';
                                                    } else if (value === 'N') {
                                                        value = 'Negative';
                                                     } else if (value === 'X') {
                                                        value = 'No Billing';
                                                    } else if (value === 'A') {
                                                        value = 'Adjusment';
                                                    } else if (value === 'M') {
                                                        value = 'Automatic';
                                                    } else if (value === 'C') {
                                                        value = 'Compensantion';
                                                    } else {
                                                        value = '';
                                                    }

                                                    return value;
                                                }
                                            },
                                            
                                            {
                                                text: 'Type<br>Adjusment',
                                                dataIndex: 'O_TADJ',
                                                width: 150,
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";

                                                    const tadj = (record.get('O_TADJ') || '').trim();
                                                    if (value === 'N') {
                                                        value = 'NON-REMITTANCE';
                                                    } else if (value === 'R') {
                                                        value = 'RECOVERY';
                                                     } else if (value === 'U') {
                                                        value = 'UNCLEARED';
                                                    } else if (value === 'E') {
                                                        value = 'EXCESS';
                                                    } else if (value === 'S') {
                                                        value = 'SHORT';
                                                    }  else {
                                                        value = 'OTROS';
                                                    }

                                                    return value;
                                                }
                                            },
                                            
                                            
                                            {
                                                text: 'Agent',
                                                dataIndex: 'O_SAGENT',
                                                width: 100,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Consol.',
                                                dataIndex: 'O_SCONSOL',
                                                width: 90,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency',
                                                dataIndex: 'O_SCURRENCY',
                                                width: 80,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Neto',
                                                dataIndex: 'O_NETO',
                                                width: 115,
                                                xtype: 'numbercolumn',
                                                summaryType: 'sum', // 🔥 suma automático

                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataMPF199').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.O_SUM_NETO, '0,000.00') + '<b>';
                                                }

                                            },
                                            {
                                                text: 'Issued Payment',
                                                dataIndex: 'O_PAYAMOU',
                                                width: 115,
                                                xtype: 'numbercolumn',
                                                summaryType: 'sum', // 🔥 suma automático
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataMPF199').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.O_SUM_PAYAMOU, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Star <br> Date',
                                                dataIndex: 'O_STRDATE',
                                                width: 80,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'End <br> Date',
                                                dataIndex: 'O_ENDDATE',
                                                width: 80,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }

                                            },
                                            
                                            
                                              {
                                                text: 'Reference',
                                                dataIndex: 'O_REFERENCE',
                                                width: 280,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }

                                            },
                                
                                               {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 42,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit'
//                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }

                                        ]
                                        
                                    }
                                }
                            ]
                        },
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        ////////////////////////////////////////////////
                        ////////////////////////////////////////////////
                        ////////////////////////////////////////////////
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDayCash',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 592,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitleCash2',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDayCash',
                                    width: 592,
                                    columnLines: true,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                id: prototype.id + '-adghFechaDayCash', text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Day', dataIndex: 'SDATE', width: 90, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetalleCash'
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center',
                                                                summaryType: 'sum',
                                                                listeners: {
                                                                    click: 'setGridDataDayBySTVAL'
                                                                },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDayCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center',
                                                                summaryType: 'sum',
                                                                listeners: {
                                                                    click: 'setGridDataDayBySTVAL'
                                                                },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDayCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center',
                                                                summaryType: 'sum',
                                                                listeners: {
                                                                    click: 'setGridDataDayBySTVAL'
                                                                },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDayCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center',
                                                                summaryType: 'sum',
                                                                listeners: {
                                                                    click: 'setGridDataDayBySTVAL'
                                                                },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDayCash').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDayCash').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
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
                            id: prototype.id + '-panelGridDataDetalleCash',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1220,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitleCash3',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetalleCash',
                                    width: 1883,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 140, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Consol', dataIndex: 'SCONSOL', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    value = 'PASAJES'
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Abono <br> Date', dataIndex: 'ADATE', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Source', dataIndex: 'TINPUT', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    if (value === 'B'){
                                                        value = 'BSP'
                                                    } else if (value  = 'I'){
                                                        value = 'ICCS'
                                                    } else if (value = 'A') {
                                                        value = 'ARC'
                                                    } else {
                                                        value = 'Not Source'
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetalleCash').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Pay. Date', dataIndex: 'PAYDATE', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Account', dataIndex: 'ACCNUMBER', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },

                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Settl.', dataIndex: 'lngQTYDOC', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridSett'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strCERROR + '"';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalle').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOC, '0,000') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYTKT', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strCERROR + '"';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalleCash').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYTKT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },

                                            {
                                                text: 'BANDOC', dataIndex: 'BANDOC', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'REFER', dataIndex: 'REFER', width: 120, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.style = "text-align:center; background-color: #d5e8f4;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                           {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEditCash',
                                                width: 80,
                                                text: 'View Cash',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'View',
                                                        handler: 'onEditClickCash'
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
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 1132,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: false,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 572,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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
                                            text: 'Total found',
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
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelTW',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataTeleworking',
                            bodyStyle: 'background: transparent;',
                            width: 1228,
                            titleAlign: 'center',
                            columnLines: true,
                            enableColumnMove: false,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    resizable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Ticket', width: 130, dataIndex: 'strTicket',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            //                                                        var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                            //                                                        metaData.style = 'text-align:center;color:' + color + ';background-color:#CCFFFF;';
                                            //                                                        metaData.tdAttr = 'data-qtip="' + data.strTicket + '"';
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            metaData.unselectableAttr = "unselectable='off'";
                                            return value;
                                        }
                                    },
//                                        {
//                                            text: 'Type', dataIndex: 'strPEM', width: 90,
//                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                var data = record.data;
//                                                var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                metaData.style = "text-align:center;color:" + color + ";";
//                                                metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
//                                                return value;
//                                            }
//                                        },
                                    {
                                        text: 'Status', dataIndex: 'STVAL', width: 140,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                            metaData.style = "text-align:left;color:" + color + ";";
                                            metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Error',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'CERROR', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:left;color:" + color + ";";
                                                    metaData.tdAttr = 'data-qtip="' + data.CERROR + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Src', dataIndex: 'FTE', width: 35,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                            metaData.style = "text-align:center;color:" + color + ";";
                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sales',
                                        id: prototype.id + '-hcDetTkt',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'SDATE', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Country',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'SCOUNTRY', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.SCOUNTRY + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Credit Card',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'SCARCOD', width: 45,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number', width: 130, dataIndex: 'strSCARDN',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = 'text-align:center;color:' + color + ';background-color:#CCFFFF;';
                                                    metaData.tdAttr = 'data-qtip="' + data.strSCARDN + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Author.', dataIndex: 'SAUTHOC', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                            metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'PNR', dataIndex: 'SPNR', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                            metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Agent',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'SAGENT', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Transaction',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'TRNCU', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Days', dataIndex: 'lngDays', width: 45,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
                                            metaData.style = "text-align:center;color:" + color + ";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Bank',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'BSTVAL', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                    metaData.tdAttr = 'data-qtip="' + data.BSTVAL + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flag',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'strFlagStat', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                    metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'View', dataIndex: '', width: 40,
                                        listeners: {
                                            click: 'gridDetMPF101_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip="View"';
                                            var src = 'resources/img/botones/16x16/1326498593_018.png';
                                            return '<a href="#payments-bank-reconciliation-form"><img src="' + src + '"></a>';
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDetailTW',
                            bodyStyle: 'background-color: #E3EAEF;',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnBackTW',
                                    iconCls: 'prx-icon-back',
                                    tooltip: 'Back',
//                                        align: 'center'
                                },
//                                    {xtype: 'label', id: prototype.id + '-labelMPF101', style: 'font-weight:bold;color:#0B333C;'},
                                {
                                    xtype: 'toolbar',
                                    items: [
                                        {xtype: 'tbspacer', width: 120},
                                        {xtype: 'label', id: prototype.id + '-lblSCARCOD_TW', width: 45, style: 'font-weight:bold; text-align:center;'},
//                                            {xtype: 'tbspacer', width: 50},
                                        {xtype: 'label', id: prototype.id + '-lblSCARDN_TW', width: 140, style: 'font-weight:bold;'},
//                                            {xtype: 'tbspacer', width: 220},
                                        {xtype: 'label', id: prototype.id + '-lblSAUTHOC_TW', width: 90, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'label', id: prototype.id + '-lblSCURRENCY_TW', width: 50, style: 'font-weight:bold; text-align:left;'},
                                        {xtype: 'label', id: prototype.id + '-lblSVFOP_TW', width: 100, style: 'font-weight:bold; text-align:left; '},
                                        {xtype: 'tbspacer', width: 120},
                                        {xtype: 'label', id: prototype.id + '-lblSPNR_TW', width: 80, style: 'font-weight:bold;'},
                                        {xtype: 'label', id: prototype.id + '-lblSAGENT_TW', width: 70, style: 'font-weight:bold; text-align:left;'},
                                        {xtype: 'tbspacer', width: 70},
                                        {xtype: 'label', id: prototype.id + '-lblTKT_TW', width: 180, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'textfield', id: prototype.id + '-lblCCUST_TW', hidden: true, width: 180, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'textfield', id: prototype.id + '-lblCCIA_TW', hidden: true, width: 180, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'textfield', id: prototype.id + '-lblFORMA_TW', hidden: true, width: 180, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'textfield', id: prototype.id + '-lblSERIE_TW', hidden: true, width: 180, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'textfield', id: prototype.id + '-lblTDOC_TW', hidden: true, width: 180, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'textfield', id: prototype.id + '-lblSCARDNCOR_TW', hidden: true, width: 180, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'textfield', id: prototype.id + '-txtSAUTHOC_TW', hidden: true, width: 180, style: 'font-weight:bold; text-align:center;'},
                                        {xtype: 'tbspacer', width: 104},
                                        {
                                            sortable: false,
                                            xtype: 'button',
                                            width: 40,
                                            align: 'center',
                                            iconCls: 'prx-icon-edit',
                                            tooltip: 'View',
                                            listeners: {
                                                click: 'onEditClick_ticket_TW'
                                            },
                                        },
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailTeleworking',
                                    width: 1237,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'TD', dataIndex: 'TDOC', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    let strTDOC = value == 'S' ? 'Sales' : 'Debits'
                                                    metaData.tdAttr = 'data-qtip="' + strTDOC + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author. Code', dataIndex: 'SAUTHOC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataTeleworking').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Merchant', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'SPNR', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onViewDet'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            if (data.SCARCOD == 'AX' && data.SCOUNTRY == 'MX') {
                                                                return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            } else {
                                                                return value;
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }

                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Poliza1',
                                                columns: [
                                                    {
                                                        text: 'ID', dataIndex: 'BANDOC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flag ', dataIndex: 'STCON', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Tkts', dataIndex: 'lngQTYTKT', width: 50, align: 'center', menuDisabled: true,
                                                listeners: {
                                                    click: 'onGridTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataTeleworking').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTYTKT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'View',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'View',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                                
                                
                                
                                
                               
                                
                            ]
                        },
                        
                         //AGREGAMOS PANEL 
                         
                         
                        
                        
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-paginacionTW',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 1132,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            //                                    defaults: {
                            //                                        border: false,
                            //                                        padding: '0px 5px 0px 5px'
                            //                                    },
                            //                                    padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 572,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        //                                                margin: '3px 0px 0px 5px'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPageTW',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCountTW',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-totalTW',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


