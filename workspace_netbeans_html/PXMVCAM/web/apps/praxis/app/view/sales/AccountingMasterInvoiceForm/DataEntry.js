/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * zperez
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterInvoiceForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntry',
    controller: 'DataEntryAccountingMasterInvoiceFormController',
    requires: [
        'Ext.Praxis.controller.sales.AccountingMasterInvoiceForm.DataEntryAccountingMasterInvoiceFormController'
    ],
    title: 'Maintenance Master Invoice ',
    header: true,
    width: 720,
    height: 370,
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
            id: prototype.id2 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 700,
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
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-txtAccount',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            fieldLabel: 'Account <strong style="color:red;font-size:13px;">(*)</strong>',
                                            width: 150,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 75,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-txtSubAccount',
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            fieldLabel: 'Sub Account <strong style="color:red;font-size:13px;">(*)</strong>',
                                            width: 200,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 100,
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
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-txtDESC',
                                            enforceMaxLength: true,
                                            fieldLabel: 'Descripcion <strong style="color:red;font-size:13px;">(*)</strong>',
                                            width: 200,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 90,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Record <strong style="color:red;font-size:13px;">(*)</strong>',
                                            id: prototype.id2 + '-ComboRecord',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 70,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRecordRender'
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
                                            xtype: 'combo',
                                            fieldLabel: 'IVA',
                                            id: prototype.id2 + '-ComboIva',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            editable: false,
                                            padding: '2px 5px 2px 3px',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterIvaRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id2+'-ComboAgru',
                                             fieldLabel: 'Agrup. FG <strong style="color:red;font-size:13px;">(*)</strong>',
                                            queryMode: 'local',
                                            displayField: 'DESCAGRUP',
                                            valueField: 'DESCAGRUP',
                                            width: 250,
                                            labelWidth: 90,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig:{
                                                minWidth: 200
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
                                            xtype: 'combo',
                                            fieldLabel: 'Type Cta',
                                            id: prototype.id2 + '-ComboTypeCta',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            padding: '2px 5px 2px 3px',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterIvaRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'OAL',
                                            id: prototype.id2 + '-ComboOal',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterIvaRender'
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
                                            xtype: 'combo',
                                            fieldLabel: 'Billable',
                                            id: prototype.id2 + '-ComboBillable',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            padding: '2px 5px 2px 3px',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterIvaRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'No Sale',
                                            id: prototype.id2 + '-ComboNoSale',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterIvaRender'
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
                                            xtype: 'combo',
                                            fieldLabel: 'Ind Grouping',
                                            id: prototype.id2 + '-ComboIndGrouping',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterIvaRender'
                                            }
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
                    id: prototype.id2 + '-ControlData',
                    title: 'Control Data',
                    width: 680,
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
                                    id: prototype.id2 + '-txtUSCR',
                                    fieldLabel: '<strong style="color:#000;">User of Creation</strong>',
                                    labelWidth: 130,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtFECR',
                                    fieldLabel: '<strong style="color:#000;"> Creation Date</strong>',
                                    labelWidth: 130,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtHOCR',
                                    fieldLabel: '<strong style="color:#000;"> Creation Time</strong>',
                                    labelWidth: 130,
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
                                    id: prototype.id2 + '-txtUSUP',
                                    fieldLabel: '<strong style="color:#000;">User Update</strong>',
                                    labelWidth: 130,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtFEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date </strong>',
                                    labelWidth: 130,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtHOUP',
                                    fieldLabel: '<strong style="color:#000;"> Update Time</strong>',
                                    labelWidth: 130,
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
            margin: '5 100 10 50',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id2 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id2 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id2 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    //hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});

