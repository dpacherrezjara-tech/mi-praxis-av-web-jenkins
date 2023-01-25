/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.OriginalDataTaxesRFND',{
	extend: 'Ext.window.Window',
    alias: 'widget.OriginalDataTaxesRFND',

    controller: 'OriginalDataTaxesRFNDController',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.OriginalDataTaxesRFNDController'
    ],

    title:'ORIGINAL DATA OF TAXES',
    header:true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height:400,
    width:500,
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
            id: prototype.id03 + '-form',
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
                            id: prototype.id03 + '-gridData02',
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
                                    {text: 'Cur', dataIndex: 'A3402MONED', flex: 1},
                                    {text: 'Country', dataIndex: 'IN_COUNTRY', flex: 1},
                                    {text: 'Tax</br>Code', dataIndex: 'A3402CDTAX', flex: 1},
                                    {text: 'Airline', dataIndex: 'A3402TXMIA', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum', 
                                        summaryRenderer: 'OnAirlineSummary'
                                    },
                                    {text: 'Agent', dataIndex: 'A3402TXUSD', flex: 1, align: 'right',
                                        renderer: 'onColumnAgentRenderer', summaryType: 'sum', 
                                        summaryRenderer: 'OnAgentSummary'
                                    },
                                    {text: 'Diferences</br>RFND', dataIndex: 'A3402TXDIF', flex: 1, align: 'right',
                                        renderer: 'onColumnDiferencesRenderer', summaryType: 'sum', 
                                        summaryRenderer: 'OnDiferencesSummary'
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