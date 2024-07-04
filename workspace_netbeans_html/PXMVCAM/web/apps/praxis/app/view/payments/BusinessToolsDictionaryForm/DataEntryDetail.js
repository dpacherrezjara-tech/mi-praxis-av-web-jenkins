Ext.define('Ext.Praxis.view.payments.BusinessToolsDictionaryForm.DataEntryDetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBusinessToolsDictionaryDetailForm',
    requires: [
        'Ext.Praxis.controller.payments.BusinessToolsDictionary.DataEntryBusinessToolsDictionaryDetailController'
    ],
    controller: 'DataEntryBusinessToolsDictionaryDetailController',
    title: 'Business Tools Dictionary - Detail ',
    header: true,
    height: 280,
    width: 979,
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
                    width: 979,
                    margin: '0 0 0 0',
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
                                    width: 979
                                },
                                items: [
                                    
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'label',
                                        text: 'Table Name',
                                        style: 'font-weight:bold;',
                                        width: 90
                                    },
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20,
                                        autoEl: {
                                            tag: 'label',
                                            'data-qtip': 'Mandatory Field'
                                        }
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtTABNAME_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 16,
                                        maskRe: /[0-9]/,
                                        readOnly: false,
                                        width: 130,
                                        border: true
                                    },
                                    {xtype: 'tbspacer', width: 60},                                 
                                    {
                                        xtype: 'label',
                                        text: 'Librery',
                                        style: 'font-weight:bold;',
                                        width: 90
                                    },
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20,
                                        autoEl: {
                                            tag: 'label',
                                            'data-qtip': 'Mandatory Field'
                                        }
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtSOURCEF_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 16,
                                        maskRe: /[0-9]/,
                                        readOnly: false,
                                        width: 130,
                                        border: true
                                    },
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Userfield',
                                        style: 'font-weight:bold;',
                                        width: 90
                                    },
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20,
                                        autoEl: {
                                            tag: 'label',
                                            'data-qtip': 'Mandatory Field'
                                        }
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtUSERFIELD_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 16,
                                        maskRe: /[0-9]/,
                                        readOnly: false,
                                        width: 130,
                                        border: true
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
                                        text: 'Systfield',
                                        style: 'font-weight:bold;',
                                        width: 95
                                    },
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20,
                                        autoEl: {
                                            tag: 'label',
                                            'data-qtip': 'Mandatory Field'
                                        }
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtSYSTFIELD_D',
                                        fieldStyle: 'text-align:center; border-color: red;',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 16,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130,
                                    },
                                    
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Description',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtDESCRIPT_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: true,
                                        enabled: false,
                                        maxLength: 60,
                                        maskRe: /[a-zA-Z0-9]*$/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Leng',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtLENGHTF_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 30,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    }
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
                                id: prototype.id + '-iSection_3_D',
                                items: [
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'label',
                                        text: 'Data Type',
                                        style: 'font-weight:bold;',
                                        width: 105
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtDATATYPE_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 3,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Order',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtORDERSEL_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 8,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    }                                  
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
                                items: []
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
                    id: prototype.id + '-btn-save_D',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick_D'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update_D',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick_D'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete_D',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick_D'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel_D',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick_D'
                    }
                }
            ]
        }
    ]
}
);