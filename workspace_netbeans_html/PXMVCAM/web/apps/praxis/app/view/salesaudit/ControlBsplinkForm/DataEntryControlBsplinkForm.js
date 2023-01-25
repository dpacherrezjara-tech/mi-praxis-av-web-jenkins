/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.ControlBsplinkForm.DataEntryControlBsplinkForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryControlBsplinkForm',

    controller: 'DataEntryControlBsplinkFormController',

    requires: [
        'Ext.Praxis.controller.salesaudit.ControlBsplinkForm.DataEntryControlBsplinkFormController',
    ],
    id: prototype.id01 + '-win',

    title: 'Maintenance User / Password BSPLINK',
    header: true,
    height: 430,
    width: 550,
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
                style: 'margin: 5px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCountry',
                            fieldLabel: 'Country',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            labelWidth: 70,
                            hidden: true,
                            //readOnly: true,
                            width: 120,
                            listeners: {
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtUSER',
                            fieldLabel: 'User',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            labelWidth: 50,
                            //readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtPassword',
                            fieldLabel: 'Password',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            labelWidth: 80,
                            width: 200,
                           /* listeners: {
                                change: 'onUpperValue'
                            }*/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCORRL',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtFLAG',
                            hidden: true
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
                            items: [
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
                    iconCls: 'prx-icon-delete',hidden:true,
                    listeners: {
                        click: 'onSaveClick'
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