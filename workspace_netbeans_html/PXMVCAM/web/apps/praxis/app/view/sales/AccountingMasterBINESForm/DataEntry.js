/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterBINESForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.AccountingMasterBINES.DataEntryAccountingMasterBINESController'
    ],
    title: 'Accounting Master BINES Data Entry ',
    header: true,
    width: 750,
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
                                            html: '<strong style="color:#000;  ">Preffix</strong>'

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
                                            id: prototype.id + '-de-txtPreffix',
                                            maxLength: 10,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 120,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
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
                                            html: '<strong style="color:#000;  ">Bank</strong>'

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
                                            id: prototype.id + '-de-cboBank',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'A1830BANCO',
                                            displayField: 'A1830BANCO',
                                            labelWidth: 0,
                                            width: 400

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
                                            html: '<strong style="color:#000;">Product</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtProduct',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 450,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            value:'',
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
                                            html: '<strong style="color:#000;">Nature Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNatureCode',
                                            maxLength: 2,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 30,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 60,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Nature</strong>'

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
                                            id: prototype.id + '-de-cboNature',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 100

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBrandCode',
                                            maxLength: 2,
                                            fieldLabel: '<strong style="color:black;">Brand Code</strong>',
                                            width: 120,
                                            border: true,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 80,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            labelAlign: 'left',
                                            padding: '2px 1px 2px 10px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBrandCode2',
                                            maxLength: 2,
                                            fieldLabel: '',
                                            width: 40,
                                            border: true,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            labelAlign: 'left',
                                            padding: '2px 1px 2px 1px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBrandCode3',
                                            maxLength: 2,
                                            fieldLabel: '',
                                            width: 40,
                                            border: true,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            labelAlign: 'left',
                                            padding: '2px 1px 2px 1px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBrandCode4',
                                            maxLength: 2,
                                            fieldLabel: '',
                                            width: 40,
                                            border: true,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            labelAlign: 'left',
                                            padding: '2px 1px 2px 1px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBrandCode5',
                                            maxLength: 2,
                                            fieldLabel: '',
                                            width: 40,
                                            border: true,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            labelAlign: 'left',
                                            padding: '2px 1px 2px 1px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBrandCode6',
                                            maxLength: 2,
                                            fieldLabel: '',
                                            width: 40,
                                            border: true,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            labelAlign: 'left',
                                            padding: '2px 1px 2px 1px'
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
                                            width: 140,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Effective</strong>'

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
                                            padding: '2px 30px 2px 10px'
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
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 60,
                                            padding: '2px 5px 2px 15px',
                                            html: '<strong style="color:#000;  ">Brand</strong>'

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
                                            id: prototype.id + '-de-cboBrand',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 120
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
            ]
        }
    ]
});