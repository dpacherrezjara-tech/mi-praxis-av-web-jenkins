prototype.ProrrateoNew = {
    id: 'ScrProrrateoNewForm'
};
Ext.define('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.ScrProrrateoNewForm',
    requires: [
        'Ext.Praxis.controller.screens.ScrProrrateoNewController'
    ],
    controller: 'ScrProrrateoNewController',
    title: 'Facsimil',
    header: true,
    width: 1130,
    height: 740,
    border: false,
    resizable: false,
    layout:'border',
    modal: true,
    items: [
        {
            region:'north',
            id:prototype.ProrrateoNew.id+'-boxFilterControl',
            height:40,
            layout:'border',
            items:[
                {
                    region:'center',
                    border:false,
                    layout:'fit',
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.ProrrateoNew.id+'-lblError',
                            fieldStyle: 'text-align:left;background-color:#F19D43;',
                            hidden: true,
                            readOnly: true,
                            value: ''
                        }
                    ]
                },
                {
                    region:'east',
                    width:'20%',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'panel',
                            id: prototype.ProrrateoNew.id+'-boxClosexx',
                            hidden: true,
                            layout: 'hbox',
                            bodyStyle: 'background:#E6EFF5',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.ProrrateoNew.id+'-btnClosexx',
                                    hidden: true,
                                    margin: 7,
                                    style: 'background:#02507a',
                                    text: '<strong style="color:white;">Close</strong>',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    listeners: {
                                        click: 'btnClose_clickHandler'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background:#E6EFF5',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.ProrrateoNew.id+'-btnMasterIndex',
                                    margin: 7,
                                    style: 'background:#02507a',
                                    text: '<strong style="color:white;">Master Index</strong>',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    listeners: {
                                        click: 'btnMasterIndex_clickHandler'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background:#E6EFF5',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.ProrrateoNew.id+'-btnDelivery',
                                    margin: 7,
                                    style: 'background:#02507a',
                                    text: '<strong style="color:white;">Deliveryxx</strong>',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    listeners: {
                                        click: 'btnDelivery_clickHandler'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            region:'center',
            border:false,
            layout:'border',
            items:[
                {
                    region:'center',
                    border:false,
                    layout:'border',
                    items:[
                        {
                            region:'north',
                            height:130,
                            border:false,
                            layout:'border',
                            items:[ 
                                {
                                    region:'west',
                                    width:400,
                                    border:false,
                                    //layout:'fit',
                                    items:[
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'column',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '1 2 1 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'ISSUEDx BY:'
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.ProrrateoNew.id+'-lblNomAer',
                                                    margin: '1 2 1 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'AEROMEXICO'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'column',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.ProrrateoNew.id+'-lblCnj',
                                                    margin: '5 2 5  2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'CONJUNTION TICKETS'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.ProrrateoNew.id+'-txtConj',
                                                    style: 'font-size: 10px;',
                                                    width: 120,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                },
                                                {
                                                    xtype: 'button',
                                                    border: false,
                                                    id: prototype.ProrrateoNew.id+'-imgPrev',
                                                    icon: 'resources/img/botones/16x16/prev.png',
                                                    style: 'background:#E6EFF5',
                                                    height: 18,
                                                    margin: 2,
                                                    width: 18,
                                                    tooltip: 'Conj - Prev',
                                                    listeners: {
                                                        click: 'onBtnPrev'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.ProrrateoNew.id+'-imgNext',
                                                    border: false,
                                                    icon: 'resources/img/botones/16x16/next.png',
                                                    style: 'background:#E6EFF5',
                                                    height: 18,
                                                    margin: 2,
                                                    width: 18,
                                                    tooltip: 'Conj - Next',
                                                    listeners: {
                                                        click: 'onBtnNext'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'hbox',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '5 2 5 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'ENDORSEMENTS/RESTRICTIONS'
                                                },
                                                {
                                                    xtype: 'tbspacer',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.ProrrateoNew.id+'-lblFuente',
                                                    margin: '5 2 5 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: ''
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '5 2 5 2',
                                                    hidden: true,
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: '/'
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.ProrrateoNew.id+'-lblPais',
                                                    margin: '5 2 5 2',
                                                    hidden: true,
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: ''
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.ProrrateoNew.id+'-celEndors',
                                            flex: 1,
                                            border: true,
                                            layout: 'hbox',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.ProrrateoNew.id+'-txtEndors',
                                                    margin: '0 2 0 2',
                                                    style: 'font-size: 10px;',
                                                    fieldStyle: 'font-size: 10px;'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'hbox',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 2,
                                                    margin: '1 2 1 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'PASSENGER NAME NOT TRANSFERABLE'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    margin: '1 2 1 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                                    text: 'DATE OF ISSUE'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1.5,
                                                    id: prototype.ProrrateoNew.id+'-txtPassenger',
                                                    style: 'font-size: 10px;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                },
                                                {
                                                    xtype: 'tbspacer',
                                                    flex: 0.6
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.7,
                                                    id: prototype.ProrrateoNew.id+'-txtDateIssue',
                                                    style: 'font-size: 10px;text-align:center;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:center;'
                                                },
                                                {
                                                    xtype: 'tbspacer',
                                                    flex: 0.1
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    region:'center',
                                    border:false,
                                    //layout:'fit',
                                    items:[
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'column',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '1 2 1 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'PASSENGER TICKET AND BAGGAGE CHECKED'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'hbox',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '5 2 5 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    width: '60%',
                                                    text: 'ORIGIN/DESTINATION'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.ProrrateoNew.id+'-txtOrigDest',
                                                    style: 'font-size: 10px;',
                                                    margin: '0 2 0 2',
                                                    width: '40%',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'hbox',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    margins: '',
                                                    id: prototype.ProrrateoNew.id+'-txtPNR',
                                                    margin: '0 2 0 2',
                                                    style: 'font-size: 10px;',
                                                    width: '100%',
                                                    fieldLabel: 'PNR',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 80,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'hbox',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.ProrrateoNew.id+'-txtTourC',
                                                    margin: '0 2 0 2',
                                                    style: 'font-size: 10px;',
                                                    width: '100%',
                                                    fieldLabel: 'TOUR CODE',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 80,
                                                    fieldStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'hbox',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 1.3,
                                                    margin: '1 2 1 2',
                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    text: 'ISSUED IN EXCHANGE FOR'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            layout: 'hbox',
                                            bodyBorder: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    margin: '0 2 0 2',
                                                    id: prototype.ProrrateoNew.id+'-txtIssExc',
                                                    style: 'font-size: 10px;',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                }
                                            ]
                                        }
                                    ]
                                },

                                {
                                    region:'east',
                                    width:150,
                                    border:false,
                                    layout:'vbox',
                                    items:[
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            id: prototype.ProrrateoNew.id+'-lblNomAgente',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                            width: '100%',
                                            text: ''
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            html: '<br>',
                                            id: prototype.ProrrateoNew.id+'-lblDirAgente',
                                            margin: '5 5 5 5',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                            width: 120
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            html: '<br>',
                                            id: prototype.ProrrateoNew.id+'-lblAgente',
                                            margin: '5 5 5 5',
                                            style: 'color: #0B333C;font-weight:bold; font-size: 13px;text-align:center',
                                            width: 120
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            region:'center',
                            border:true,
                            layout:'fit',
                            items:[
                                {
                                    xtype: 'grid',
                                    //width: 760,
                                    padding: '0 0 0 0',
                                    id: prototype.ProrrateoNew.id+'-gridDetFac',
                                    bodyStyle: 'background:#E6EFF5',
                                    //height: 130,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            style: 'font-size:8px '
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
                                                    metaData.style = "font-size:9px !important;color:"+color;
                                                    metaData.tdAttr = 'data-qtip="'+record.data.strDescFrom+'"';
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
                                                    metaData.style = "font-size:9px !important;color:"+color;
                                                    metaData.tdAttr = 'data-qtip="'+record.data.strDescTo+'"';
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
                                                    metaData.style = "font-size:9px !important;color:"+color;
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
                                                    metaData.tdAttr = 'data-qtip="'+record.data.strDesUso+'"';
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
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                flex: 1,
                                                dataIndex: 'strLeg',
                                                text: '<b style="font-size:9px">LEG</b>',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background: #bcdcf8;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;font-size:9px !important;";
                                                    metaData.tdAttr = 'data-qtip="View Leg"';
                                                    return '<a href="#screens-scr-prorrateo-new-form" style="color:#057ECB;text-decoration:none;">'+value+'</a>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            region:'south',
                            height:150,
                            border:false,
                            layout:'fit',
                            items:[
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background:#E6EFF5',
                                    layout: 'border',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            region:'west',
                                            width: 210,
                                            border: true,
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.ProrrateoNew.id+'-txtFare',
                                                    margin: '0 2 1 2',
                                                    fieldLabel: 'FARE',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 50,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right;width:100%'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.ProrrateoNew.id+'-txtEquivFa',
                                                    margin: '0 2 1 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right;width:100%',
                                                    fieldLabel: 'EQUIV',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 50
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    height: 50,
                                                    id: prototype.ProrrateoNew.id+'-txtTaxes',
                                                    margin: '0 2 1 2',
                                                    fieldLabel: 'TAXES',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 50,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.ProrrateoNew.id+'-txtTotal',
                                                    margin: '5 2 2 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right',
                                                    fieldLabel: 'TOTAL',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 50
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            region:'center',
                                            //width: 550,
                                            border: false,
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: 'border',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    region: 'north',
                                                    height:60,
                                                    border:false,
                                                    //width: 400,
                                                    layout: 'fit',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            id: prototype.ProrrateoNew.id+'-txtFareCal',
                                                            margin: '5 1 5 1',
                                                            fieldLabel: 'FARE CALC',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            labelWidth: 80,
                                                            //wbodyStyle:'width:440px;',
                                                            width:440,
                                                            //grow:true,
                                                            //growMax:440,
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    region: 'center',
                                                    height: 60,
                                                    border:false,
                                                    layout: 'fit',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            //height: 50,
                                                            id: prototype.ProrrateoNew.id+'-txtFormPay',
                                                            margin: '0 1 5 1',
                                                            padding: '2 0 2 0',
                                                            fieldLabel: 'FOP',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            labelWidth: 80,
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    region: 'south',
                                                    height: 30,
                                                    border:false,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            id: prototype.ProrrateoNew.id+'-lblTicket',
                                                            margin: '5 5 5 5',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center',
                                                            text: '.....',
                                                            width: 200
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 2,
                                                            id: prototype.ProrrateoNew.id+'-txtORIN',
                                                            margin: '0 2 0 2',
                                                            fieldLabel: 'ORIGINAL ISSUE',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            fieldStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            id: prototype.ProrrateoNew.id+'-TicketPadre',
                                                            hidden: true,
                                                            margin: '5 5 5 5',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center',
                                                            text: '.....'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            id: prototype.ProrrateoNew.id+'-EsConjunto',
                                                            hidden: true,
                                                            margin: '5 5 5 5',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center',
                                                            text: '.....'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            id: prototype.ProrrateoNew.id+'-TicketCompanion',
                                                            hidden: true,
                                                            margin: '5 5 5 5',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center;',
                                                            text: '.....'
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
                },
                {
                    region:'east',
                    width:320,
                    border:false,
                    layout:'fit',
                    items:[
                        {
                            xtype: 'panel',
                            id: prototype.ProrrateoNew.id+'-boxProrrateInformation',
                            flex: 1,
                            bodyStyle: 'background:#E8F9E8',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Group',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtGRUPO',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 75
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtORIG',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Cur. Reg',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtMONREG',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 40
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Method',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtMethod',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 75
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtPRO',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Cnj',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtCNJ',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 40
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Sale City',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtCIUVTA',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 43
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtPAIVTA',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Transaction',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtFEXCH',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 40
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Issue',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtCIUEMI',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 43
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtPAIEMI',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Sale Date',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtFECVTA',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Lnk',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            hidden: true,
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtNRPRT',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            hidden: true,
                                            width: 100
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Initial Trip',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtINITRA',
                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 76
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtA1530STPRO',
                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'IT',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtCODIT',
                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            flex: 1
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'FARE',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtTARIFA',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 75
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtMONEDA',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'NUC',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtTRFNUC',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 56
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'EQV.',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtTRFPAG',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 75
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtMDAPAG',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'ROE',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtROE',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 56
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'S.Over',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtCSOVER',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 75
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtQSOVER',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Plus',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtCPLUSS',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 56
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Comm.',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtCOMMIS',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 75
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtMDACOM',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Dsct',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Dsc Comm.'
                                            },
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtPORCOM',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 56
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Adjust',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtTAJUST',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 77
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'AdjustQ',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtTAJUSQ',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    hidden: true,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Fare Calc.',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtFARECAL720',
                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', flex: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtMDAFRC',
                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 40
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Local Ex/Rate',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtRATE',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 70
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtSTAT',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 55
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Fare',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', flex: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtFARECOBL',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtCURR',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 40
                                        },
                                        {xtype: 'tbspacer', flex: 1},
//                                                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'ADC',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', flex: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtPAGO',
                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtPGCURR',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 40
                                        },
                                        {xtype: 'tbspacer', flex: 1},
//                                                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Crt by',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtREGIST',
                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', flex: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtFREGIS',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0',
                                    bodyStyle: 'background:#E8F9E8',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Upd by',
                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                            padding: '4 0',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtREVISA',
                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', flex: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.ProrrateoNew.id+'-txtFREVIS',
                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 15}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            region:'south',
            height:170,
            border:false,
            layout:'fit',
            items:[
                {
                    xtype: 'grid',
                    id: prototype.ProrrateoNew.id+'-gridDetCpn',
                    margin: '5 0',
                    bodyStyle: 'background:#E6EFF5',
                    //height: 170,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center',
                            style: 'font-size:9px'
                        },
                        items: [
                            {
                                xtype: 'gridcolumn',
                                width: 30,
                                dataIndex: 'A720CONEX',
                                text: '<b style="font-size:9px;text-align:center">O</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 45,
                                dataIndex: 'A720RUTAO',
                                text: '<b style="font-size:9px">From</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    if (record.data.strDescRutaO !== "") {
                                        metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaO+'"';
                                    }
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 35,
                                dataIndex: 'A720RUTAD',
                                text: '<b style="font-size:9px">To</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    if (record.data.strDescRutaD !== "") {
                                        metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaD+'"';
                                    }
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 35,
                                dataIndex: 'A720CARRA',
                                text: '<b style="font-size:9px">Cr</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 55,
                                dataIndex: 'A720NVLO',
                                text: '<b style="font-size:9px">Flt</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 65,
                                dataIndex: 'A720FVLO',
                                text: '<b style="font-size:9px">Date</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 25,
                                dataIndex: 'A720BOOKI',
                                text: '<b style="font-size:9px">R</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 25,
                                dataIndex: 'A720CLASE',
                                text: '<b style="font-size:9px">C</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720FBUSO',
                                text: '<b style="font-size:9px">F Basis.</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720FARE',
                                text: '<b style="font-size:9px">Fare</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 35,
                                dataIndex: 'A720TFARE',
                                text: '<b style="font-size:9px">ST</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 75,
                                dataIndex: 'A720SS',
                                text: '<b style="font-size:9px">Q</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 75,
                                dataIndex: 'A720VALOR',
                                text: '<b style="font-size:9px">Value</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                    return value;
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                width: 70,
                                dataIndex: 'A720QIN',
                                text: '<b style="font-size:9px">Q Surcharge</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                    return value;
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                width: 70,
                                dataIndex: 'A720YQ',
                                text: '<b style="font-size:9px">YQ</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720VLSRP',
                                text: '<b style="font-size:9px">SRP</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? "#FBD705" : (record.data.A720INDPR === 'S' ? '#FBD705' : '#FFFFFF');
                                    metaData.style = "font-size:9px !important;text-align:right; background:"+color;
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720VLMPA',
                                text: '<b style="font-size:9px">MPA</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? (record.data.A720INDPR === 'M' ? '#FBD705' : '#FFFFFF') : "#FFFFFF";
                                    metaData.style = "font-size:9px !important;text-align:right; background:"+color;
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720ACUE',
                                text: '<b style="font-size:9px">SPA</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? (record.data.A720INDPR === 'A' ? '#FBD705' : '#FFFFFF') : "#FFFFFF";
                                    metaData.style = "font-size:9px !important;text-align:right; background:"+color;
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720ISC',
                                text: '<b style="font-size:9px">ISC</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720AJUST',
                                text: '<b style="font-size:9px">Adjust</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                text: '<b style="font-size:9px">SPA</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720ACUEO',
                                        text: '<b style="font-size:9px">Force</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Factor</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720FACT',
                                        text: '<b style="font-size:9px">Millas</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">%</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720PPRO',
                                        text: '<b style="font-size:9px">Proviso</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Base</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720PROV',
                                        text: '<b style="font-size:9px">Amt</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Proration</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720PRRCM',
                                        text: '<b style="font-size:9px">Commision</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        width: 70,
                                        dataIndex: 'A720PRSCM',
                                        text: '<b style="font-size:9px">SCM Rev</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        width: 70,
                                        dataIndex: 'PRORAT_LOCAL_CUR',
                                        text: '<b style="font-size:9px">Local Currency</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "font-size:9px !important;text-align:right";
//                                                    value = data.A720VALOR / data.A720TCAMB;
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        width: 70,
                                        dataIndex: 'A720LYQ',
                                        text: '<b style="font-size:9px">YQ</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        width: 70,
                                        dataIndex: 'A720LIV',
                                        text: '<b style="font-size:9px">IVA</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    id: prototype.ProrrateoNew.id+'-gridDetCpnCTS',
                    hidden:true,
                    margin: '5 0',
                    bodyStyle: 'background:#E6EFF5',
                    //height: 170,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center',
                            style: 'font-size:9px'

                        },
                        items: [
                            {
                                xtype: 'gridcolumn',
                                width: 130,
                                dataIndex: 'TICKET',
                                text: '<b style="font-size:9px;text-align:center">Ticket</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 40,
                                dataIndex: 'CUPON',
                                text: '<b style="font-size:9px;text-align:center">Cpn</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 30,
                                dataIndex: 'A720CONEX',
                                text: '<b style="font-size:9px;text-align:center">O</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 45,
                                dataIndex: 'A720RUTAO',
                                text: '<b style="font-size:9px">From</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    if (record.data.strDescRutaO !== "") {
                                        metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaO+'"';
                                    }
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 35,
                                dataIndex: 'A720RUTAD',
                                text: '<b style="font-size:9px">To</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    if (record.data.strDescRutaD !== "") {
                                        metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaD+'"';
                                    }
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 35,
                                dataIndex: 'A720CARRA',
                                text: '<b style="font-size:9px">Cr</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 42,
                                dataIndex: 'A720NVLO',
                                text: '<b style="font-size:9px">Flt</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 60,
                                dataIndex: 'A720FVLO',
                                text: '<b style="font-size:9px">Date</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 35,
                                dataIndex: 'A720BOOKI',
                                text: '<b style="font-size:9px">R</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 35,
                                dataIndex: 'A720CLASE',
                                text: '<b style="font-size:9px">C</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720FBUSO',
                                text: '<b style="font-size:9px">F. Basis</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720FARE',
                                text: '<b style="font-size:9px">Fare</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 35,
                                dataIndex: 'A720TFARE',
                                text: '<b style="font-size:9px">ST</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;";
                                    return value;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720SS',
                                text: '<b style="font-size:9px">Q</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 70,
                                dataIndex: 'A720VLSRP',
                                text: '<b style="font-size:9px">SRP</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 55,
                                dataIndex: 'A720VALOR',
                                text: '<b style="font-size:9px">Value</b>',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                    return value;
                                }
                            },
                            {
                                text: '<b style="font-size:9px">Q</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720QIN',
                                        text: '<b style="font-size:9px">Surcharge</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 70,
                                        dataIndex: 'A720Q',
                                        text: '<b style="font-size:9px">Final</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Factor</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720FACT',
                                        text: '<b style="font-size:9px">Millas</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">% Proration</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720PPRO',
                                        text: '<b style="font-size:9px">Commision</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Proration</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 80,
                                        dataIndex: 'A720PRRCM',
                                        text: '<b style="font-size:9px">Commision</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">% Standard</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720ISC',
                                        text: '<b style="font-size:9px">Commision</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Amt Standard</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 80,
                                        dataIndex: 'A720VLISC',
                                        text: '<b style="font-size:9px">Commision</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">% Comm.</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 70,
                                        dataIndex: 'A720GSA',
                                        text: '<b style="font-size:9px">Upfront</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Amt Comm.</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 80,
                                        dataIndex: 'A720VLGSA',
                                        text: '<b style="font-size:9px">Upfront</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">% Total</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 80,
                                        dataIndex: 'dblISCGSA',
                                        text: '<b style="font-size:9px">Stand+Upfront</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:center";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Amt Total</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 100,
                                        dataIndex: 'dblVLISCVLGSA',
                                        text: '<b style="font-size:9px">Stand+Upfront</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:center";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">% Diff</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 60,
                                        dataIndex: 'dblISCGSAPPRO',
                                        text: '<b style="font-size:9px">Comm.</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Amt Diff</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 80,
                                        dataIndex: 'dblVLISCVLGSAPRRCM',
                                        text: '<b style="font-size:9px">Comm</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">% Comm.</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 40,
                                        dataIndex: '',
                                        text: '<b style="font-size:9px">Backend</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {
                                text: '<b style="font-size:9px">Amt Comm.</b>',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                columns: [
                                    {
                                        width: 40,
                                        dataIndex: '',
                                        text: '<b style="font-size:9px">Backend</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            id: prototype.ProrrateoNew.id+'-dockedItems',
            dock: 'bottom',
            ui: 'footer',
//            margin: '4',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    xtype: 'button',
                    id: prototype.ProrrateoNew.id+'-btnClose',
                    style: 'background:#02507a',
                    text: '<strong style="color:white;">Close<strong>',
                    cls: 'x-btn-sent',
                    overCls: 'x-btn-sent-over',
                    tooltip: '\{ESC\}',
                    listeners: {
                        click: 'btnClose_clickHandler'
                    }
                }
            ]
        }
    ]
});