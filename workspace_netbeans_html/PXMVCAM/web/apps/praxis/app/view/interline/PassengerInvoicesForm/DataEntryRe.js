Ext.define('Ext.Praxis.view.interline.PassengerInvoicesForm.DataEntryRe', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryRePassengerInvoicesForm',
    requires: [
        'Ext.Praxis.controller.interline.PassengerInvoices.DataEntryRePassengerInvoicesController'
    ],
    controller: 'DataEntryRePassengerInvoicesController',
    title: 'Passenger Invoices SFI031 Complete Information',
    header: true,
    height: 270,
    width: 788,
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
                            bodyStyle: 'background:white;',
                            margin: '10 20 5 15',
                            width: 785,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
//                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'RM Reason / Remarks Number:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNUMRMK',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    editable: false,
                                    width: 25
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 5 15',
                            width: 785,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
//                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Remark 1',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMARK1',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    editable: false,
                                    width: 630
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 5 15',
                            width: 785,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
//                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Remark 2',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMARK2',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    editable: false,
                                    width: 630
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 5 15',
                            width: 785,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
//                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Remark 3',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMARK3',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    editable: false,
                                    width: 630
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 5 15',
                            width: 785,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
//                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Remark 4',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMARK4',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    editable: false,
                                    width: 630
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 5 15',
                            width: 785,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
//                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Remark 5',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREMARK5',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    editable: false,
                                    width: 630
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
            margin: '10 0 10 15',
            layout: {
                pack: 'left'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
//                    iconCls: 'prx-icon-cancel',
                    icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});