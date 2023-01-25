Ext.define('Ext.Praxis.view.sales.CommissionBSPASRForm.DataEntryAcuse',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAcuseCommissionBSPASRForm',
    requires:[
        'Ext.Praxis.controller.sales.CommissionBSPASR.DataEntryAcuseCommissionBSPASRController'
    ],
    controller: 'DataEntryAcuseCommissionBSPASRController',
    title:'Acuse Received',
    header:true,
    height:205,
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
                                margin: '1 0 1 0',
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
                                    id:prototype.id+'-txtA1775GSA3',
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
                                    id:prototype.id+'-txtA1839RSOC2',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 355
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 2 },
                        // <editor-fold defaultstate="collapsed" desc="Fila 2">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '1 0 1 0',
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
                                    id:prototype.id+'-txtA1775LOTE2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    maskRe: /[0-9-]/,
                                    readOnly: true,
                                    width: 151
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
                                    id:prototype.id+'-txtA1775PAIS3',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    readOnly: true,
                                    width: 82,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 2 },
                        // <editor-fold defaultstate="collapsed" desc="Fila 3">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '1 0 1 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Date:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'datefield',
                                    id:prototype.id+'-txtA1775FACUS',
                                    fieldStyle: 'text-align:left',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                    minValue: new Date(2000, 00, 01),
                                    maskRe: /[0-9/]/,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 111,
                                    listeners:{
                                        change: 'onDateChange'
                                    }
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'label',
                                    text: 'Time:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtA1775HACUS',
                                    fieldStyle: 'text-align:left',
                                    maskRe: /[0-9,:]/,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 64,
                                    listeners:{
                                        change: 'onTimeChange'
                                    }
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'label',
                                    text: ' hh:mm:ss',
                                    style: 'font-weight:bold;'
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
                { xtype: 'tbspacer', width: 10 },
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