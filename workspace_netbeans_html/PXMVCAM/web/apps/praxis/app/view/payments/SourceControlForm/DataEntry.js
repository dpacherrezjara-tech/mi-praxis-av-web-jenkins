Ext.define('Ext.Praxis.view.payments.SourceControlForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySourceControlForm',
    requires:[
        'Ext.Praxis.controller.payments.SourceControl.DataEntrySourceControlController'
    ],
    controller: 'DataEntrySourceControlController',
    title:'Source Code - Data Entry Form',
    header:true,
    height:300,
    width:750,
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
                    width:930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 2 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                {
                                    xtype: 'label',
                                    text: 'Credit Card Information ',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                    width: 400,
                                    margin: '5 0 10 5'
                                },
                                { xtype: 'tbspacer', width: 280 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Correct quantity',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130,
                                    margin: '5 0 5 0'
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCODEN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength : 12,
                                    editable: true,
                                    enabled: false,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCCUST',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 100,
                                    hidden: true
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtNOMFILE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength : 12,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 100,
                                    hidden: true
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtFPROC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength : 12,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 100,
                                    hidden: true
                                }
                                ,
                                { xtype: 'tbspacer', width: 428 }
                            ]
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 20 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Comment: ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130,
                                    margin: '5 0 5 0'
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCODEQUIV',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: '80',
//                                    maskRe: /[a-zA-Z]/,
                                    width: 500
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSTAT',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength : 12,
                                    width: 500,
                                    maskRe: /[a-zA-Z]/,
                                    hidden: true
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTOTDIA',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength : 12,
                                    width: 500,
                                    maskRe: /[a-zA-Z]/,
                                    hidden: true
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTOTFIN',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength : 12,
                                    width: 500,
                                    maskRe: /[a-zA-Z]/,
                                    hidden: true
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTOTREG',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength : 12,
                                    width: 500,
                                    maskRe: /[a-zA-Z]/,
                                    hidden: true
                                }
                                ,
                                { xtype: 'tbspacer', width: 28 }
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                { xtype: 'tbspacer', heigth: 105 },
                {
                    xtype: 'label',
                    text: 'Control Data',
                    height: 150,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                    width: 234,
                    margin: '50 10 100 20'
                },
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 10 20',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
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
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                            border:false,
                            layout: 'hbox',
                            margin: '5 0 10 20',
                            
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
  }
);