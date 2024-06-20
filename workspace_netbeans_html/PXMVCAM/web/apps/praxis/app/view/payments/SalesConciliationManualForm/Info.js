valor = '0';
Ext.define('Ext.Praxis.view.payments.SalesConciliationManualForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1800,
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
//PRIMERA GRILLA: AÑO,MES                       
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1580,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 682,
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
                                                            click: 'onGridDayMain'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                text: 'Settlement', // Settlement
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    
                                                    {
                                                        text: 'Match', dataIndex: 'lngQSETTMATCH', width: 100, //PROCESS lngQTKT
                                                        listeners: {
                                                            click: 'onGridDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSETTMATCH, '0,000');
                                                        }
                                                            
                                                       
                                                    },
                                                    {
                                                        text: 'Not Processed', dataIndex: 'lngQSETTPEND', width: 100, align: 'center', menuDisabled: true, // NO PROCESS lngQNPROC
                                                        listeners: {
                                                            click: 'onGridDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSETTPEND, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSETT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSETT, '0,000');
                                                        }
                                                            
                                                       
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Ticket', //TICKET
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match', dataIndex: 'lngQTKTMATCH', width: 100, align: 'center', menuDisabled: true, // PROCESS lngQSETT
                                                        listeners: {
                                                            click: 'onGridDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTKTMATCH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Not Processed', dataIndex: 'lngQTKTPEND', width: 100, align: 'center', menuDisabled: true, //NO PROCESS
                                                        listeners: {
                                                            click: 'onGridDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTKTPEND, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTKT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQTKT, '0,000');
                                                        }
                                                            
                                                       
                                                    }
                                                ],
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
//GRILLA: AÑO,MES,DIA - 2DA BAJADA                       
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMainDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1580,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainDay',
                                    width: 682,
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
                                                        text: 'Date', dataIndex: 'PRDA', width: 80, align: 'center', sortable: false, menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetalleByDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement', // Settlement
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    
                                                    {
                                                        text: 'Match', dataIndex: 'lngQSETTMATCH', width: 100, //PROCESS lngQTKT
                                                        listeners: {
                                                            click: 'onGridDetalleByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainDay').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSETTMATCH, '0,000');
                                                        }
                                                            
                                                       
                                                    },
                                                    {
                                                        text: 'Not Processed', dataIndex: 'lngQSETTPEND', width: 100, align: 'center', menuDisabled: true, // NO PROCESS lngQNPROC
                                                        listeners: {
                                                            click: 'onGridDetalleByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSETTPEND, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSETT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainDay').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSETT, '0,000');
                                                        }
                                                            
                                                       
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Ticket', //TICKET
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match', dataIndex: 'lngQTKTMATCH', width: 100, align: 'center', menuDisabled: true, // PROCESS lngQSETT
                                                        listeners: {
                                                            click: 'onGridDetalleByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTKTMATCH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Not Processed', dataIndex: 'lngQTKTPEND', width: 100, align: 'center', menuDisabled: true, //NO PROCESS
                                                        listeners: {
                                                            click: 'onGridDetalleByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTKTPEND, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTKT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainDay').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQTKT, '0,000');
                                                        }
                                                            
                                                       
                                                    }
                                                ],
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
//SEGUNDA GRILLA: DIAS
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDate',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1375,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDate',
                                    width: 402,
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
                                                text: 'Date', dataIndex: 'PRDA', width: 100, align: 'center', sortable: false, menuDisabled: true, //flex: 1
                                                listeners: {
                                                    click: 'onGridDetail'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-sales-conciliation-manual-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDate').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                    return '<b>' + 'Total' + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Qty', dataIndex: 'TOT_QTY', width: 100, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDate').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQty, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 100, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return value
                                                },
//                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridDataDate').getStore().getData().items[0].data;
//                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                    return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
//                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'TOT_SVFOP', width: 100, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDate').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotAmount, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
//TERCERA GRILLA: DETALLE
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDet',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden:true,
                            width: 832,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDet',
                                    width: 832,
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
                                            {text: 'Date', dataIndex: 'PRDA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            
                                            {text: 'Concep', dataIndex: 'FCONCEP', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    let strConcep = ''
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    strConcep = value == 'I' ? 'Settlement' : 'Sales';
                                                    metaData.tdAttr = 'data-qtip="' + strConcep + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'TKT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            
                                            {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },                                            
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Seq.', dataIndex: 'SEQ', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'User', dataIndex: 'USERF', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;";
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetByF',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden:true,
                            width: 832,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetByF',
                                    width: 832,
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
                                            {text: 'Date', dataIndex: 'PRDA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            
                                            {text: 'Concep', dataIndex: 'FCONCEP', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    let strConcep = ''
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    strConcep = value == 'I' ? 'Settlement' : 'Sales';
                                                    metaData.tdAttr = 'data-qtip="' + strConcep + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'TKT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            
                                            {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },                                            
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Seq.', dataIndex: 'SEQ', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'User', dataIndex: 'USERF', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;";
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetByD',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden:true,
                            width: 832,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetByD',
                                    width: 832,
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
                                            {text: 'Date', dataIndex: 'PRDA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            
                                            {text: 'Concep', dataIndex: 'FCONCEP', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    let strConcep = ''
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    strConcep = value == 'I' ? 'Settlement' : 'Sales';
                                                    metaData.tdAttr = 'data-qtip="' + strConcep + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'TKT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            
                                            {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },                                            
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Seq.', dataIndex: 'SEQ', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'User', dataIndex: 'USERF', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;";
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden:true,
                            width: 832,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetByS',
                                    width: 832,
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
                                            {text: 'Date', dataIndex: 'PRDA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    let strStatus = value == '5' ? "Match Manual" : "Pendiente"
                                                    return strStatus;
                                                }
                                            },
                                            
                                            {text: 'Concep', dataIndex: 'FCONCEP', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    let strConcep = ''
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    strConcep = value == 'I' ? 'Settlement' : 'Sales';
                                                    metaData.tdAttr = 'data-qtip="' + strConcep + '"';
                                                    let descConcept = value == 'I' ? "Settlement" : "Ticket"
                                                    return descConcept;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'TKT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            
                                            {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },                                            
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Seq.', dataIndex: 'SEQ', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#244066;background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'User', dataIndex: 'USERF', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;";
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                },
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
                            width: 832,
                            margin: '10 0 0 0 ',
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 832,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
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


