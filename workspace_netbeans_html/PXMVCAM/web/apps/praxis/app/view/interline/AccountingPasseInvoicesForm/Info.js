/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.interline.AccountingPasseInvoicesForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            //width: 1550,
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
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            width: '100%',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                // --------------------------   PANEL MAIN DATA---------------------
                                // -----------------------------------------------------------------

                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGrid',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    padding: '1',
                                    margin: '0 0 0 30',
                                    border: false,
                                    //width: 100,    
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
//                                            xtype: 'treepanel',
                                            padding: '20 0 30 0',
                                            id: prototype.id + '-gridData',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 395,
                                            width: 1795,
                                            columnLines: true,
                                            resizable: false,
//                                            rootVisible: false,
//                                            plugins: {
//                                                ptype: 'cellediting',
//                                                clicksToEdit: 1
//                                            },
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Date',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Accounting', width: 100, dataIndex: 'typeDate', id: prototype.id + '-typeDate',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return '<b>' + value + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Date',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Bill.', width: 100, dataIndex: 'strFormatDate',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return '<b>' + value + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Period',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Number', width: 70, dataIndex: 'PERNUM',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'background-color:#e0f5ff;';
                                                                    return '<b>' + value + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Source',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Cod', width: 70, dataIndex: 'SOURCOD',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#ECF6CE;";
                                                                    return '<b>' + value + '<b>';
                                                                }
                                                            },
                                                            {text: 'Description', width: 300, dataIndex: 'SOURDES',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'GROSS', width: 120, dataIndex: 'TGROSS',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'ISC', width: 120, dataIndex: 'TISC',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'TAX', width: 120, dataIndex: 'TTAX',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Other', width: 120, dataIndex: 'TOHCOM',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOHCOM, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'FEE', width: 120, dataIndex: 'HFEEAM',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'UATP', width: 120, dataIndex: 'TUATP',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'NET', width: 120, dataIndex: 'TNET',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Accounting <br> ID', width: 200, dataIndex: 'IDCON',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Date',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Creation', width: 100, dataIndex: 'FECR',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return '<b>' + value + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelContaIXC',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            margin: '20 0 0 600',
//                                            height: 472, 
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-labelTitleIXC',
//                                                            text: 'Interline Receivables',
                                                    html: '<strong style="color:#000;">Interline Receivables Accounting</strong>',
                                                    labelAlign: 'center',
                                                    labelStyle: 'color:#231223',
                                                    align: 'center',
                                                    margin: '10 0 10 0',
                                                    hide: true
                                                },
                                                {
                                                    xtype: 'grid',
//                                                    padding: '0 0 0 0',
                                                    id: prototype.id + '-gridContaIXC',
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    height: 210,
                                                    width: 1024,
                                                    columnLines: true,
                                                    resizable: false,
                                                    features: [{
                                                            ftype: 'summary',
                                                            dock: 'bottom'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Concept', width: 300, dataIndex: 'A1964TITU',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#e0f5ff;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Account', width: 350, dataIndex: 'CUENTA',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#e0f5ff;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Currency', width: 80, dataIndex: 'A1964CUR',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#e0f5ff;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Cargo', width: 140, dataIndex: 'A1964ACTIV',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridContaIXC').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACTIVO, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Abono', width: 140, dataIndex: 'A1964PASIV',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridContaIXC').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPASIVO, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]},
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelContaIXP',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            margin: '20 0 0 600',
//                                            height: 472, 
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-labelTitleIXP',
//                                                            text: 'Interline Receivables',
                                                    html: '<strong style="color:#000;">Interline Payable Accounting</strong>',
                                                    labelAlign: 'center',
                                                    labelStyle: 'color:#231223',
                                                    align: 'center',
                                                    margin: '10 0 10 0',
                                                    hide: true
                                                },
                                                {
                                                    xtype: 'grid',
//                                                    padding: '0 0 0 0',
                                                    id: prototype.id + '-gridContaIXP',
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    height: 210,
                                                    width: 1024,
                                                    columnLines: true,
                                                    resizable: false,
                                                    features: [{
                                                            ftype: 'summary',
                                                            dock: 'bottom'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Concepto', width: 300, dataIndex: 'A1965TITU',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#e0f5ff;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Cuenta', width: 350, dataIndex: 'CUENTA',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#e0f5ff;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Currency', width: 80, dataIndex: 'A1965CUR',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#e0f5ff;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Cargo', width: 140, dataIndex: 'A1965ACTIV',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridContaIXP').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACTIVO, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Abono', width: 140, dataIndex: 'A1965PASIV',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridContaIXP').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPASIVO, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]},
                                        
                                        
                                         /*
                                                 {
                                                 xtype: 'panel',
                                                 id: prototype.id + '-panelGrid2',
                                                 bodyStyle: 'background-color: #E3EAF9;',
                                                 //                                            padding: '1',
                                                 border: false,
                                                 //width: 100,    
                                                 layout: {
                                                 type: 'hbox',
                                                 align: 'center'
                                                 },
                                                 items: [
                                                 {
                                                 xtype: 'panel',
                                                 id: prototype.id + '-panelIXC',
                                                 bodyStyle: 'background-color: #E3EAF9;',
                                                 border: false,
                                                 height: 620,
                                                 layout: {
                                                 type: 'vbox',
                                                 align: 'center'
                                                 },
                                                 items: [
                                                 {
                                                 xtype: 'label',
                                                 id: prototype.id + '-labelTitle1',
                                                 //                                                            text: 'Interline Receivables',
                                                 html: '<strong style="color:#000;">Interline Receivables</strong>',
                                                 labelAlign: 'center',
                                                 labelStyle: 'color:#231223',
                                                 align: 'center',
                                                 margin: '10 0 0 0',
                                                 hide: true
                                                 },
                                                 {
                                                 //xtype: 'grid',
                                                 xtype: 'treepanel',
                                                 padding: '20 0 0 0',
                                                 id: prototype.id + '-gridDataX',
                                                 bodyStyle: 'background-color: #E3EAEF;',
                                                 height: 400,
                                                 width: 855,
                                                 columnLines: true,
                                                 resizable: false,
                                                 features: [{
                                                 ftype: 'summary'
                                                 }
                                                 ],
                                                 rootVisible: false,
                                                 plugins: {
                                                 ptype: 'cellediting',
                                                 clicksToEdit: 1
                                                 },
                                                 columns: {
                                                 defaults: {
                                                 menuDisabled: true,
                                                 sortable: true,
                                                 resizable: false,
                                                 align: 'center'
                                                 },
                                                 items: [
                                                 {xtype: 'treecolumn', text: 'Accounting<br>Date', width: 120, dataIndex: 'A1964FCONT',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 metaData.style = ' color:#008FE3;text-align:left;text-decoration:none;';
                                                 return '<b>' + value + '<b>';
                                                 },
                                                 //                                                listeners: {
                                                 //                                                    click: 'onViewDataDetailSFI30'
                                                 //                                                }
                                                 },
                                                 {text: 'Source',
                                                 defaults: {
                                                 menuDisabled: true,
                                                 sortable: true,
                                                 align: 'center',
                                                 border: true
                                                 },
                                                 columns: [
                                                 {text: 'Cod', width: 70, dataIndex: 'A1964TUSO',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 return '<b>' + value + '<b>';
                                                 },
                                                 },
                                                 {text: 'Description', width: 300, dataIndex: 'DES_SOURCOD',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 metaData.style = 'text-align:left;';
                                                 return value;
                                                 }
                                                 }
                                                 ]
                                                 },
                                                 {text: 'Currency', width: 70, dataIndex: 'A1964CUR',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 if (record.data.children !== null) {
                                                 return '<b>' + value + '<b>';
                                                 } else {
                                                 return value;
                                                 }
                                                 }
                                                 },
                                                 {text: 'Total',
                                                 defaults: {
                                                 menuDisabled: true,
                                                 sortable: true,
                                                 align: 'center',
                                                 border: true
                                                 },
                                                 columns: [
                                                 {text: 'Active', width: 120, dataIndex: 'QTY_ACTIV',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 metaData.style = 'text-align:right;';
                                                 //                                                            if(rowIndex === 0) {
                                                 if (record.data.children !== null) {
                                                 return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                 } else {
                                                 return Ext.util.Format.number(value, '0,000.00');
                                                 }
                                                 }
                                                 }
                                                 ]
                                                 },
                                                 {text: 'Total',
                                                 defaults: {
                                                 menuDisabled: true,
                                                 sortable: true,
                                                 align: 'center',
                                                 border: true
                                                 },
                                                 columns: [
                                                 {text: 'Passive', width: 120, dataIndex: 'QTY_PASIV',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 metaData.style = 'text-align:right;';
                                                 //                                                            if(rowIndex === 0) {
                                                 if (record.data.children !== null) {
                                                 return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                 } else {
                                                 return Ext.util.Format.number(value, '0,000.00');
                                                 }
                                                 }
                                                 }
                                                 ]
                                                 },
                                                 {
                                                 sortable: false,
                                                 xtype: 'actioncolumn',
                                                 width: 40,
                                                 text: '',
                                                 align: 'center',
                                                 items: [
                                                 {
                                                 iconCls: 'prx-icon-excel',
                                                 tooltip: 'Download Excel',
                                                 handler: 'onDownLoad'
                                                 }
                                                 ],
                                                 renderer: function (a, b, c) {
                                                 //                                                    console.log(a);
                                                 //                                                    console.log(b);
                                                 //                                                    console.log(c.childNodes);
                                                 return a;
                                                 }
                                                 }
                                                 ]
                                                 }
                                                 },
                                                 {
                                                 xtype: 'panel',
                                                 id: prototype.id + '-SummaryGridDataX',
                                                 width: 855,
                                                 align: 'left',
                                                 margin: '0 0 0 0 ',
                                                 layout: {
                                                 type: 'hbox',
                                                 align: 'center'
                                                 },
                                                 defaults: {
                                                 xtype: 'label',
                                                 align: 'center',
                                                 html: '' + '&nbsp',
                                                 height: 25,
                                                 padding: '5 5 5 0',
                                                 style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                                 },
                                                 items: [
                                                 {width: 120},
                                                 {width: 70},
                                                 {width: 300},
                                                 {width: 70},
                                                 {width: 120, id: prototype.id + '-idActive'},
                                                 {width: 120, id: prototype.id + '-idPassive'},
                                                 {width: 51}
                                                 ]
                                                 }
                                                 ]
                                                 },
                                                 {xtype: 'tbspacer', width: 50},
                                                 {
                                                 xtype: 'panel',
                                                 id: prototype.id + '-panelIXP',
                                                 bodyStyle: 'background-color: #E3EAF9;',
                                                 border: false,
                                                 height: 620,
                                                 //width: 100,    
                                                 layout: {
                                                 type: 'vbox',
                                                 align: 'center'
                                                 },
                                                 items: [
                                                 {
                                                 xtype: 'label',
                                                 id: prototype.id + '-labelTitle1xPagar',
                                                 //                                                            text: 'Interline Payable',
                                                 html: '<strong style="color:#000;">Interline Payable</strong>',
                                                 //                                                            labelAlign: 'center',
                                                 //                                                            labelStyle : 'font-weight:bold;',
                                                 align: 'center',
                                                 margin: '10 0 0 0',
                                                 hide: true,
                                                 style: {
                                                 //background : '#6699FF',
                                                 color: 'black',
                                                 textAlign: 'center'
                                                 }
                                                 },
                                                 {
                                                 //                                    xtype: 'grid',
                                                 xtype: 'treepanel',
                                                 padding: '20 0 0 0',
                                                 id: prototype.id + '-gridDataxPagar',
                                                 bodyStyle: 'background-color: #E3EAEF;',
                                                 height: 400,
                                                 width: 855,
                                                 columnLines: true,
                                                 resizable: false,
                                                 features: [{
                                                 ftype: 'summary'
                                                 }
                                                 ],
                                                 rootVisible: false,
                                                 plugins: {
                                                 ptype: 'cellediting',
                                                 clicksToEdit: 1
                                                 },
                                                 columns: {
                                                 defaults: {
                                                 menuDisabled: true,
                                                 sortable: true,
                                                 resizable: false,
                                                 align: 'center'
                                                 },
                                                 items: [
                                                 {xtype: 'treecolumn', text: 'Accounting<br>Date', width: 120, dataIndex: 'A1965FCONT',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 metaData.style = ' color:#008FE3;text-align:left;text-decoration:none;';
                                                 return '<b>' + value + '<b>';
                                                 },
                                                 //                                                listeners: {
                                                 //                                                    click: 'onViewDataDetailSFI30'
                                                 //                                                }
                                                 },
                                                 {text: 'Source',
                                                 defaults: {
                                                 menuDisabled: true,
                                                 sortable: true,
                                                 align: 'center',
                                                 border: true
                                                 },
                                                 columns: [
                                                 {text: 'Cod', width: 70, dataIndex: 'A1965TUSO',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 return '<b>' + value + '<b>';
                                                 },
                                                 },
                                                 {text: 'Description', width: 300, dataIndex: 'DES_SOURCOD',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 metaData.style = 'text-align:left;';
                                                 return value;
                                                 }
                                                 }
                                                 ]
                                                 },
                                                 {text: 'Currency', width: 70, dataIndex: 'A1965CUR',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 if (record.data.children !== null) {
                                                 return '<b>' + value + '<b>';
                                                 } else {
                                                 return value;
                                                 }
                                                 }
                                                 },
                                                 {text: 'Total',
                                                 defaults: {
                                                 menuDisabled: true,
                                                 sortable: true,
                                                 align: 'center',
                                                 border: true
                                                 },
                                                 columns: [
                                                 {text: 'Active', width: 120, dataIndex: 'QTY_ACTIV',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 metaData.style = 'text-align:right;';
                                                 //                                                            if(rowIndex === 0) {
                                                 if (record.data.children !== null) {
                                                 return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                 } else {
                                                 return Ext.util.Format.number(value, '0,000.00');
                                                 }
                                                 }
                                                 }
                                                 ]
                                                 },
                                                 {text: 'Total',
                                                 defaults: {
                                                 menuDisabled: true,
                                                 sortable: true,
                                                 align: 'center',
                                                 border: true
                                                 },
                                                 columns: [
                                                 {text: 'Passive', width: 120, dataIndex: 'QTY_PASIV',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                 metaData.style = 'text-align:right;';
                                                 //                                                            if(rowIndex === 0) {
                                                 if (record.data.children !== null) {
                                                 return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                 } else {
                                                 return Ext.util.Format.number(value, '0,000.00');
                                                 }
                                                 }
                                                 }
                                                 ]
                                                 },
                                                 {
                                                 sortable: false,
                                                 xtype: 'actioncolumn',
                                                 width: 40,
                                                 text: '',
                                                 align: 'center',
                                                 items: [
                                                 {
                                                 iconCls: 'prx-icon-excel',
                                                 tooltip: 'Download Excel',
                                                 }
                                                 ],
                                                 renderer: function (a, b, c) {
                                                 //                                                    console.log(a);
                                                 //                                                    console.log(b);
                                                 //                                                    console.log(c.childNodes);
                                                 return a;
                                                 }
                                                 }
                                                 ]
                                                 }
                                                 },
                                                 {
                                                 xtype: 'panel',
                                                 id: prototype.id + '-SummaryGridDataxPagar',
                                                 width: 855,
                                                 align: 'left',
                                                 margin: '0 0 0 0 ',
                                                 layout: {
                                                 type: 'hbox',
                                                 align: 'center'
                                                 },
                                                 defaults: {
                                                 xtype: 'label',
                                                 align: 'center',
                                                 html: '' + '&nbsp',
                                                 height: 25,
                                                 padding: '5 5 5 0',
                                                 style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                                 },
                                                 items: [
                                                 {width: 120},
                                                 {width: 70},
                                                 {width: 300},
                                                 {width: 70},
                                                 {width: 120, id: prototype.id + '-idActivexPagar'},
                                                 {width: 120, id: prototype.id + '-idPassivexPagar'},
                                                 {width: 51}
                                                 ]
                                                 }
                                                 ]
                                                 },
                                                 ]
                                                 }
                                                 */
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGridSummary',
                                    bodyStyle: 'background-color: #E3EAF9;',
//                                    padding: '1',
                                    margin: '80 0 0 600',
                                    //width: 100,    
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
//                                            xtype: 'treepanel',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-gridDataSummary',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 252,
                                            width: 482,
                                            columnLines: true,
                                            resizable: false,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Source',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Cod', width: 160, dataIndex: 'SOURCECODE',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#e0f5ff;";
                                                                    return '<b>' + value + '<b>';
                                                                }
                                                            },
                                                            {text: 'Description', width: 200, dataIndex: 'CONCEPTO',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#e0f5ff;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'SC REAL', width: 120, dataIndex: 'SCREAL',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSCREAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]},
                                        //-----------------------------------------------------------------                             
                                        //-----------------------------------------------------------------                             
                            ]
                        }
                    ]
                },
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    hidden: true,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPie',
                            width: 780,
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
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

