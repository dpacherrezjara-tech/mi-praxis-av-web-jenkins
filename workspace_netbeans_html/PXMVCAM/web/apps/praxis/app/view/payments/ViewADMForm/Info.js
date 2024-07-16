valor = '0';
Ext.define('Ext.Praxis.view.payments.ViewADMForm.Info', {
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
                            width: 722,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 722,
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
                                                id: prototype.id + '-columnName02', text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', sortable: false, menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridCountry'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#B6D8EE;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
//                                            {
//                                                text: 'ADM', // Settlement
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    
//                                                    {
//                                                        text: 'Total', dataIndex: 'lngQTKT', width: 100, //PROCESS lngQTKT
//                                                        listeners: {
//                                                            click: 'onGridCountryByF'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#B6D8EE;";
//                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            metaData.style = "text-align:right;";
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                            return Ext.util.Format.number(data.lngTotQTKT, '0,000');
//                                                        }
//                                                            
//                                                       
//                                                    },
//                                                    {
//                                                        sortable: false,
//                                                        xtype: 'actioncolumn',
////                                                        id: prototype.id + '-editActionDELiqDetail',
//                                                        width: 40,
//                                                        text: 'View',
//                                                        align: 'center',
//                                                        
//                                                        items: [
//                                                            {
//                                                                iconCls: 'prx-icon-eye',
//                                                                tooltip: 'View',
//                                                                handler: 'onViewClickTotal',
////                                                                style: 'background-color:#d5f4d5;',
//                                                                bodyStyle: 'background-color: #d5f4d5;',
//                                                                
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSENT', width: 100, align: 'center', menuDisabled: true, // NO PROCESS lngQNPROC
                                                        listeners: {
                                                            click: 'onGridCountryByF'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B6D8EE;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSENT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    
//                                                    {
//                                                        sortable: false,
//                                                        xtype: 'actioncolumn',
////                                                        id: prototype.id + '-editActionDELiqDetail',
//                                                        width: 40,
//                                                        text: 'View',
//                                                        align: 'center',
//                                                        
//                                                        items: [
//                                                            {
//                                                                iconCls: 'prx-icon-eye',
//                                                                tooltip: 'View',
//                                                                handler: 'onViewClickSent',
////                                                                style: 'background-color:#d5f4d5;',
//                                                                bodyStyle: 'background-color: #d5f4d5;',
//                                                                
//                                                            }
//                                                        ]
//                                                    },
//                                                    {
//                                                        text: 'Pendings', dataIndex: 'lngQNSENT', width: 100,
//                                                        listeners: {
//                                                            click: 'onGridCountryByF'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#B6D8EE;";
//                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            metaData.style = "text-align:right;";
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
//                                                            return Ext.util.Format.number(data.lngTotQNSENT, '0,000');
//                                                        }
//                                                            
//                                                       
//                                                    },
//                                                    {
//                                                        sortable: false,
//                                                        xtype: 'actioncolumn',
////                                                        id: prototype.id + '-editActionDELiqDetail',
//                                                        width: 40,
//                                                        text: 'View',
//                                                        align: 'center',
//                                                        
//                                                        items: [
//                                                            {
//                                                                iconCls: 'prx-icon-eye',
//                                                                tooltip: 'View',
//                                                                handler: 'onViewClickPend',
////                                                                style: 'background-color:#d5f4d5;',
//                                                                bodyStyle: 'background-color: #d5f4d5;',
//                                                                
//                                                            }
//                                                        ]
//                                                    },
//                                                ]
//                                            },
                                            {
                                                text: 'Sent', 
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                   
                                                    {
                                                        text: 'Not Answered', dataIndex: 'lngQSENTPEND', width: 100, align: 'center', menuDisabled: true, // PROCESS lngQSETT
                                                        listeners: {
                                                            click: 'onGridCountryByF'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSENTPEND, '0,000') + '<b>';
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
                                                                iconCls: 'prx-icon-eye',
                                                                tooltip: 'View',
                                                                handler: 'onViewClickSentPend',
//                                                                style: 'background-color:#d5f4d5;',
                                                                bodyStyle: 'background-color: #d5f4d5;',
                                                                
                                                            }
                                                        ]
                                                    },
                                                     {
                                                        text: 'Answered', dataIndex: 'lngQSENTANS', width: 100, align: 'center', menuDisabled: true, // PROCESS lngQSETT
                                                        listeners: {
                                                            click: 'onGridCountryByF'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSENTANS, '0,000') + '<b>';
                                                        }
                                                    },
//                                                    {
//                                                        sortable: false,
//                                                        xtype: 'actioncolumn',
////                                                        id: prototype.id + '-editActionDELiqDetail',
//                                                        width: 40,
//                                                        text: 'View',
//                                                        align: 'center',
//                                                        
//                                                        items: [
//                                                            {
//                                                                iconCls: 'prx-icon-eye',
//                                                                tooltip: 'View',
//                                                                handler: 'onViewClickAns',
////                                                                style: 'background-color:#d5f4d5;',
//                                                                bodyStyle: 'background-color: #d5f4d5;',
//                                                                
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Accepted', dataIndex: 'lngQSENTACCEP', width: 100, align: 'center', menuDisabled: true, //NO PROCESS
                                                        listeners: {
                                                            click: 'onGridCountryByF'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSENTACCEP, '0,000') + '<b>';
                                                        }
                                                    },
//                                                    {
//                                                        sortable: false,
//                                                        xtype: 'actioncolumn',
////                                                        id: prototype.id + '-editActionDELiqDetail',
//                                                        width: 40,
//                                                        text: 'View',
//                                                        align: 'center',
//                                                        
//                                                        items: [
//                                                            {
//                                                                iconCls: 'prx-icon-eye',
//                                                                tooltip: 'View',
//                                                                handler: 'onViewClickAccep',
////                                                                style: 'background-color:#d5f4d5;',
//                                                                bodyStyle: 'background-color: #d5f4d5;',
//                                                                
//                                                            }
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Rejected', dataIndex: 'lngQSENTREJ', width: 100,
                                                        listeners: {
                                                            click: 'onGridCountryByF'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQSENTREJ, '0,000');
                                                        }
                                                            
                                                       
                                                    },
                                                    {
                                                        text: 'Adjustment', dataIndex: 'lngQADJ', width: 100, align: 'center', menuDisabled: true, // NO PROCESS lngQNPROC
                                                        listeners: {
                                                            click: 'onGridCountryByF'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B6D8EE;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQADJ, '0,000') + '<b>';
                                                        }
                                                    },
//                                                    {
//                                                        sortable: false,
//                                                        xtype: 'actioncolumn',
//                                                        width: 40,
//                                                        text: 'View',
//                                                        align: 'center',
//                                                        
//                                                        items: [
//                                                            {
//                                                                iconCls: 'prx-icon-eye',
//                                                                tooltip: 'View',
//                                                                handler: 'onViewClickSentRejec',
////                                                                style: 'background-color:#d5f4d5;',
//                                                                bodyStyle: 'background-color: #d5f4d5;',
//                                                                
//                                                            }
//                                                        ]
//                                                    },
                                                ],
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
//BAJADA POR PAIS: SCOUNTRY
                       {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataCountryByF',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 602,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCountryByF',
                                    width: 602,
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
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridCardByF'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    
                                                    {
                                                        text: 'Name', dataIndex: 'strDescCountry', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'View',
                                                        align: 'center',
                                                        
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-eye',
                                                                tooltip: 'View',
                                                                handler: 'onViewClickCountry',
//                                                                style: 'background-color:#d5f4d5;',
                                                                bodyStyle: 'background-color: #d5f4d5;',
                                                                
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Qty', dataIndex: 'TOT_QTY', width: 100, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryByF').getStore().getData().items[0].data;
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

                                            },
                                            {
                                                text: 'Amount', dataIndex: 'TOT_SVFOP', width: 100, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCountryByF').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotAmount, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
//BAJADA POR AGENTE - AGENT
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataCardByF',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 502,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCardByF',
                                    width: 502,
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
                                                text: 'Agent',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAGENT', width: 100, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDetailByF'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'SAGENTN', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENTN + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Qty', dataIndex: 'TOT_QTY', width: 100, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCardByF').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQty, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'TOT_SVFOP', width: 100, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCardByF').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotAmount, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
//BAJADA A DETALLE
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDet',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden:true,
                            width: 1302,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDet',
                                    bodyStyle: 'background: transparent;',
                                    width: 1302,
                                    titleAlign: 'center',
                                    columnLines: true,
                                    enableColumnMove: false,
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 135,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                    metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number',  width: 120, dataIndex: 'strTicket', //enableTextSelection :true,
                                                listeners: {
                                                    click: 'gridData_act1_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
//                                                id: prototype.id + '-hcDetTktS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Send Date', dataIndex: 'DSEND', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DSEND + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Day Diff', dataIndex: 'DIFFD', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DIFFD + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Number', width: 150, dataIndex: 'strDescCard',
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
                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOPS', width: 105,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    console.log(value, 'amount detalle')
                                                    return win.formatDblNumber(value);
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'ERROR', width: 155,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:left;color:" + color + ";";
                                                            metaData.tdAttr = 'data-qtip="' + data.ERROR + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'View', dataIndex: '', width: 40,
                                                listeners: {
                                                    click: 'viewDataEntry_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="View"';
                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                    return '<a href="#payments-view-A-D-M-form"><img src="' + src + '"></a>';
                                                }
                                            }
                                        ]
                                    },
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetDetailByF',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden:true,
                            width: 1302,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDetailByF',
                                    bodyStyle: 'background: transparent;',
                                    width: 1302,
                                    titleAlign: 'center',
                                    columnLines: true,
                                    enableColumnMove: false,
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 135,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                    metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number',  width: 120, dataIndex: 'strTicket', //enableTextSelection :true,
                                                listeners: {
                                                    click: 'gridData_act1_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                id: prototype.id + '-hcDetTktS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Send Date', dataIndex: 'DSEND', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DSEND + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Day Diff', dataIndex: 'DIFFD', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DIFFD + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Number', width: 150, dataIndex: 'strDescCard',
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
                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOPS', width: 105,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    console.log(value, 'amount detalle')
                                                    return win.formatDblNumber(value);
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'ERROR', width: 155,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:left;color:" + color + ";";
                                                            metaData.tdAttr = 'data-qtip="' + data.ERROR + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'View', dataIndex: '', width: 40,
                                                listeners: {
                                                    click: 'viewDataEntry_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="View"';
                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                    return '<a href="#payments-view-A-D-M-form"><img src="' + src + '"></a>';
                                                }
                                            }
                                        ]
                                    },
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetDetailByEyes',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden:true,
                            width: 1302,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDetailByEyes',
                                    bodyStyle: 'background: transparent;',
                                    width: 1302,
                                    titleAlign: 'center',
                                    columnLines: true,
                                    enableColumnMove: false,
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 135,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                    metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number',  width: 120, dataIndex: 'strTicket', //enableTextSelection :true,
                                                listeners: {
                                                    click: 'gridData_act1_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
//                                                id: prototype.id + '-hcDetTktS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Send Date', dataIndex: 'DSEND', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DSEND + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Day Diff', dataIndex: 'DIFFD', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DIFFD + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Number', width: 150, dataIndex: 'strDescCard',
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
                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOPS', width: 105,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    console.log(value, 'amount detalle')
                                                    return win.formatDblNumber(value);
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'ERROR', width: 155,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:left;color:" + color + ";";
                                                            metaData.tdAttr = 'data-qtip="' + data.ERROR + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            
                                            {
                                                text: 'View', dataIndex: '', width: 40,
                                                listeners: {
                                                    click: 'viewDataEntry_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="View"';
                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                    return '<a href="#payments-view-A-D-M-form"><img src="' + src + '"></a>';
                                                }
                                            }
                                        ]
                                    },
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetDetailByEyesCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            hidden:true,
                            width: 1302,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDetailByEyesCountry',
                                    bodyStyle: 'background: transparent;',
                                    width: 1302,
                                    titleAlign: 'center',
                                    columnLines: true,
                                    enableColumnMove: false,
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 135,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                    metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number',  width: 120, dataIndex: 'strTicket', //enableTextSelection :true,
                                                listeners: {
                                                    click: 'gridData_act1_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return '<a href="#payments-view-A-D-M-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
//                                                id: prototype.id + '-hcDetTktS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Send Date', dataIndex: 'DSEND', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DSEND + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Day Diff', dataIndex: 'DIFFD', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DIFFD + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Number', width: 150, dataIndex: 'strDescCard',
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
                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOPS', width: 105,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    console.log(value, 'amount detalle')
                                                    return win.formatDblNumber(value);
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                        text: 'Code', dataIndex: 'ERROR', width: 155,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:left;color:" + color + ";";
                                                            metaData.tdAttr = 'data-qtip="' + data.ERROR + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            
                                            {
                                                text: 'View', dataIndex: '', width: 40,
                                                listeners: {
                                                    click: 'viewDataEntry_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="View"';
                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                    return '<a href="#payments-view-A-D-M-form"><img src="' + src + '"></a>';
                                                }
                                            }
                                        ]
                                    },
                                }
                            ]
                        },
//DETALLES
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 967,
                            margin: '10 0 0 0 ',
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 967,
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


