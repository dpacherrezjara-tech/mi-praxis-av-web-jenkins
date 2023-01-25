Ext.define('Ext.Praxis.view.flown.BaseSalesForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBaseSalesForm',

    controller: 'DataEntryBaseSalesController',

    requires:[
        'Ext.Praxis.controller.flown.BaseSales.DataEntryBaseSalesController'
    ],

    title:'BaseSales',
    header:true,
    height:280,
    width:400,
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
            id: prototype.id + '-formDataEntry',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    hidden: true,
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'KEY',
                            style: 'font-weight:bold;color:#000;',
                            width: 140
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051KEY1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 122
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Code',
                            style: 'font-weight:bold;color:#000;',
                            width: 150
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051KEY2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 6,
                            width: 122
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Taxable Base ',
                            style: 'font-weight:bold;color:#000;',
                            width: 150
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051DESCR1',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 80,
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'VAT Rate',
                            style: 'font-weight:bold;color:#000;',
                            width: 150
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051DESCR2',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 80,
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Rate S / Sale',
                            style: 'font-weight:bold;color:#000;',
                            width: 150
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051CANTI1',
                            fieldStyle: 'text-align:right',
//                            enforceMaxLength: true,
                            
//                            maxLength: 2,
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    hidden : true,
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Amount 2',
                            style: 'font-weight:bold;color:#000;',
                            width: 140
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051CANTI2',
                            fieldStyle: 'text-align:right',
//                            enforceMaxLength: true,
                            
//                            maxLength: 2,
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 150
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051FECHA1',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            
                            maxLength: 8,
                            width: 122
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 150
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051FECHA2',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            
                            maxLength: 8,
                            width: 122
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    hidden : true,                    
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Comment',
                            style: 'font-weight:bold;color:#000;',
                            width: 140
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051COMENT',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            
                            maxLength: 80,
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    hidden : true,
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;color:#000;',
                            width: 140
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA051STATUS',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            
                            maxLength: 2,
                            width: 80
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
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Save',
                    id:prototype.id+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
//                ,
//                { xtype: 'tbspacer', width: 30 },
//                {
//                    xtype: 'label',
//                    text: '(*) Required Fields',
//                    style: 'font-weight:bold;color:red;',
//                    width: 120
//                }
//                ,
//                { xtype: 'tbspacer', width: 30 },
//                {
//                    xtype: 'button',
//                    id:prototype.id+'-btn-prev',
//                    icon: 'resources/img/botones/prev.png',
//                    tooltip: 'View Previous Flight Manifest',
//                    border: false,
//                    listeners:{
//                        click: 'onPrevClick'
//                    }
//                },
//                {
//                    xtype: 'button',
//                    id:prototype.id+'-btn-next',
//                    icon: 'resources/img/botones/next2.png',
//                    tooltip: 'View Next Flight Manifest',
//                    border: false,
//                    listeners:{
//                        click: 'onNextClick'
//                    }
//                }
            ]
        }
    ]

});