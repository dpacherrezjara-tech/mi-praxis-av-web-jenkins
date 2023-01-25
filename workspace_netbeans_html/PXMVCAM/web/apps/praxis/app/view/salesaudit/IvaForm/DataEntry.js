Ext.define('Ext.Praxis.view.salesaudit.IvaForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryIvaForm',
    requires:[
        'Ext.Praxis.controller.salesaudit.Iva.DataEntryIvaController'
    ],
    controller: 'DataEntryIvaController',
    title:"Maintenance ADM'S IVA",
    header:true,
    height:360,
    width:620,
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
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            padding: '2 0',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Cod.Country:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtPais',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    width: 30,
                                    listeners:{
                                        change: 'onUpperValue',
                                       specialkey: 'onSearchkeybusca'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtseq',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    hidden: true,
                                    maskRe: /[a-zA-Z]/,
                                    width: 30,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            padding: '2 0',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Country Name:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCountryName',
                                    fieldStyle: 'text-align:center;',
                                    width: 100,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            padding: '2 0',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Type Iva: ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTypeIva',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ['V', "SALE"], ['C', "COMMISSION"], ['A', "ADMINISTRATIVE CHARGES"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 175,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue('V');
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            padding: '2 0',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Cod.Iva :',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 152
                                },
                                { xtype: 'tbspacer', width: 2 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtcodiva',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function(obj , e , eOpts){
                                            if ( e.getKey() === e.ENTER ){
                                                Ext.getCmp(prototype.id + '-txtPais').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            padding: '2 0',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: '% :',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 123
                                },
                                { xtype: 'tbspacer', width: 1 },
                                {
                                    xtype: 'label',
                                    text: '*',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtporcomi',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    maskRe: /[0-9.]/,
                                    width: 70,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function(obj , e , eOpts){
                                            if ( e.getKey() === e.ENTER ){
                                                Ext.getCmp(prototype.id + '-txtPais').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            padding: '2 0',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: '(*) Required Fields',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 150
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 4},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            padding: '2 0',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: '* You need to enter a percentage.Format xx.xx  ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 450
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 4}
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
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
                    hidden: true,
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
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