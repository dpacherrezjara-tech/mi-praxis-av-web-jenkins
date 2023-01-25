/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.flown.ElectronicMiscellaneous.DataEntryElectronicMiscellaneousController'
    ],
    title: 'EMD - Data Entry',
    header: true,
    width: 800,
    height: 520,
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
                    height: 614,
                    width: 780,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            margin: '10 5 1 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    margins: '1 5 1 5',
                                    id: prototype.id + '-cmbTEMD',
                                    valueField: 'code',
                                    displayField: 'name',
                                    padding: '1 5 1 5',
                                    fieldLabel: 'Type EMD',
                                    labelSeparator: ' ',
                                    labelStyle: 'color:#0b333c;font-weight:bold;'
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 0.2
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    id: prototype.id + '-cmbSTVAL',
                                    padding: '1 5 1 5',
                                    fieldLabel: 'Status',
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelSeparator: ' ',
                                    labelStyle: 'color:#0b333c;font-weight:bold;'
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '5 5 0 10',
                            padding: '0 5 0 5',
                            style: 'background:#e5ecef;font-weight:bold;',
                            title: '<b style="text-decoration:underline;font-size:13px">Flight Information OCR</b>',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    bodyStyle: 'background:#e5ecef',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 90,
                                            text: 'Departure.'
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 0 3 0',
                                            style: 'color:#9c1717;font-weight:bold;',
                                            width: 20,
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCDEPART',
                                            width: 130,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z]/,
                                            maxLength: 3,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 50
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 110,
                                            text: 'Arrival'
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 0 3 0',
                                            style: 'color:#9c1717;font-weight:bold;',
                                            width: 20,
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCARRIVA',
                                            width: 125,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 40
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 50,
                                            text: 'Zone'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtZONE',
                                            width: 60,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    bodyStyle: 'background:#e5ecef',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 90,
                                            text: 'Flight Date'
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 0 3 0',
                                            style: 'color:#9c1717;font-weight:bold;',
                                            width: 20,
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtDFLIGHT',
                                            width: 130,
                                            labelWidth: 0,
                                            maskRe: /[0-9]/,
                                            format: 'Ymd',
                                            enforceMaxLength: true,
                                            maxLength: 8
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 50
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 110,
                                            text: 'Flight Number'
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 0 3 0',
                                            style: 'color:#9c1717;font-weight:bold;',
                                            width: 20,
                                            text: '(*)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNFLIGHT',
                                            width: 125,
                                            labelWidth: 0,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 4
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 40
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    bodyStyle: 'background:#e5ecef',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 110,
                                            text: 'Service Type'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: prototype.id + '-cmbFFLOW',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 130,
                                            labelWidth: 0
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 50
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 130,
                                            text: 'Operator Type'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: prototype.id + '-cmbTOPER',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 125,
                                            labelWidth: 0
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 40
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margins: '0',
                            html: '<b>Coupons Information EMD</b>',
                            margin: '2 5 1 10',
                            padding: '0 5 0 5',
                            style: 'background:#efe9e5',
                            title: '<b style="text-decoration:underline;font-size:13px">Flight Information OCR</b>',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    bodyStyle: 'background:#efe9e5',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 250,
                                            text: 'Sending Date'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFSENDEM',
                                            width: 130,
                                            labelWidth: 0,
                                            format: 'Ymd',
                                            enforceMaxLength: true,
                                            maxLength: 8
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 30
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 100,
                                            text: 'Total Coupons'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNEMD',
                                            width: 125,
                                            labelWidth: 0,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 40
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    bodyStyle: 'background:#efe9e5',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 250,
                                            text: 'Quantity   Coupons STAND-ALONE'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNSTAS',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    bodyStyle: 'background:#efe9e5',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 250,
                                            text: 'Quantity   Coupons USE '
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNUSEA',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    bodyStyle: 'background:#efe9e5',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 250,
                                            text: 'Quantity   Coupons MISCELAENEO'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNOTHE',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margins: '0',
                            margin: '2 5 1 10',
                            padding: '0 5 0 5',
                            style: 'background:#e5ecef',
                            title: '<b style="text-decoration:underline;font-size:13px">Valuation and Accounting Information Policy</b>',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 110,
                                            text: 'Close Date'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFCLOSE',
                                            width: 130,
                                            labelWidth: 0,
                                            format: 'Ymd',
                                            enforceMaxLength: true,
                                            maxLength: 8
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 20
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 130,
                                            text: 'Quantity Coupons'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQCPNVAL',
                                            width: 110,
                                            labelWidth: 0,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maskRe: [
                                                0 - 9
                                            ]
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 20
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 90,
                                            text: 'Flag Poliza'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: prototype.id + '-cmbFSTAPO',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 70,
                                            labelWidth: 0
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margins: '0',
                            margin: '2 5 1 10',
                            padding: '0 5 0 5',
                            // style: 'background:#e5ecef',
                            title: '<b style="text-decoration:underline;font-size:13px">Control Data</b>',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    layout: 'hbox',
                                    // bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 110,
                                            text: 'Creator User'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUSCR',
                                            width: 125,
                                            labelWidth: 0,
                                            readOnly: true,
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 20
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 130,
                                            text: 'Creation Date'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFECR',
                                            width: 110,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 20
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 110,
                                            text: 'Creation Time'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHOCR',
                                            width: 110,
                                            labelWidth: 0,
                                            readOnly: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '2 0 2 0',
                                    layout: 'hbox',
                                    // bodyStyle: 'background:#e5ecef',
                                    items: [
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 110,
                                            text: 'User Update'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUSUP',
                                            width: 125,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 20
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 130,
                                            text: 'Update Date'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFEUP',
                                            width: 110,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 20
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '7 5 3 5',
                                            style: 'color:#0b333c;font-weight:bold;',
                                            width: 110,
                                            text: 'Update Time'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHOUP',
                                            width: 110,
                                            labelWidth: 0,
                                            readOnly: true
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