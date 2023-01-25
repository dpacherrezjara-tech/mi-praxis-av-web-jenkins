Ext.define('Ext.Praxis.view.payments.DataRequestedByBankForm.DataEntryImagen', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryImagenDataRequestedByBankForm',
    requires: [
        'Ext.Praxis.controller.payments.DataRequestedByBank.DataEntryImagenDataRequestedByBankController'
    ],
    controller: 'DataEntryImagenDataRequestedByBankController',
    title: 'Non-Presential Sale - Data Entry Form',
    header: true,
    height: 700,
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
                            width: 950,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Booking Code (PNR):',
                                    style: 'font-weight:normal;color:#0B333C;',
                                    width: 230
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textarea',
                                    id: prototype.id + '-de-txtPNR',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    width: 200,
                                    height: 60
                                },
                                {xtype: 'tbspacer', width: 21},
                                {
                                    xtype: 'label',
                                    text: 'Ticket(s):',
                                    style: 'font-weight:normal;color:#0B333C;',
                                    width: 170
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textarea',
                                    id: prototype.id + '-de-txtTKT',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    width: 300,
                                    height: 60
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 950,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Credit Card Number:',
                                    style: 'font-weight:normal;color:#0B333C;',
                                    width: 230
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCARDNBR',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 21},
                                {
                                    xtype: 'label',
                                    text: 'Cardholder Name:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 138
                                },
                                {xtype: 'tbspacer', width: 6},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNOMTARHAB',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 100,
                                    maskRe: /[a-zA-Z]/,
                                    width: 300
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 950,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Authorization Number',
                                    style: 'font-weight:normal;color:#0B333C;',
                                    width: 230
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAUTHO',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 21},
                                {
                                    xtype: 'label',
                                    text: 'Merchant Name:',
                                    style: 'font-weight:normal;color:#0B333C;',
                                    width: 170
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHNAM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    width: 300
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 950,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 0 0 0',
                                    width: 455,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '5 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 455,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 9},
                                                {
                                                    xtype: 'label',
                                                    text: 'Transaction Date:',
                                                    style: 'font-weight:normal;color:#0B333C;',
                                                    width: 230
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSALEDATE',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    width: 200
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 455,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 9},
                                                {
                                                    xtype: 'label',
                                                    text: 'Amount',
                                                    style: 'font-weight:normal;color:#0B333C;',
                                                    width: 230
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtAUTAMOUNT',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    width: 200
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 455,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 9},
                                                {
                                                    xtype: 'label',
                                                    text: 'Merchant Number:',
                                                    style: 'font-weight:normal;color:#0B333C;',
                                                    width: 230
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtMERCHN',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    width: 200
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 0 0 0',
                                    width: 495,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '5 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 495,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 9},
                                                {
                                                    xtype: 'label',
                                                    text: 'Agent:',
                                                    style: 'font-weight:normal;color:#0B333C;',
                                                    width: 170
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtAGENT',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    width: 300
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 495,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 15},
                                                {
                                                    xtype: 'label',
                                                    text: 'Purchase Description:',
                                                    style: 'font-weight:normal;color:#0B333C;',
                                                    width: 170
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'textarea',
                                                    id: prototype.id + '-de-txtDESCRIPCION',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    width: 300,
                                                    heigth: 90
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 950,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Name of Recipient:',
                                    style: 'font-weight:normal;color:#0B333C;',
                                    width: 230
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textarea',
                                    id: prototype.id + '-de-txtNOMPAX2',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    width: 200,
                                    height: 90
                                },
                                {xtype: 'tbspacer', width: 21},
                                {
                                    xtype: 'label',
                                    text: 'Passenger Name:',
                                    style: 'font-weight:normal;color:#0B333C;',
                                    width: 170
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textarea',
                                    id: prototype.id + '-de-txtNOMPAX',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    width: 300,
                                    height: 90
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 950,
                            height: 120,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 0 0 0',
                                    width: 455,
                                    height: 120,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '5 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 455,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 9},
                                                {
                                                    xtype: 'label',
                                                    text: 'Phone/Internet Sale Description:',
                                                    style: 'font-weight:normal;color:#0B333C;',
                                                    width: 230
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtDESCVENTA',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    width: 200
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 455,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 9},
                                                {
                                                    xtype: 'label',
                                                    text: 'Delivery Date:',
                                                    style: 'font-weight:normal;color:#0B333C;',
                                                    width: 230
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFVUELO',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    width: 200
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 455,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 9},
                                                {
                                                    xtype: 'label',
                                                    text: 'Delivery Address:',
                                                    style: 'font-weight:normal;color:#0B333C;',
                                                    width: 129
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtDIRECCION',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    width: 300
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 0 0 0',
                                    width: 495,
                                    height: 120,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '5 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                                            margin: '0 0 0 0',
                                            width: 495,
                                            height: 120,
                                            defaults: {
                                                anchor: '100%',
                                                margin: '5 0 5 0'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 15},
                                                {
                                                    xtype: 'label',
                                                    text: 'Comments:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 138
                                                },
                                                {xtype: 'tbspacer', width: 6},
                                                {
                                                    xtype: 'label',
                                                    text: '(*)',
                                                    style: 'font-weight:bold;color:#9C1717;',
                                                    width: 30
                                                },
                                                {
                                                    xtype: 'textarea',
                                                    id: prototype.id + '-de-txtCOMMENT',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: true,
                                                    maxLength: 420,
                                                    width: 300,
                                                    height: 100
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '5 20 5 20',
                            width: 950,
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
                            width: 950,
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
                            width: 950,
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
                }
            ]
        }
    ]
});