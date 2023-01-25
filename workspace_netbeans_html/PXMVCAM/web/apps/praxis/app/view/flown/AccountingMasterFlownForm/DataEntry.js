Ext.define('Ext.Praxis.view.flown.AccountingMasterFlownForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.flown.AccountingMasterFlown.DataEntryAccountingMasterFlownController'
    ],
    title: 'Catalogue Account - Data Entry Form',
    header: true,
    width: 870,
    height: 350,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        aling: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        border: false
                    },
                    padding: '10 0 0 0',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Document Type',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDocumentTypeDataEntry',
                            queryMode: 'local',
                            editable:false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
        //                    emptyText: 'All',
                            width: 200,
                            listeners:{
                                change: 'onCmbDocumentTypeChange'
                            }
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Country Location',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
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
                            width: 100,
                            listConfig: {height: 111}
                        }
                    ]
                }
                ,
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        border: false
                    },
                    padding: '10 0 0 0',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Account Type',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCtaTypeDataEntry',
                            queryMode: 'local',
                            editable:false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
        //                    emptyText: 'All',
                            width: 120,
                            listConfig: {height: 111},
                            listeners:{
                                change: 'onCmbCtaTypeChange'
                            }
                        },
                        { xtype: 'tbspacer', width: 100 },
                        {
                            xtype: 'label',
                            text: 'Account Sub Type',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740SUBTI',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 100,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'Category',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCategoryDataEntry',
                            queryMode: 'local',
                            editable:false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
        //                    emptyText: 'All',
                            width: 100,
                            listConfig: {height: 111},
                            listeners:{
                                change: 'onCmbCategoryChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        border: false
                    },
                    padding: '10 0 0 0',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Account',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740CIA',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740UNIDA',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740CECOS',
                            enforceMaxLength: true,
                            maxLength: 6,
                            width: 50
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740UBICA',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740CTA',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740SCTA',
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 50
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740EQUI',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740ICIA',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 30
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        border: false
                    },
                    padding: '10 0 0 0',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Client',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1740CLIE',
                            enforceMaxLength: true,
                            maxLength: 40,
                            width: 270,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        border: false
                    },
                    padding: '10 0 0 0',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Effective',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            id:prototype.id+'-txtA1740FINI',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9]/,
                            enforceMaxLength: true,
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 40 },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            id:prototype.id+'-txtA1740FFIN',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9]/,
                            enforceMaxLength: true,
                            width: 120
                        }
                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
//                    width: 1100,
                    margin: '1 20 0 20',
                    defaults: {
                        border: false
                    },
                    border: true,
                    hidden: false,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-USCR',
                                    fieldLabel: '<strong style="color:#000;">Creator User</strong>',
                                    labelWidth: 150,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 150,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 150,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
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
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-USUP',
                                    fieldLabel: '<strong style="color:#000;">User Update</strong>',
                                    labelWidth: 150,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 150,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 150,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        border: false
                    },
                    padding: '10 0 0 0',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-lblA1740TITRA',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-lblA1740TIPO',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-lblA1740SUBTI',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-lblA1740CATEG',
                            hidden: true
                        }
                    ]
                },
            ]
        }
    ],
    dockedItems: [
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
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    html: '<strong style="color:red;">(*) Required Fields</strong>',
                    align: 'center',
                    margin: '0 0 0 8'

                }
            ]
        }
    ]
});