Ext.define('Ext.Praxis.view.sales.AirlineMasterFileForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAirlineMasterFileForm',

    controller: 'DataEntryAirlineMasterFileController',

    requires:[
        'Ext.Praxis.controller.sales.AirlineMasterFile.DataEntryAirlineMasterFileController'
    ],

    title:'Airline Complete Information',
    header:true,
    height:330,
    width:820,
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
                            text: 'Numeric Code',
                            style: 'font-weight:bold;color:#000;',
                            width: 140
                        },
                        {
                            xtype: 'label',
                            id:prototype.id+'-lblMandatorySystem',
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
                            id:prototype.id+'-txtA005KEY',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 50
                        },
                        { xtype: 'tbspacer', width: 80 },
                        {
                            xtype: 'label',
                            text: 'Alpha Code',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            id:prototype.id+'-lblMandatorySystem2',
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
                            id:prototype.id+'-txtA005KEY1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue'
                            }
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
                            text: 'Legal Name',
                            style: 'font-weight:bold;color:#000;',
                            width: 140
                        },
                        {
                            xtype: 'label',
                            id:prototype.id+'-lblMandatorySystem0',
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
                            id:prototype.id+'-txtA005KEY2',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 40,
                            width: 377,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'Clearing house',
                            style: 'font-weight:bold;color:#000;',
                            width: 150
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA005CHS',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 1,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue'
                            }
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
                            text: 'Comercial Name',
                            style: 'font-weight:bold;color:#000;',
                            width: 140,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Comercial Name'
                            }
                        },
                        {
                            xtype: 'label',
                            id:prototype.id+'-lblMandatorySystem1',
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
                            id:prototype.id+'-txtA005KEY3',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 30,
                            width: 377,
                            listeners:{
                                change: 'onUpperValue'
                            }
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
                            text: 'Commission Zero ? S/N',
                            style: 'font-weight:bold;color:#000;',
                            width: 160
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype:'combo',
                            store: Ext.create('Ext.Praxis.store.sales.AirlineMasterFile.A005INDCOM'),
                            id: prototype.id + '-cmbA005INDCOM',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            readOnly: false,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            listeners:{
        //                        afterrender: 'onCmbSearchAfterRender',
                                change: 'onCmbA005INDCOMChange'
                            }
                        },
                        { xtype: 'tbspacer', width: 18 },
                        {
                            xtype: 'label',
                            text: '%',
                            style: 'font-weight:bold;color:#000;',
                            width: 17
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA005COMISP',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 5,
                            width: 50
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'Zone (A,B,C,D,E)',
                            style: 'font-weight:bold;color:#000;',
                            width: 122,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Zona - Camara ICH'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA005ZONA',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 1,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'Associate ACH Yes/No',
                            style: 'font-weight:bold;color:#000;',
                            width: 150,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'ASOCIADO ACH S/N'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA005ACHS',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[SN]/,
                            maxLength: 1,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue'
                            }
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
                            text: 'Sponsored By',
                            style: 'font-weight:bold;color:#000;',
                            width: 160,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'CIA SPONSORED'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA005CIAS',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA005ACPL',
                            hidden: true
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
                    margin: '15 0 8 0',
                    width: 800,
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
                                { xtype: 'tbspacer', width: 70 },
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
                                { xtype: 'tbspacer', width: 70 },
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
                                { xtype: 'tbspacer', width: 70 },
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
                                { xtype: 'tbspacer', width: 70 },
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