/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.LoadGranPlanForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.salesaudit.LoadGranPlan.DataEntryLoadGranPlanController'
    ],
    title: 'LOAD GP',
    header: true,
    width: 350,
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
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    width: 300,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
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
                                            width: 100,
                                            padding: '2px 0px 2px 10px',
                                            html: '<strong style="color:#000;  ">System Date</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            padding: '2px 2px 2px 0px',
                                            html: '<strong style="color:red;  ">(*)</strong>'

                                        },
                                        {
                                            xtype: 'datefield',
                                            format: 'Y/m/d',
                                            readOnly: true,
                                            id: prototype.id + '-de-txtFilterDateFrom',
                                            fieldStyle: 'text-align:center;color:blue;',
                                            maskRe: /[0-9]/,
                                            fieldLabel: '',
                                            enforceMaxLength: true,
                                            width: 150,
                                            labelWidth: 30
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '1',
                                    margin: '1',
                                    //width: 100,    
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            padding: '5 0 0 0',
                                            id: prototype.id + '-gridGP',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 250,
                                            width: 275,
                                            columnLines: true,
                                            resizable: false,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'System Date', width: 150, dataIndex: 'A2672FEPRO'},
                                                    {text: '', width: 125, dataIndex: 'blank'}
                                                ]
                                            }
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
                    icon: 'resources/img/botones/process_load.png',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
//                {
//                    text: 'Update',
//                    id: prototype.id + '-btn-update',
//                    iconCls: 'prx-icon-update',
//                    //hidden: true,
//                    listeners: {
//                        click: 'onUpdateClick'
//                    }
//                },
//                {
//                    text: 'Delete',
//                    id: prototype.id + '-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    //hidden: true,
//                    listeners: {
//                        click: 'onDeleteClick'
//                    }
//                },
                {
                    text: 'Close',
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