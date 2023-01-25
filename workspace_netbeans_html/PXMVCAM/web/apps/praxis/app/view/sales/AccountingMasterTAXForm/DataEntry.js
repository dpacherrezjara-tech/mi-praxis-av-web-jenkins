Ext.define('Ext.Praxis.view.sales.AccountingMasterTAXForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAccountingMasterTAXForm',

    controller: 'DataEntryAccountingMasterTAXController',

    requires:[
        'Ext.Praxis.controller.sales.AccountingMasterTAX.DataEntryAccountingMasterTAXController'
    ],

    title:'Catalogue Account - Data Entry Form',
    header:true,
    height:320,
    width:780,
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
                            text: 'Type',
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
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbA1741TIPO',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "- Select -"],
                                    ["M", "Multicurrency"],
                                    ["O", "Origin"],
                                    ["C", "Expired"],
                                    ["R", "RAC"],
                                    ["N", "No Show"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            width: 90,
                            hidden: false,
                            hiddenLabel: false
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'Country',
                            style: 'font-weight:bold;color:#000;',
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbCountry2',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: true,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            readOnly: false,
                            editable: true,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            width: 140,
                            hidden: false,
                            hiddenLabel: false,
                            listConfig: {height: 111}
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'Tax Type (Internal System)',
                            style: 'font-weight:bold;color:#000;',
                            width: 180
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
                            id: prototype.id + '-cmbA1741TPTAX',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "- Select -"],
                                    ["CH", "Charge"],
                                    ["FF", "Feeds"],
                                    ["PN", "Penalty"],
                                    ["TX", "Tax"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            width: 70,
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
                            text: 'Tax',
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
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtTax',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 45,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 60 },
                        {
                            xtype: 'label',
                            text: 'Currency',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
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
                            id: prototype.id + '-cmbCurrency2',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            readOnly: false,
                            editable: true,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            width: 120,
                            hidden: false,
                            hiddenLabel: false,
                            listConfig: {height: 111}
                        },
                        { xtype: 'tbspacer', width: 35 },
                        {
                            xtype: 'label',
                            text: 'Controlled',
                            style: 'font-weight:bold;color:#000;',
                            width: 180
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
                            id: prototype.id + '-cmbA1741CTRL',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "- Select -"],
                                    ["Y", "Yes"],
                                    ["N", "No"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            width: 70,
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
                            text: 'Cta',
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
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1741CIA',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 30,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1741UNIDA',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 30,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1741CECOS',
                            enforceMaxLength: true,
                            maxLength: 6,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1741UBICA',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 40,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1741CTA',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 40,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1741SCTA',
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1741EQUI',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 40,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1741ICIA',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 30,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 40 },
                        {
                            xtype: 'label',
                            text: 'Country Location',
                            style: 'font-weight:bold;color:#000;',
                            width: 180
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            id: prototype.id+'-label_required04',
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
                            id: prototype.id + '-cmbINTNU',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "Select"],
                                    ["Y", "YES"],
                                    ["N", "NO"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 70,
                            listConfig: {height: 111}
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
                            text: 'Description',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1741CONCE',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 50,
                            width: 310,
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
                            text: 'Effective',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtA1741FINI',
                            format: 'Y/m/d',
                            maskRe: /[0-9/]/,
                            fieldStyle: 'text-align:center;',
                            editable: false,
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 90/*,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            }*/
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtA1741FFIN',
                            format: 'Y/m/d',
                            maskRe: /[0-9/]/,
                            fieldStyle: 'text-align:center;',
                            editable: false,
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 90/*,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            }*/
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
                                { xtype: 'tbspacer', width: 22 },
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
                                { xtype: 'tbspacer', width: 22 },
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
                                { xtype: 'tbspacer', width: 22 },
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
                                { xtype: 'tbspacer', width: 22 },
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