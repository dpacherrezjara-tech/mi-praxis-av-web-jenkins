/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.CouponsErrorForm.Facsimil', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-FacsimilController',
    requires: [
        'Ext.Praxis.controller.flown.CouponsError.FacsimilController'
    ],
    title: 'Facsimil Information',
    header: true,
    width: 1100,
    height: 830,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            margin: '0 10 0 10',
            id: prototype.id + '-Facsimil-center',
            bodyStyle: 'background:#CADAE4',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                //Panel 01 Ticket Information

                {
                    xtype: 'panel',
                    border: true,
                    margin: '5 70 0 70',
                    style: '',
                    layout: 'hbox',
                    bodyBorder: false,
                    bodyStyle: 'background:#CADAE4',
                    items: [
                        {
                            xtype: 'panel',
                            border: true,
                            style: '',
                            layout: 'vbox',
                            bodyBorder: false,
                            bodyStyle: 'background:#CADAE4',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: true,
                                    style: '',
                                    layout: 'hbox',
                                    bodyBorder: false,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '',
                                            id: prototype.id + '-f-lblFuente2',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 40,
                                            text: ''
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 166
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtTicket',
                                            padding: '0 2 0 2',
                                            width: 250,
                                            fieldLabel: 'Ticket Image',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:center;font-weight:bold;',
                                            labelWidth: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            border: true,
                                            id: prototype.id + '-f-txtPeriod',
                                            padding: '0 2 0 2',
                                            style: '',
                                            width: 252,
                                            fieldLabel: 'PERIOD:',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            labelWidth: 150
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: true,
                                    layout: 'hbox',
                                    bodyBorder: false,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '<b>ISSUED BY:</b>',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 100
                                        },
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '<b>AEROMEXICO</b>',
                                            id: prototype.id + '-f-lblNomAer',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 150
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 198
                                        },
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '<b>PASSENGER TICKET AND BAGGAGE CHECKED</b>',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 270
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: true,
                                    layout: 'hbox',
                                    bodyBorder: false,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            border: true,
                                            id: prototype.id + '-f-txtConj',
                                            padding: '0 2 0 2',
                                            style: '',
                                            width: 380,
                                            fieldLabel: 'CONJUNTION TICKETS',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            labelWidth: 150
                                        },
                                        {
                                            xtype: 'image',
                                            height: 20,
                                            margin: 5,
                                            padding: '',
                                            width: 25
                                        },
                                        {
                                            xtype: 'image',
                                            height: 20,
                                            margin: 5,
                                            padding: 2,
                                            width: 25
                                        },
                                        {
                                            xtype: 'textfield',
                                            border: true,
                                            id: prototype.id + '-f-txtOrigDest',
                                            padding: '0 2 0 2',
                                            style: '',
                                            width: 252,
                                            fieldLabel: 'ORIGIN/DESTINATION',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            labelWidth: 150
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: true,
                                    layout: 'hbox',
                                    bodyBorder: false,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 250,
                                            text: 'ENDORSEMENTS/RESTRICTIONS'
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 50
                                        },
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '',
                                            id: prototype.id + '-f-lblFuente',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 40,
                                            text: ''
                                        },
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 30,
                                            text: '/'
                                        },
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '',
                                            id: prototype.id + '-f-lblPais',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 40,
                                            text: ''
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 30
                                        },
                                        {
                                            xtype: 'textfield',
                                            border: true,
                                            id: prototype.id + '-f-txtBookRef',
                                            padding: '0 2 0 2',
                                            style: '',
                                            width: 250,
                                            fieldLabel: 'BOOKING REF.',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            labelWidth: 120
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: true,
                                    layout: 'hbox',
                                    bodyBorder: false,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            height: '',
                                            id: prototype.id + '-f-txtEndors',
                                            padding: 0,
                                            width: 250,
                                            fieldLabel: '',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            labelWidth: 0
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 208
                                        },
                                        {
                                            xtype: 'textfield',
                                            height: '',
                                            id: prototype.id + '-f-txtTourC',
                                            padding: 0,
                                            width: 250,
                                            fieldLabel: 'TOUR CODE',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            labelWidth: 120
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: true,
                                    layout: 'hbox',
                                    bodyBorder: false,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 250,
                                            text: 'PASSENGER NAME NOT TRANSFERABLE'
                                        },
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 198,
                                            text: 'DATE OF ISSUE'
                                        },
                                        {
                                            xtype: 'label',
                                            height: '',
                                            html: '',
                                            margin: '0 2 0 2',
                                            padding: 0,
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                            width: 250,
                                            text: 'ISSUE IN EXCHANGE FOR'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: true,
                                    layout: 'hbox',
                                    bodyBorder: false,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            height: '',
                                            id: prototype.id + '-f-txtPassenger',
                                            padding: 0,
                                            width: 250,
                                            fieldLabel: '',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            labelWidth: 0
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 55
                                        },
                                        {
                                            xtype: 'textfield',
                                            height: '',
                                            id: prototype.id + '-f-txtDateIssue',
                                            padding: '0 2 0 2',
                                            width: 100,
                                            fieldLabel: '',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;text-align:center;',
                                            labelSeparator: ' ',
                                            labelWidth: 0
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 45
                                        },
                                        {
                                            xtype: 'textfield',
                                            height: '',
                                            id: prototype.id + '-f-txtIssExc',
                                            padding: 0,
                                            width: 255,
                                            fieldLabel: '',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelWidth: 0
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: true,
                            width: 200,
                            height: 160,
                            layout: 'vbox',
                            bodyStyle: 'background:white',
                            items: [
                                {
                                    xtype: 'label',
                                    border: 1,
                                    height: 30,
                                    id: prototype.id + '-f-lblNomAgente',
                                    style: 'color: #0B333C;font-weight:bold; font-size: 12px;text-align:center',
                                    width: 200
                                            //text: '.....'
                                },
                                {
                                    xtype: 'image',
                                    src: 'resources/img/marca.png',
                                    height: 60,
                                    width: 170
                                },
                                {
                                    xtype: 'label',
                                    border: 1,
                                    height: 30,
                                    id: prototype.id + '-f-lblAgente',
                                    style: 'color: #0B333C;font-weight:bold; font-size: 12px;text-align:center',
                                    width: 200
                                            // text: '.....'
                                }
                            ]
                        }
                    ]
                },
                //Panel Grilla 01
                {
                    xtype: 'panel',
                    border: true,
                    margin: '0 70 0 70',
                    layout: 'vbox',
                    bodyStyle: 'background:#CADAE4',
                    items: [
                        {
                            xtype: 'grid',
                            bodyStyle: 'background:#CADAE4',
                            width: 935,
                            padding: '10 0 0 0',
                            id: prototype.id + '-f-gridDetFac',
                            height: 120,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'STPO',
                                        text: '<b style="font-size:9px">X/O</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'ORAC',
                                        text: '<b style="font-size:9px">FROM</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                            metaData.style = "font-size:9px !important;color:" + color;
                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescFrom + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'DSTC',
                                        text: '<b style="font-size:9px">TO</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                            metaData.style = "font-size:9px !important;color:" + color;
                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescTo + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1.4,
                                        dataIndex: 'CARR',
                                        text: '<b style="font-size:9px">CARRIER</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                            metaData.style = "font-size:9px !important;color:" + color;
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1.4,
                                        dataIndex: 'FTNR',
                                        text: '<b style="font-size:9px">FLIGHT</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'RBKD',
                                        text: '<b style="font-size:9px">CL</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'FTDA',
                                        text: '<b style="font-size:9px">DATE</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'FTDT',
                                        text: '<b style="font-size:9px">TIME</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'FBST',
                                        text: '<b style="font-size:9px">ST</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1.8,
                                        dataIndex: 'FBTD',
                                        text: '<b style="font-size:9px">FARE BASIS</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1.5,
                                        dataIndex: 'NBDA',
                                        text: '<b style="font-size:9px">N. VALID B</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1.5,
                                        dataIndex: 'NADA',
                                        text: '<b style="font-size:9px">N.VALID A</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'strUso',
                                        text: '<b style="font-size:9px">USE</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;background: #bcdcf8";
                                            metaData.tdAttr = 'data-qtip="' + record.data.strDesUso + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'strFecUso',
                                        text: '<b style="font-size:9px">DATE</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;background: #bcdcf8;text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        flex: 1,
                                        dataIndex: 'dblMontoUso',
                                        text: '<b style="font-size:9px">VALUE</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;background: #bcdcf8;text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                //PANEL 02 FARE INFORMATION
                {
                    xtype: 'panel',
                    border: true,
                    width: 937,
                    margin: '0 70 0 70',
                    bodyStyle: 'background:#CADAE4',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1.1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: true,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtFareCurr',
                                                    padding: '0 2 0 2',
                                                    width: 100,
                                                    fieldLabel: 'FARE',
                                                    labelPad: 0,
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    labelWidth: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtFare',
                                                    margin: '0 5 0 8',
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtEquivFaCurr',
                                                    padding: '0 2 0 2',
                                                    width: 100,
                                                    fieldLabel: 'EQUIV',
                                                    labelPad: 0,
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    labelWidth: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtEquivFa',
                                                    margin: '0 5 0 8',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'textareafield',
                                                    height: '',
                                                    id: prototype.id + '-f-txtTaxes',
                                                    padding: '0 2 0 2',
                                                    width: 210,
                                                    fieldLabel: 'Taxes',
                                                    labelPad: 0,
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    labelWidth: 40
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtTotalCurr',
                                                    padding: '0 2 0 2',
                                                    width: 100,
                                                    fieldLabel: 'TOTAL',
                                                    labelPad: 0,
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    labelWidth: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtTotal',
                                                    margin: '0 5 0 8',
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '0 2 0 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'A/L AGENT INFO'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '0 2 0 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'CIF'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: true,
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '6 0 6 0',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;text:align:center',
                                                    width: 120,
                                                    text: 'Fare COBL'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    hidden: true,
                                                    hideMode: 'offsets',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    id: 'aux',
                                                    width: 0,
                                                    hideEmptyLabel: false,
                                                    labelWidth: 0
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtCOBL',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    margin: 0,
                                                    width: 120
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'aux2',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    width: 0,
                                                    labelWidth: 0
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '6 0 6 0',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    width: 120,
                                                    text: 'FORM OF PAYMENT'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtCIA',
                                                    width: 120,
                                                    fieldLabel: 'AIR',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                    labelWidth: 30
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '14 0 0 0',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'CASH'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            bodyStyle: 'background:#CADAE4',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-f-txtCash',
                                                    width: 120,
                                                    labelWidth: 0,
                                                    labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;',
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 2,
                            layout: 'vbox',
                            bodyStyle: 'background:#CADAE4',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            height: 70,
                                            id: prototype.id + '-f-txtFareCal',
                                            width: 600,
                                            fieldLabel: 'FARE CALCULATION',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelWidth: 130
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtFormPay',
                                            margin: '0 5 0 5',
                                            width: 500,
                                            labelWidth: 0,
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '6 0 6 0',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px; text-align:center',
                                            text: 'APP'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtFS',
                                            width: 230,
                                            margin: '0 5 0 5',
                                            fieldLabel: 'FORM & SERIAL',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:center;font-weight:bold;',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelWidth: 90
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtCK',
                                            width: 90,
                                            fieldLabel: 'CK',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:center;font-weight:bold;',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            labelWidth: 30
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtORIN',
                                            width: 250,
                                            fieldLabel: 'ORIGINAL ISSUE',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:center;font-weight:bold;',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background:#CADAE4',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'tbspacer',
                                            width: 335
                                        },
                                        {
                                            xtype: 'label',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            text: 'REMITTANCE AREA'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background:#CADAE4',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            margin: '0 5 0 5',
                                            text: 'CREDIT'
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 180
                                        },
                                        {
                                            xtype: 'label',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            text: 'COMM%'
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 53
                                        },
                                        {
                                            xtype: 'label',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            text: 'TAX'
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 120
                                        },
                                        {
                                            xtype: 'label',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            text: 'TAX'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background:#CADAE4',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtCredit',
                                            margin: '0 5 0 5',
                                            labelStyle: 'color: #0B333C; font-size: 10px; text-align:left;font-weight:bold;',
                                            fieldStyle: 'color: #0B333C; font-size: 10px;',
                                            width: 70,
                                            labelWidth: 80
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                //PANEL 03
                {
                    xtype: 'panel',
                    margin: '5 5 5 5',
                    width: 1060,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'panel',
                            style: 'border: 1px #009dff solid',
                            width: 1060,
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020KEY',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 170,
                                    fieldLabel: 'Prorate Nbr',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 80,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    margin: '8 0 8 0',
                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                    width: 120,
                                    text: 'Ticket Number'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020GRUPO',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 210,
                                    fieldLabel: 'Group',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 90,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728AIRFAC',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 180,
                                    fieldLabel: 'Billing Airline',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 110,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020SUFECH',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 210,
                                    fieldLabel: 'Billing Date',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 110,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            style: 'border: 1px #009dff solid',
                            width: 1060,
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728FECVTA',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 170,
                                    fieldLabel: 'Issue Date',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 80,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728FVLO1',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 240,
                                    fieldLabel: 'Flight Date',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 120,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020FRECHA',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 210,
                                    fieldLabel: 'Clearing',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 90,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020SDATE',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 230,
                                    fieldLabel: 'Processed',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 110,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            style: 'border: 1px #009dff solid',
                            width: 1060,
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728CTYEMI',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 170,
                                    fieldLabel: 'Issue Place',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 80,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728CTYVTA',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 240,
                                    fieldLabel: 'Selling Place',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 120,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728CODIT',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 210,
                                    fieldLabel: 'IT',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 90,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020RMSN',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 230,
                                    fieldLabel: 'RM',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 110,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020USER',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 130,
                                    fieldLabel: 'BY',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 20,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            style: 'border: 2px white solid',
                            width: 1060,
                            layout: 'column',
                            bodyStyle: 'background:#e2f9df',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728ATBP',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 170,
                                    fieldLabel: 'ATBP',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 80,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728MDAATB',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 110,
                                    fieldLabel: 'Currency',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 50,
                                    readOnly: true
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-f-btnNucRoe',
                                    margin: '3 5 3 5',
                                    style: 'background:#02507a;color:white;',
                                    width: 80,
                                    html: '<b style="color:white;"> Nuc*Rose</b>',
                                    listeners: {
                                        click: 'onBtnNucRoe'
                                    }

                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-f-cmbA728IPLUS',
                                    disabled: true,
                                    margin: '3 1 3 1',
                                    width: 120,
                                    fieldLabel: 'Plus',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 60,
                                    value: '?'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728CPLUSS',
                                    margin: '3 5 3 5',
                                    width: 70,
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 0,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020RMSN1',
                                    margin: '3 0 3 0',
                                    style: '',
                                    width: 90,
                                    fieldLabel: 'Q',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; text-align:center',
                                    labelWidth: 30,
                                    readOnly: true
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtA020ACEPTA',
                                            margin: '3 0 5 5',
                                            style: '',
                                            width: 110,
                                            fieldLabel: 'Value',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            labelWidth: 50,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtA020COMISP',
                                            margin: '3 5 5 5',
                                            style: '',
                                            width: 120,
                                            fieldLabel: 'Comm.',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            labelWidth: 60,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtA020COMISI',
                                            margin: '3 0 5 0',
                                            style: '',
                                            width: 120,
                                            fieldLabel: '%',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; text-align:center',
                                            labelWidth: 50,
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            style: 'border: 2px white solid',
                            width: 1060,
                            layout: 'column',
                            bodyStyle: 'background:#e2f9df',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020FAREUS',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 170,
                                    fieldLabel: 'Equivalent',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 80,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA020TARIFA',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 200,
                                    fieldLabel: 'Fare',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 50,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728RUTORG',
                                    margin: '3 0 3  0',
                                    width: 120,
                                    fieldLabel: 'Journey Init',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 70,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728SECDS',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 162,
                                    fieldLabel: 'Sector',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; text-align:center',
                                    labelWidth: 30,
                                    readOnly: true
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-f-btnTUA',
                                            margin: '3 0 3 0',
                                            style: 'background:#02507a;color:white;',
                                            width: 50,
                                            html: '<b style="color:white;"> TUA</b>',
                                            listeners: {
                                                click: 'onBtnTUA'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtA050TUA',
                                            margin: '3 0 5 5',
                                            style: '',
                                            width: 60,
                                            fieldLabel: '',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtA020NETO',
                                            margin: '3 5 5 5',
                                            style: '',
                                            width: 120,
                                            fieldLabel: 'Net',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                            labelWidth: 60,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-f-txtA020TCALC',
                                            margin: '3 0 5 0',
                                            style: '',
                                            width: 100,
                                            fieldLabel: 'TC',
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; text-align:center',
                                            labelWidth: 50,
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            style: 'border: 2px white solid',
                            width: 1060,
                            bodyStyle: 'background:#e2f9df',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728TDESC',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 170,
                                    fieldLabel: 'Discount',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 80,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728PORDES',
                                    margin: '3 5 3 5',
                                    style: '',
                                    width: 70,
                                    fieldLabel: '%',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; text-aling:center',
                                    labelWidth: 10,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728CODTAX',
                                    margin: '3 0 3  0',
                                    width: 125,
                                    fieldLabel: 'Misc',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 30,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728CODTAX1',
                                    margin: '3 2 3  2',
                                    width: 150,
                                    fieldLabel: 'Stopover',
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    labelWidth: 50,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728QSOVER',
                                    margin: '3 2 3  2',
                                    width: 50,
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    readOnly: true
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 10
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-f-btnFareBasis',
                                    margin: '3 0 3 0',
                                    style: 'background:#02507a;color:white;',
                                    width: 85,
                                    html: '<b style="color:white;"> Fare Basis</b>',
                                    listeners: {
                                        click: 'onBtnFareBasis'
                                    }

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728FBASE1',
                                    margin: '3 5 3 5',
                                    width: 140,
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-f-txtA728LOHO',
                                    margin: '3 5 3 0',
                                    width: 80,
                                    labelSeparator: ' ',
                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px; ',
                                    readOnly: true
                                }
                            ]
                        }
                    ]
                }
                ,
                //PANEL GRILLA 02        
                {
                    xtype: 'panel',
                    bodyStyle: 'background:#CADAE4',
                    height: 130,
                    width: 1060,
                    margin: '5 5 5 5',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'gridpanel',
                            bodyStyle: 'background:#CADAE4',
                            height: 130,
                            id: prototype.id + '-f-gridData',
                            width: 1060,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.9,
                                    dataIndex: 'A728XO',
                                    text: '<b style="font-size:9px">X/O</b>',
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.7,
                                    dataIndex: 'A728RUTAO',
                                    text: '<b style="font-size:9px">FT</b>'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.9,
                                    dataIndex: 'A728CARRA1',
                                    text: '<b style="font-size:9px">Carr</b>'

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1,
                                    dataIndex: 'A728NVLO1',
                                    text: '<b style="font-size:9px">Flight</b>'

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1,
                                    dataIndex: 'A728BOOKI1',
                                    text: '<b style="font-size:9px">RBD</b>'

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1.6,
                                    dataIndex: 'A728SS1',
                                    text: '<b style="font-size:9px">Surcharge</b>'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1,
                                    dataIndex: 'A728FARE1',
                                    text: '<b style="font-size:9px">FARE</b>'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.8,
                                    dataIndex: 'A728TFARE1',
                                    text: '<b style="font-size:9px">ST</b>'

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1.4,
                                    dataIndex: 'A728FACT1',
                                    text: '<b style="font-size:9px">FACTOR</b>'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1.5,
                                    dataIndex: 'A728PROV1',
                                    text: '<b style="font-size:9px">PROVISO</b>'

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1.3,
                                    dataIndex: 'A728PPRO1',
                                    text: '%PROV'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.9,
                                    dataIndex: 'A728ACUEO1',
                                    text: '<b style="font-size:9px">SPA</b>'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1.2,
                                    dataIndex: 'A728VALOR1',
                                    text: '<b style="font-size:9px">VALUE</b>'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.9,
                                    dataIndex: 'A728VLSRP1',
                                    text: '<b style="font-size:9px">SRP</b>'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1,
                                    dataIndex: 'A728VLMPA1',
                                    text: '<b style="font-size:9px">MPA</b>'

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1.2,
                                    dataIndex: 'A728AJUST1',
                                    text: '<b style="font-size:9px">Adjust</b>'

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1.6,
                                    dataIndex: 'A728DIFER1',
                                    text: '<b style="font-size:9px">Diferential</b>'

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.9,
                                    dataIndex: 'A728FDIFE1',
                                    text: '<b style="font-size:9px">Flag</b>'

                                }
                            ]
                        }
                    ]
                }


            ]
        }
    ]

});