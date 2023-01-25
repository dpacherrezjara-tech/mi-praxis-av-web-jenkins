/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormOfPaymentRFND',{
	extend: 'Ext.window.Window',
    alias: 'widget.FormOfPaymentRFND',

    controller: 'FormOfPaymentRFNDController',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.FormOfPaymentRFNDController'
    ],

    title:'FORM OF PAYMENT',
    header:true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height:330,
    width:900,
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
            id: prototype.id02 + '-form',
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
                            id: prototype.id02 + '-gridPAYMENT',
                            title: 'LIST FORM OF PAYMENT AIRLINE',
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
                                    {text: 'Type', dataIndex: 'A3408CFOP', width: 70},
                                    {text: 'Card Type', dataIndex: 'A3408TYCAR', width: 120},
                                    {text: 'Credit Card Number', dataIndex: 'A3408NTARJ', flex: 1},
                                    {text: 'Amount', dataIndex: 'A3408TOTAL', width: 90, align: 'right', 
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults:{
                                   sortable: false,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            height: 280,
                            flex: 1
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id02 + '-gridPAYMENTAGENT',
                            title: 'LIST FORM OF PAYMENT AGENT',
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
                                    {text: 'Type', dataIndex: 'A3392CFOP', width: 70},
                                    {text: 'Card Type', dataIndex: 'A3392TYCAR', width: 120},
                                    {text: 'Credit Card Number', dataIndex: 'A3392NTARJ', flex: 1},
                                    {text: 'Amount', dataIndex: 'A3392MONTO', width: 90, align: 'right', 
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults:{
                                   sortable: false,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            height: 280,
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ]
});