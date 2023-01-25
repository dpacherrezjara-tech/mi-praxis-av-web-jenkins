Ext.define('Ext.Praxis.view.payments.SalesReconciliationTestForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySalesReconciliationTestForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationTest.DataEntrySalesReconciliationTestController'
    ],
    controller: 'DataEntrySalesReconciliationTestController',
    title: 'Warning Tickets Form',
    header: true,
    height: 390,
    width: 1368,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id+'-1-box1',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id+'-1-gridDetWarnTkt',
                    margin: '4 27 0 27',
                    border: true,
                    style: 'border-style:solid;border-color:#7F98A8;border-width:1px;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        border: false
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Title">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #7F98A8;"',
                            defaults: {
                                xtype: 'label',
                                style: 'text-align:center;font-weight:bold;color:#FFFFFF;background:#7F98A8;',
                                padding: '7 0'
                            },
                            items: [
                                {
                                    text: 'Nbr',
                                    width: 30
                                },
                                {
                                    text: 'Ticket',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Ticket Number'
                                    }
                                },
                                {
                                    text: 'Type',
                                    width: 100
                                },
                                {
                                    text: 'Status',
                                    width: 130
                                },
                                {
                                    text: 'Sales Date',
                                    width: 130
                                },
                                {
                                    text: 'Ctr',
                                    width: 40,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Country'
                                    }
                                },
                                {
                                    text: 'Author.',
                                    width: 70,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Authorization Code'
                                    }
                                },
                                {
                                    text: 'Cur.',
                                    width: 50,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Currency'
                                    }
                                },
                                {
                                    text: 'Amount',
                                    width: 70
                                },
                                {
                                    text: 'CC',
                                    width: 40,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Card Code'
                                    }
                                },
                                {
                                    text: 'Card',
                                    width: 140,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Card Number'
                                    }
                                },
                                {
                                    text: 'PNR',
                                    width: 70
                                },
                                {
                                    text: 'Agent',
                                    width: 70,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Agent Code'
                                    }
                                },
                                {
                                    text: 'Error',
                                    width: 170,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Error Code'
                                    }
                                },
                                {
                                    text: 'Save',
                                    width: 30
                                },
                                {
                                    text: 'View',
                                    padding: '7 0 0 0',
                                    width: 40
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 1">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #E6F4FF;"',
                            defaults: {
                                xtype: 'panel',
                                bodyStyle: 'background: #E6F4FF;"',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                border: false
                            },
                            items: [
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '1',
                                            style: 'text-align:center;font-weight:bold;color:#244066;background:#E6F4FF;',
                                            width: '90%',
                                            padding: '7 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 120,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblTicket01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblType01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblStatus01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblDateV01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCountry01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAuthor01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 50,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCurren01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAmount01',
                                            fieldStyle: 'background:#E2B2B3;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCardC01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 140,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtCard01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPNR01',
                                            fieldStyle: 'background:#E2B2B3;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblAgent01',
                                            fieldStyle: 'background:#E2B2B3;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 170,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblError01',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imUpdate01',
                                            src: 'resources/img/botones/16x16/update.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Save'
                                                    });
                                                },
                                                el: {
                                                    click: 'changeData'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imEdit01',
                                            src: 'resources/img/botones/16x16/1326498593_018.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'View'
                                                    });
                                                },
                                                el: {
                                                    click: 'viewDataEntry'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 2">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #E6F4FF;"',
                            defaults: {
                                xtype: 'panel',
                                bodyStyle: 'background: #E6F4FF;"',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                border: false
                            },
                            items: [
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '2',
                                            style: 'text-align:center;font-weight:bold;color:#244066;background:#E6F4FF;',
                                            width: '90%',
                                            padding: '7 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 120,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblTicket02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblType02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblStatus02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblDateV02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCountry02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAuthor02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 50,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCurren02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAmount02',
                                            fieldStyle: 'background:#E2B2B3;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCardC02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 140,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtCard02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPNR02',
                                            fieldStyle: 'background:#E2B2B3;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblAgent02',
                                            fieldStyle: 'background:#E2B2B3;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 170,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblError02',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imUpdate02',
                                            src: 'resources/img/botones/16x16/update.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Save'
                                                    });
                                                },
                                                el: {
                                                    click: 'changeData'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imEdit02',
                                            src: 'resources/img/botones/16x16/1326498593_018.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'View'
                                                    });
                                                },
                                                el: {
                                                    click: 'viewDataEntry'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 3">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #E6F4FF;"',
                            defaults: {
                                xtype: 'panel',
                                bodyStyle: 'background: #E6F4FF;"',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                border: false
                            },
                            items: [
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '3',
                                            style: 'text-align:center;font-weight:bold;color:#244066;background:#E6F4FF;',
                                            width: '90%',
                                            padding: '7 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 120,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblTicket03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblType03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblStatus03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblDateV03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCountry03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAuthor03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 50,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCurren03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAmount03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCardC03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 140,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtCard03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPNR03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblAgent03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 170,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblError03',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imUpdate03',
                                            src: 'resources/img/botones/16x16/update.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Save'
                                                    });
                                                },
                                                el: {
                                                    click: 'changeData'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imEdit03',
                                            src: 'resources/img/botones/16x16/1326498593_018.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'View'
                                                    });
                                                },
                                                el: {
                                                    click: 'viewDataEntry'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 4">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #E6F4FF;"',
                            defaults: {
                                xtype: 'panel',
                                bodyStyle: 'background: #E6F4FF;"',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                border: false
                            },
                            items: [
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '4',
                                            style: 'text-align:center;font-weight:bold;color:#244066;background:#E6F4FF;',
                                            width: '90%',
                                            padding: '7 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 120,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblTicket04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblType04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblStatus04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblDateV04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCountry04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAuthor04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 50,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCurren04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAmount04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCardC04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 140,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtCard04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPNR04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblAgent04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 170,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblError04',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imUpdate04',
                                            src: 'resources/img/botones/16x16/update.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Save'
                                                    });
                                                },
                                                el: {
                                                    click: 'changeData'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imEdit04',
                                            src: 'resources/img/botones/16x16/1326498593_018.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'View'
                                                    });
                                                },
                                                el: {
                                                    click: 'viewDataEntry'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 5">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #E6F4FF;"',
                            defaults: {
                                xtype: 'panel',
                                bodyStyle: 'background: #E6F4FF;"',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                border: false
                            },
                            items: [
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '5',
                                            style: 'text-align:center;font-weight:bold;color:#244066;background:#E6F4FF;',
                                            width: '90%',
                                            padding: '7 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 120,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblTicket05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblType05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblStatus05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblDateV05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCountry05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAuthor05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 50,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCurren05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAmount05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCardC05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 140,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtCard05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPNR05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblAgent05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 170,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblError05',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imUpdate05',
                                            src: 'resources/img/botones/16x16/update.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Save'
                                                    });
                                                },
                                                el: {
                                                    click: 'changeData'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imEdit05',
                                            src: 'resources/img/botones/16x16/1326498593_018.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'View'
                                                    });
                                                },
                                                el: {
                                                    click: 'viewDataEntry'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 6">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #E6F4FF;"',
                            defaults: {
                                xtype: 'panel',
                                bodyStyle: 'background: #E6F4FF;"',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                border: false
                            },
                            items: [
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '6',
                                            style: 'text-align:center;font-weight:bold;color:#244066;background:#E6F4FF;',
                                            width: '90%',
                                            padding: '7 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 120,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblTicket06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblType06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblStatus06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblDateV06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCountry06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAuthor06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 50,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCurren06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAmount06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCardC06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 140,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtCard06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPNR06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblAgent06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 170,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblError06',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imUpdate06',
                                            src: 'resources/img/botones/16x16/update.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Save'
                                                    });
                                                },
                                                el: {
                                                    click: 'changeData'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imEdit06',
                                            src: 'resources/img/botones/16x16/1326498593_018.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'View'
                                                    });
                                                },
                                                el: {
                                                    click: 'viewDataEntry'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 7">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #E6F4FF;"',
                            defaults: {
                                xtype: 'panel',
                                bodyStyle: 'background: #E6F4FF;"',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                border: false
                            },
                            items: [
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '7',
                                            style: 'text-align:center;font-weight:bold;color:#244066;background:#E6F4FF;',
                                            width: '90%',
                                            padding: '7 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 120,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblTicket07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblType07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblStatus07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblDateV07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCountry07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAuthor07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 50,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCurren07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAmount07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCardC07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 140,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtCard07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPNR07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblAgent07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 170,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblError07',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imUpdate07',
                                            src: 'resources/img/botones/16x16/update.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Save'
                                                    });
                                                },
                                                el: {
                                                    click: 'changeData'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imEdit07',
                                            src: 'resources/img/botones/16x16/1326498593_018.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'View'
                                                    });
                                                },
                                                el: {
                                                    click: 'viewDataEntry'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 8">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: #E6F4FF;"',
                            defaults: {
                                xtype: 'panel',
                                bodyStyle: 'background: #E6F4FF;"',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                border: false
                            },
                            items: [
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '8',
                                            style: 'text-align:center;font-weight:bold;color:#244066;background:#E6F4FF;',
                                            width: '90%',
                                            padding: '7 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 120,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblTicket08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblType08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblStatus08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblDateV08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCountry08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAuthor08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 50,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCurren08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAmount08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblCardC08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 140,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtCard08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPNR08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 70,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblAgent08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 170,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-lblError08',
                                            fieldStyle: 'background:#CAE2F2;text-align:center;font-weight:bold;color:#244066;',
                                            style: 'text-align:center;',
                                            readOnly: true,
                                            width: '90%',
                                            padding: '4 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    width: 30,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imUpdate08',
                                            src: 'resources/img/botones/16x16/update.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Save'
                                                    });
                                                },
                                                el: {
                                                    click: 'changeData'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    width: 40,
                                    height: '100%',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id+'-1-imEdit08',
                                            src: 'resources/img/botones/16x16/1326498593_018.png',
                                            hidden: true,
                                            mode : 'image',
                                            padding: '8 14 0 0',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'View'
                                                    });
                                                },
                                                el: {
                                                    click: 'viewDataEntry'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                },
                {
                    xtype: 'panel',
                    margin: '0 27',
                    layout: 'hbox',
                    defaults: {
                    },
                    items: [
                        {xtype: 'tbspacer', width: 690},
                        {
                            xtype: 'label',
                            text: 'Comment : ',
                            width: 90,
                            padding: '7 0',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Comment'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            width: 25,
                            style: 'text-align:left;font-weight:bold;color:#9C1717;',
                            padding: '7 0',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Comment'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-1-txtComment',
                            fieldStyle: 'text-align:center;',
                            enforceMaxLength: true,
                            hidden: true,
                            maxLength: 54,
                            maskRe: /[0-9a-zA-Z]/,
                            width: 400,
                            padding: '3 0'
                        }
                    ]
                }
            ]
        }
    ]
});