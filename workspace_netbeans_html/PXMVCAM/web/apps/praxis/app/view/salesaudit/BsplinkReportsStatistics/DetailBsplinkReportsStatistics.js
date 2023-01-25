/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
//prototype.url2 = CONTEXTPATH + '/BsplinkReportsStatistics';
Ext.define('Ext.Praxis.view.salesaudit.BsplinkReportsStatistics.DetailBsplinkReportsStatistics',{
	extend: 'Ext.window.Window',
    alias: 'widget.DetailBsplinkReportsStatistics',

    controller: 'DetailBsplinkReportsStatisticsController',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkReportsStatistics.DetailBsplinkReportsStatisticsController'
    ],
    id: prototype.id02 + '-win',

    title:'DETAIL BSPLINK REPORTS STATISTICS',
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
                                        text: 'Application </br>date',
                                        dataIndex: 'A3389FAPPI',
                                        width: 80
                                    },
                                    {
                                        text: 'Authorise/</br>Reject date',
                                        dataIndex: 'A3389FAUTO',
                                        width: 75
                                    },
                                    {
                                        text: 'Document',
                                        dataIndex: 'A3389NUMER',
                                        width: 80
                                    },
                                    {
                                        text: 'Country',
                                        dataIndex: 'A3389PAIS',
                                        width: 60
                                    },
                                    {
                                        text: 'Cur.',
                                        dataIndex: 'A3389MDA',
                                        width: 40
                                    },
                                    {
                                        text: 'Fare',
                                        dataIndex: 'A3389TARIF',
                                        width: 70,
                                        align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Taxes',
                                        dataIndex: 'A3389TTAX',
                                        width: 70,
                                        align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Penalty',
                                        dataIndex: 'A3389PENAL',
                                        width: 70,
                                        align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                     {
                                        text: 'IVA penalty',
                                        dataIndex: 'A3389PORPE',
                                        width: 70,
                                        align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Total',
                                        dataIndex: 'A3389TOTAL',
                                        width: 70,
                                        align: 'right',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A3389REGAS',
                                        width: 80
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'A3389FLAG',
                                        width: 100
                                    },
                                    {
                                        text: 'FOP',
                                        dataIndex: 'A3389TCODE',
                                        width: 50,
                                        renderer: 'onRendererColumntdAttr'
                                    },
                                    {
                                        text: 'IATA',
                                        dataIndex: 'A3389IATA',
                                        width: 65
                                    },
                                    {
                                        text: 'Agency',
                                        dataIndex: 'A3389NOMAGENCY',
                                        width: 200,
                                        align: 'left',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.AGENCY + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Days',
                                        dataIndex: 'A3389DIAS',
                                        width: 45
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