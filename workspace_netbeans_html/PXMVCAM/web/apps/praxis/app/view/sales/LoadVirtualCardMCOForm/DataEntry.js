Ext.define('Ext.Praxis.view.sales.LoadVirtualCardMCOForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLoadVirtualCardMCOForm',

    controller: 'DataEntryLoadVirtualCardMCOController',

    requires:[
        'Ext.Praxis.controller.sales.LoadVirtualCardMCO.DataEntryLoadVirtualCardMCOController'
    ],

    title:'Load Virtual MCO:',
    header:true,
    height:200,//+100 con Control Data
    width:890,
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
                            text: 'TYPE:',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
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
                            xtype:'combo',
                            id: prototype.id + '-cmbtINDACN',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["U", "Upfront"],
                                    ["B", "Backend"]
                                ]
                            }),
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
                            width: 90,
                            hidden: false,
                            hiddenLabel: false
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
                            text: 'VIRTUAL CARD:',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
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
                            id:prototype.id+'-TXT_VIRTUAL_CARD',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 20,
                            width: 140
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'EFFEC.DATE:',
                            style: 'font-weight:bold;color:#000;',
                            width: 80
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
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-DATE_EFFEC',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            maskRe: /[0-9/]/,
                            value: new Date(),
                            editable: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'TERM.DATE:',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-DATE_TERM',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            maskRe: /[0-9/]/,
                            value: new Date(),
                            editable: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id+'-CHECK_UPFRONT',
                            boxLabel: 'UPFRONT',
                            checked: true
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id+'-CHECK_BACKEND',
                            boxLabel: 'BACKEND',
                            checked: true
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-TXT_VIRTUAL_CARD_ENC',
                            hidden: true,
                            width: 0
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-TXT_VIRTUAL_CARD_BCK',
                            hidden: true,
                            width: 0
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
                            text: 'NAME PRODUCT:',
                            style: 'font-weight:bold;color:#000;',
                            width: 130
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-TXT_PRODUCT',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 40,
                            width: 340
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            text: 'TRADE NAME:',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-TXT_SELECT_TRADE',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 150,
                            width: 250
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 3 },
                        {
                            xtype: 'filefield',
                            id: prototype.id + '-txtRutaExcel2',
                            fieldLabel: '<strong>Upload File Format<strong>',
                            labelSeparator: ':',
                            labelWidth: 135,
                            allowBlank: true,
                            accept: '.xlsx, .xls, .csv',
                            margin: '2 4 2 4',
                            width: 397,
                            listeners:{
                                change: 'onUploadChange'
                            },
                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                            regexText: 'Only CSV, XLS and XLSX formats are accepted',
                            buttonConfig: {
                                text : '<strong>Upload</strong>',
                                width: 80,
//                                cls: 'x-btn-upload x-btn-upload-txt',
//                                overCls: 'x-btn-upload-hover x-btn-upload-txt-hover'
                            }
                        },
                        {
                            xtype: 'button',
                            id:prototype.id+'-btnSaveFilter2',
                            html: '<strong>Save</strong>',
                            border: true,
                            margin: '2 0 2 0',
                            width: 80,
                            listeners:{
                                click: 'onSaveFilterClick'
                            }
                        }
                    ]
                }
                //,
//                {
//                    xtype: 'fieldset',
//                    id: prototype.id+'-ControlData',
//                    title: 'Control Data',
////                    margin: '15 0 8 0',
//                    width: 760,
//                    border: true,
//                    defaults:{
//                        style: 'margin: 3px;',
//                        border: false
//                    },
//                    items: [
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            margin: '5 0 10 0',
//                            defaults: {
//                                labelAlign: 'left'
//                            },
//                            items:[
//                                { xtype: 'tbspacer', width: 7 },
//                                {
//                                    xtype: 'label',
//                                    text: 'Creator User',
//                                    style: 'font-weight:bold;color:#000;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id:prototype.id+'-USCR',
//                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    width: 80,
//                                    listeners:{
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                { xtype: 'tbspacer', width: 60 },
//                                {
//                                    xtype: 'label',
//                                    text: 'Creation Date',
//                                    style: 'font-weight:bold;color:#000;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id:prototype.id+'-FECR',
//                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    width: 80,
//                                    listeners:{
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                { xtype: 'tbspacer', width: 60 },
//                                {
//                                    xtype: 'label',
//                                    text: 'Creation Time',
//                                    style: 'font-weight:bold;color:#000;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id:prototype.id+'-HOCR',
//                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    width: 80,
//                                    listeners:{
//                                        change: 'onUpperValue'
//                                    }
//                                }
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            margin: '5 0 10 0',
//                            defaults: {
//                                labelAlign: 'left'
//                            },
//                            items:[
//                                { xtype: 'tbspacer', width: 7 },
//                                {
//                                    xtype: 'label',
//                                    text: 'User Update',
//                                    style: 'font-weight:bold;color:#000;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id:prototype.id+'-USUP',
//                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    width: 80,
//                                    listeners:{
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                { xtype: 'tbspacer', width: 60 },
//                                {
//                                    xtype: 'label',
//                                    text: 'Update Date',
//                                    style: 'font-weight:bold;color:#000;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id:prototype.id+'-FEUP',
//                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    width: 80,
//                                    listeners:{
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                { xtype: 'tbspacer', width: 60 },
//                                {
//                                    xtype: 'label',
//                                    text: 'Update Time',
//                                    style: 'font-weight:bold;color:#000;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id:prototype.id+'-HOUP',
//                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    width: 80,
//                                    listeners:{
//                                        change: 'onUpperValue'
//                                    }
//                                }
//                            ]
//                        }
//                    ]
//                }
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