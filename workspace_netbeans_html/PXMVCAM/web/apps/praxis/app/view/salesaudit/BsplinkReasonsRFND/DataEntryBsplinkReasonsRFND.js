/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.view.salesaudit.BsplinkReasonsRFND.DataEntryBsplinkReasonsRFND',{
	extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBsplinkReasonsRFND',

    controller: 'DataEntryBsplinkReasonsRFNDController',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkReasonsRFND.DataEntryBsplinkReasonsRFNDController',
    ],
    id: prototype.id01 + '-win',

    title:'Maintenance RFND REASONS',
    header:true,
    height:430,
    width:550,
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
                style: 'margin: 5px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtReason',
                            fieldLabel: 'Cod.Reason',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            labelWidth: 150,
                            readOnly: true,
                            width: 250
                        },
                        {
                            xtype:'combo',
                            id: prototype.id01 + '-ComboBy',
                            fieldLabel: 'Family',
                            labelAlign:'right',
                            queryMode: 'local',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 55,
                            width: 200,
                            editable: false,
                            listConfig:{
                                minWidth: 200
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txtCRelation',
                            fieldLabel: 'Comment Relation',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 200,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txtCEs',
                            fieldLabel: 'Comment Spanish',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 300,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txtCEng',
                            fieldLabel: 'Comment English',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 300,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txtCPor',
                            fieldLabel: 'Comment Portuguese',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 300,
                            labelWidth: 150,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txtCFre',
                            fieldLabel: 'Comment French',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 300,
                            labelWidth: 150,
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
                                    id: prototype.id01 + '-txtREGIS',
                                    fieldLabel: 'User Created',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtFREGI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtHREGI',
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
                                    id: prototype.id01 + '-txtREVIS',
                                    fieldLabel: 'User Modified',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtFREVI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtHREVI',
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