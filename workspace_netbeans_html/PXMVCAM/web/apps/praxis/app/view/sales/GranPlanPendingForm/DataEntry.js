Ext.define('Ext.Praxis.view.sales.GranPlanPendingForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryGranPlanPendingForm',
    requires:[
        'Ext.Praxis.controller.sales.GranPlanPending.DataEntryGranPlanPendingController'
    ],
    controller: 'DataEntryGranPlanPendingController',
    title:'Maintenance Package GP',
    header:true,
    height:210,
    width:720,
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
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            margin: '0 2 4 2',
                            defaults: {
                                anchor: '100%',
                                width: 1360
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 120 },
                                        {
                                            xtype: 'label',
                                            text: 'Before',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 236 },
                                        {
                                            xtype: 'label',
                                            text: 'New Value ',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Ticket Number:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 110
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTicketNumberCia',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            readOnly: true,
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTicketNumber',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            readOnly: true,
                                            width: 110
                                        },
                                        { xtype: 'tbspacer', width: 118 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTicketNumberCiaNew',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTicketNumberNew',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 110
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'IATA:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 110
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789IATA',
                                            fieldStyle: 'text-align:center',
                                            readOnly: true,
                                            width: 60
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789IATA_00',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 200
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789IATA_NEW',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            width: 60,
                                            listeners: {
                                                blur: 'onValidaCodIATABlur'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789IATANEW_00',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 200
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: ' Amount:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 110
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789TOTAL',
                                            fieldStyle: 'text-align:right',
                                            value: '0.00',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            readOnly: true,
                                            width: 108
                                        },
                                        { xtype: 'tbspacer', width: 165 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789TOTAL_New',
                                            fieldStyle: 'text-align:right',
                                            value: '0.00',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /[0-9,.]/,
                                            width: 108
                                        }
                                    ]
                                }
                                // </editor-fold>
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
                }
            ]
        }
    ]
});