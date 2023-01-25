/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var anchoPanel = 1000;
Ext.define('Ext.Praxis.view.interline.GSACommisionsReportForm.Info', {
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
                        // --------------------------   PANEL MAIN DATA---------------------
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
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 902,
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
                                            {text: 'Date', width: 100, dataIndex: 'strDATE',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-gsa-commisions-report-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDataDetailAGENTE'
                                                }
                                            },
                                            {text: 'Total<br> Coupons', width: 100, dataIndex: 'QTYDOC', renderer: 'getInt',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQdoc, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Invoice<br>Currency', width: 100, dataIndex: 'MONED'},
                                            {text: 'GROSS', width: 100, dataIndex: 'GROSS', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotGross, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'ISC', width: 100, dataIndex: 'ISC', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotIsc, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Neto', width: 100, dataIndex: 'NETO', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotNeto, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'GSA', width: 100, dataIndex: 'COM',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                    return '<a href="#interline-gsa-commisions-report-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000.00') + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onBtnPOLIZA'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotCom, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: '% Com', width: 100, dataIndex: 'TAX', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotPer, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Avg', width: 100, dataIndex: 'AVG', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotAvg, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA CIA ---------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataCIA',
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
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataCIA',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1002,
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
                                            {text: 'Airline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 50, dataIndex: 'CIA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-gsa-commisions-report-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            // click: 'onViewDataDetailAGENTE'
                                                        }
                                                    },
                                                    {text: 'Name', width: 150, dataIndex: 'DES_CIA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total<br> Coupons', width: 100, dataIndex: 'QTYDOC', renderer: 'getInt',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCIA').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQdoc, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Invoice<br>Currency', width: 100, dataIndex: 'IN_MONED'},
                                            {text: 'GROSS', width: 100, dataIndex: 'GROSS', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCIA').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotGross, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'ISC', width: 100, dataIndex: 'ISC', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCIA').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotIsc, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Neto', width: 100, dataIndex: 'NETO', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCIA').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotNeto, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'GSA', width: 100, dataIndex: 'COM', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCIA').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotCom, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: '% Com', width: 100, dataIndex: 'TAX', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCIA').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotPer, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Avg', width: 100, dataIndex: 'AVG', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCIA').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotAvg, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA PAIS ---------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataPAIS',
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
                                    id: prototype.id + '-labelTitle3',
                                    labelAlign: 'center',
                                    style: 'color:#231223;font-weight:bold;',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataPAIS',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1002,
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
                                            {text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 50, dataIndex: 'IN_CPISO',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-gsa-commisions-report-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onViewDataDetailTKTDetail'
                                                        }
                                                    },
                                                    {text: 'Name', width: 150, dataIndex: 'DES_CPISO',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total<br> Coupons', width: 100, dataIndex: 'QTYDOC', renderer: 'getInt',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPAIS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQdoc, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Invoice<br>Currency', width: 100, dataIndex: 'IN_MONED'},
                                            {text: 'GROSS', width: 100, dataIndex: 'GROSS', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPAIS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotGross, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'ISC', width: 100, dataIndex: 'ISC', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPAIS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotIsc, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Neto', width: 100, dataIndex: 'NETO', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPAIS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotNeto, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'GSA', width: 100, dataIndex: 'COM', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPAIS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotCom, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: '% Com', width: 100, dataIndex: 'TAX', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPAIS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotPer, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Avg', width: 100, dataIndex: 'AVG', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPAIS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotAvg, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA AGENTE ---------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataAGENTE',
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
                                    id: prototype.id + '-labelTitle4',
                                    labelAlign: 'center',
                                    style: 'color:#231223;font-weight:bold;',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataAGENTE',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1002,
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
                                            {text: 'Groupd',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Agent', width: 200, dataIndex: 'GROUPA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:left;text-decoration:underline;';
                                                            var tool = record.data['GROUPA'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return '<a href="#interline-gsa-commisions-report-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onViewDataDetailPAIS'
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total<br> Coupons', width: 100, dataIndex: 'QTYDOC', renderer: 'getInt',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAGENTE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQdoc, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Invoice<br>Currency', width: 100, dataIndex: 'IN_MONED'},
                                            {text: 'GROSS', width: 100, dataIndex: 'GROSS', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAGENTE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotGross, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'ISC', width: 100, dataIndex: 'ISC', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAGENTE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotIsc, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Neto', width: 100, dataIndex: 'NETO', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAGENTE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotNeto, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'GSA', width: 100, dataIndex: 'COM', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAGENTE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotCom, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: '% Com', width: 100, dataIndex: 'TAX', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAGENTE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotPer, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Avg', width: 100, dataIndex: 'AVG', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAGENTE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotAvg, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL  DATA DETAIL TKTDetail-------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataTKTDetail',
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
                                    id: prototype.id + '-labelTitle5',
                                    labelAlign: 'center',
                                    style: 'color:#231223;font-weight:bold;',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataTKTDetail',
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
                                            {text: 'Ticket', width: 100, dataIndex: 'IN_TKT'},
                                            {text: 'Sector', width: 70, dataIndex: 'DES_AGENTE'},
                                            {text: 'Carrier', width: 70, dataIndex: 'A1462CARR'},
                                            {text: 'Flight<br>Number', width: 70, dataIndex: 'A1462NVLO'},
                                            {text: 'Flight<br>Date', width: 70, dataIndex: 'strDATE'},
                                            {text: 'City<br>Code', width: 70, dataIndex: 'IN_CCITY'},
                                            {text: 'City<br>Of Sale', width: 70, dataIndex: 'A1462CTVTA'},
                                            {text: 'Country<br>Code', width: 70, dataIndex: 'IN_CPISO'},
                                            {text: 'Country<br>Of Sale', width: 70, dataIndex: 'A1462PSVTA'},
                                            {text: 'Invoice<br>Currency', width: 70, dataIndex: 'IN_MONED'},
                                            {text: 'GROSS', width: 80, dataIndex: 'A1462GROSS', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataTKTDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotGross, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'ISC', width: 80, dataIndex: 'A1462ISC', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataTKTDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotIsc, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Neto', width: 80, dataIndex: 'A1462NTCOM', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataTKTDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotNeto, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'GSA', width: 80, dataIndex: 'A1462COMIS', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataTKTDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotCom, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL  POLIZA ---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPoliza',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '0',
                            margin: '0',
                            header: {
                                title: '<div style="font-size:12px;color:white;text-align:center;">Aerovias de Mexico SA de CV</div>',
                                style: {
                                    background: '#69899B'
                                }
                            },
                            width: anchoPanel,
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '0',
                                    margin: '0',
                                    width: anchoPanel,
                                    align: 'center',
                                    header: {
                                        title: '<div style="font-size:10px;color:black;text-align:center;">Subdireccion de Contraloria</div>',
                                        style: {
                                            background: 'white'
                                        }
                                    },
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '0',
                                            margin: '0',
                                            width: anchoPanel,
                                            header: {
                                                title: '<div style="text-align:center;font-size:12px;color:white;">Poliza de Diario</div>',
                                                style: {
                                                    background: '#69899B'
                                                }
                                            },
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background-color: white;',
                                                    width: anchoPanel,
                                                    padding: '0',
                                                    margin: '0',
                                                    border: true,
                                                    //width: 100,    
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        margin: '2px 15px 2px 2px'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtTipo',
                                                            required: true,
                                                            fieldLabel: 'Document Type',
                                                            width: 220,
                                                            labelWidth: 100,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtExplicacion',
                                                            required: true,
                                                            fieldLabel: 'Explanation',
                                                            width: 320,
                                                            labelWidth: 80,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtFechaReporte',
                                                            required: true,
                                                            fieldLabel: 'Date of Report',
                                                            width: 190,
                                                            labelWidth: 100,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtPeriodo',
                                                            required: true,
                                                            fieldLabel: 'Period',
                                                            width: 180,
                                                            labelWidth: 80,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background-color: white;',
                                                    width: anchoPanel,
                                                    padding: '0',
                                                    margin: '0',
                                                    border: true,
                                                    //width: 100,    
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        margin: '2px 15px 2px 2px'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtOrigen',
                                                            required: true,
                                                            fieldLabel: 'Origin',
                                                            width: 220,
                                                            labelWidth: 100,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        },
                                                        {xtype: 'tbspacer', width: 527},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtBatch',
                                                            required: true,
                                                            fieldLabel: 'Batch',
                                                            width: 180,
                                                            labelWidth: 80,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background-color: white;',
                                                    width: anchoPanel,
                                                    padding: '0',
                                                    margin: '0',
                                                    border: true,
                                                    //width: 100,    
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        margin: '2px 15px 2px 2px'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtCantidad',
                                                            required: true,
                                                            fieldLabel: 'Amount',
                                                            width: 220,
                                                            labelWidth: 100,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtMoneda',
                                                            required: true,
                                                            fieldLabel: 'Currency',
                                                            width: 180,
                                                            labelWidth: 80,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtTc',
                                                            required: true,
                                                            fieldLabel: 'TC',
                                                            width: 140,
                                                            labelWidth: 40,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtHoja',
                                                            required: true,
                                                            fieldLabel: 'Sheet',
                                                            width: 140,
                                                            labelWidth: 60,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        },
                                                        {xtype: 'tbspacer', width: 16},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtFechalm',
                                                            required: true,
                                                            fieldLabel: 'Date L/M',
                                                            width: 180,
                                                            labelWidth: 80,
                                                            enableKeyEvents: true,
                                                            labelAlign: 'left'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    padding: '5 0 0 0',
                                                    id: prototype.id + '-gridDataPOLIZA',
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    height: 350,
                                                    width: anchoPanel,
                                                    columnLines: true,
                                                    resizable: false,
                                                    border: false,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Ledger Account', width: 150, dataIndex: 'A1462CTACO'},
                                                            {text: 'Description', width: 300, dataIndex: 'DES_FTE'},
                                                            {text: 'Charge', width: 150, dataIndex: 'A1462COMIS', renderer: 'getDouble'},
                                                            {text: 'Payment', width: 150, dataIndex: 'A1462CARR'},
                                                            {text: 'Explanation of the Amount', width: 230, dataIndex: 'A1462CPISO', renderer: 'getText'}
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background-color: #E6F4FF;',
                                                    padding: '0',
                                                    margin: '0',
                                                    style: 'border: 1px #2B4D72 solid;',
                                                    width: anchoPanel,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', width: 300},
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            text: 'Contrapartida (Pago)',
                                                            style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                            width: 150,
                                                            padding: '5'
                                                        },
                                                        {xtype: 'tbspacer', width: 250},
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-dblTotCom5',
                                                            labelAlign: 'left',
                                                            text: '0.00',
                                                            style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                            width: 150,
                                                            padding: '5'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background-color: #E6F4FF;',
                                                    padding: '0',
                                                    margin: '0',
                                                    style: 'border: 1px #2B4D72 solid;',
                                                    width: anchoPanel,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', width: 300},
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            text: 'Totales',
                                                            style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                            width: 150,
                                                            padding: '5'
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-dblTotCom6',
                                                            labelAlign: 'left',
                                                            text: '0.00',
                                                            style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                            width: 150,
                                                            padding: '5'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-dblTotCom7',
                                                            labelAlign: 'left',
                                                            text: '0.00',
                                                            style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                            width: 150,
                                                            padding: '5'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background-color: white;',
                                                    padding: '0',
                                                    margin: '0',
                                                    width: anchoPanel,
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            text: 'Elaboro',
                                                            style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                            width: 60,
                                                            padding: '5'
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-txtOrigen2',
                                                            labelAlign: 'left',
                                                            text: '',
                                                            style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                            width: 150,
                                                            padding: '5'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // --------------------------   PANEL  LIQUIDACION ---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelLIQUIDACION',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '0',
                            margin: '0',
                            width: anchoPanel,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '5 0 10 0',
                                    id: prototype.id + '-gridDataLIQUIagente',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 200,
                                    width: 570,
                                    columnLines: true,
                                    resizable: false,
                                    border: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'GSA', width: 250, dataIndex: 'IN_GROUPA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:left;text-decoration:underline;';
                                                    return '<a href="#interline-gsa-commisions-report-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDataDetailLIQUIDACION'
                                                }
                                            },
                                            {text: 'Total<br>Boletos', width: 150, dataIndex: 'RN', renderer: 'getInt'},
                                            {text: 'Total<br>Commision', width: 150, dataIndex: 'A1462COMIS', renderer: 'getDouble'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '0',
                                    margin: '0',
                                    header: {
                                        title: '<div style="font-size:12px;color:white;text-align:center;">Aerovias de Mexico SA de CV</div>',
                                        style: {
                                            background: '#69899B'
                                        }
                                    },
                                    width: anchoPanel,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '0',
                                            margin: '0',
                                            width: anchoPanel,
                                            align: 'center',
                                            header: {
                                                title: '<div style="font-size:10px;color:black;text-align:center;">Subdireccion de Contraloria</div>',
                                                style: {
                                                    background: 'white'
                                                }
                                            },
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    padding: '0',
                                                    margin: '0',
                                                    width: anchoPanel,
                                                    header: {
                                                        title: '<div style="text-align:center;font-size:12px;color:white;">Detalle de Pago de Comision</div>',
                                                        style: {
                                                            background: '#69899B'
                                                        }
                                                    },
                                                    layout: {
                                                        type: 'vbox'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: white;',
                                                            width: anchoPanel,
                                                            padding: '0',
                                                            margin: '0',
                                                            border: true,
                                                            //width: 100,    
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            defaults: {
                                                                margin: '2px 15px 2px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtTipo1',
                                                                    required: true,
                                                                    fieldLabel: 'Document Type',
                                                                    width: 220,
                                                                    labelWidth: 100,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtExplicacion1',
                                                                    required: true,
                                                                    fieldLabel: 'GSA',
                                                                    width: 320,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtFechaReporte1',
                                                                    required: true,
                                                                    fieldLabel: 'Date of Report',
                                                                    width: 190,
                                                                    labelWidth: 100,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtPeriodo1',
                                                                    required: true,
                                                                    fieldLabel: 'Period',
                                                                    width: 180,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: white;',
                                                            width: anchoPanel,
                                                            padding: '0',
                                                            margin: '0',
                                                            border: true,
                                                            //width: 100,    
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            defaults: {
                                                                margin: '2px 15px 2px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtOrigen1',
                                                                    required: true,
                                                                    fieldLabel: 'Origin',
                                                                    width: 220,
                                                                    labelWidth: 100,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {xtype: 'tbspacer', width: 527},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtBatch1',
                                                                    required: true,
                                                                    fieldLabel: 'Batch',
                                                                    width: 180,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: white;',
                                                            width: anchoPanel,
                                                            padding: '0',
                                                            margin: '0',
                                                            border: true,
                                                            //width: 100,    
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            defaults: {
                                                                margin: '2px 15px 2px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCantidad1',
                                                                    required: true,
                                                                    fieldLabel: 'Amount',
                                                                    width: 220,
                                                                    labelWidth: 100,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtMoneda1',
                                                                    required: true,
                                                                    fieldLabel: 'Currency',
                                                                    width: 180,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtTc1',
                                                                    required: true,
                                                                    fieldLabel: 'TC',
                                                                    width: 140,
                                                                    labelWidth: 40,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtHoja1',
                                                                    required: true,
                                                                    fieldLabel: 'Sheet',
                                                                    width: 140,
                                                                    labelWidth: 60,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {xtype: 'tbspacer', width: 16},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtFechalm1',
                                                                    required: true,
                                                                    fieldLabel: 'Date L/M',
                                                                    width: 180,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'grid',
                                                            padding: '5 0 0 0',
                                                            id: prototype.id + '-gridDataLIQUI',
                                                            bodyStyle: 'background-color: #E3EAEF;',
                                                            height: 350,
                                                            width: anchoPanel,
                                                            columnLines: true,
                                                            resizable: false,
                                                            border: false,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    resizable: false,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {text: 'Pais Venta', width: 150, dataIndex: 'A1462CPISO',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = ' color:#008FE3;text-align:left;text-decoration:underline;';
                                                                            return '<a href="#interline-gsa-commisions-report-form" style="color:#008FE3;">' + value + '</a>';
                                                                        },
                                                                        listeners: {
                                                                            click: 'onViewLIQUIDACIONdetail'
                                                                        }
                                                                    },
                                                                    {text: 'Airline', width: 250, dataIndex: 'A1462CIA', renderer: 'getText'},
                                                                    {text: 'Total<br>Boletos', width: 100, dataIndex: 'RN', renderer: 'getInt'},
                                                                    {text: 'Commision', width: 100, dataIndex: 'A1462RCOMI', renderer: 'getDouble'},
                                                                    {text: 'Total<br>Commision', width: 100, dataIndex: 'A1462COMIS', renderer: 'getDouble'},
                                                                    {text: 'Explanation of the Amount', width: 280, dataIndex: 'DES_FTE', renderer: 'getText'}
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: #E6F4FF;',
                                                            padding: '0',
                                                            margin: '0',
                                                            style: 'border: 1px #2B4D72 solid;',
                                                            width: anchoPanel,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'center'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 300},
                                                                {
                                                                    xtype: 'label',
                                                                    labelAlign: 'left',
                                                                    text: 'Contrapartida (Pago)',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                },
                                                                {xtype: 'tbspacer', width: 250},
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-dblTotCom8',
                                                                    labelAlign: 'left',
                                                                    text: '0.00',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: #E6F4FF;',
                                                            padding: '0',
                                                            margin: '0',
                                                            style: 'border: 1px #2B4D72 solid;',
                                                            width: anchoPanel,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'center'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 300},
                                                                {
                                                                    xtype: 'label',
                                                                    labelAlign: 'left',
                                                                    text: 'Totales',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                },
                                                                {xtype: 'tbspacer', width: 250},
                                                                {
                                                                    xtype: 'label',
                                                                    hidden: true,
                                                                    id: prototype.id + '-dblTotCom11',
                                                                    labelAlign: 'left',
                                                                    text: '0.00',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-dblTotCom10',
                                                                    labelAlign: 'left',
                                                                    text: '0.00',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: white;',
                                                            padding: '0',
                                                            margin: '0',
                                                            width: anchoPanel,
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    labelAlign: 'left',
                                                                    text: 'Elaboro',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 60,
                                                                    padding: '5'
                                                                },
                                                                {xtype: 'tbspacer', width: 100},
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-txtOrigen3',
                                                                    labelAlign: 'left',
                                                                    text: '',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                        // --------------------------   PANEL  LIQUIDACION DETAIL--------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelLIQUIDACIONDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '0',
                            margin: '0',
                            width: anchoPanel,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '0',
                                    margin: '0',
                                    header: {
                                        title: '<div style="font-size:12px;color:white;text-align:center;">Aerovias de Mexico SA de CV</div>',
                                        style: {
                                            background: '#69899B'
                                        }
                                    },
                                    width: anchoPanel,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '0',
                                            margin: '0',
                                            width: anchoPanel,
                                            align: 'center',
                                            header: {
                                                title: '<div style="font-size:10px;color:black;text-align:center;">Subdireccion de Contraloria</div>',
                                                style: {
                                                    background: 'white'
                                                }
                                            },
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    padding: '0',
                                                    margin: '0',
                                                    width: anchoPanel,
                                                    header: {
                                                        title: '<div style="text-align:center;font-size:12px;color:white;">Detalle de Pago de Comision</div>',
                                                        style: {
                                                            background: '#69899B'
                                                        }
                                                    },
                                                    layout: {
                                                        type: 'vbox'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: white;',
                                                            width: anchoPanel,
                                                            padding: '0',
                                                            margin: '0',
                                                            border: true,
                                                            //width: 100,    
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            defaults: {
                                                                margin: '2px 15px 2px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtTipo2',
                                                                    required: true,
                                                                    fieldLabel: 'Document Type',
                                                                    width: 220,
                                                                    labelWidth: 100,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtExplicacion2',
                                                                    required: true,
                                                                    fieldLabel: 'GSA',
                                                                    width: 320,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtFechaReporte2',
                                                                    required: true,
                                                                    fieldLabel: 'Date of Report',
                                                                    width: 190,
                                                                    labelWidth: 100,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtPeriodo2',
                                                                    required: true,
                                                                    fieldLabel: 'Period',
                                                                    width: 180,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: white;',
                                                            width: anchoPanel,
                                                            padding: '0',
                                                            margin: '0',
                                                            border: true,
                                                            //width: 100,    
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            defaults: {
                                                                margin: '2px 15px 2px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtOrigen4',
                                                                    required: true,
                                                                    fieldLabel: 'Origin',
                                                                    width: 220,
                                                                    labelWidth: 100,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {xtype: 'tbspacer', width: 527},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtBatch2',
                                                                    required: true,
                                                                    fieldLabel: 'Batch',
                                                                    width: 180,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: white;',
                                                            width: anchoPanel,
                                                            padding: '0',
                                                            margin: '0',
                                                            border: true,
                                                            //width: 100,    
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            defaults: {
                                                                margin: '2px 15px 2px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCantidad2',
                                                                    required: true,
                                                                    fieldLabel: 'Amount',
                                                                    width: 220,
                                                                    labelWidth: 100,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtMoneda2',
                                                                    required: true,
                                                                    fieldLabel: 'Currency',
                                                                    width: 180,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtTc2',
                                                                    required: true,
                                                                    fieldLabel: 'TC',
                                                                    width: 140,
                                                                    labelWidth: 40,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtHoja2',
                                                                    required: true,
                                                                    fieldLabel: 'Sheet',
                                                                    width: 140,
                                                                    labelWidth: 60,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                },
                                                                {xtype: 'tbspacer', width: 16},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtFechalm2',
                                                                    required: true,
                                                                    fieldLabel: 'Date L/M',
                                                                    width: 180,
                                                                    labelWidth: 80,
                                                                    enableKeyEvents: true,
                                                                    labelAlign: 'left'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'grid',
                                                            padding: '5 0 0 0',
                                                            id: prototype.id + '-gridDataLIQUIdetail',
                                                            bodyStyle: 'background-color: #E3EAEF;',
                                                            height: 350,
                                                            width: anchoPanel,
                                                            columnLines: true,
                                                            resizable: false,
                                                            border: false,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    resizable: false,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {text: 'Airline', width: 250, dataIndex: 'DES_CIA', renderer: 'getText'},
                                                                    {text: 'Ticket', width: 150, dataIndex: 'IN_TKT', renderer: 'getText'},
                                                                    {text: 'RUT', width: 100, dataIndex: 'DES_AGENTE', renderer: 'getInt'},
                                                                    {text: 'Commision %', width: 100, dataIndex: 'A1462RCOMI', renderer: 'getDouble'},
                                                                    {text: 'Total<br>Commision', width: 100, dataIndex: 'A1462COMIS', renderer: 'getDouble'},
                                                                    {text: 'Explanation of the Amount', width: 280, dataIndex: 'DES_FTE', renderer: 'getText'}
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: #E6F4FF;',
                                                            padding: '0',
                                                            margin: '0',
                                                            style: 'border: 1px #2B4D72 solid;',
                                                            width: anchoPanel,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'center'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 300},
                                                                {
                                                                    xtype: 'label',
                                                                    labelAlign: 'left',
                                                                    text: 'Contrapartida (Pago)',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                },
                                                                {xtype: 'tbspacer', width: 250},
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-dblTotCom12',
                                                                    labelAlign: 'left',
                                                                    text: '0.00',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: #E6F4FF;',
                                                            padding: '0',
                                                            margin: '0',
                                                            style: 'border: 1px #2B4D72 solid;',
                                                            width: anchoPanel,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'center'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 300},
                                                                {
                                                                    xtype: 'label',
                                                                    labelAlign: 'left',
                                                                    text: 'Totales',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                },
                                                                {xtype: 'tbspacer', width: 250},
                                                                {
                                                                    xtype: 'label',
                                                                    hidden: true,
                                                                    //id: prototype.id + '-dblTotCom13',
                                                                    labelAlign: 'left',
                                                                    text: '0.00',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-dblTotCom13',
                                                                    labelAlign: 'left',
                                                                    text: '0.00',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: white;',
                                                            padding: '0',
                                                            margin: '0',
                                                            width: anchoPanel,
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    labelAlign: 'left',
                                                                    text: 'Elaboro',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 60,
                                                                    padding: '5'
                                                                },
                                                                {xtype: 'tbspacer', width: 100},
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-txtOrigen5',
                                                                    labelAlign: 'left',
                                                                    text: '',
                                                                    style: 'font-weight:bold;color:#0B333C;font-size:12px;',
                                                                    width: 150,
                                                                    padding: '5'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
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

