/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterTNUForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.AccountingMasterTNU.DataEntryAccountingMasterTNUController'
    ],
    title: 'Accounting Master TNU Data Entry ',
    header: true,
    width: 750,
    height: 360,
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
                    width: 750,
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
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Doc. Type</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cboDocType',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 150

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
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Concept</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtConcept',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 100,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            value: '',
                                            labelAlign: 'left',
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
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">IVA Code</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cboIVACode',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 150

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 50px',
                                            html: '<strong style="color:#000;  ">Rate Level</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtRateLevel',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 100,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
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
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Begin Rate</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBeginRate',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 100,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            maskRe: /[0-9.]/,
                                            value: '',
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 110,
                                            padding: '2px 5px 2px 40px',
                                            html: '<strong style="color:#000;  ">End Rate</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtEndRate',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 100,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            maskRe: /[0-9.]/,
                                            value: '',
                                            labelAlign: 'left',
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
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Description</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDescription',
                                            maxLength: 30,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 360,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            value: '',
                                            labelAlign: 'left',
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
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Effective</strong>'

                                        },
                                         {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtStartDate',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            editable: true,
                                            maskRe: /[0-9/]/,
                                            width: 80,
                                            fieldLabel: '',
                                            labelWidth: 0,
                                            padding: '2px 30px 2px 3px'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtEndDate',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            editable: true,
                                            maskRe: /[0-9/]/,
                                            width: 80,
                                            fieldLabel: '',
                                            labelWidth: 0,
                                            padding: '2px 5px 2px 10px'
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
                    width: 710,
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
                            margin: '5 0 5 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtUSCR',
                                    fieldLabel: '<strong style="color:#000;">User of Creation</strong>',
                                    labelWidth: 120,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFECR',
                                    fieldLabel: '<strong style="color:#000;"> Creation Date</strong>',
                                    labelWidth: 120,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtHOCR',
                                    fieldLabel: '<strong style="color:#000;"> Creation Time</strong>',
                                    labelWidth: 120,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 220
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
                                    id: prototype.id + '-de-txtUSUP',
                                    fieldLabel: '<strong style="color:#000;">User Update</strong>',
                                    labelWidth: 120,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date </strong>',
                                    labelWidth: 120,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtHOUP',
                                    fieldLabel: '<strong style="color:#000;"> Update Time</strong>',
                                    labelWidth: 120,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 220
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
            margin: '5 100 10 50',
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
                ,
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:red;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});