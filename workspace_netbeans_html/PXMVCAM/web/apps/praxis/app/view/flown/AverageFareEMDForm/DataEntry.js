/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AverageFareEMDForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.flown.AverageFareEMD.DataEntryAverageFareEMDController'
    ],
    title: 'AVERAGE FARE EMD - Data Entry',
    header: true,
    width: 680,
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
                    xtype: 'fieldset',
                    layout: 'vbox',
                    title: '<strong style="color:#000;text-decoration: underline">Average Fare EMD</strong>',
                    width: 630,
                    margin: '5 20 5 20',
                    border: true,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 630,
                            margin: '5 0 10 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 690,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-subCode',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">SubCode </strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 200,
                                            labelWidth: 150,
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 10px',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            minLength: 3,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-rfic',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">RFIC</strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 70,
                                            align: 'center',
                                            labelWidth: 40,
                                            labelAlign: 'left',
                                            padding: '5px 5px 5px 20px',
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            minLength: 1,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 630,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-subCodeDescription',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">SubCode Description</strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 400,
                                            labelWidth: 150,
                                            labelAlign: 'left',
                                            padding: '1px 20px 5px 10px',
                                            enforceMaxLength: true,
                                            maxLength: 200,
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
                    layout: 'column',
                    width: 630,
                    margin: '5 20 5 20',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCurrency',
                            padding: '1 1 1 30',
                            fieldLabel: 'Currency',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,                            
                            valueField: 'code',
                            displayField: 'name',
                            value: 'MXN',
                            labelWidth: 70,
                            width: 170,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-amount',
                            required: true,
                            //readOnly:true,
                            disabled: false,
                            fieldLabel: '<strong style="color:#000;">Amount</strong>',
                            width: 250,
                            labelWidth: 70,
                            labelAlign: 'left',
                            padding: '1px 10px 5px 30px',
                            enforceMaxLength: true,
                            maxLength: 10,
                            maskRe: /[0-9-.]/

                        }

                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 630,
                    margin: '1 20 0 20',
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
                }
            ]
        }
    ]
});