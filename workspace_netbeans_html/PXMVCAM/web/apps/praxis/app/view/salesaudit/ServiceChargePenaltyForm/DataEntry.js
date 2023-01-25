/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.ServiceChargePenaltyForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ServiceChargePenalty.DataEntryServiceChargePenaltyController'
    ],
    title: "Maintenance ADM's Charge",
    header: true,
    width: 700,
    height: 380,
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
                    layout: 'vbox',
                    width: 700,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            // bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E5ECEF;',
                                    padding: '1',
                                    margin: '1',
                                    //width: 100,    
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Transaction',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-cmbDeType',
                                                    disabled: false,
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    labelAlign: 'left',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Code',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-cmbCode',
                                                    disabled: false,
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    labelAlign: 'left',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Currency',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtmda',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    labelAlign: 'left',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    minLength: 1,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Amount Type',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-cmbAmouType',
                                                    disabled: false,
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    labelAlign: 'left',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Amount',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtAmount',
                                                    fieldLabel: '',
                                                    fieldStyle: 'text-align:right',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    labelAlign: 'left',
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Application IVA',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-cmbIva',
                                                    disabled: false,
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    labelAlign: 'left',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                }


                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Date Efective',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-txtFechaOpen',
                                                    fieldStyle: 'text-align:center;color:blue;',
                                                    maskRe: /[0-9]/,
                                                    fieldLabel: '',
                                                    enforceMaxLength: true,
                                                    width: 100,
                                                    labelWidth: 0
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Date Discontinuity',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-txtFechaClose',
                                                    fieldStyle: 'text-align:center;color:blue;',
                                                    maskRe: /[0-9]/,
                                                    fieldLabel: '',
                                                    enforceMaxLength: true,
                                                    width: 100,
                                                    labelWidth: 00
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '0',
                                            margin: '0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textareafield',
                                                    grow: true,
                                                    anchor: '100%',
                                                    id: prototype.id + '-de-lbldescri',
                                                    required: true,
                                                    readOnly: false,
                                                    fieldLabel: 'Description',
                                                    width: 580,
                                                    labelWidth: 80,
                                                    enforceMaxLength: true,
                                                    maxLength: 1000,
                                                    labelAlign: 'left',
                                                    padding: '0'

                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '0',
                                            margin: '0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)Required Fields',
                                                    width: 200
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-ControlData',
                                    title: 'Control Data',
                                    //margin: '15 0 8 0',
                                    width: 680,
                                    border: true,
                                    defaults: {
                                        style: 'margin: 3px;',
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            margin: '5 0 10 0',
                                            defaults: {
                                                labelAlign: 'left'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creator User',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtREGIS',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creation Date',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFREGI',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creation Time',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtHREGI',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
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
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: 'User Update',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtREVIS',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Update Date',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFREVI',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Update Time',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtHREVI',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
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
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    //hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
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