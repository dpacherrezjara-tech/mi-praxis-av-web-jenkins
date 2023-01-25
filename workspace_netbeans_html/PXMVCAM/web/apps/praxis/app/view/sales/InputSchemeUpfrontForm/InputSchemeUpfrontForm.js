//prototype.id = 'InputSchemeUpfrontForm';
//prototype.url = CONTEXTPATH+'/InputSchemeUpfront';
prototype.widthContenedor = 1310;
prototype.widthGrid = 1291;

Ext.define('Ext.Praxis.view.sales.InputSchemeUpfrontForm.InputSchemeUpfrontForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.InputSchemeUpfrontForm',
    requires: [
        'Ext.Praxis.controller.sales.InputSchemeUpfront.InputSchemeUpfrontController',
        'Ext.Praxis.view.sales.InputSchemeUpfrontForm.Options',
        'Ext.Praxis.view.sales.InputSchemeUpfrontForm.Filters',
        'Ext.Praxis.view.sales.InputSchemeUpfrontForm.Info'
    ],
    controller: 'InputSchemeUpfrontController',
    layout: {
        type: 'fit'
    },
    padding: '0 0 0 0',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            hidden:true,
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
//                          width: 900,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 540,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
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
                }
            ]
        },
        {
            xtype:'panel',
            layout:'border',
            border:false,
            items:[
                {
                  region:'west',
                  width:200,
                  collapsible: true,
                  split:true,
                  items:[]
                },
                {
                    region:'center',
                    border:false,
                    layout:'border',
                    items:[
                        {
                            region:'north',
                            height:100,
                            collapsible: true,
                            split:true,
                            items:[]
                        },
                        {
                            region:'center',
                            border:false,
                            layout:'fit',
                            items:[
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridSalesReport2',
                                    store:Ext.create('Ext.data.ArrayStore', {
                                        fields: [
                                           {name: 'company'},
                                           {name: 'price',      type: 'float'},
                                           {name: 'change',     type: 'float'},
                                           {name: 'pctChange',  type: 'float'},
                                           {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
                                        ],
                                        data: [
                                            ['FECHA VENTA',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                                            ['SURFACE',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                                            ['TIPO DOC',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                                            ['CARRIER MKTG',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                                            ['COMPONENTE',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                                            ['COMPONENTE TOTALMENTE DENTRO',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                                            ['SECTOR',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                                            ['SUBCOMPONENTE',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                                            ['TIPO USO',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                                            ['FORMA', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                                            ['CARRIER OPTG',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                                            ['RANGO VUELO',            34.14, -0.08, -0.23, '9/1 12:00am'],
                                            ['FARE BASIS',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                                            ['CLASE',                 36.53, -0.03, -0.08, '9/1 12:00am']
                                        ]
                                    }),
                                    //width: prototype.widthGrid,
                                    //height: 490,
                                    stripeRows: false,
                                    viewConfig: {
                                        plugins: {
                                            ptype: 'gridviewdragdrop',
                                            containerScroll: true,
                                            dragGroup: 'someuniquenameforyourgrid',
                                            dropGroup: 'someuniquenameforyourgrid'
                                        }
                                    },
                                    /*viewConfig: {
                                        plugins: {
                                           ptype: 'gridviewdragdrop',
                                           dragGroup: 'firstGridDDGroup',
                                           dropGroup: 'secondGridDDGroup'
                                        },
                                        listeners: {
                                           drop: function(node, data, dropRec, dropPosition) {
                                              var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                                           }
                                        }
                                     },*/
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'CONTRACT', dataIndex: 'company', width: 200,locked:true,sortable : false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'GLOBAL', dataIndex: 'A1155FLGFE', width: 70, sortable: false,locked:true,sortable : false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return (rowIndex%2==0)?'X':'';
                                                }
                                            },
                                            {
                                                text: 'LB1', //dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                columns:[
                                                    {
                                                        text: 'LB1', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return (rowIndex%2==0)?'':'X';
                                                        }
                                                    },
                                                    {
                                                        text: 'LB1', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return (rowIndex%2==0)?'':'X';
                                                        }
                                                    },
                                                    {
                                                        text: 'LB1', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return (rowIndex%2==0)?'':'X';
                                                        }
                                                    },
                                                    {
                                                        text: 'LB1', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return (rowIndex%2==0)?'':'X';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'LB3', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return (rowIndex%2==0)?'X':'';
                                                }
                                            },
                                            {
                                                text: 'LB4', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return (rowIndex%2==0)?'':'X';
                                                }
                                            },
                                            {
                                                text: 'LB5', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB6', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB7', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB8', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB9', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB10', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB2', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB3', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB4', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB5', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB6', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB7', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB8', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB9', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB10', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB3', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB4', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB5', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB6', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB7', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB8', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB9', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            },
                                            {
                                                text: 'LB10', dataIndex: 'A1155FLGFE', width: 50, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return 'X';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
                
            ]
        }
    ]
});