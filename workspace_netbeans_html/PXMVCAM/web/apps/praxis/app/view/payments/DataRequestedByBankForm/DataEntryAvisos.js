Ext.define('Ext.Praxis.view.payments.DataRequestedByBankForm.DataEntryAvisos', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAvisosDataRequestedByBankForm',
    requires: [
        'Ext.Praxis.controller.payments.DataRequestedByBank.DataEntryAvisosDataRequestedByBankController'
    ],
    controller: 'DataEntryAvisosDataRequestedByBankController',
    title: 'Bank Notice - Data Entry Form',
    header: true,
    height: 550,
    width: 900,
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
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '40 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Bank Notice Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMEDATE',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[0-9]/,
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    text: 'Merchant Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 135
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHN',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[0-9]/,
                                    width: 200
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Card Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCARDNBR',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[0-9]/,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Merchant Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHNAM',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 40,
                                    width: 270
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Authorization Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAUTHNBR',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[0-9]/,
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    text: 'Sequence Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 135
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSQCRFILE',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[0-9]/,
                                    width: 200
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Card Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbSCARCOD',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    width: 200,
                                    editable: false
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbSTVAL',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 200,
                                    editable: false
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAUTAMOUNT',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 15,
                                    width: 130
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Operating Cost',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtOPEAMOUNT',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 15,
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    text: 'IVA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIVA',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 15,
                                    width: 130
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Application Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAPLIDATE',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    text: 'Nature',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNATURE',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 15,
                                    width: 130
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Concept',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCONCEPT',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 30,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Nbr. of Transactions',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYTRNX',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    width: 130
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 5 20',
                            width: 700,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Remittance Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                    width: 170
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Text',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMESA',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 25,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMETIPO',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 2,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Folio',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMEFOLIO',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 20,
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    text: 'Bank',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbCODEBANK',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'CODEBANK',
                                    displayField: 'IN_CODE_IN_NAME',
                                    width: 200,
                                    editable: false
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 5 20',
                            width: 700,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Selection Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                    width: 170
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Flag',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFSELEC',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 1,
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    text: 'Selection Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFECSELEC',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '5 20 5 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Control Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                    width: 150
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Creation',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtUSCR',
                                    readOnly: true,
                                    width: 110,
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
                                    id: prototype.id + '-de-txtFECR',
                                    readOnly: true,
                                    width: 110,
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
                                    id: prototype.id + '-de-txtHOCR',
                                    readOnly: true,
                                    width: 110,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 840,
                            defaults: {
                                anchor: '100%'
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
                                    id: prototype.id + '-de-txtUSUP',
                                    readOnly: true,
                                    width: 110,
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
                                    id: prototype.id + '-de-txtFEUP',
                                    readOnly: true,
                                    width: 110,
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
                                    id: prototype.id + '-de-txtHOUP',
                                    readOnly: true,
                                    width: 110,
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
            margin: '10 0 10 0',
            layout: {
                pack: 'left'
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
//                {
//                    text: 'Delete',
//                    id: prototype.id + '-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    listeners: {
//                        click: 'onDeleteClick'
//                    }
//                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 30},
                {
//                    text: 'View Previous Ticket',
                    id: prototype.id + '-btn-imgPrev',
                    icon: 'resources/img/botones/16x16/prev.png',
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'View Previous Ticket'
                    }
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                },
                {
//                    text: 'View Next Ticket',
                    id: prototype.id + '-btn-imgNext',
                    icon: 'resources/img/botones/16x16/next.png',
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'View Next Ticket'
                    }
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                }
            ]
        }
    ]
});