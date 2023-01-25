/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.interline.InvoiceConciliationForm.Info', {
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
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
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
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '1',
                                    margin: '1',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-gridDataP1',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 560,
                                            width: 200,
                                            border: false,
                                            columnLines: true,
                                            resizable: false,
                                            features: [{
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Clear<br> Date', width: 80, dataIndex: 'strFormatDate', height: 45,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-invoice-conciliation-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onSetGridDataDetByCia'
                                                        }
                                                    },
                                                    {text: 'Period', width: 60, dataIndex: 'A508PERIOD'},
                                                    {text: 'Curr.', width: 60, dataIndex: 'A508MNRCD'}
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'grid',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-gridDataP2',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 560,
                                            width: 500,
                                            columnLines: true,
                                            resizable: false,
                                            border: false,
                                            features: [{
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Payable',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'IS-IDEC', width: 80, dataIndex: 'ISIDEC',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#E1FFE1';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totISIDEC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Passenger', width: 80, dataIndex: 'A508PASJP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508PASJP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 80, dataIndex: 'A508UATPP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508UATPP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'CARGO', width: 80, dataIndex: 'A508CARGOP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508CARGOP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'MISCELANEOS', width: 100, dataIndex: 'A508MISCP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508MISCP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'NETO', width: 80, dataIndex: 'A508NETOP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508NETOP, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }

                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'grid',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-gridDataP3',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 560,
                                            width: 420,
                                            columnLines: true,
                                            resizable: false,
                                            border: false,
                                            features: [{
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Receivables',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Passenger', width: 80, dataIndex: 'A508PASJC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508PASJC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 80, dataIndex: 'A508UATPC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508UATPC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'CARGO', width: 80, dataIndex: 'A508CARGOC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508CARGOC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'MISCELANEOS', width: 100, dataIndex: 'A508MISCC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508MISCC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'NETO', width: 80, dataIndex: 'A508NETOC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA508NETOC, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }

                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'grid',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-gridDataP4',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 560,
                                            width: 100,
                                            border: false,
                                            columnLines: true,
                                            resizable: false,
                                            features: [{
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Balance', width: 100, dataIndex: 'A508BALANC', renderer: 'getInt', height: 45,
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP4').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totA508BALANC, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataByCia',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle2',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '1',
                                    margin: '1',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-gridDataA094P1',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 560,
                                            width: 100,
                                            border: false,
                                            columnLines: true,
                                            resizable: false,
                                            features: [{
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'CIA', width: 100, dataIndex: 'A094CIA', height: 45,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['strDescripcion'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-invoice-conciliation-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onSetGridDataDetBySource'
                                                        }
                                                    }

                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'grid',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-gridDataA094P2',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 560,
                                            width: 500,
                                            columnLines: true,
                                            resizable: false,
                                            border: false,
                                            features: [{
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Payable',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'IS-IDEC', width: 80, dataIndex: 'ISIDEC',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#E1FFE1';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totISIDEC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Passenger', width: 80, dataIndex: 'A094PASJP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094PASJP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 80, dataIndex: 'A094UATPP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094UATPP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'CARGO', width: 80, dataIndex: 'A094CARGOP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094CARGOP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'MISCELANEOS', width: 100, dataIndex: 'A094MISCP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094MISCP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'NETO', width: 80, dataIndex: 'A094NETOP', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094NETOP, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }

                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'grid',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-gridDataA094P3',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 560,
                                            width: 420,
                                            columnLines: true,
                                            resizable: false,
                                            border: false,
                                            features: [{
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Receivables',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Passenger', width: 80, dataIndex: 'A094PASJC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094PASJC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 80, dataIndex: 'A094UATPC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094UATPC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'CARGO', width: 80, dataIndex: 'A094CARGOC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094CARGOC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'MISCELANEOS', width: 100, dataIndex: 'A094MISCC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094MISCC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'NETO', width: 80, dataIndex: 'A094NETOC', renderer: 'getInt',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataA094P3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totA094NETOC, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataBySource',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle3',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataBySource',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 880,
                                    columnLines: true,
                                    resizable: false,
                                    border: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
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
                                                    {text: 'Code', width: 50, dataIndex: 'A096TUSO'},
                                                    {text: 'Description', width: 250, dataIndex: 'strDescripcion2'},
                                                    {text: 'Invoice', width: 100, dataIndex: 'A096NDOC'}
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
                                                    {text: 'GROSS', width: 80, dataIndex: 'A096TOTAL', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataBySource').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totA096TOTAL, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 80, dataIndex: 'A096ISC', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataBySource').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totA096ISC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 80, dataIndex: 'A096UATP', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataBySource').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totA096UATP, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Others', width: 80, dataIndex: 'A096OTROS', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataBySource').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totA096OTROS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 80, dataIndex: 'A096TAX', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataBySource').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totA096TAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NETO', width: 80, dataIndex: 'A096NETO', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataBySource').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totA096NETO, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
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

