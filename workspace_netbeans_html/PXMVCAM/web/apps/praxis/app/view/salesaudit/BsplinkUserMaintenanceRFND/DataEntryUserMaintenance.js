/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.view.salesaudit.BsplinkUserMaintenanceRFND.DataEntryUserMaintenance',{
	extend: 'Ext.window.Window',
    alias: 'widget.DataEntryUserMaintenance',

    controller: 'DataEntryUserMaintenanceController',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkUserMaintenanceRFND.DataEntryUserMaintenanceController',
    ],
    id: prototype.id01 + '-win',

    title:'',
    header:true,
    height:250,
    width:500,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,

    defaults:{
        border: false
    },
    
    items:[
        {
           xtype: 'form',
            id: prototype.id01 + '-form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtuser',
                            fieldLabel: 'Auditor',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 10,
                            labelWidth: 70,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtpais',
                            fieldLabel: 'Country',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 2,
                            labelWidth: 85,
                            labelAlign: 'right',
                            width: 120
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-CmbStatus',
                            fieldLabel: 'Status',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 50,
                            labelAlign: 'right',
                            width: 200,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txtA2665DESCR',
                            fieldLabel: 'Description',
                            enforceMaxLength: true,
                            maxLength: 50,
                            labelWidth: 70,
                            grow: true,
                            flex: 1,
                            height: 35
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
                    items:[
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items:[
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
                            items:[
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
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults:{
                scale: 'medium'
            },
            layout:{
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items:[
                {
                    text: 'Save',
                    id: prototype.id01+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id01+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id01+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id01+'-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});