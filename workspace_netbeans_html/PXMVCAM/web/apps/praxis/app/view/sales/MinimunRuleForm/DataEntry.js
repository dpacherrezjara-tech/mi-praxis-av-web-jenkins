/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.MinimunRuleForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.MinimunRule.DataEntryMinimunRuleController'
    ],
    title: 'Minimun Rule - Data Entry',
    header: true,
    width: 400,
    height: 200,
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
                    title: '<strong style="color:#000;text-decoration: underline">Minimun Rule</strong>',
                    width: 350,
                    margin: '5 20 5 20',
                    border: true,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 400,
                            margin: '5 0 10 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 350,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA025KEY',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Fecha (AAAAMM) </strong>',
                                            width: 200,
                                            labelWidth: 120,
                                            labelAlign: 'left',
                                            fieldStyle: ' text-align:right ',
                                            padding: '5px 20px 5px 5px',
                                          
                                            maxLength: 6,
                                            minLength: 6,
                                            maskRe: /[0-9]/

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA025COEFIC',
                                            fieldLabel: '<strong style="color:#000;">Coefficient </strong>',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldStyle: ' text-align:right ',
                                            width: 200,
                                            align: 'right',
                                            labelWidth: 120,
                                            labelAlign: 'left',
                                            padding: '5px 5px 5px 5px'


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
            margin: '5 100 5 150',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
//                {
//                    text: 'Save',
//                    id: prototype.id + '-btn-save',
//                    iconCls: 'prx-icon-save',
//                    hidden: true,
//                    listeners: {
//                        click: 'onSaveClick'
//                    }
//                },
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