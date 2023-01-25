Ext.define('Ext.Praxis.view.panel.PerProForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryPerProForm',

    controller: 'DataEntryPerProController',

    requires:[
        'Ext.Praxis.controller.panel.PerPro.DataEntryPerProController'
    ],

    title:'Permits / Programs Management - Data Entry Form',
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
                            text: 'User',
                            style: 'font-weight:bold;color:#000;',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-USR',
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
                            width: 70,
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
                            text: 'Program',
                            style: 'font-weight:bold;color:#000;',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-NPROG',                            
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
                            xtype: 'textfield',
                            id: prototype.id + '-PROG',
                            readOnly: true,
                            text: '',
                            //style: 'font-weight:bold;color:red;',
                            width: 300,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            },
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
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
                            text: 'Permissions',
                            style: 'font-weight:bold;color:#000;',
                            width: 70
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkAccess',
                            boxLabelAlign: 'after',
                            width: 70,
                            boxLabel: '<b>Access</b>',
                            readOnly: false
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkInsert',
                            boxLabelAlign: 'after',
                            width: 70,
                            boxLabel: '<b>Insert</b>',
                            readOnly: false
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkRead',
                            boxLabelAlign: 'after',
                            width: 70,
                            boxLabel: '<b>Read</b>',
                            readOnly: false
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkUpdate',
                            boxLabelAlign: 'after',
                            width: 70,
                            boxLabel: '<b>Update</b>',
                            readOnly: false
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkExport',
                            boxLabelAlign: 'after',
                            width: 70,
                            boxLabel: '<b>Export</b>',
                            readOnly: false
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkDelete',
                            boxLabelAlign: 'after',
                            width: 70,
                            boxLabel: '<b>Delete</b>',
                            readOnly: false
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