/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.ContingenciesForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.salesaudit.Contingencies.DataEntryContingenciesController'
    ],
    title: "Maintenance Contingencies",
    header: true,
    width: 800,
    height: 480,
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
                    width: 800,
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
                                                    text: 'Route',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'From',
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
                                                    id: prototype.id + '-de-Route1',
                                                    fieldLabel: '',
                                                    fieldStyle: 'text-align:center',
                                                    width: 100,
                                                    value: '***',
                                                    labelWidth: 0,
                                                    maxLength: 3,
                                                    enableKeyEvents: true,
                                                    labelAlign: 'left',
                                                    maskRe: /[a-zA-Z]/,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    margin: '0 0 0 5',
                                                    text: 'From/To',
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
                                                    id: prototype.id + '-de-FromTo',
                                                    fieldLabel: '',
                                                    fieldStyle: 'text-align:center',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    maxLength: 3,
                                                    enableKeyEvents: true,
                                                    labelAlign: 'left',
                                                    maskRe: /[a-zA-Z]/,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Currency',
                                                    margin: '0 0 0 5',
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
                                                    id: prototype.id + '-de-Route2',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    labelAlign: 'left',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    maskRe: /[a-zA-Z]/,
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
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Departing Date',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Efective',
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-RfndDate1',
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
                                                    text: ' Discontinuity',
                                                    margin: '0 0 0 5',
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-RfndDate2',
                                                    fieldStyle: 'text-align:center;color:blue;',
                                                    maskRe: /[0-9]/,
                                                    fieldLabel: '',
                                                    enforceMaxLength: true,
                                                    width: 100,
                                                    labelWidth: 0
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
                                                    text: 'Issued Date',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'From',
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-Emission1',
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
                                                    text: ' To',
                                                    margin: '0 0 0 5',
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-Emission2',
                                                    fieldStyle: 'text-align:center;color:blue;',
                                                    maskRe: /[0-9]/,
                                                    fieldLabel: '',
                                                    enforceMaxLength: true,
                                                    width: 100,
                                                    labelWidth: 0
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
                                                    id: prototype.id + '-de-lblString',
                                                    required: true,
                                                    readOnly: false,
                                                    fieldLabel: 'Description',
                                                    width: 600,
                                                    labelWidth: 80,
                                                    enforceMaxLength: true,
                                                    maxLength: 60,
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
                                                    xtype: 'textareafield',
                                                    grow: true,
                                                    anchor: '100%',
                                                    id: prototype.id + '-de-lblReservation',
                                                    required: true,
                                                    readOnly: false,
                                                    fieldLabel: 'Reservation',
                                                    width: 600,
                                                    labelWidth: 80,
                                                    enforceMaxLength: true,
                                                    maxLength: 50,
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
                                                    xtype: 'textareafield',
                                                    grow: true,
                                                    anchor: '100%',
                                                    id: prototype.id + '-de-lbldescri',
                                                    required: true,
                                                    readOnly: false,
                                                    fieldLabel: 'Description',
                                                    width: 600,
                                                    labelWidth: 80,
                                                    enforceMaxLength: true,
                                                    maxLength: 100,
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