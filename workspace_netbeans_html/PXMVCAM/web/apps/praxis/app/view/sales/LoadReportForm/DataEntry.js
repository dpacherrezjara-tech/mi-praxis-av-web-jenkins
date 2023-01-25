/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntrySalesReportController'
    ],
    title: 'Maintenance of Group',
    header: true,
    width: 530,
    height: 330,
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
                    width: 720,
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
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    padding: '0 5 0 5',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtGroup',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 225,
                                            labelWidth: 125,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            fieldLabel: 'Group',
                                            labelStyle: 'font-weight:bold',
                                            padding: '2px 5px 2px 3px',
                                            listeners: {
//                                                change: 'onUpperValue'                                                
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtChannel',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 200,
                                            labelWidth: 100,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            fieldLabel: 'Channel',
                                            labelStyle: 'font-weight:bold',
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 3,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    padding: '0 5 0 5',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-txtSource',
                                            required: true,
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: 'Source',
                                            width: 225,
                                            labelWidth: 125,
                                            labelStyle: 'font-weight:bold',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            padding: '2px 5px 2px 3px',
                                            listeners: {
                                                change: 'changeCmbSource'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCountry',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 200,
                                            labelWidth: 100,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            fieldLabel: 'Country',
                                            labelStyle: 'font-weight:bold',
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 2,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keyup: 'keyupContry'

                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    padding: '0 5 0 5',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtIATA',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 225,
                                            labelWidth: 125,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            fieldLabel: 'IATA/Code',
                                            labelStyle: 'font-weight:bold',
                                            padding: '2px 5px 2px 3px',
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            listeners: {
                                                keyup: 'keyupIata'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSabre',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 200,
                                            labelWidth: 100,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            fieldLabel: 'Sabre City',
                                            labelStyle: 'font-weight:bold',
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 5,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    padding: '0 5 0 5',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBank',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 225,
                                            labelWidth: 125,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            fieldLabel: 'City/Bank',
                                            labelStyle: 'font-weight:bold',
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 3,
                                            maskRe: /[a-zA-Z]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keyup: 'keyupBank'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-txtSalesType',
                                            required: true,
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: 'Sales Type',
                                            width: 200,
                                            labelWidth: 100,
                                            labelStyle: 'font-weight:bold',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            padding: '2px 5px 2px 3px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    padding: '0 5 0 5',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtEndFrom',
                                            format: 'Y/m/d',
                                            width: 225,
                                            labelWidth: 125,
                                            labelStyle: 'font-weight:bold',
                                            fieldLabel: 'Period Ending Date',
                                            fieldStyle: 'text-align:center',
                                            maskRe: /[0-9/]/,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtEndTo',
                                            format: 'Y/m/d',
                                            width: 200,
                                            labelWidth: 100,
                                            labelStyle: 'font-weight:bold',
                                            fieldLabel: 'To',
                                            fieldStyle: 'text-align:center',
                                            maskRe: /[0-9/]/,
                                            padding: '2px 5px 2px 3px'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    padding: '0 5 0 5',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCurrency',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 225,
                                            labelWidth: 125,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            fieldLabel: 'Currency',
                                            labelStyle: 'font-weight:bold',
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 3,
                                            maskRe: /[a-zA-Z]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keyup: 'keyupCurrency'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-txtProStatus',
                                            required: true,
                                            disabled: true,
                                            fieldLabel: 'Process Status',
                                            width: 200,
                                            labelWidth: 100,
                                            labelStyle: 'font-weight:bold',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            padding: '2px 5px 2px 3px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    padding: '0 5 0 5',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 3',
                                            html: '<strong style="color:#000;">Process</strong>'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    padding: '0 5 0 5',
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtProcessing',
                                            format: 'Y/m/d',
                                            width: 225,
                                            labelWidth: 125,
                                            labelStyle: 'font-weight:bold',
                                            fieldLabel: 'Processing Date',
                                            fieldStyle: 'text-align:center',
                                            maskRe: /[0-9/]/,
                                            padding: '2px 5px 2px 3px'

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
//                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'
//
//                }
            ]
        }
    ]
});