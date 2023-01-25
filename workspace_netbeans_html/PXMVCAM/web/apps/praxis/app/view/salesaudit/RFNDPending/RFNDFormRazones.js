/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDPending.RFNDFormRazones',{
	extend: 'Ext.window.Window',
    alias: 'widget.RFNDFormRazones',

    controller: 'RFNDFormRazonesController',

    requires:[
        'Ext.Praxis.controller.salesaudit.RFNDPending.RFNDFormRazonesController'
    ],

    title:'SELECT ISSUE REASON',
    header:true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height:450,
    width:800,
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
            layout: 'hbox',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'grid',
                    id: prototype.idRFNDFormRazones + '-gridControlRazon',
                    flex: 1,
                    height: 400,
                    features: [
                        {
                            ftype: 'grouping',
                            groupHeaderTpl: '{name}',
                            startCollapsed: true
                        }
                    ],
                    columns:{
                        items:[
                            {text: 'Cod.Razon', dataIndex: 'A3651CODRZ', flex: 1},
                            {text: 'Relation', dataIndex: 'A3651FAMIL', flex: 1},
                            {text: 'Description', dataIndex: 'A3651COMES', width: 300, renderer: 'OnRendererColumnDescription', cellWrap: true},
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items:[
                                    {
                                        iconCls: 'prx-icon-check',
                                        handler: 'OnChkRFNDHandler',
                                        isDisabled: 'OnChkRFNDIsDisabled'
                                    }
                                ]
                            }
                        ],
                        defaults:{
                           sortable: true,
                           menuDisabled: true
                        }
                    },
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false
                    },
                    listeners:{
                        // afterrender: 'OnLoadDataAfterRender'
                    }
                }
            ]
        }
    ]
});