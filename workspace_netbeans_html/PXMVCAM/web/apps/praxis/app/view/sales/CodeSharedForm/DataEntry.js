    Ext.define('Ext.Praxis.view.sales.CodeSharedForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCodeSharedForm',

    controller: 'DataEntryCodeSharedController',

    requires:[
        'Ext.Praxis.controller.sales.CodeShared.DataEntryCodeSharedController'
    ],

    title:'Code Shared Complete Information',
    header:true,
    height:360,
    width:555,
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
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Airline',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: '(*)',
                            labelSeparator: ':',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtAirline',
                            fieldStyle: 'text-align:center',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'Carrier',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: '(*)',
                            labelSeparator: ':',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtCarrier',
                            fieldStyle: 'text-align:center',
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
                            text: 'Begin Flight',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: '(*)',
                            labelSeparator: ':',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtBeginFlight2',
                            fieldStyle: 'text-align:right',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'End Flight',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: '(*)',
                            labelSeparator: ':',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtEndFlight2',
                            fieldStyle: 'text-align:right',
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
                            text: 'Vigency From',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: '(*)',
                            labelSeparator: ':',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtVigencyFrom',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'Vigency To',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: '(*)',
                            labelSeparator: ':',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtVigencyTo',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 8,
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
                            text: 'Operated Carrier',
                            style: 'font-weight:bold;color:#000;',
                            width: 147
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtCiaCode',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 48
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtCiaName',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 48
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
                            text: 'Operated Flight Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 147
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtFlightNumber',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 5,
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
                            width: 30
                        },
                        { xtype: 'tbspacer', width: 3 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtOrig',
                            fieldStyle: 'text-align:right',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtDest',
                            fieldStyle: 'text-align:right',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
                    margin: '15 0 8 0',
//                    width: 700,
                    border: true,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Register By',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 95
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USCR',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 55
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FECR',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Hour',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 55
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOCR',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Update By',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 95
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USUP',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 55
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FEUP',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Hour',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 55
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOUP',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
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
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                }
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