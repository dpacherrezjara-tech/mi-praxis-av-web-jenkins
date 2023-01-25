Ext.define('Ext.Praxis.view.sales.PanicValueForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryPanicValueForm',

    controller: 'DataEntryPanicValueController',

    requires:[
        'Ext.Praxis.controller.sales.PanicValue.DataEntryPanicValueController'
    ],

    title:'PanicValue Complete Information',
    header:true,
    height:540,
    width:640,
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
                            text: 'Record Type',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725TREGI',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 3,
                            width: 30
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
                            text: 'Date:',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725FDESDE',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 8,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725FHASTA',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 8,
                            width: 80
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
                            text: 'Fare:',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725TARIFD',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725TARIFA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'EQ. Payment:',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725EQPAGD',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725EQPAGA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'Exchange Rate:',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725TCAMBD',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725TCAMBA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'Fare (NUC):',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725TFNUCD',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725TFNUCA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'Ex. Rate (ROE):',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725ROED',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725ROEA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: '% Discount:',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725PRDESD',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725PRDESA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'Stopover Value:',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725CSVERD',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725CSVERA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'Plus (NUC):',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725PLUSSD',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725PLUSSA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'Fare (ATBP):',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725FARED',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725FAREA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'Agreement:',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725ACUERD',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725ACUERA',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
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
                            text: 'Difference:',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;color:#000;',
                            width: 40
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725DIFGRO',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;color:#000;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA725DIFTAX',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            width: 80
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
//                    margin: '15 0 8 0',
//                    width: 660,
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
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 18 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 18 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOCR',
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
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 18 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 18 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOUP',
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