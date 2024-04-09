Ext.define('Ext.Praxis.view.payments.RobotConfigForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryRobotConfigForm',
    requires: [
        'Ext.Praxis.controller.payments.RobotConfig.DataEntryRobotConfigController'
    ],
    controller: 'DataEntryRobotConfigController',
    title: 'Robot Config - Data Entry Form',
    header: true,
    height: 350,
    width: 1179,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background:#E5ECEF;',
                    layout: 'vbox',
                    width: 1129,
                    margin: '0 0 0 20',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'label',
                                        text: 'Code',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtCODES',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: true,
                                        enabled: true,
                                        maxLength: 8,
                                        maskRe: /[0-9]/,
                                        readOnly: false,
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 60},
                                    
                                    {
                                        xtype: 'label',
                                        text: 'Name',
                                        style: 'font-weight:bold;',
                                        width: 60
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtNAME',
                                        fieldStyle: 'text-align:left',
                                        enforceMaxLength: true,
                                        editable: true,
                                        enabled: true,
                                        maxLength: 60,
                                        readOnly: false,
                                        width: 640,
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'label',
                                        text: 'Description',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtDECRIPT',
                                        fieldStyle: 'text-align:left',
                                        enforceMaxLength: true,
                                        editable: true,
                                        enabled: true,
                                        maxLength: 150,
                                        readOnly: false,
                                        width: 850
                                    },
                                    
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'label',
                                        text: 'Status',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-cmbSTVAL',
                                        fieldStyle: 'text-align:left;',
                                        valueField: 'code',
                                        displayField: 'name',
                                        width: 90
                                    },
                                ]
                            },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'panel',
                    
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center' 
                    },
//                                bodyStyle: 'background:#E5ECEF;',
//                                bodyStyle: 'background:#efe5e5',
                    margin: '10 0 0 0',
                    defaults: {
                        anchor: '100%',
                        width: 1080
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
//                                        bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            margin: '0 0 0 7',
                            width: 234
                        }
//                        { xtype: 'tbspacer', width: 470}
                    ]
                },
                // </editor-fold>

                {
                    items: [
                        {
                            xtype: 'panel',
//                            layout: 'hbox',
                            layout: {
                                type: 'hbox',
                                pack: 'center' 
                            },
                            border: false,
                            margin: '30 0 4 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
//                            layout: 'hbox',
                            layout: {
                                type: 'hbox',
                                pack: 'center' 
                            },
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
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
}
);