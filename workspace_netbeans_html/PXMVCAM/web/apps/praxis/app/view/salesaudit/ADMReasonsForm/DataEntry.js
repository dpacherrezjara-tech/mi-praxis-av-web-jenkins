Ext.define('Ext.Praxis.view.salesaudit.ADMReasonsForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryADMReasonsForm',
    requires:[
        'Ext.Praxis.controller.salesaudit.ADMReasons.DataEntryADMReasonsController'
    ],
    controller: 'DataEntryADMReasonsController',
    title:"Maintenance ADM'S REASONS",
    header:true,
    height:560,
    width:630,
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
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%',
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '2 0'
                        
                    },
                    items: [
                        {
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Cod.Reason:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 155
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCodReason',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    width: 45,
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'busca',
                                        keydown:'busca2'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtReason',
                                    fieldStyle: 'text-align:center;',
                                    width: 80,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Family Name:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 155
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFamilyName',
                                    fieldStyle: 'text-align:right;',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 100,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Comment Relation:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 155
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textarea',
                                    id: prototype.id+'-txtCRelation',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 45,
                                    width: 280,
                                    listeners: {
                                        keypress: function(obj , e , eOpts){
                                            if ( e.getKey() === e.ENTER ){
                                                Ext.getCmp(prototype.id + '-txtCEs').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Comment Spanish:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 155
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textarea',
                                    id: prototype.id+'-txtCEs',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 135,
                                    width: 280,
                                    listeners: {
                                        keypress: function(obj , e , eOpts){
                                            if ( e.getKey() === e.ENTER ){
                                                Ext.getCmp(prototype.id + '-txtCEng').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Comment English:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 155
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textarea',
                                    id: prototype.id+'-txtCEng',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 135,
                                    width: 280,
                                    listeners: {
                                        keypress: function(obj , e , eOpts){
                                            if ( e.getKey() === e.ENTER ){
                                                Ext.getCmp(prototype.id + '-txtCPor').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Comment Portuguese:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 155
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textarea',
                                    id: prototype.id+'-txtCPor',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 135,
                                    width: 280,
                                    listeners: {
                                        keypress: function(obj , e , eOpts){
                                            if ( e.getKey() === e.ENTER ){
                                                Ext.getCmp(prototype.id + '-txtCFre').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Comment French:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 155
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textarea',
                                    id: prototype.id+'-txtCFre',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 135,
                                    width: 280,
                                    listeners: {
                                        keypress: function(obj , e , eOpts){
                                            if ( e.getKey() === e.ENTER ){
                                                Ext.getCmp(prototype.id + '-txtCEng').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: '<b style="color:#0B333C;text-decoration:underline;font-size:12px;">Control Data</b>',
                    border: true,
//                    margin: '10 0',
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
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
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0',
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
                    hidden: true,
                    listeners:{
                        click: 'btnInsert_clickHandler'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners:{
                        click: 'btnUpdate_clickHandler'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners:{
                        click: 'btnDelete_clickHandler'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'btnCancel_clickHandler'
                    }
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:#9C1717;',
                    width: 150
                }
            ]
        }
    ]
});