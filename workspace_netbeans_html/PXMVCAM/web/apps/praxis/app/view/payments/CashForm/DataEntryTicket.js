Ext.define('Ext.Praxis.view.payments.CashForm.DataEntryTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTicketCashForm',
    requires: [
        'Ext.Praxis.controller.payments.Cash.DataEntryTicketCashController'
    ],
    controller: 'DataEntryTicketCashController',
    title: 'Ticket - Data Entry Form',
    header: true,
    height: 600,
    width: 900,
    border: false,
    modal: true,
    resizable: false,
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 10px;',
                border: false
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.id + '-formRPA',
                    border: false,
                    defaults: {margin: '0 0 0 0'},
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Ticket Main Information">
                        {
                            xtype: 'component',
                            html: 'Ticket Main Information',
                            cls: 'dataentry-section-title'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            cls: 'dataentry-card',
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket Number',
                                    width: 260,
                                    labelWidth: 120,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtTicket',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Sequence',
                                    width: 260,
                                    labelWidth: 130,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtSEQ',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Document Type',
                                    width: 260,
                                    labelWidth: 110,
                                    readOnly: true,
                                    id: prototype.id + '-2-cmbTDOC',
                                    fieldStyle: 'text-align:center;'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            cls: 'dataentry-card',
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Source',
                                    width: 260,
                                    labelWidth: 120,
                                    readOnly: true,
                                    id: prototype.id + '-2-cmbFTE',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Status',
                                    width: 260,
                                    labelWidth: 130,
                                    readOnly: true,
                                    id: prototype.id + '-2-cmbSTVAL',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'label',
                                    text: '',
                                    width: 0
                                }
                            ]
                        },
                        // </editor-fold>
                        {
                            xtype: 'component',
                            html: 'Sales Information',
                            cls: 'dataentry-section-title'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            cls: 'dataentry-card',
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Country',
                                    width: 260,
                                    labelWidth: 120,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtCountry',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Agent',
                                    width: 260,
                                    labelWidth: 130,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtAgent',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Sales Date',
                                    width: 260,
                                    labelWidth: 110,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtSdate',
                                    fieldStyle: 'text-align:center;'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            cls: 'dataentry-card',
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Amount',
                                    width: 260,
                                    labelWidth: 120,
                                    readOnly: true,
                                    id: prototype.id + '-svfop',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Currency',
                                    width: 260,
                                    labelWidth: 130,
                                    readOnly: true,
                                    id: prototype.id + '-currency',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'label',
                                    text: '',
                                    width: 0
                                }
                            ]
                        },
                        {
                            xtype: 'component',
                            html: 'Reconciliation Information',
                            cls: 'dataentry-section-title'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            cls: 'dataentry-card',
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Date Conciliation',
                                    width: 260,
                                    labelWidth: 120,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtDateConciliation',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Transac. Conciliation',
                                    width: 260,
                                    labelWidth: 130,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtTransConci',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Doc. Sap. Bank',
                                    width: 260,
                                    labelWidth: 110,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtbandoc',
                                    fieldStyle: 'text-align:center;'
                                },
                            ]
                        },
                        {
                            xtype: 'component',
                            html: 'Accounting Information',
                            cls: 'dataentry-section-title'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            cls: 'dataentry-card',
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Status Accounting',
                                    width: 260,
                                    labelWidth: 120,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtStatusAccounting',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Date Accounting',
                                    width: 260,
                                    labelWidth: 130,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtDateAccounting',
                                    fieldStyle: 'text-align:center;'
                                }
                            ]
                        },
                        {
                            xtype: 'component',
                            html: 'Control Data',
                            cls: 'dataentry-section-title'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            cls: 'dataentry-card',
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Creator User',
                                    width: 260,
                                    labelWidth: 120,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtCreateUser',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Creation Date',
                                    width: 260,
                                    labelWidth: 130,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtCreationDate',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Creation Time',
                                    width: 260,
                                    labelWidth: 110,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtCreationTime',
                                    fieldStyle: 'text-align:center;'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            cls: 'dataentry-card',
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'User Update',
                                    width: 260,
                                    labelWidth: 120,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtUserUpdate',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Update Date',
                                    width: 260,
                                    labelWidth: 130,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtUpdateDate',
                                    fieldStyle: 'text-align:center;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Update Time',
                                    width: 260,
                                    labelWidth: 110,
                                    readOnly: true,
                                    id: prototype.id + '-2-txtUpdateTime',
                                    fieldStyle: 'text-align:center;'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {pack: 'center'},
            defaults: {scale: 'medium'},
            items: [
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {click: 'onUpdateClick'}
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-2-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {click: 'onCancelClick'}
                }
            ]
        }
    ]
});

Ext.util.CSS.createStyleSheet(`

    /* ----- TÍTULO DE SECCIÓN DEL DATAENTRY ----- */
    .dataentry-section-title {
        background-color: #c9daf5 !important;
        color: #000 !important;
        font-size: 12px !important;
        font-weight: bold !important;
        padding: 4px 8px !important;
        line-height: 20px !important;   /* CENTRADO VERTICAL */
        border: 1px solid #a5b9d6 !important;
        margin: 10px 0 0px 0 !important;
    }


    /* ----- LABELS ESTILO PANTALLA PRINCIPAL ----- */
    .dataentry-label {
        font-weight: bold !important;
        color: #121E31 !important;
    }

    /* ----- TEXTFIELDS ----- */
    .dataentry-field .x-form-text {
        text-align: center !important;
        font-weight: bold;
        color: #1a4d8f;
    }

.dataentry-card {
    background-color: #f5f7fc !important;
    border: 1px solid #c9d4e2 !important;
    width: calc(100% - 2px) !important;     /* 🔥 MISMO ANCHO QUE EL TÍTULO */
    margin-left: 1px !important;            /* 🔥 AJUSTA EL DESBORDE */
    margin-right: 1px !important;           /* 🔥 AJUSTA EL DESBORDE */
}



`, 'dataentry-style');
