    Ext.define('Ext.Praxis.view.sales.CalendarASRForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCalendarASRForm',

    controller: 'DataEntryCalendarASRController',

    requires:[
        'Ext.Praxis.controller.sales.CalendarASR.DataEntryCalendarASRController'
    ],

    title:'Maintenance Calendar ASR',
    header:true,
    height:380,
    width:740,
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
                            text: 'Period Ending Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 135
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtA1528FPRO',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            maskRe: /[0-9/]/,
                            width: 90/*,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            }*/
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
                            text: 'Proccesing Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 155
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtA1528PRDA',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            editable: true,
                            maskRe: /[0-9/]/,
                            width: 90/*,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            }*/
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
                            text: 'Cycle',
                            style: 'font-weight:bold;color:#000;',
                            width: 135
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
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
                            id:prototype.id+'-txtA1528PDIDC',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 1,
                            width: 50,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': '1=Fri, 2=Sat, 3=Sun, 4=Mon, 5=Tue, 6=Wed, 7=Thu'
                            }
                        }/*,
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: '1=Fri, 2=Sat, 3=Sun, 4=Mon, 5=Tue, 6=Wed, 7=Thu',
                            style: 'font-weight:bold;color:#000;',
                            width: 450
                        }*/
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Identifier Month',
                            style: 'font-weight:bold;color:#000;',
                            width: 155
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1528PDIDM',
                            fieldStyle: 'text-align:left',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 50
                        },
                        { xtype: 'tbspacer', width: 65 },
                        {
                            xtype: 'label',
                            text: 'Week',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1528PDIDS',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 1,
                            width: 50
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
                            text: 'Year',
                            style: 'font-weight:bold;color:#000;',
                            width: 155
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1528ANIO',
                            fieldStyle: 'text-align:right',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 50
                        },
                        { xtype: 'tbspacer', width: 65 },
                        {
                            xtype: 'label',
                            text: 'Quarter',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1528CUART',
                            fieldStyle: 'text-align:left',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 1,
                            width: 50
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
                            text: 'Cycle Null',
                            style: 'font-weight:bold;color:#000;',
                            width: 155
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1528CNULO',
                            fieldStyle: 'text-align:left',
                            maskRe: /[SN]/,
                            enforceMaxLength: true,
                            maxLength: 1,
                            width: 50
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
                            text: 'Remark',
                            style: 'font-weight:bold;color:#000;',
                            width: 155
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1528OBS',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
                    margin: '15 0 8 0',
                    width: 700,
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
                                    width: 120
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
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                                    width: 120
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
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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