/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ZoneMasterFileForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryZoneMasterFileForm',
    controller: 'DataEntryZoneMasterFileController',
    requires: [
        'Ext.Praxis.controller.flown.ZoneMasterFile.DataEntryZoneMasterFileController'
    ],
    title: 'Airport and Zone Complete Information',
    header: true,
    width: 700,
    height: 300,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        aling: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: 'vZoneMasterFile-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 650,
                    margin: '20 20 0 20',
                    border: false,
                    bodyStyle: 'background: #E9F1F3',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'vZoneMasterFile-Airport',
                            readOnly: false,
                            //disabled: true,
                            required: true,
                            fieldLabel: '<b> Airport</b> <strong style="color:red;font-size:13px;">*</strong>',
                            labelWidth: 70,
                            labelAlign: 'left',
                            padding: '5px 5px 5px 5px',
                            enforceMaxLength: true,
                            maxLength: 3,
                            minLength: 3,
                            listeners: {
                                change: 'onUpperValue',
                                focusleave: 'onFocusLeaveAirport'
                            }
                        },
                        {
                            xtype: 'label',
                            id: 'vZoneMasterFile-AirportName',
                            fieldLabel: '<strong style="color:#000;">Airport</strong>',
                            padding: '5px 5px 5px 5px'

                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 650,
                    margin: '5 20 5 20',
                    border: false,
                    bodyStyle: 'background: #E9F1F3',
                    items: [
//                        {
//                            xtype: 'textfield',
//                            id: 'vZoneMasterFile-Zone',
//                            required: true,
//                            //readOnly:true,
//                            disabled: false,
//                            fieldLabel: '<strong style="color:#000;">Zone</strong>',
//                            labelWidth: 70,
//                            labelAlign: 'left',
//                            padding: '5px 5px 5px 5px',
//                            enforceMaxLength: true,
//                            maxLength: 3,
//                            minLength: 3,
//                            listeners: {
//                                change: 'onUpperValue'
//                            }
//                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '<b> Zone</b> <strong style="color:red;font-size:13px;">*</strong>',
                            id: 'vZoneMasterFile-Zone',
                            padding: '5px 5px 5px 5px',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            autocomplete: true,
                            allowBlank: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            //width: 250,
                            anyMatch: false,
                            labelWidth: 70

                        }


                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'vZoneMasterFile-ControlData',
                    title: 'Control Data',
                    width: 650,
                    margin: '5 20 5 20',
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
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'vZoneMasterFile-USCR',
                                    fieldLabel: '<strong style="color:#000;">Registered By</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vZoneMasterFile-FECR',
                                    fieldLabel: '<strong style="color:#000;">Date</strong>',
                                    labelWidth: 50,
                                    readOnly: true,
                                    width: 150
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vZoneMasterFile-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Time</strong>',
                                    labelWidth: 50,
                                    readOnly: true,
                                    width: 130
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'vZoneMasterFile-USUP',
                                    fieldLabel: '<strong style="color:#000;">Updated By</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vZoneMasterFile-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Date</strong>',
                                    labelWidth: 50,
                                    readOnly: true,
                                    width: 150
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vZoneMasterFile-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Time</strong>',
                                    labelWidth: 50,
                                    readOnly: true,
                                    width: 130
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
            margin: '5 100 10 250',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: 'vZoneMasterFile-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: 'vZoneMasterFile-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: 'vZoneMasterFile-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: 'vZoneMasterFile-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});