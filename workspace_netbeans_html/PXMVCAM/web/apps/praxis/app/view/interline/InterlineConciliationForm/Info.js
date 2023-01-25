/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.interline.InterlineConciliationForm.Info', {
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
                //PRINCIPAL PANEL 
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
                        // --------------------------   PANEL MAIN DATA--------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            width: 1054,
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
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1052,
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
                                            {text: 'Invoice<br> Date', width: 80, dataIndex: 'strFormatDate', id: prototype.id + '-columNameGridData',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSearchByCityPairMain'
                                                }
                                            },
                                            {text: 'Carrier',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 50, dataIndex: 'CARRIA'},
                                                    {text: 'Description', width: 150, dataIndex: 'strDescCarrier',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' text-align:left;';
                                                            var tool = record.data['strDescCarrier'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Coupons',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Total', width: 80, dataIndex: 'lngQCPN', renderer: 'getIntColor01',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQCPN, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Exchange', width: 80, dataIndex: 'lngQEXCH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5;color:#008FE3;text-align:right;text-decoration:none;';
                                                            return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQEXCH, '0,000') + '<b>';
                                                        },
                                                        listeners: {
                                                            click: 'onSearchByCityPairMain'
                                                        }
                                                    },
                                                    {text: 'Involuntary', width: 80, dataIndex: 'lngQINV',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; color:#008FE3;text-align:right;text-decoration:none;';
                                                            return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQINV, '0,000') + '<b>';
                                                        },
                                                        listeners: {
                                                            click: 'onSearchByCityPairMain'
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 70, dataIndex: 'CURRENC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; ';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Fare', width: 80, dataIndex: 'VALOR', renderer: 'getIntColor01',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVALOR, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 70, dataIndex: 'CURRENCI'},
                                                    {text: 'Fare', width: 80, dataIndex: 'GROSS', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotGROSS, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Diff',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: '+', width: 70, dataIndex: 'dblDiffPos',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#FFF9E0;text-align:right;color:#244066;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotDiffPos, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '-', width: 80, dataIndex: 'dblDiffNeg',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#FFF9E0;text-align:right;color:#831421;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotDiffNeg, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Rejected<br>Fare', width: 80, dataIndex: 'VREJECT', renderer: "getInt",
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVREJECT, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL  DATA MAIN CITY PAIR---------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelByMainCP',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            // width: 1024,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle2',
                                    labelAlign: 'center',
                                    style: 'font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
                                },
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridDataMainCP',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1012,
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
                                            {text: 'City Pair',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 50, dataIndex: 'CITYO'},
                                                    {text: 'Origin', width: 150, dataIndex: 'strDescCityO',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:left;';
                                                            var tool = record.data['strDescCityO'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onSearchByTkt'
                                                        }
                                                    },
                                                    {text: 'Code', width: 50, dataIndex: 'CITYD'},
                                                    {text: 'Origin', width: 150, dataIndex: 'strDescCityD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:left;';
                                                            var tool = record.data['strDescCityD'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onSearchByTkt'
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
                                                    {text: 'Coupons', width: 80, dataIndex: 'lngQCPN', renderer: 'getIntColor01',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainCP').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQCPN, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 70, dataIndex: 'CURRENC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; ';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Fare', width: 80, dataIndex: 'VALOR', renderer: 'getIntColor01',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainCP').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVALOR, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 70, dataIndex: 'CURRENCI'},
                                                    {text: 'Fare', width: 80, dataIndex: 'GROSS', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainCP').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotGROSS, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Diff',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: '+', width: 70, dataIndex: 'dblDiffPos',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#FFF9E0;text-align:right;color:#244066;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainCP').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotDiffPos, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '-', width: 80, dataIndex: 'dblDiffNeg',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#FFF9E0;text-align:right;color:#831421;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainCP').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotDiffNeg, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Rejected<br>Fare', width: 80, dataIndex: 'VREJECT', renderer: "getInt",
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainCP').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVREJECT, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL  DATA BY TICKET-------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelByTicket',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            // width: 1024,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '1',
                                    margin: '1',
                                    //width: 100,    
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-labelTitle3',
                                            labelAlign: 'center',
                                            style: 'font-weight:bold',
                                            align: 'center',
                                            margin: '10 10 0 0'
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            id: prototype.id + '-btnSwap',
                                            style: 'background:#E3EAEF',
                                            icon: 'resources/img/exchange.png',
                                            tooltip: 'Back',
                                            listeners: {
                                                click: 'onClickSwap'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridDataByTkt',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1450,
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
                                            {text: 'Ticket Number', width: 150, dataIndex: 'strTicket',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#057ECB;text-align:center;background:#CCFFFF';
                                                    return value;
                                                }
                                            },
                                            {text: 'Original Tkt',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Nbr', width: 100, dataIndex: 'strTicketOrig'},
                                                    {text: 'Inv.', width: 50, dataIndex: 'FINVOL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['FINVOL'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Fare Cal', width: 155, dataIndex: 'DESFRCA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['DESFRCA'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 80, dataIndex: 'DFLIGHT'},
                                                    {text: 'Nbr', width: 60, dataIndex: 'NFLIGHT'}
                                                ]
                                            },
                                            {text: 'Farebasis', width: 120, dataIndex: 'FAREBASE'},
                                            {text: 'Local Fare',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Curr.', width: 60, dataIndex: 'CURRENL'},
                                                    {text: 'Fare', width: 70, dataIndex: 'TARIFA', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTkt').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotTARIFA, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Curr', width: 60, dataIndex: 'CURRENC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; ';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Value', width: 70, dataIndex: 'VALOR', renderer: 'getIntColor01',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTkt').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVALOR, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Curr', width: 60, dataIndex: 'CURRENCI'},
                                                    {text: 'Gross', width: 70, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTkt').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotGROSS, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Diff',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: '+', width: 60, dataIndex: 'dblDiffPos',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#FFF9E0;text-align:right;color:#244066;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTkt').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotDiffPos, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: '-', width: 70, dataIndex: 'dblDiffNeg',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#FFF9E0;text-align:right;color:#831421;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTkt').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotDiffNeg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Rejected<br>Fare', width: 70, dataIndex: 'VREJECT', renderer: "getDouble",
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByTkt').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVREJECT, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Over', width: 70, dataIndex: 'VOVER', renderer: "getDouble",
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByTkt').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVOVER, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Match', width: 70, dataIndex: 'VMATCH', renderer: "getDouble",
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByTkt').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVMATCH, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridDataByTktSwap',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1325,
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
                                            {text: 'Ticket Number', width: 150, dataIndex: 'strTicket',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#057ECB;text-align:center;background:#CCFFFF';
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Agent', width: 80, dataIndex: 'VENDOR'},
                                                    {text: 'Type', width: 60, dataIndex: 'TSALES'},
                                                    {text: 'Source', width: 60, dataIndex: 'CANAV'},
                                                    {text: 'Booking', width: 60, dataIndex: 'BOOKI'},
                                                    {text: 'Clase', width: 60, dataIndex: 'CLASE'}
                                                ]
                                            },
                                            {text: 'Total Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ind', width: 60, dataIndex: 'INDPR',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; ';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Curr', width: 60, dataIndex: 'CURRENC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; ';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'MPA', width: 70, dataIndex: 'VMPA', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTktSwap').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVMPA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SRP', width: 70, dataIndex: 'VSRP', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTktSwap').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSRP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SPA', width: 70, dataIndex: 'VSPA', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTktSwap').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSPA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Value', width: 70, dataIndex: 'VALOR', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTktSwap').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVALOR, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Gross', width: 70, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTktSwap').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotGROSS, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Interline Audit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ind', width: 60, dataIndex: 'INDPRI',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; ';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Currency', width: 80, dataIndex: 'CURRENCI'},
                                                    {text: 'MPA', width: 80, dataIndex: 'VMPAI', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTktSwap').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVMPAI, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SRP', width: 80, dataIndex: 'VSRPI', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTktSwap').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSRPI, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SPA', width: 80, dataIndex: 'VSPAI',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['strDescripcion'].trim();
                                                            var color = record.data['FLAGI'].trim() !== '1' ? 'c28c24' : '244066';
                                                            metaData.style = 'text-align:right;color:#' + color + ';';
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByTktSwap').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSRPI, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL  DATA DETAIL-----------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            // width: 1024,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '1',
                                    margin: '1',
                                    //width: 100,    
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-labelTitle4',
                                            labelAlign: 'center',
                                            style: 'font-weight:bold',
                                            align: 'center',
                                            margin: '10 10 0 0'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridDataDetail',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1302,
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
                                            {text: 'Invoice<br> Date', width: 80, dataIndex: 'strFormatDate', id: prototype.id + '-columNameGridData',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSearchByCityPair'
                                                }
                                            },
                                            {text: 'Carrier',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 50, dataIndex: 'CARRIA'},
                                                    {text: 'Description', width: 150, dataIndex: 'strDescCarrier',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' text-align:left;';
                                                            var tool = record.data['strDescCarrier'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 70, dataIndex: 'CURRENC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; ';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'MPA', width: 90, dataIndex: 'VMPA', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVMPA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SRP', width: 90, dataIndex: 'VSRP', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSRP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SPA', width: 90, dataIndex: 'VSPA', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSPA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Value', width: 90, dataIndex: 'VALOR', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVALOR, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Gross', width: 90, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotGROSS, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Diff', width: 70, dataIndex: 'dblDiff',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var color = record.data['dblDiff'] > 0 ? '244066' : '831421';
                                                    metaData.style = 'background:#FFF9E0;text-align:right;color:#244066;color:#' + color + ';';
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotDiff, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Rejected<br>Fare', width: 80, dataIndex: 'VREJECT', renderer: "getInt",
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVREJECT, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Interline Audit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 80, dataIndex: 'CURRENCI'},
                                                    {text: 'MPA', width: 90, dataIndex: 'VMPAI', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVMPAI, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SRP', width: 90, dataIndex: 'VSRPI', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSRPI, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SPA', width: 90, dataIndex: 'VSPAI', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSPAI, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL  DATA DETAIL CITY PAIR-------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelByCityPair',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            // width: 1024,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '1',
                                    margin: '1',
                                    //width: 100,    
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-labelTitle5',
                                            labelAlign: 'center',
                                            style: 'font-weight:bold',
                                            align: 'center',
                                            margin: '10 10 0 0'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridDataCityPair',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1422,
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
                                            {text: 'City Pair',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 50, dataIndex: 'CITYO'},
                                                    {text: 'Origin', width: 150, dataIndex: 'strDescCityO',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:left;';
                                                            var tool = record.data['strDescCityO'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onSearchByTkt'
                                                        }
                                                    },
                                                    {text: 'Code', width: 50, dataIndex: 'CITYD'},
                                                    {text: 'Origin', width: 150, dataIndex: 'strDescCityD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:left;';
                                                            var tool = record.data['strDescCityD'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onSearchByTkt'
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 70, dataIndex: 'CURRENC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'background:#d5f4d5; ';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'MPA', width: 90, dataIndex: 'VMPA', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVMPA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SRP', width: 90, dataIndex: 'VSRP', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSRP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SPA', width: 90, dataIndex: 'VSPA', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSPA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Value', width: 90, dataIndex: 'VALOR', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVALOR, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Gross', width: 90, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotGROSS, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Diff', width: 70, dataIndex: 'dblDiff',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var color = record.data['dblDiff'] > 0 ? '244066' : '831421';
                                                    metaData.style = 'background:#FFF9E0;text-align:right;color:#244066;color:#' + color + ';';
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotDiff, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Rejected<br>Fare', width: 80, dataIndex: 'VREJECT', renderer: "getInt",
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVREJECT, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Interline Audit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 80, dataIndex: 'CURRENCI'},
                                                    {text: 'MPA', width: 90, dataIndex: 'VMPAI', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVMPAI, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SRP', width: 90, dataIndex: 'VSRPI', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSRPI, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'SPA', width: 90, dataIndex: 'VSPAI', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVSPAI, '0,000.00') + '<b>';
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
                //CHART PANEL
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMainChart',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    width: 1400,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // PANEL MAIN CHARTS
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelCarr',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            width: 1400,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridDataCarrChart',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 600,
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
                                            {text: 'Carrier',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 70, dataIndex: 'CARRIA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-interline-conciliation-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onSearchByCityPairChart'
                                                        }
                                                    },
                                                    {text: 'Description', width: 150, dataIndex: 'strDescCarrier',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' text-align:left;';
                                                            var tool = record.data['strDescCarrier'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total <br> Coupons', width: 90, dataIndex: 'lngQCPN', renderer: 'getInt',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCarrChart').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQCPN, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Sales', width: 90, dataIndex: 'VALOR', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCarrChart').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVALOR, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Invoice', width: 90, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCarrChart').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotGROSS, '0,000.00') + '<b>';
                                                        }
                                                    }


                                                ]
                                            },
                                            {text: 'Diff', width: 90, dataIndex: 'VMATCH',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var color = record.data['VMATCH'] > 0 ? '244066' : '831421';
                                                    metaData.style = 'text-align:right;color:#' + color + ';';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCarrChart').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVMATCH, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGraficos',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5',
                                    width: 830,
                                    height: 520,
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'font-weight:bold',
                                            align: 'center',
                                            margin: '10 10 0 0',
                                            text: 'TOP'
                                        },
                                        {
                                            xtype: 'sliderfield',
                                            //id:prototype.id+'-topMain',
                                            width: 250,
                                            minValue: 5,
                                            maxValue: 20,
                                            increment: 5,
                                            value: 10,
                                            listeners: {
                                                change: 'onChangeTopMain'
                                            }
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-grafico01',
                                            margin: '0 10 0 0 ',
                                            flipXY: true,
                                            width: 700,
                                            height: 500,
                                            insetPadding: '20 10',
                                            background: '#E3EAF9',
                                            captions: {
                                                title: {
                                                    text: 'Sales by Carrier - Amount',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'

                                            },
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'bottom',
                                                    fields: ['GROSS', 'VALOR'],
                                                    title: 'Amount ',
                                                    grid: true,
                                                    renderer: function(obj, value) {
                                                        if (value > 1) {
                                                            return ' ' + (value / 1000000) + 'M ';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'left',
                                                    fields: 'strDescCarrier',
                                                    grid: true
//                                                    title: {
//                                                        text: 'Date',
//                                                        translationX: -30
//                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Sales', 'Invoice'],
                                                    yField: ['GROSS', 'VALOR'],
                                                    xField: 'strDescCarrier',
                                                    //highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7
                                                    },
                                                    highlight: {
                                                        strokeStyle: 'rgba(0, 0, 0, .2)',
                                                        lineWidth: 1
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        //height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            //var label = record.get('strFormatDate') + ' ';
                                                            var label = ' ';
                                                            if (ctx.field === 'GROSS') {
                                                                label += ' Sales : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            } else if (ctx.field === 'VALOR') {
                                                                label += ' Invoice : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            }
                                                            toolTip.setHtml(label);
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        },
                        //PANEL DETAIL CHARTS
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelCityPair',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            width: 1500,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridDataCityPairChart',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 690,
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
                                            {text: 'City Pair',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 50, dataIndex: 'CITYO'},
                                                    {text: 'Origin', width: 150, dataIndex: 'strDescCityO',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:left;';
                                                            var tool = record.data['strDescCityO'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Code', width: 50, dataIndex: 'CITYD'},
                                                    {text: 'Origin', width: 150, dataIndex: 'strDescCityD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:left;';
                                                            var tool = record.data['strDescCityD'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total <br> Coupons', width: 90, dataIndex: 'lngQCPN', renderer: 'getInt',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCarrChart').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQCPN, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Sales', width: 90, dataIndex: 'VALOR', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPairChart').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotVALOR, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Invoice', width: 90, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCityPairChart').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotGROSS, '0,000.00') + '<b>';
                                                        }
                                                    }

                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGraficos2',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5',
                                    width: 830,
                                    height: 520,
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'font-weight:bold',
                                            align: 'center',
                                            margin: '10 10 0 0',
                                            text: 'TOP'
                                        },
                                        {
                                            xtype: 'sliderfield',
                                            //id:prototype.id+'-topMain',
                                            width: 250,
                                            minValue: 5,
                                            maxValue: 20,
                                            increment: 5,
                                            value: 10,
                                            listeners: {
                                                change: 'onChangeTopMain2'
                                            }
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-grafico02',
                                            margin: '0 10 0 0 ',
                                            flipXY: true,
                                            width: 700,
                                            height: 500,
                                            insetPadding: '20 10',
                                            background: '#E3EAF9',
                                            captions: {
                                                title: {
                                                    text: 'Sales by City Pair - Amount',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'

                                            },
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'bottom',
                                                    fields: ['GROSS', 'VALOR'],
                                                    title: 'Amount ',
                                                    grid: true,
                                                    renderer: function(obj, value) {
                                                        if (value > 1) {
                                                            return ' ' + (value / 1000000) + 'M ';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'left',
                                                    fields: 'strDescripcion',
                                                    grid: true
//                                                    title: {
//                                                        text: 'Date',
//                                                        translationX: -30
//                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Sales', 'Invoice'],
                                                    yField: ['GROSS', 'VALOR'],
                                                    xField: 'strDescripcion',
                                                    //highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7
                                                    },
                                                    highlight: {
                                                        strokeStyle: 'rgba(0, 0, 0, .2)',
                                                        lineWidth: 1
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        //height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            //var label = record.get('strFormatDate') + ' ';
                                                            var label = ' ';
                                                            if (ctx.field === 'GROSS') {
                                                                label += ' Sales : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            } else if (ctx.field === 'VALOR') {
                                                                label += ' Invoice : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            }
                                                            toolTip.setHtml(label);
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
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

