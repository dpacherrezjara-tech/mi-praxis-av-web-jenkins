Ext.define('Ext.Praxis.view.payments.AccountingTransactAmexForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAccountingTransactAmexForm',
    requires:[
        'Ext.Praxis.controller.payments.AccountingTransactAmex.DataEntryAccountingTransactAmexController'
    ],
    controller: 'DataEntryAccountingTransactAmexController',
    title:'Bank - Data Entry Form',
    header:true,
    height:365,
    width:820,
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
                            xtype: 'label',
                            text: 'Bank Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 3'
                        },   
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 2 1 10',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60
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
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCODEBANK',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 50,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
//                                 
                                    xtype: 'label',
                                    text: 'Numeric Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 95
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbCODEBANKN',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 130,
                                    labelWidth: 10,
                                    hidden: false,
                                    hiddenLabel: false 
                                },
                                { xtype: 'tbspacer', width: 45 },
                                {
                                    xtype: 'label',
                                    text: 'Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 45
                                },
                                { xtype: 'tbspacer', width: 2 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtNAMEBANK',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 40,
                                    width: 263,
                                    labelWidth: 20
                                },
                                { xtype: 'tbspacer', width: 12 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 2 1 10',
                            bodyStyle: 'background:#E5ECEF;',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60
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
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-de-cmbCOUNTRY',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    width: 65,
                                    editable: true,
                                    readOnly: false,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    emptyText: 'All',
                                    valueField: 'A006PAIS',
                                    displayField: 'A006PAIS'
                                },
                                { xtype: 'tbspacer', width: 35 },
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 65
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
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCURRENC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 70,
                                    readOnly: false,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                     listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    xtype: 'label',
                                    text: 'Document Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 2 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtDOCNUM',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    maskRe: /[0-9]/,
                                    width: 80
                                },  
                                { xtype: 'tbspacer', width: 40 },
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbFSTAT',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 11 }
                            ]
                        },
                        { xtype: 'tbspacer', width: 6 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '20 2 2 8',
//                            bodyStyle: 'background:#E5ECEF;',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Input Status',
                                    fontSize: 11,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 200
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbFINSUMO',
                                    fieldStyle: 'text-align:left;',
                                    width: 90,
                                    editable: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    xtype: 'label',
                                    text: 'Cliente ',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                    
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCLIENTE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 245,
                                    enforceMaxLength: true,
                                    maxLength: 8
                                },
                                { xtype: 'tbspacer', width: 35 }
                            ]
                        },
                        { xtype: 'tbspacer', width: 6 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 2 8',
//                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Commission Rate Normal',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 200
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRATECON',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:right;',
                                    width: 90,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    maxLength: 5                                  
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    xtype: 'label',
                                    text: ' Rate IVA',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60                                },
                                { xtype: 'tbspacer', width: 160 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRATEIVA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:right;',
                                    width: 119,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    maxLength: 5
                                },
                                { xtype: 'tbspacer', width: 5 }
                            ]
                        },
                        { xtype: 'tbspacer', width: 6 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 0 8',
//                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Commission Rate Promocional 1',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 200,
                                    height: 35
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRATECOP1',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:right;',
                                    width: 90,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    maxLength: 5
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    xtype: 'label',
                                    text: ' Commission Rate Promocional 2',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 200,
                                    height: 35
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRATECOP2',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:right;',
                                    width: 119,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    maxLength: 5
                                },
                                { xtype: 'tbspacer', width: 5 }
                            ]
                        }
                        
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '0 2 4 8'
                     
                },
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 30',
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
                            margin: '8 2 4 30',
                            
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