/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterUATPForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.AccountingMasterUATP.DataEntryAccountingMasterUATPController'
    ],
    title: 'Accounting Master UATP Data Entry ',
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
                    width: 730,
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
                                            width: 90,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">UATP Card</strong>'

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
                                            id: prototype.id + '-txtA1820TCUAT',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 150,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px',
                                            listeners:{
                                                change: 'onUpperValue'
                                            }

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 50,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#000;  ">Type</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cbxType',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 80

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '2px 5px 2px 15px',
                                            html: '<strong style="color:#000;  ">Type Doc.</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1820DOCU',
                                            maxLength: 15,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 80,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px',
                                            listeners:{
                                                change: 'onUpperValue'
                                            }

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 50,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Mode</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cbxMode',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 80

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
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Description</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1820DESCR',
                                            maxLength: 100,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 450,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px',
                                            listeners:{
                                                change: 'onUpperValue'
                                            }

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
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Client</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1820CLIEN',
                                            maxLength: 10,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 80,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px',
                                            listeners:{
                                                change: 'onUpperValue'
                                            }

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 100,
                                            padding: '2px 5px 2px 50px',
                                            html: '<strong style="color:#000;  ">Address</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1820DIREC',
                                            maxLength: 20,
                                            enforceMaxLength: true,                                             
                                            fieldLabel: '',
                                            width: 260,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px',
                                            listeners:{
                                                change: 'onUpperValue'
                                            }

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
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Account</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1820CIA',
                                            maxLength: 2,
                                            fieldLabel: '',
                                            width: 30,
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
                                            id: prototype.id + '-txtA1820UNID',
                                            maxLength: 2,
                                            fieldLabel: '',
                                            width: 30,
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
                                            id: prototype.id + '-txtA1820CECO',
                                            maxLength: 6,
                                            fieldLabel: '',
                                            width: 50,
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
                                            id: prototype.id + '-txtA1820UBI',
                                            maxLength: 4,
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
                                            id: prototype.id + '-txtA1820CTA',
                                            maxLength: 4,
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
                                            id: prototype.id + '-txtA1820SCTA',
                                            maxLength: 5,
                                            fieldLabel: '',
                                            width: 50,
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
                                            id: prototype.id + '-txtA1820EQUI',
                                            maxLength: 4,
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
                                            id: prototype.id + '-txtA1820ICIA',
                                            maxLength: 2,
                                            fieldLabel: '',
                                            width: 30,
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
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Efecctive</strong>'

                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtA1820FINI',
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
                                            id: prototype.id + '-txtA1820FFIN',
                                            fieldStyle: 'text-align:center',
                                            format: 'Ymd',
                                            editable: true,
                                            maskRe: /[0-9/]/,
                                            width: 80,
                                            fieldLabel: '',
                                            labelWidth: 0,
                                            padding: '2px 5px 2px 10px'
                                        }
                                    ]
                                }
//                               
//                               
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
                                    id: prototype.id + '-txtUSCR',
                                    fieldLabel: '<strong style="color:#000;">User of Creation</strong>',
                                    labelWidth: 110,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    fieldLabel: '<strong style="color:#000;"> Creation Date</strong>',
                                    labelWidth: 110,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    fieldLabel: '<strong style="color:#000;"> Creation Time</strong>',
                                    labelWidth: 110,
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
                                    id: prototype.id + '-txtUSUP',
                                    fieldLabel: '<strong style="color:#000;">User Update</strong>',
                                    labelWidth: 110,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date </strong>',
                                    labelWidth: 110,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    fieldLabel: '<strong style="color:#000;"> Update Time</strong>',
                                    labelWidth: 110,
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