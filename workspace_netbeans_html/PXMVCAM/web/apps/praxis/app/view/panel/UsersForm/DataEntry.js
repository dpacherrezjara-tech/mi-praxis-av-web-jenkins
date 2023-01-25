Ext.define('Ext.Praxis.view.panel.UsersForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryUsersForm',

    controller: 'DataEntryUsersController',

    requires:[
        'Ext.Praxis.controller.panel.Users.DataEntryUsersController'
    ],

    title:'Users Mant- Data Entry Form',
    header:true,
    height:340,
    width:815,
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
            id: prototype.id + '-formDataEntry',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'User: ',
                            style: 'font-weight:bold;color:#000;',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtUSR',
                            text: '',
                            maxLength: 10,
                            enforceMaxLength: true,
                            //style: 'font-weight:bold;color:red;',
                            width: 120,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            },
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkStatus',
                            boxLabelAlign: 'after',
                            width: 80,
                            boxLabel: '<b>Status</b>',
                            readOnly: false
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox' 
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Description: ',
                            style: 'font-weight:bold;color:#000;',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtDESC',                            
                            text: '',
                            maxLength: 30,
                            enforceMaxLength: true,
                            //style: 'font-weight:bold;color:red;',
                            width: 320,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            },
                            listeners:{
                                change: 'onUpperValue'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox' 
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'City: ',
                            style: 'font-weight:bold;color:#000;',
                            width: 80
                        },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cboCity',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "- SELECT -"],
                                    ["MEX", "MEXICO DF"],
                                    ["LIM", "LIMA"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 100,
                            listConfig: {height: 111}
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox' 
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkExpiredDate',
                            width: 20,
                            readOnly: false
                        },
                        {
                            xtype: 'label',
                            text: 'Expiration Date: ',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtExpDate',
                            format: 'Y/m/d',
                            maskRe: /[0-9/]/,
                            fieldStyle: 'text-align:center;',
                            editable: false,
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 90/*,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            }*/
                        },
                        { xtype: 'tbspacer', width: 20 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkPass',
                            width: 20,
                            readOnly: false
                        },
                        {
                            xtype: 'label',
                            text: 'Enter Password: ',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPass',                            
                            text: '',
                            maxLength: 10,
                            enforceMaxLength: true,
                            //style: 'font-weight:bold;color:red;',
                            width: 220,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            },
                            listeners:{
                                change: 'onUpperValue'
                            }
                        }
                    ]
                },
                
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
                    width: 760,
                    border: true,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 60 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FECR',
                                    readOnly: true,
                                    width: 150,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 60 },
                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 60 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FEUP',
                                    readOnly: true,
                                    width: 150,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 60 },
                                
                            ]
                        }
                    ]
                }
                // </editor-fold>
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
                    id:prototype.id+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
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
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                }

            ]
        }
    ]

});