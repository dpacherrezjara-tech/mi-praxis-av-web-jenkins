Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryStatementReconciliationsForm',
    requires: [
        'Ext.Praxis.controller.payments.StatementReconciliations.DataEntryStatementReconciliationsController'
    ],
    controller: 'DataEntryStatementReconciliationsController',
    title: 'Payment Reconciliation - Data Entry Form',
    header: true,
    height: 400,
    width: 700,
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
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 650,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Liquidation Information">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 0 10',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Liquidation Information</strong>',
                                    fontSize: '11',
                                    margin: '0 0 4 7',
                                    width: 234,
                                    height: 20
                                },
                                {xtype: 'tbspacer', width: 600}
                            ]
                        },
                        // </editor-fold> 
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: true,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 10 10 20',
                            defaults: {
                                anchor: '100%',
                                width: 600
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '10 2 4 10',
                                    defaults: {
                                        anchor: '100%',
                                        width: 570
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCOUNTRY',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            enabled: false,
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Status ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbSTVAL',
                                            fieldStyle: 'text-align:left;',
                                            width: 120,
                                            editable: false,
                                            readOnly: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 2 4 10',
                                    defaults: {
                                        anchor: '100%',
                                        width: 570
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Sales Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSDATE',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: true,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 120,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Abono Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtADATE',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: true,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 120,
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
                                    margin: '0 2 2 10',
                                    bodyStyle: 'background:#E5ECEF;',
                                    defaults: {
                                        anchor: '100%',
                                        width: 570
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Bank Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCODEBANK',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            editable: false,
                                            readOnly: true,
                                            width: 120,
                                            enforceMaxLength: true,
                                            maxLength: 8
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Doc SAP Bank',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},

                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBANDOC',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            width: 120,
                                            editable: false,
                                            readOnly: true
                                        },
                                        {xtype: 'tbspacer', width: 10}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 2 2 10',
                                    defaults: {
                                        anchor: '100%',
                                        width: 570
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Currency: ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCURRENCY',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:right;',
                                            maxLength: '15',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Neto',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNETO',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:right;',
                                            maxLength: '15',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 2 12 10',
                                    defaults: {
                                        anchor: '100%',
                                        width: 570
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Qty Transact.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYTRAS',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:right;',
                                            maxLength: '15',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Value Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtVALDATE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:right;',
                                            maxLength: '15',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10}
                                    ]
                                },
                            ]
                        },
                    ]
                },

                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    html: '<strong style="color:#121E31; text-decoration: underline; ">Control Information</strong>',
                    textDecoration: 'underline',
                    height: 70,
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '10 0 0 20'
                },
                // </editor-fold>
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '14 20 2 10',
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
                            margin: '4 20 2 10',
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
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '0 0 0 8',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:left',
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
                },
                {
                    id: prototype.id + '-btn-imgPrev',
                    icon: 'resources/img/botones/16x16/prev.png',
                    margin: '0 0 0 8',
                    hidden:true,
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                },
                {
                    id: prototype.id + '-btn-imgNext',
                    icon: 'resources/img/botones/16x16/next.png',
                    hidden:true,
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                }
            ]
        }
    ]
}
);