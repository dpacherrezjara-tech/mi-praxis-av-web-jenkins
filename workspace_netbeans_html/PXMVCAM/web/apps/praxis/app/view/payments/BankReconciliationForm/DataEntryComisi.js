Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryComisi', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryComisiBankReconciliationForm',
    id: 'BankReconciliationForm-dataEntryPending',
    requires: [
        'Ext.Praxis.controller.payments.BankReconciliation.DataEntryComisiBankReconciliationController'
    ],
    controller: 'DataEntryComisiBankReconciliationController',
    title: 'BankReconciliation - Data Entry Pending Form',
    header: true,
    height: 400,
    width: 1000,
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
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Pending Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 990,
                            height: 20,
                            margin: '4 2 4 3'
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pnlPENDINGFIELDS',
                            layout: 'vbox',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'RN ',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtRN',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 90,
                                            enforceMaxLength: true
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'TINPUT',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtTINPUT',
                                            width: 110,
                                            queryMode: 'local',
                                            editable: false,
                                            forceSelection: true,
                                            store: [
                                                {code: 'B', name: 'BSP'},
                                                {code: 'I', name: 'ICCS'},
                                                {code: 'A', name: 'ARC'}
                                            ],
                                            displayField: 'name',
                                            valueField: 'code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;'
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'CCUST',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCCUST',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 90,
                                            allowBlank: false
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'SCOUNTRY',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 17},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtSCOUNTRY2',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center; text-transform:uppercase;',
                                            width: 90,
                                            enforceMaxLength: true,
                                            allowBlank: false
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'BANDOC',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 88
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtBANDOC2',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center; text-transform:uppercase;',
                                            width: 110,
                                            allowBlank: true
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'ADATE',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 9},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtADATE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 90,
                                            enforceMaxLength: true
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'CONCEPT',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 17},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCONCEPT',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 90,
                                            maxLength: 6,
                                            minLength: 6,
                                            enforceMaxLength: true,
                                            regex: /^.{6}$/,
                                            regexText: 'Este campo debe tener exactamente 6 caracteres'
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'PRDA',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtPRDA',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 110,
                                            maxLength: 8,
                                            minLength: 8,
                                            allowBlank: false
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'REFERENCE',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 9},
                                       {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtACCCOMP',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 240,
                                            enforceMaxLength: true

                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'MONEDA',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 88
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtMONEDA',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 90,
                                            enforceMaxLength: true
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'IMPORTEN',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 75
                                        },
                                        {xtype: 'tbspacer', width: 23},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIMPORTEN',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 110,
                                            enforceMaxLength: true
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'MONEDAPAGO',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtMONEDAPAGO',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 90,
                                            enforceMaxLength: true
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'IMPORTEPAG',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 23},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIMPORTEPAG',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 90,
                                            enforceMaxLength: true
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {xtype: 'tbspacer', height: 10},
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '0 2 4 8'

                },

                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 30',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
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
                            margin: '8 2 4 30',

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
});