Ext.define('Ext.Praxis.view.sales.CommissionBSPASRForm.DataEntrySend',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySendCommissionBSPASRForm',
    requires:[
        'Ext.Praxis.controller.sales.CommissionBSPASR.DataEntrySendCommissionBSPASRController'
    ],
    controller: 'DataEntrySendCommissionBSPASRController',
    title:'Send Email',
    header:true,
    height:435,
    width:550,
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
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%'
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
                                    text: 'GSA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtA1775GSA2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    readOnly: true,
                                    width: 81
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtA1839RSOC',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 355
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 5 },
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
                                    text: 'Lote:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtA1775LOTE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    maskRe: /[0-9-]/,
                                    readOnly: true,
                                    width: 138
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 71
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtA1775PAIS2',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
                                    width: 49
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'label',
                                    text: 'Period Report:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 105
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtA1775FINI',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
                                    width: 55
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 5 },
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
                                    text: 'To:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtA1839EMAIL',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 140,
                                    maskRe: /[0-9,:]/,
                                    readOnly: true,
                                    width: 439
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 5 },
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
                                    text: 'Cc:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtEmailCcp',
                                    enforceMaxLength: true,
                                    maxLength: 140,
                                    maskRe: /[0-9,:]/,
                                    readOnly: true,
                                    width: 439,
                                    fieldStyle: 'background:white;color:black;text-align:left;'
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 5 },
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
                                    text: 'Subject:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtAsunto',
                                    enforceMaxLength: true,
                                    maxLength: 140,
                                    maskRe: /[0-9,:]/,
                                    readOnly: true,
                                    width: 439,
                                    fieldStyle: 'background:white;color:black;text-align:left;'
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 5 },
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
                                    xtype: 'textarea',
                                    id: prototype.id+'-txtMensaje',
                                    value: 'Dear General Agent Sales:\n\nHereby attachments are sent in PDF and TXT format with the detail of the commissions authorized by the period reference.\n\nYou are requested to send the invoice as soon as possible to pay their commissions.\n\n We appreciate your attention.\n\nRevenue Accounting - Group Aeromexico\n',
                                    readOnly: true,
                                    fieldStyle: 'background:white;color:black;',
                                    height: 168,
                                    width: 518
                                }
                            ]
                        }
                        // </editor-fold>
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
                    text: 'Send',
                    id:prototype.id+'-btn-send',
                    icon: 'resources/img/botones/24x24/Forward.png',
                    listeners:{
                        click: 'onSendClick'
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