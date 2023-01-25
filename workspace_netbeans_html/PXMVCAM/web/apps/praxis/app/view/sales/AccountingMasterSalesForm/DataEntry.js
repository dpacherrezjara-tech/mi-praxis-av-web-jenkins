Ext.define('Ext.Praxis.view.sales.AccountingMasterSalesForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAccountingMasterSalesForm',

    controller: 'DataEntryAccountingMasterSalesController',

    requires:[
        'Ext.Praxis.controller.sales.AccountingMasterSales.DataEntryAccountingMasterSalesController'
    ],

    title:'Catalogue Account - Data Entry Form',
    header:true,
    height:320,
    width:690,
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
                            text: 'Document Type',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
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
                            id:prototype.id+'-txtA1740TITRA',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 80,
                            enableKeyEvents: true,
                            listeners:{
                                change: 'onUpperValue',
                                blur: 'onTITRABlur'
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
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Cta Type',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            id: prototype.id+'-label_required01',
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
                            id: prototype.id + '-cmbCtaType2',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "Select"],
                                    ["A", "ASSOCIATED"],
                                    ["C", "COMISSION"],
                                    ["O", "CHARGE"],
                                    ["T", "FARE"],
                                    ["S", "STAND ALONE"],
                                    ["F", "AUDIT"],
                                    ["R", "REVENUE"]
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
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'Cta Sub Type',
                            id: prototype.id+'-label_CtaSubType',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            id: prototype.id+'-label_required02',
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
                            id:prototype.id+'-txtA1740SUBTI',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 80,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'label',
                            text: 'Category',
                            id: prototype.id+'-label_Category',
                            style: 'font-weight:bold;color:#000;',
                            width: 75
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            id: prototype.id+'-label_required03',
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
                            id:prototype.id+'-txtA1740CATEG',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 4,
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
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Cta',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 10 },
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
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Client',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA1740CLIE',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 40,
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
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtA1740FINI2',
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
                            id:prototype.id+'-txtA1740FFIN2',
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
                                { xtype: 'tbspacer', width: 18 },
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
                                { xtype: 'tbspacer', width: 18 },
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
                                { xtype: 'tbspacer', width: 18 },
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
                                { xtype: 'tbspacer', width: 18 },
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