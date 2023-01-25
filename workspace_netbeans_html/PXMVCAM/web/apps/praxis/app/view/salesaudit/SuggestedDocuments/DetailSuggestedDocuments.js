/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */

prototype.url2 = CONTEXTPATH + '/SuggestedDocuments';
Ext.define('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments',{
	extend: 'Ext.window.Window',
        alias: 'widget.DetailSuggestedDocuments',

    controller: 'DetailSuggestedDocumentsController',

    requires:[
        'Ext.Praxis.controller.salesaudit.SuggestedDocuments.DetailSuggestedDocumentsController'
    ],
    id: prototype.id02 + '-win',

    title:'DETAIL DEBIT/CREDIT REPORTS STATISTICS',
    header:true,
    height:650,
    scrollable: true,
    width:1270,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,

    defaults:{
        border: false
    },
    
    items:[
        {
            xtype: 'panel',
            id:  prototype.id2 + '-contenedor-form',
            width: prototype.widthContenedor,
            items:[
                {
                    xtype: 'panel',
                    id:  prototype.id2 + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding:'10px 5px 0px 5px',
                    layout:{
                        type: 'hbox',
                        pack: 'end'
                    },
                    items:[
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults:{
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items:[
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id2 + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners:{
                                        change: 'onPaginationChkChange'
                                    }
                                },{
                                    xtype: 'Paginator',
                                    id: prototype.id2 + '-pagginator-01',
                                    pagInfo: [
                                        prototype.id2 + '-lbl-currentPage',
                                        prototype.id2 + '-lbl-pageCount',
                                        prototype.id2 + '-lbl-total'
                                    ]
                                }
                            ]
                        },
                        { xtype: 'tbspacer', width: 50 },
                        {
                            xtype: 'toolbar',
                            items:[
                                {
                                    xtype:'button',width: 50,
                                    id:  prototype.id2 + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners:{
                                        click: 'imgExcel_clickHandler'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout:{
                        type: 'hbox',
                        pack: 'center'
                    },
                    width: 1250,
                    height: 480,
                    border: true,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults:{
                        border: false,
                        padding:'0px 5px 0px 5px'
                    },
                    padding:'1px 5px 1px 5px',
                    items:[
                        {
                            xtype: 'grid',
                            id:  prototype.id2 + '-gridData',
                            columnLines: true,
                            autoScroll:true,
                            width: 1250,
                            height: 480,
                            columns:{
                                items:[
                                    {
                                        text: 'Processing </br>date',
                                        dataIndex: 'A1672FPROC',
                                        width: 80
                                    },
                                    {
                                        text: 'System </br>date',
                                        dataIndex: 'A1672FREGI',
                                        width: 80
                                    },
                                     {
                                        text: 'Ticket',
                                        dataIndex: 'A1672TKCNX',
                                        width: 80
                                    },
                                    {
                                        text: 'CPN',
                                        dataIndex: 'A1672CPNS',
                                        width: 60
                                    },
                                    {
                                        text: 'Transaction',
                                        dataIndex: 'A1672TRNCU',
                                        width: 50
                                    },
                                    {
                                        text: 'Country',
                                        dataIndex: 'A1672PAIVT',
                                        width: 60
                                    },
                                    {
                                        text: 'Source',
                                        dataIndex: 'A1672FUENT',
                                        width: 60
                                    },
                                    {
                                        text: 'Cur.',
                                        dataIndex: 'A1672MONET',
                                        width: 40
                                    },
                                    {
                                        text: 'Amount',
                                        dataIndex: 'A1672YQORI',
                                        width: 70,
                                        align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A1672REVIS',
                                        width: 80
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'A1672FLADM',
                                        width: 100
                                    },
                                    {
                                        text: 'IATA',
                                        dataIndex: 'A1672AGENT',
                                        width: 65
                                    },
                                    {
                                        text: 'Agency',
                                        dataIndex: 'A1672NAGENCY',
                                        width: 200,
                                        align: 'left',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672NAGENCY + '"';
                                            return value;
                                        }
                                    },
                                     {
                                        text: 'Itinerary',
                                        dataIndex: 'A1672ITIN',
                                        width: 200,
                                        align: 'left',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672ITIN + '"';
                                            return value;
                                        }
                                    },
                                     {
                                        text: 'Reason',
                                        dataIndex: 'A1672COMIA',
                                        width: 200,
                                        align: 'left',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672COMIA + '"';
                                            return value;
                                        }
                                    },
                                     {
                                        text: 'Argument',
                                        dataIndex: 'A1672COMEN',
                                        width: 200,
                                        align: 'left',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672COMEN + '"';
                                            return value;
                                        }
                                    }
                                    
                                    
                                ],
                                defaults:{
                                   sortable: true,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id:  prototype.id2 + '-pagginator-legend',
                    layout:{
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: transparent;',
                    defaults:{
                        border: false,
                        padding:'0px 5px 0px 5px'
                    },
                    padding:'1px 5px 1px 5px',
                    items:[
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults:{
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items:[
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id:  prototype.id2 + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id:  prototype.id2 + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 100 },
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id:  prototype.id2 + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults:{
                scale: 'medium'
            },
            layout:{
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items:[
                {
                    text: 'Close',
                    id: prototype.id01+'-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});

