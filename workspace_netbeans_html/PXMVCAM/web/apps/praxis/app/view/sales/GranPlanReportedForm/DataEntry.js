Ext.define('Ext.Praxis.view.sales.GranPlanReportedForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryGranPlanReportedForm',
    requires:[
        'Ext.Praxis.controller.sales.GranPlanReported.DataEntryGranPlanReportedController'
    ],
    controller: 'DataEntryGranPlanReportedController',
    title:'Maintenance Package GP',
    header:true,
    height:420,
    width:470,
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
            id: prototype.id+'-formEntry',
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
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Search Ticket',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA720CIA',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            value: '139',
                                            maxLength: 3,
                                            readOnly: true,
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA720FORMA',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 4,
                                            width: 60
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA720SERIE',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 6,
                                            width: 80
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA720SEQ',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            hidden: true,
                                            value: '00',
                                            maxLength: 2,
                                            width: 30
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-BtnSearchTktGP',
                                            style: 'font-weight:bold;background:#02507A;vertical-align:middle;',
                                            html: '<strong style="background:#02507A;color:white;vertical-align:middle;">Search</strong>',
                                            border: true,
                                            scale: 'small',
                                            margin: '2 0 2 0',
                                            width: 80,
                                            listeners:{
                                                click: 'onSearchTktGpClick'
                                            }
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
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTicketNumberCiaNew',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTicketNumberNew',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 110
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTicketNumberCia',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            hidden: true,
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTicketNumber',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            hidden: true,
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
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789IATA_NEW',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            width: 60,
                                            enableKeyEvents: true,
                                            listeners: {
                                                blur: 'onValidaCodIATABlur'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789IATANEW_00',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 200
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789IATA',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            hidden: true,
                                            maxLength: 8,
                                            width: 60
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789IATA_00',
                                            fieldStyle: 'text-align:left',
                                            hidden: true,
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
                                            text: ' PNR:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA720PNR',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 12,
                                            readOnly: true,
                                            width: 108
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 5">
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
                                            text: ' Curr:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1530MDA',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            readOnly: true,
                                            width: 79
                                        },
                                        { xtype: 'tbspacer', width: 20 },
                                        {
                                            xtype: 'label',
                                            text: ' Type Form:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA720TFORMA',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 5,
                                            readOnly: true,
                                            width: 79
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 6">
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
                                            text: ' Date Issue:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA720FECVTA',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            readOnly: true,
                                            width: 108
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 7">
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
                                            text: 'Nbr Pax:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789NPAX',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 5,
                                            width: 130
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 8">
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
                                            text: 'Status Reservation:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789SRES',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            width: 240
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 9">
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
                                            text: 'NPGS:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789NGPS',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 130
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 10">
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
                                            text: ' Base Comm:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789STOTA',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9,.]/,
                                            value: '0.00',
                                            maxLength: 15,
                                            width: 108
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 11">
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
                                            width: 140
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789TOTAL_New',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /[0-9,.]/,
                                            value: '0.00',
                                            width: 108
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1789TOTAL',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            value: '0.00',
                                            hidden: true,
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