/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormListRFND',{
	extend: 'Ext.window.Window',
    alias: 'widget.FormListRFND',

    controller: 'FormListRFNDController',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.FormListRFNDController'
    ],

    title:'List RFND',
    header:true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height:400,
    width:1000,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,

    defaults:{
        border: false
    },
    
    items:[
        {
           xtype: 'form',
            id: prototype.id06 + '-form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'grid',
                            id: prototype.id06 + '-gridData02',
                            title: 'RELATED FOLIOS',
                            columnLines: true,
                            autoScroll:true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns:{
                                items:[
                                    {
                                        text: 'Document',
                                        dataIndex: 'A3389NUMER',
                                        width: 80
                                    },
                                    {
                                        text: 'Ticket',
                                        dataIndex: 'A3389TKT',
                                        width: 80
                                    },
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
                                        text: 'Country',
                                        dataIndex: 'A3389PAIS',
                                        width: 60
                                    },
                                    {
                                        text: 'Cur.',
                                        dataIndex: 'A3389MDA',
                                        width: 40
                                    },
                                    {text: 'Net', dataIndex: 'A3389TOTAL', width: 100, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum', 
                                        summaryRenderer: 'OnAirlineSummary'
                                    },
                                    {
                                        text: 'Sales audit',
                                        dataIndex: 'A3389STATO',
                                        flex: 200,
                                        align: 'left',
                                         renderer: 'onRendererColumnReason'
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'A3389FLAG',
                                        flex: 200,
                                        align: 'left',
                                         renderer: 'onRendererColumnReason'
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A3389REGAS',
                                        width: 80
                                    },
                                    {
                                        text: 'Reason BSP',
                                        dataIndex: 'A3389RAAG',
                                       width: 100,
                                        align: 'left',
                                        renderer: 'onRendererColumnReason'
                                    },
                                    {
                                        text: 'Reason AM',
                                        dataIndex: 'A3389RAAR',
                                       width: 100,
                                        align: 'left',
                                        renderer: 'onRendererColumnReason'
                                    }
                                ],
                                defaults:{
                                   sortable: false,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            height: 350,
                            flex: 1,
                            listeners:{
                                afterrender : 'OnLoadGridAfterrender'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
