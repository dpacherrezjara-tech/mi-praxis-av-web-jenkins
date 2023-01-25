/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.PassengerConciliationForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.flown.PassengerConciliation.DataEntryPassengerConciliationController'
    ],
    title: 'Accounting Flown - Data Entry',
    header: true,
    width: 800,
    height: 450,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 125,
                                            text: 'Flight Date'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #9c1717;font-weight:bold; ',
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtDFLIGHT',
                                            width: 100,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 8
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 102,
                                            text: 'Flight Number'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #9c1717;font-weight:bold; ',
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNFLIGHT',
                                            width: 100,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 5
                                        },
                                        {
                                            xtype: 'tbspacer'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    margin: '2 0 2 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 125,
                                            text: 'Departure'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #9c1717;font-weight:bold; ',
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCDEPART',
                                            width: 100,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 102,
                                            text: 'Arrival'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #9c1717;font-weight:bold; ',
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCARRIVA',
                                            width: 100,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 120,
                                            text: 'Zone'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtZONE',
                                            width: 80,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            flex: 0
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    margin: '0 0 2 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 125,
                                            text: 'Carrier Operator'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #9c1717;font-weight:bold; ',
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCARRI',
                                            width: 100,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 2
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 232
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 100,
                                            text: 'Leg Sequence'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #9c1717;font-weight:bold; ',
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtLEGSEQ',
                                            width: 80,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 3
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            bodyStyle: 'background:#e5ecef',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: '<b>Quantity Coupons</b>',
                                    style: 'text-decoration:underline'
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    layout: 'hbox',
                                    bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; text-decoration:underline',
                                            width: 140,
                                            text: 'By Totals'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; text-decoration:underline',
                                            width: 160,
                                            text: 'By Stock'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; text-decoration:underline',
                                            width: 150,
                                            text: 'By Pax'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; text-decoration:underline',
                                            width: 150,
                                            text: 'By Class'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    layout: 'hbox',
                                    bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 60,
                                            text: 'VCR'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNVC',
                                            width: 80,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 5
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 80,
                                            text: 'Online'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNON',
                                            width: 80,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 70,
                                            text: 'Senior'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPAD',
                                            width: 80,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 80,
                                            text: 'Economy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPCABY',
                                            width: 70,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    margin: '2 0 2 0',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 60,
                                            text: 'OCR'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNOCR',
                                            width: 80,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 80,
                                            text: 'OAL'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNOAL',
                                            width: 80,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 70,
                                            text: 'Child'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPCHD',
                                            width: 80,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 80,
                                            text: 'Business'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPCABF',
                                            width: 70,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    margin: '0 0 2 0',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 60,
                                            text: 'Manual'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNMA',
                                            width: 80,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 80,
                                            text: 'Free'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNFRE',
                                            width: 80,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 70,
                                            text: 'Infant'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPINF',
                                            width: 80,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    margin: '2 0 2 0',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 60,
                                            text: 'Total'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtTotal',
                                            width: 80,
                                            readOnly: true,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 80,
                                            text: 'Total'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtTotal2',
                                            width: 80,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            readOnly: true

                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 70,
                                            text: 'Total'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtTotal4',
                                            width: 80,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 80,
                                            text: 'Total'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtTotal3',
                                            width: 70,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            bodyStyle: 'background:#efe9e5',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: '<b>Accounting Information</b>',
                                    style: 'text-decoration:underline'
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    layout: 'hbox',
                                    bodyStyle: 'background:#efe9e5',
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 80,
                                            text: 'Close Date'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFCLOSE',
                                            width: 90,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 8
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 90,
                                            text: 'Qty Valued'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNVAL',
                                            width: 80,
                                            labelWidth: 0,
                                            fieldStyle: 'color: #0B333C;text-align:right;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            margin: 5,
                                            style: 'color: #0B333C;font-weight:bold; ',
                                            width: 90,
                                            text: 'Flag Status'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: prototype.id + '-cmbFSTAPO',
                                            valueField: 'code',
                                            displayField: 'name',
                                            readOnly: true,
                                            width: 100
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-ControlData',
                            title: '<b>Control Data</b>',
                            // width: 900,
                            margin: '5 0 0 0',
                            defaults: {
                                border: false
                            },
                            border: true,
                            hidden: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '5 0 10 0',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUSCR',
                                            fieldLabel: '<strong style="color:#000;">Creator User</strong>',
                                            labelWidth: 120,
                                            margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 210
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFECR',
                                            fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                            labelWidth: 145,
                                            margin: '0 15 0 0',
                                            readOnly: true,
                                            width: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHOCR',
                                            fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                            labelWidth: 120,
                                            margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 220
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '5 0 10 0',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUSUP',
                                            fieldLabel: '<strong style="color:#000;">user Update</strong>',
                                            labelWidth: 120,
                                            readOnly: true,
                                            margin: '0 10 0 0',
                                            width: 210
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFEUP',
                                            fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                            labelWidth: 145,
                                            readOnly: true,
                                            margin: '0 15 0 0',
                                            width: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHOUP',
                                            fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                            labelWidth: 120,
                                            readOnly: true,
                                            margin: '0 10 0 0',
                                            width: 220
                                        }
                                    ]
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
            margin: '5 100 5 20',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
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
                {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    padding: '1px 5px 0px 10px',
                    html: '<strong style="color:#AC4546;font-size:11px;">(*)Required Fields</strong>'

                }


            ]
        }
    ]
});