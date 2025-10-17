/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.payments.ExecutionScheduleForm.DataEntryExecutionSchedule', {
    extend: 'Ext.window.Window',
    alias: 'wid01get.DataEntryExecutionSchedule',

    controller: 'DataEntryExecutionScheduleController',
    title: 'Processing Schedule - Data Entry',
    requires: [
        'Ext.Praxis.controller.payments.ExecutionSchedule.DataEntryExecutionScheduleController'
    ],
    id: prototype.id01 + '-win',
    header: true,
    height: 250,
    width: 500,
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
                            xtype: 'datefield',
                            id: prototype.id01 + '-txtStartdate',
                            fieldLabel: 'Start date',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            format: 'Y/m/d',
                            labelWidth: 85,
                            width: 200
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'datefield',
                            id: prototype.id01 + '-txtEnddate',
                            fieldLabel: 'End date',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            format: 'Y/m/d',
                            labelWidth: 85,
                            width: 200
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmbProceType',
                            fieldLabel: 'Processor Type',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 110,
                            width: 250,
                            listConfig: {
                                minWidth: 300
                            },
                            queryMode: 'local'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmbStatus',
                            fieldLabel: 'Status',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 65,
                            width: 200,
                            queryMode: 'local'
                        }

                    ]
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<b style="color: #BF6868;">(*) Required Fields</b>',
                    labelWidth: 300,
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
                        click: 'onDeleteClick'
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