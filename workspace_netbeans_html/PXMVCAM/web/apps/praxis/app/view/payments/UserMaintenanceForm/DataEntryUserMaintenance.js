/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.payments.UserMaintenanceForm.DataEntryUserMaintenance', {
    extend: 'Ext.window.Window',
    alias: 'wid01get.DataEntryUserMaintenance',

    controller: 'DataEntryUserMaintenanceController',

    requires: [
        'Ext.Praxis.controller.payments.UserMaintenance.DataEntryUserMaintenanceController'
    ],
    id: prototype.id01 + '-win',

    title: '',
    header: true,
    height: 320,
    wid01th: 600,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.id01 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtuser',
                            fieldLabel: 'User',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 50,
                            labelWidth: 55,
                            width: 250
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtpass',
                            fieldLabel: 'Pass',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 200,
                            labelWidth: 55,
                            width: 250
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmbProceType',
                            fieldLabel: 'Processor Type',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 130,
                            width: 300,
                            labelAlign: 'right',
                            listConfig: {
                                minWid01th: 350
                            },
                            queryMode: 'local'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmbStatus',
                            fieldLabel: 'Status',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 60,
                            width: 150,
                            queryMode: 'local'
                        }, 
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmbProcessso',
                            fieldLabel: 'Process',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 70,
                            width: 160,
                            queryMode: 'local'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmbVerifica',
                            fieldLabel: 'Verification',
                            valueField: 'code',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 85,
                            width: 160,
                            queryMode: 'local'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txtA2665DESCR',
                            fieldLabel: 'Description',
                            maxLength: 200,
                            labelWidth: 60,
                            grow: true,
                            width: 350,
                            height: 35
                        }
                        
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtcorreo',
                            fieldLabel: 'Email Robot',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 50,
                            labelWidth: 95,
                            width: 330
                        }
                        
                    ]
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<b style="color: #BF6868;">(*) Required Fields</b>',
                    labelWidth: 200,
                    labelSeparator: ''
                },
                {
                    xtype: 'fieldset',
                    title: 'Control data',
                    border: true,
                    defaults: {
                        border: false,
                        margin: 3
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtA3406REGIS',
                                    fieldLabel: 'User Created',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtA3406FREGI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtA3406HREGI',
                                    fieldLabel: 'Time',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtA3406REVIS',
                                    fieldLabel: 'User Modified',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtA3406FREVI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtA3406HREVI',
                                    fieldLabel: 'Time',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id01 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id01 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id01 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id01 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});