/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.CatalogueFlightForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
           'Ext.Praxis.controller.flown.CatalogueFlight.DataEntryCatalogueFlightController'
    ],
    title: 'CATALOGUE OF FLIGHT - Data Entry',
    header: true,
    width: 800,
    height: 400,
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
                    layout: 'hbox',
                    width: 750,
                    margin: '20 20 5 20',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 350,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '1px 5px 0px 10px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Operator</strong>'

                                },
                                {
                                    layout: 'hbox',
                                    width: 350,
                                    margin: '5 0 10 0',
                                    border: false,
                                    bodyStyle: 'background: #EFE9E5',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-flightNumberOpe',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Flight Number</strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 170,
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 4,
                                            minLength: 1,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                focusleave:'onFocusLeaveOpe'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-carrierOpe',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Carrier</strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 90,
                                            labelWidth: 50,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            minLength: 2,
                                            maskRe: /[a-zA-Z]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 350,
                            margin: '1 0 1 50',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '1px 5px 0px 10px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Marketing</strong>'

                                },
                                {
                                    layout: 'hbox',
                                    width: 350,
                                    margin: '5 0 10 0',
                                    border: false,
                                    bodyStyle: 'background: #EFE9E5',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-flightNumberMar',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Flight Number</strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 170,
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 4,
                                            minLength: 1,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                  focusleave:'onFocusLeaveMar'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-carrierMar',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Carrier</strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 90,
                                            labelWidth: 50,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            minLength: 2,
                                            maskRe: /[a-zA-Z]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 750,
                    margin: '1 20 5 20',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            padding: '1px 5px 0px 10px',
                            html: '<strong style="color:#000; text-decoration: underline; ">Hard Block</strong>'

                        },
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '5 0 10 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-flightNumberHar',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '<strong style="color:#000;">Flight Number</strong>',
                                    width: 200,
                                    labelWidth: 100,
                                    labelAlign: 'left',
                                    padding: '1px 5px 0px 10px',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    minLength: 1,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        focusleave:'onFocusLeaveHar'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-carrierHar',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                                    width: 90,
                                    labelWidth: 50,
                                    labelAlign: 'left',
                                    padding: '1px 5px 0px 10px',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    minLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 750,
                    margin: '1 20 1 20',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-frecuency',                                   
                                    disabled: false,
                                    fieldLabel: '<strong style="color:#000;">Frecuency</strong>',
                                    width: 200,
                                    labelWidth: 100,
                                    labelAlign: 'left',
                                    padding: '1 5 0 10',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    minLength: 1,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-equipment',                                    
                                    disabled: false,
                                    fieldLabel: '<strong style="color:#000;">Equipment</strong>',
                                    width: 200,
                                    labelWidth: 100,
                                    labelAlign: 'left',
                                    padding: '1 5 0 10',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    minLength: 1,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                    }
                                }

                            ]
                        }
                        ,
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '1 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbOperator',
                                    padding: '1 5 0 10',
                                    fieldLabel: '<strong style="color:#000;">Operator Type</strong>',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 100,
                                    width: 200,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFlight',
                                    padding: '1 5 0 10',
                                    fieldLabel: '<strong style="color:#000;">Flight Type</strong>',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 100,
                                    width: 200,
                                    anchor: '100%'
                                }

                            ]
                        }
                    ]
                }




                ,
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 750,
                    margin: '10 20 0 20',
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
                                    id: prototype.id + '-USCR',
                                    fieldLabel: '<strong style="color:#000;">Creator User</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
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
                                    id: prototype.id + '-USUP',
                                    fieldLabel: '<strong style="color:#000;">user Update</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
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
            margin: '5 100 10 200',
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
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    padding: '1px 5px 0px 10px',
                    html: '<strong style="color:red;font-size:11px;">(*)Required Fields</strong>'

                },
                {
                    text: '',
                    id: prototype.id + '-btn-de-back',
                    icon: 'resources/img/botones/prev.png',                   
                    border: false,
                    listeners: {
                         click: 'onBackClickDataEntry'
                    }
                },
                {
                    text: '',
                    id: prototype.id + '-btn-de-next',
                    icon: 'resources/img/botones/next2.png',    
                    border: false,
                    listeners: {
                          click: 'onNextClickDataEntry'
                    }
                }
            ]
        }
    ]
});