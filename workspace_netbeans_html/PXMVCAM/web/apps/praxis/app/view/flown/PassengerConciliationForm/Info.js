/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.PassengerConciliationForm.Info', {
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
            width: 1295,
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
                    xtype: 'label',
                    id: prototype.id + '-labelTitle',
                    labelAlign: 'center',
                    labelStyle: 'color:#231223',
                    align: 'center',
                    margin: '10 0 0 0'
                },
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 450,
                    width: 1442,
                    columnLines: true,
//                    resizable: false,
                    features: [{
                            dock: 'bottom',
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
                            {text: 'Flight ',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', width: 100, dataIndex: 'strFormatDate'},
                                    {text: 'Nbr', width: 70, dataIndex: 'NFLIGHT'},
                                    {text: 'Leg Seq.', width: 70, dataIndex: 'LEGSEQ'}
                                ]
                            },
                            {text: 'Quantity Manifest',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Total', width: 90, dataIndex: 'lngQPHY',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                            metaData.style = ' color:#008FE3;text-align:right; margin-right:0px;';
                                            return '<a href="#flown-passenger-conciliation-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        listeners: {
                                            click: 'onSetGridDataDetail'
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totLngQPHY, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Closed', width: 90, dataIndex: 'lngQCLO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' color:#008FE3;text-align:right; margin-right:0px ; background:#d5f4d5; ';
                                            return '<a href="#flown-passenger-conciliation-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        listeners: {
                                            click: 'onSetGridDataDetail'
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totLngQCLO, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Pending', width: 90, dataIndex: 'lngQPRO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' color:#008FE3;text-align:right; margin-right:0px ; background:#d5f4d5; ';
                                            return '<a href="#flown-passenger-conciliation-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        listeners: {
                                            click: 'onSetGridDataDetail'
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totLngQPRO, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Valued', width: 90, dataIndex: 'QCPNVAL',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' color:#008FE3;text-align:right; margin-right:0px; background:#d5f4d5;  ';
                                            return '<a href="#flown-passenger-conciliation-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        listeners: {
                                            click: 'onSetGridDataDetail'
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNVAL, '0,000') + '<b>';
                                        }
                                    }
                                ]


                            },
                            {text: 'Quantity Coupons',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Stock OAL', width: 90, dataIndex: 'QCPNOAL',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNOAL, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Stock AM', width: 90, dataIndex: 'QCPNON',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNON, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Not Valued', width: 90, dataIndex: 'lngQDIFF',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totLngQDIFF, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Valued', width: 90, dataIndex: 'lngQACC',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totLngQACC, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Total', width: 90, dataIndex: 'QCPNTOT',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNTOT, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: 'Accounted coupons',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Total', width: 90, dataIndex: 'QCPCON',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQCPCON, '0,000') + '<b>';
                                        }
                                    },
                                    {text: '%', width: 70, dataIndex: 'A1791ORAV',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                            return  Ext.util.Format.number(value, '0,000') + '%';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totA1791ORAV, '0,000') + '%<b>';
                                        }
                                    },
                                    {text: 'Local', width: 110, dataIndex: 'VCPNLOC',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totVCPNLOC, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'USD', width: 110, dataIndex: 'VCPNUSD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            }

                        ]
                    }
                },
                // --------------------------   GRID MAIN DATA SUMMARY-------------
                //-----------------------------------------------------------------
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-panelDataSummary',
//                    width: 1442,
//                    align: 'left',
//                    defaults: {
//                        xtype: 'label',
//                        align: 'center',
//                        html: '' + '&nbsp',
//                        height: 25,
//                        padding: '5 0 5 0',
//                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                    },
//                    items: [
//                        {width: 100},
//                        {width: 70},
//                        {width: 70},
//                        {width: 90, id: prototype.id + '-totLngQPHY'},
//                        {width: 90, id: prototype.id + '-totLngQCLO'},
//                        {width: 90, id: prototype.id + '-totLngQPRO'},
//                        {width: 90, id: prototype.id + '-totQCPNVAL'},
//                        {width: 90, id: prototype.id + '-totQCPNOAL'},
//                        {width: 90, id: prototype.id + '-totQCPNON'},
//                        {width: 90, id: prototype.id + '-totLngQDIFF'},
//                        {width: 90, id: prototype.id + '-totLngQACC'},
//                        {width: 90, id: prototype.id + '-totQCPNTOT'},
//                        {width: 90, id: prototype.id + '-totQCPCON'},
//                        {width: 70, id: prototype.id + '-totA1791ORAV'},
//                        {width: 110, id: prototype.id + '-totVCPNLOC'},
//                        {width: 122, id: prototype.id + '-totVCPNUSD'}
//                    ]
//                },
                // --------------------------   GRID DETAIL------------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetail',
                    height: 450,
                    width: 1020,
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
                            {text: 'Flight <br> Date', width: 90, dataIndex: 'strFormatDate'},
                            {text: 'Flight<br> Number', width: 90, dataIndex: 'NFLIGHT'},
                            {text: 'Departure', width: 80, dataIndex: 'CDEPART',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strDescCDEPART'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }
                            },
                            {text: 'Arrival', width: 75, dataIndex: 'CARRIVA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strDescCARRIVA'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }
                            },
                            {text: 'Quantity Coupons',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Total', width: 100, dataIndex: 'QCPNVC',summaryType:'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' color:#008FE3;text-align:right; margin-right:0px ; background:#d5f4d5; ';
                                            return '<a href="#flown-passenger-conciliation-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        listeners: {
                                            click: 'onSetGridDataDetailTicket'
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex,metaData) {
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Valued ', width: 100, dataIndex: 'QCPNVAL',summaryType:'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex,metaData) {
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Not Valued', width: 100, dataIndex: 'lngQDIFF',summaryType:'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex,metaData) {
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Stock OAL', width: 100, dataIndex: 'QCPNOAL',summaryType:'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex,metaData) {
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Stock Am', width: 100, dataIndex: 'QCPNMA',summaryType:'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' color:#008FE3;text-align:right; margin-right:0px ; background:#d5f4d5; ';
                                            return '<a href="#flown-passenger-conciliation-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        listeners: {
                                            click: 'onSetGridDataDetailTicket'
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex,metaData) {
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: 'Valued <br> Status', width: 100, dataIndex: 'strDescripcion'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 70,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
                                ]
                            }
                        ]
                    }
                },
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-panelDataDetailSummary',
//                    width: 1020,
//                    margin: '2 0 0 0',
//                    align: 'left',
//                    defaults: {
//                        xtype: 'label',
//                        align: 'center',
//                        html: '' + '&nbsp',
//                        height: 25,
//                        padding: '5 0 5 0',
//                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                    },
//                    items: [
//                        {width: 90},
//                        {width: 90},
//                        {width: 80},
//                        {width: 75},
//                        {width: 100, id: prototype.id + '-totQCPNVC2'},
//                        {width: 100, id: prototype.id + '-totQCPNVAL2'},
//                        {width: 100, id: prototype.id + '-totlngQDIFF2'},
//                        {width: 100, id: prototype.id + '-totQCPNOAL2'},
//                        {width: 100, id: prototype.id + '-totQCPNMA2'},
//                        {width: 100},
//                        {width: 85}
//
//
//                    ]
//                },
//                // --------------------------   GRID DETAIL TICKET-----------------
//                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailTicket',
                    height: 570,
                    width: 1110,
                    border: true,
                    // hidden: true,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Ticket', width: 120, dataIndex: 'strTicket',
                                listeners: {
                                    //click: 'onFacsimilClick'
                                    click: 'showTicket'
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-decoration:none; color:#008FE3; ';
                                    return '<a href="#flown-passenger-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                }
                            },
                            {text: 'Acc. Date', width: 90, dataIndex: 'strFormatDate2'},
                            {text: 'Sale',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date ', width: 90, dataIndex: 'strFormatFVTA'},
                                    {text: 'Country', width: 80, dataIndex: 'PSVVTA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['strDescPSVVTA'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }
                                    },
                                    {text: 'Agent', width: 80, dataIndex: 'AGTIA'},
                                    {text: 'Pax', width: 50, dataIndex: 'QTYPAX'}
                                ]
                            },
                            {text: 'Coupon',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Use Type', width: 80, dataIndex: 'TOPUS',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip = "D=Domestic/I=International"';
                                            return value;
                                        }},
                                    {text: 'Carrier ', width: 80, dataIndex: 'CARR'},
                                    {text: 'RBD ', width: 80, dataIndex: 'CLAS'},
                                    {text: 'Fare <br> Basis ', width: 80, dataIndex: 'FBASE'},
                                    {text: 'Value ', width: 80, dataIndex: 'VCPN',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Curr.', width: 70, dataIndex: 'MDACP'}

                                ]
                            },
                            {text: 'Estimated <br>Status <br> Valoration', width: 120, dataIndex: 'strDescFVAL'}
                        ]
                    }
                },
                // --------------------------   GRID  TICKET-----------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailTicketSecundario',
                    height: 550,
                    width: 1110,
                    border: true,
                    // hidden: true,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Ticket', width: 130, dataIndex: 'strTicket'
//                                listeners: {
//                                    click: 'onFacsimilClick'
//                                },
//                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                    metaData.style = 'text-decoration:none; color:#008FE3; ';
//                                    return '<a href="#flown-passenger-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
//                                }
                            },
                            {text: '    Type', width: 60, dataIndex: 'TDOC'},
                            {text: '    Flight',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', width: 90, dataIndex: 'strFormatDate'},
                                    {text: 'Number', width: 70, dataIndex: 'NFLIGHT'},
                                    {text: 'Orig', width: 70, dataIndex: 'CDEPART'},
                                    {text: 'Dest', width: 70, dataIndex: 'CARRIVA'}
                                ]
                            },
                            {text: '    Coupon',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Carrier', width: 90, dataIndex: 'CARR'},
                                    {text: 'Cabin', width: 70, dataIndex: 'CABI'},
                                    {text: 'Value', width: 70, dataIndex: 'VCPN'},
                                    {text: 'Curr.', width: 70, dataIndex: 'MDACP'},
                                    {text: 'MXN.', width: 70, dataIndex: 'VCPMX'},
                                    {text: 'Rate.', width: 70, dataIndex: 'TCMUS'},
                                    {text: 'USD', width: 70, dataIndex: 'VCPUS'}
                                ]
                            }
                        ]
                    }
                }
                ,
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
                            width: 1295,
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

