Ext.define('Ext.Praxis.view.interline.InterlineCorrespondenceForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInterlineCorrespondenceForm',
    requires:[
        'Ext.Praxis.controller.interline.InterlineCorrespondence.DataEntryInterlineCorrespondenceController'
    ],
    controller: 'DataEntryInterlineCorrespondenceController',
    title:'Interline Correspondence',
    header:true,
    height:370,
    width:658,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    id: prototype.id + '-box1',
                    width: '100%',
                    layout: 'vbox',
                    hidden: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                        anchor: '100%',
                        border: false
                    },
                    items: [
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblEstado',
                            text: '',
                            style: 'font-weight:bold;text-align:left;text-decoration:underline;',
                            width: 229
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Pre Memo',
                                    style: 'text-align:left;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA020KEY',
                                    fieldStyle: 'text-align:left;background:#E6E6EF;',
                                    readOnly: true,
                                    width: 90
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Observación 1',
                                    style: 'text-align:left;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCod1',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtObs1',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 450
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Observación 2',
                                    style: 'text-align:left;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCod2',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtObs2',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 450
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Observación 3',
                                    style: 'text-align:left;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCod3',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtObs3',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 450
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Observación 4',
                                    style: 'text-align:left;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCod4',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtObs4',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 450
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Observación 5',
                                    style: 'text-align:left;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCod5',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtObs5',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 450
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 160},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtObs6',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 450
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
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Save',
                    id:prototype.id+'-btnSave',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btnUpdate',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btnDelete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});