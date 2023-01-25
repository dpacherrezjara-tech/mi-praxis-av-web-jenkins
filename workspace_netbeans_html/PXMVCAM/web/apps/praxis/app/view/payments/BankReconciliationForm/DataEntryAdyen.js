Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryAdyen', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAdyenBankReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.BankReconciliation.DataEntryAdyenBankReconciliationController'
    ],
    controller: 'DataEntryAdyenBankReconciliationController',
    title: 'ADYEN Information Form',
    header: true,
    height: 300,
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
                            layout: 'vbox',
                            border: true,
                            bodyStyle: 'background:white',
                            margin: '20 20 1 20',
                            width: 950,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#7F98A8;',
                                    margin: '0 0 0 0',
                                    width: 950,
                                    height: 30,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Nbr',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            width: 30,
                                            height: '100%'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Type',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            width: 100,
                                            height: 30
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Sales Date',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'CC',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Card Code'
                                            },
                                            width: 40
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Card',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Card Number'
                                            },
                                            width: 140
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Author.',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Authorization Code'
                                            },
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Cur.',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Currency'
                                            },
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Amount',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Error',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Error Code'
                                            },
                                            width: 170
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Save',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            width: 30
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'View',
                                            style: 'font-weight:bold;color:#FFFFFF;background:#7F98A8;text-align:center;',
                                            width: 40
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:#e6f4ff;',
                                    margin: '0 0 0 0',
                                    width: 950,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#e6f4ff;',
                                            margin: '5 0 0 0',
                                            width: 950,
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: '1',
                                                    style: 'font-weight:bold;color:#244066;text-align:center;',
                                                    width: 30,
                                                    height: '100%'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblType01',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 8,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblDateV01',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: true,
                                                    maxLength: 8,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblCardC01',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: true,
                                                    maxLength: 2,
                                                    width: 40
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCard01',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: true,
                                                    maxLength: 16,
                                                    width: 140
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtAuthor01',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: true,
                                                    maxLength: 6,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblCurren01',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: true,
                                                    maxLength: 3,
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtAmount01',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: true,
                                                    maxLength: 15,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblError01',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 8,
                                                    width: 170
                                                },
                                                {xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + 'imUpdate01',
                                                    icon: 'resources/img/botones/16x16/update.png',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Save'
                                                    },
//                                                    listeners: {
//                                                        click: 'changeData'
//                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + 'imEdit01',
                                                    icon: 'resources/img/botones/16x16/1326498593_018.png',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'View'
                                                    },
//                                                    listeners: {
//                                                        click: 'viewDataEntry'
//                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#e6f4ff;',
                                            margin: '5 0 20 0',
                                            width: 950,
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: '2',
                                                    style: 'font-weight:bold;color:#244066;text-align:center;',
                                                    width: 30,
                                                    height: '100%'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblType02',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 8,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblDateV02',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 8,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblCardC02',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 2,
                                                    width: 40
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCard02',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 16,
                                                    width: 140
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtAuthor02',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 6,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblCurren02',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 3,
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtAmount02',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 15,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblError02',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    editable: false,
                                                    maxLength: 8,
                                                    width: 170
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
                                    margin: '0 0 60 0',
                                    width: 950,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '5 0 0 0',
                            width: 950,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 350},
                                {
                                    xtype: 'label',
                                    text: 'Comment :',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Comment'
                                    },
                                    width: 90
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
                                    id: prototype.id + '-de-txtComment',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 54,
                                    width: 400
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
//    dockedItems: [
//        {
//            xtype: 'toolbar',
//            dock: 'bottom',
//            ui: 'footer',
//            margin: '10 0 10 0',
//            layout: {
//                pack: 'left'
//            },
//            fieldStyle: 'text-align:center',
//            defaults: {
//                scale: 'medium'
//            },
//            items: [
//                {
//                    text: 'Save',
//                    id: prototype.id + '-btn-save',
//                    iconCls: 'prx-icon-save',
//                    listeners: {
//                        click: 'onSaveClick'
//                    }
//                },
//                {
//                    text: 'Update',
//                    id: prototype.id + '-btn-update',
//                    iconCls: 'prx-icon-update',
//                    listeners: {
//                        click: 'onUpdateClick'
//                    }
//                },
////                {
////                    text: 'Delete',
////                    id: prototype.id + '-btn-delete',
////                    iconCls: 'prx-icon-delete',
////                    listeners: {
////                        click: 'onDeleteClick'
////                    }
////                },
//                {
//                    text: 'Cancel',
//                    id: prototype.id + '-btn-cancel',
//                    iconCls: 'prx-icon-cancel',
//                    listeners: {
//                        click: 'onCancelClick'
//                    }
//                },
//                {xtype: 'tbspacer', width: 30},
//                {
////                    text: 'View Previous Ticket',
//                    id: prototype.id + '-btn-imgPrev',
//                    icon: 'resources/img/botones/16x16/prev.png',
//                    autoEl: {
//                        tag: 'label',
//                        'data-qtip': 'View Previous Ticket'
//                    }
////                    listeners:{
////                        click: 'onCancelClick'
////                    }
//                },
//                {
////                    text: 'View Next Ticket',
//                    id: prototype.id + '-btn-imgNext',
//                    icon: 'resources/img/botones/16x16/next.png',
//                    autoEl: {
//                        tag: 'label',
//                        'data-qtip': 'View Next Ticket'
//                    }
////                    listeners:{
////                        click: 'onCancelClick'
////                    }
//                }
//            ]
//        }
//    ]
});