/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ConsortiaForm.AcuseFOBDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-acuseFOBDataEntry',
    controller: prototype.id + '-acuseFOBDataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.Consortia.DataEntryAcuseFOBController'
    ],
    title: 'Acuse Received',
    header: true,
    width: 700,
    height: 220,
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
            id: prototype.id + '-ar' + '-DataEntry-center',
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
                                            html: '<strong style="color:#000;  ">IATA Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-ar' + '-txtA1728IATA',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 90,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                focusleave: 'get_ValidaCodeIATA'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-ar' + '-txtA003KEY3',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 300,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                                    // maxLength: 8,

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
                                            html: '<strong style="color:#000;  ">Lote</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-ar' + '-txtA1728LOTE',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 150,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 20

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 80,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Source</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-ar' + '-txtA1728FUENT',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 90,
                                            labelWidth: 0,
                                            value: '00',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            //maxLength: 8

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
                                            labelAlign: 'center',
                                            width: 150,
                                            padding: '2px 5px 2px 8px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

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
                                            html: '<strong style="color:#000;  ">Date</strong>'

                                        },
                                        {
                                            xtype: 'datefield',
                                            format: 'Y/m/d',
                                            id: prototype.id + '-ar' + '-txtA1728FACUS',
                                            fieldStyle: 'text-align:center',
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            width: 100,
                                            listeners: {
                                                focusleave: 'validarFechaAcuse'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 60,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Time</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-ar' + '-txtA1728HACUS',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 100,
                                            labelWidth: 0,
                                            maskRe: /[0-9:]/,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 8,
                                            listeners: {
                                                focusleave: 'validarHora'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 80,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  "> hh:mm:ss</strong>'

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
                    id: prototype.id + '-ar' + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-ar' + '-btn-update',
                    iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-ar' + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-ar' + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }

            ]
        }
    ]
});