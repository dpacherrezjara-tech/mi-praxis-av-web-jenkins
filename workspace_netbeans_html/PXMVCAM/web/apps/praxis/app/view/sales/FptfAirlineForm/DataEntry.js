/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FptfAirlineForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.FptfAirline.DataEntryFptfAirlineController'
    ],
    //title: 'Minimun Rule - Data Entry',
//    header: true,
    width: 500,
    height: 260,
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
                    title: '<strong style="color:#000;text-decoration: underline">Passenger Traffic File (Airline) Complete Information</strong>',
//                    width: 400,
                    margin: '5 20 5 15',
                    border: true,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
//                            width: 400,
                            margin: '5 0 10 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A004FORMA',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Form </strong>',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '5px 20px 0px 5px',
                                            maxLength: 4,
                                            minLength: 4,
                                            maskRe: /[0-9]/

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A004TIPODO',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Doc. Type </strong>',
                                            width: 140,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px',
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A004NROCUP',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Coupons </strong>',
                                            width: 110,
                                            labelWidth: 60,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px',
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-FORMTYPE',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Form Type </strong>',
                                            width: 120,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 20px 5px 5px',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-FORMUSE',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Form Use</strong>',
                                            width: 120,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-SALESTYPE',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Sales Type </strong>',
                                            width: 105,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-METHOD',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Method</strong>',
                                            width: 85,
                                            labelWidth: 60,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-SCN',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">SCN</strong>',
                                            width: 70,
                                            labelWidth: 40,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 10px 5px 5px'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-DESCRIPTIO',
                                            required: true,
                                            readOnly: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Description </strong>',
                                            width: 420,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '5px 20px 5px 5px'


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
            margin: '5 100 5 200',
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