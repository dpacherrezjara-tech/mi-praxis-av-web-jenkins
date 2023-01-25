Ext.define('Ext.Praxis.view.payments.AccountingPlanForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAccountingPlanForm',
    requires: [
        'Ext.Praxis.controller.payments.AccountingPlan.DataEntryAccountingPlanController'
    ],
    controller: 'DataEntryAccountingPlanController',
    title: 'AccountingPlan - Data Entry Form',
    header: true,
//    height:920,
    width: 805,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                textDecoration: 'underline',
//                fieldStyle: 'text-align: center;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 830,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Accounting Information</strong>',
                            style: 'font-weight:bold;color:#0B333C;background:#E5ECEF',
                            bodyStyle: 'background:#e5efe7',
                            fontSize: '11',
                            width: 752,
                            height: 20,
                            margin: '8 2 0 20'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 1 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Transaction Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 105,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODTRAN',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 2,
                                    padding: '3 0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDESCRI',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    padding: '3 0',
                                    width: 355
                                },
                                {xtype: 'tbspacer', width: 30}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 10 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Type Register',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 110,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTIPREG',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 1,
                                    padding: '3 0',
                                    width: 50,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'A = ABONO - C = CARGO'
                                    },
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'label',
                                    text: 'Client Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 70,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODCLIT',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    maskRe: /[0-9]/,
                                    padding: '3 0',
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Grouping Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODAGRU',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[0-9]/,
                                    padding: '3 0',
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 145}
                            ]
                        },         
                        
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Bank Information</strong>',
                            style: 'font-weight:bold;color:#0B333C;background:#E5ECEF',
                            bodyStyle: 'background:#e5efe7',
                            fontSize: '11',
                            width: 752,
                            height: 20,
                            margin: '0 2 0 20'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 1 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Code Bank',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 70,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODEBANK',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 3,
                                    padding: '3 0',
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 83},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 50,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {xtype: 'tbspacer', width: 32},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCOUNTRY',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    padding: '3 0',
                                    width: 60,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 31},
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 50,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {xtype: 'tbspacer', width: 19},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCURRENCY',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    padding: '3 0',
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 135}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 15 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Policy Nbr.',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 70,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNROPOLIZ',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 5,
                                    padding: '3 0',
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 83},
                                {
                                    xtype: 'label',
                                    text: 'Class Account',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 17},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCLASE',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    padding: '3 0',
                                    width: 60,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'REV (Revenue) or REC (Receivable)'
                                    },
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Client Address',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDIRCLIT',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9A-Za-z]/,
                                    padding: '3 0',
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 105}
                            ]
                        },
                        
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Accounting Information</strong>',
                            style: 'font-weight:bold;color:#0B333C;background:#E5ECEF',
                            bodyStyle: 'background:#e5efe7',
                            fontSize: '11',
                            width: 752,
                            height: 20,
                            margin: '0 2 0 20'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 1 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Accounting Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 110,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 6},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCIACTA',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 2,
                                    padding: '3 0',
                                    width: 30,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtUNIDAD',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 2,
                                    padding: '3 0',
                                    width: 30,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCECOS',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 6,
                                    padding: '3 0',
                                    width: 60,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtLOCAC',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 4,
                                    padding: '3 0',
                                    width: 40,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODCTA',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 4,
                                    padding: '3 0',
                                    width: 40,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSUBCTA',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 5,
                                    padding: '3 0',
                                    width: 60,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtEQUIPO',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 4,
                                    padding: '3 0',
                                    width: 40,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtICIA',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9A-Za-z]/,
                                    maxLength: 2,
                                    padding: '3 0',
                                    width: 30,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 264}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 10 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Description Memo Line',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 150,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDESMLINE',
                                    fieldStyle: 'text-align: center;',
                                    enforceMaxLength: true,
                                    maxLength: 50,
                                    padding: '3 0',
                                    width: 330
                                },
                                {xtype: 'tbspacer', width: 265}
                            ]
                        }
                    ]
                },
                {
                    xtype: 'label',
                    html: '<strong style="color:#121E31; text-decoration: underline; ">Control Information</strong>',
                    textDecoration: 'underline',
                    height: 100,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '40 2 0 20',

                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 2 5 30',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            margin: '0 0 10 30',

                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
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
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '0 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
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
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
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
                }
            ]
        }
    ]
}
);