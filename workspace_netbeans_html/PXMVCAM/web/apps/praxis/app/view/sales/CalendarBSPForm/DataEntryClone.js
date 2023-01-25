    Ext.define('Ext.Praxis.view.sales.CalendarBSPForm.DataEntryClone',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCloneCalendarBSPForm',

    controller: 'DataEntryCloneCalendarBSPController',

    requires:[
        'Ext.Praxis.controller.sales.CalendarBSP.DataEntryCloneCalendarBSPController'
    ],

    title:'BSP - Clone calendar',
    header:true,
    height:120,
    width:350,
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
            id: prototype.id + '-formDataEntryClone',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Clone of',
                            width: 60
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'XX',
                            id: prototype.id+'-lblISOC',
                            style: 'font-weight:bold;color:#000;',
                            width: 30
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'year',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: '9999',
                            id: prototype.id+'-lblYear',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'to:',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1529ISOC2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue'
                            }
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
                    text: 'Run',
                    id:prototype.id+'-btnClone',
                    listeners:{
                        click: 'onRunClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btnClose',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]

});