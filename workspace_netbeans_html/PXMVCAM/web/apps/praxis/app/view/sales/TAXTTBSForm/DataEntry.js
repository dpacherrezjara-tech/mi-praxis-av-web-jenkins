/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.TAXTTBSForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.TAXTTBS.DataEntryTAXTTBSController'
    ],
    // title: 'Resolution 024 Information - Data Entry',
    header: true,
    width: 680,
    height: 500,
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
                    title: '<strong style="color:#000;text-decoration: underline">Tax RATD Complete Information</strong>',
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
                                            id: prototype.id + '-txtA1007CTATO',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Tax </strong>',
                                            width: 160,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 10px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1007PAITA',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Country </strong>',
                                            labelAlign: 'left',
                                            width: 120,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 60,
                                            padding: '5px 5px 1px 5px'

                                        }
                                    ]
                                },
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
                                            id: prototype.id + '-txtA1007NOMBR',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Name </strong>',
                                            width: 580,
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 10px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 690,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            grow: true,
                                            anchor: '100%',
                                            id: prototype.id + '-txtA1007DEFI',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Definition </strong>',
                                            width: 580,
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 10px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 690,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            grow: true,
                                            anchor: '100%',
                                            id: prototype.id + '-txtA1007PDEST',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Collect </strong>',
                                            width: 580,
                                            height: 50,
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 10px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 690,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 105,
                                            padding: '5px 20px 5px 10px',
                                            html: '<strong style="color:#000;">Interlineable: </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1007INTERL',
                                            required: true,
                                            readOnly: true,
                                            fieldStyle: 'text-align: center;',
                                            fieldLabel: '',
                                            width: 70,
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 100px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 690,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 105,
                                            padding: '5px 20px 5px 10px',
                                            html: '<strong style="color:#000;">Aplicable: </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1007ODEPA',
                                            required: true,
                                            readOnly: true,
                                            labelWidth: 85,
                                            width: 160,
                                            fieldLabel: '<strong style="color:#0E7C98;">Departure </strong>',
                                            labelAlign: 'left',
                                            fieldStyle: 'text-align: center;',
                                            padding: '5px 10px 5px 10px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1007OARRIV',
                                            required: true,
                                            readOnly: true,
                                            labelWidth: 55,
                                            fieldStyle: 'text-align: center;',
                                            width: 130,
                                            fieldLabel: '<strong style="color:#0E7C98;">Arrive </strong>',
                                            labelAlign: 'left',
                                            padding: '5px 20px 5px 10px'

                                        }

                                    ]
                                }
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
                                    fieldLabel: '<strong style="color:#000;">Registered By</strong>',
                                    labelWidth: 130,
                                    fieldStyle: 'text-align: center;',
                                    align: 'center',
                                    margin: '0 50 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    //id: prototype.id + '-FECR',
                                    id: prototype.id + '-USUP',
                                    fieldLabel: '<strong style="color:#000;">Modified By</strong>',
                                    labelWidth: 100,
                                    fieldStyle: 'text-align: center;',
                                    margin: '0 10 0 50',
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
                                    id: prototype.id + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Registered Date</strong>',
                                    labelWidth: 130,
                                    readOnly: true,
                                    margin: '0 50 0 0',
                                    fieldStyle: 'text-align: center;',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Modified Date</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    margin: '0 10 0 50',
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