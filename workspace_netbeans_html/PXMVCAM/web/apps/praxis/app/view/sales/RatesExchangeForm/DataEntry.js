/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.RatesExchangeForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.RatesExchange.DataEntryRatesExchangeController'
    ],
    title: 'AM RATE - Data Entry Form',
    header: true,
    width: 700,
    height: 300,
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
                    xtype: 'tabpanel',
                    id: prototype.id + '-tabDataEntry',
                    width: 660,
                    height: 200,
                    anchor: '100%',
                    margin: '10 10 10 10',
                    autoScroll: true,
                    listeners: {
                        tabchange: 'onTabChange'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            // bodyStyle: 'background: #E5ECEF',
                            id: prototype.id + 'panel1',
                            title: 'Rate of Exchange Data',
                            height: 3000,
                            layout: 'vbox',
                            margin: '0 0 0 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtRateDate',
                                    fieldStyle: 'text-align:center',
                                    format: 'Y/m/d',
                                    editable: true,
                                    maskRe: /[0-9/]/,
                                    width: 250,
                                    fieldLabel: '<strong style="color:black;font-size:13px;">Rate Date</strong> <strong style="color:red;font-size:13px;">(*)</strong>',
                                    labelWidth: 150,
                                    padding: '10 10 5 10'
                                },
                                {
                                    xtype: 'panel',
                                    // bodyStyle: 'background: #E5ECEF',
                                    layout: 'hbox',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCurrFrom',
                                            required: true,
                                            fieldLabel: '<strong style="color:black;font-size:13px;">From Currency</strong> <strong style="color:red;font-size:13px;">(*)</strong>',
                                            width: 210,
                                            labelWidth: 150,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            padding: '1 0 5 10'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCurrTo',
                                            required: true,
                                            fieldLabel: '<strong style="color:black;font-size:13px;">To</strong> <strong style="color:red;font-size:13px;">(*)</strong>',
                                            width: 100,
                                            labelWidth: 50,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            padding: '1 0 5 10'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtRateValue',
                                            required: true,
                                            fieldLabel: '<strong style="color:black;font-size:13px;">Value</strong> <strong style="color:red;font-size:13px;">(*)</strong>',
                                            width: 210,
                                            labelWidth: 70,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 20,
                                            maskRe: /[0-9.]/,
                                            enforceMaxLength: true,
                                            padding: '1 0 5 10'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-ControlData',
                                    title: 'Control Data',
                                    width: 640,
                                    margin: '10 10 0 10',
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
                                                    labelWidth: 90,
                                                    margin: '0 10 0 0',
                                                    readOnly: true,
                                                    width: 180
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFECR',
                                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                                    labelWidth: 90,
                                                    margin: '0 10 0 0',
                                                    readOnly: true,
                                                    width: 180
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtHOCR',
                                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                                    labelWidth: 90,
                                                    margin: '0 10 0 0',
                                                    readOnly: true,
                                                    width: 180
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
                                                    labelWidth: 90,
                                                    readOnly: true,
                                                    margin: '0 10 0 0',
                                                    width: 180
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFEUP',
                                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                                    labelWidth: 90,
                                                    readOnly: true,
                                                    margin: '0 10 0 0',
                                                    width: 180
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtHOUP',
                                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                                    labelWidth: 90,
                                                    readOnly: true,
                                                    margin: '0 10 0 0',
                                                    width: 180
                                                }
                                            ]
                                        }
                                    ]
                                }



                            ]
                        },
                        {
                            xtype: 'panel',
                            //bodyStyle: 'background: #E5ECEF',
                            id: prototype.id + 'panel2',
                            title: 'Update Groups And Transactions',
                            layout: 'vbox',
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    // bodyStyle: 'background: #E5ECEF',
                                    layout: 'hbox',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;;font-size:13px;">Groups</strong> <strong style="color:red;font-size:13px;">(*):</strong>',
                                            align: 'left',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textareafield',
                                            grow: true,
                                            anchor: '100%',
                                            id: prototype.id + '-txtGroups',
                                            required: true,
                                            fieldLabel: '',
                                            width: 350,
                                            maxLength: 3,
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 10px',
                                            maskRe: /[0-9.]/

                                        },
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;;font-size:13px;">(Separate by comma ",")</strong> ',
                                            align: 'left',
                                            width: 180
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUpdRateVal',
                                    required: true,
                                    readOnly: true,
                                    fieldLabel: '<strong style="color:black;font-size:13px;">Rate Value</strong>',
                                    width: 210,
                                    labelWidth: 80,
                                    labelAlign: 'center',
                                    fieldStyle: ' text-align:right ',
                                    maxLength: 20,
                                    maskRe: /[0-9.]/,
                                    enforceMaxLength: true,
                                    padding: '1 0 5 10'
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
            margin: '5 100 5 150',
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
                    text: 'Cancel',
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