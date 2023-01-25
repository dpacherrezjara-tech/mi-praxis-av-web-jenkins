/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.Resolution024Form.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.Resolution024.DataEntryResolution024Controller'
    ],
    title: 'Resolution 024 Information - Data Entry',
    header: true,
    width: 680,
    height: 350,
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
                    title: '<strong style="color:#000;text-decoration: underline">Resolution 024 Information</strong>',
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
                                            id: prototype.id + '-txtA881PAIS',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Country </strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 180,
                                            labelWidth: 120,
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 10px',
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            minLength: 2,
                                            maskRe: /[a-zA-Z]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNameCountry',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 300,
                                            align: 'center',
                                            labelWidth: 10,
                                            labelAlign: 'left',
                                            padding: '5px 5px 5px 5px',
                                            enforceMaxLength: true,
                                            maxLength: 50,
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
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtA881FECHA',
                                            required: true,                                           
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Date</strong><strong style="color:red;font-size:13px;">*</strong>',
                                            width: 200,
                                            editable:false,
                                            labelWidth: 120,
                                            labelAlign: 'left',
                                            padding: '1px 20px 5px 10px',                                                                                     
                                            format:'Ym'
                                            
                                            
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
                                            id: prototype.id + '-txtA881IND024',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Resolution 024</strong>',
                                            width: 180,
                                            labelWidth: 120,
                                            labelAlign: 'left',
                                            padding: '1px 20px 5px 10px',
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            minLength: 1,
                                            maskRe: /[EUeuNn]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA881MONEDA',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Currency</strong>',
                                            width: 180,
                                            labelWidth: 120,
                                            labelAlign: 'left',
                                            padding: '1px 20px 5px 10px',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            minLength: 3,
                                           // maskRe: /[EUeuNn]/,
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
                                    fieldLabel: '<strong style="color:#000;">User Update</strong>',
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