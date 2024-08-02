Ext.define('Ext.Praxis.view.payments.StatementRulesForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryStatementRulesForm',
    requires: [
        'Ext.Praxis.controller.payments.StatementRules.DataEntryStatementRulesController'
    ],
    controller: 'DataEntryStatementRulesController',
    title: 'Core Process - Data Entry Form',
    header: true,
    height: 318,
    width: 750,
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
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    margin: '0 0 10 0',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Core Information',
                            margin: '10 0 0 20',
                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                            width: 130,
                            height: 25
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 0 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#E5ECEF;',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Core Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCOREP',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: false,
                                            maxLength: 2,
                                            maskRe: /[a-zA-Z]/,
                                            readOnly: false,
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Account',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtACCOUNT',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: false,
                                            maxLength: 6,
                                            maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 259}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#E5ECEF;',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCOUNTRY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: false,
                                            maxLength: 2,
                                            maskRe: /[a-zA-Z]/,
                                            readOnly: false,
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Society',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSOCIETY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: false,
                                            maxLength: 4,
                                            maskRe: /[0-9A-Za-z]/,
                                            readOnly: false,
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 259}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#E5ECEF;',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCURRENCY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: false,
                                            maxLength: 3,
                                            maskRe: /[a-zA-Z]/,
                                            readOnly: false,
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Text Key',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTEXTOLAR',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: false,
                                            maxLength: 50,
//                                            maskRe: /[0-9A-Za-z]/,
                                            readOnly: false,
                                            width: 200
                                        },
                                        {xtype: 'tbspacer', width: 259}
                                    ]
                                },
                            ]
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {xtype: 'tbspacer', heigth: 105},
                {
                    xtype: 'label',
                    text: 'Control Data',
                    height: 100,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                    width: 234,
                    margin: '4 10 4 20'
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 10 40',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
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
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                            margin: '5 0 10 40',

                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
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