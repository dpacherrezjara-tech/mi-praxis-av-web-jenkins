/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.GSAIncentiveGSACountryForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.GSAIncentiveGSACountry.DataEntryGSAIncentiveGSACountryController'
    ],
    title: 'GSA Incentive GSA Country',
    header: true,
    width: 530,
    height: 320,
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
                    width: 520,
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
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">GSA</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtGSA',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 100,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                                    // maxLength: 4,
                                                    // maskRe: /[0-9]/,
//                                            listeners: {
//                                                change: 'onUpperValue'
//                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Country</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCountry',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 90,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                                    //maxLength: 3,
                                                    //maskRe: /[0-9]/,
//                                            listeners: {
//                                                change: 'onUpperValue'
//                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Area</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtArea',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 320,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100
                                                    //maskRe: /[0-9]/,
//                                            listeners: {
//                                                change: 'onUpperValue'
//                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Description</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtDescription',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 320,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100
                                                    //maskRe: /[0-9]/,
//                                            listeners: {
//                                                change: 'onUpperValue'
//                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Country IATA</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCountryIATA',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 100,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Local Currency</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtLocalCurrency',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 100,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Payment Currency</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtPaymentCurrency',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 80,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Agent</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtRazonSocial',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 320,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Contact</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtContact',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 320,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Email</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtEmail',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 320,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100
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
                }
//                ,
//                {
//                    xtype: 'label',
//                    labelAlign: 'center',
//                    width: 150,
//                    padding: '2px 5px 2px 3px',
//                    html: '<strong style="color:red;font-size:13px;">(*)Required Fields</strong>'
//
//                }
            ]
        }
    ]
});