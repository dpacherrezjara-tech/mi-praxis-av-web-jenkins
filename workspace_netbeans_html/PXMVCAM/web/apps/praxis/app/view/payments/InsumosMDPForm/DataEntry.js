Ext.define('Ext.Praxis.view.payments.InsumosMDPForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInsumosMDPForm',
    requires:[
        'Ext.Praxis.controller.payments.InsumosMDP.DataEntryInsumosMDPController'
    ],
    controller: 'DataEntryInsumosMDPController',
    title:'INSUMOS MDP - Data Entry Form',
    header:true,
    height:400,
    width:1074,
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
                    width:1090,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {   
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Insumo Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                    width: 200,
                                    height: 30
                                },
                                { xtype: 'tbspacer', width: 786 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Aplic. Group',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 15,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtAPLIC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maskRe: /[0-9a-zA-Z]/,
                                    maxLength:10,
                                    readOnly: false,
                                    width: 60
                                },
                                { xtype: 'tbspacer', width: 192 },
                                {
                                    xtype: 'label',
                                    text: 'Inp. Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 15,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                { xtype: 'tbspacer', width: 22 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtINPNAME',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 30,
//                                   maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 236 },
                                {
                                    xtype: 'label',
                                    text: 'Tabla',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                { xtype: 'tbspacer', width: 72 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTABLA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maskRe: /[0-9a-zA-Z]/,
                                    maxLength:10,
                                    readOnly: false,
                                    width: 60
                                },
                                
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Net. Direc.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtNETDIR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 50,
//                                    maskRe: /[0-9a-zA-Z]/,
                                    readOnly: false,
                                    width: 200
                                },
                                { xtype: 'tbspacer', width: 52 },
                                {
                                    xtype: 'label',
                                    text: 'Input Desc.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                { xtype: 'tbspacer', width: 37},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtINPDESC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maskRe: /[0-9a-zA-Z]/,
                                    maxLength:50,
                                    readOnly: false,
                                    width: 280
                                },
                                 { xtype: 'tbspacer', width: 57 },
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 40
                                },
                                { xtype: 'tbspacer', width: 51 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSTAT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 60
                                }
                                ,                  
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Ext. Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                { xtype: 'tbspacer', width: 25 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtINPEXTE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 4,
//                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 60
                                }
                                ,
                                
                                { xtype: 'tbspacer', width: 193 },
                                {
                                    xtype: 'label',
                                    text: 'Out. Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                { xtype: 'tbspacer', width: 37 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtOUTNAME',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maskRe: /[0-9a-zA-Z]/,
                                    maxLength:10,
                                    readOnly: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 237 },
                                {
                                    xtype: 'label',
                                    text: 'Fase',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtFASE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength:1,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 60
                                }
                                ,  
                                
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Input Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                { xtype: 'tbspacer', width: 25 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtINPTYPE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 1,
                                   // maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 60
                                },
                                
                                { xtype: 'tbspacer', width: 193 },
                                {
                                    xtype: 'label',
                                    text: 'Data Last.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                { xtype: 'tbspacer', width: 37 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtFECPROC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 100
                                },
                                
                                { xtype: 'tbspacer', width: 237 },
                                {
                                    xtype: 'label',
                                    text: 'Days Env.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtDENV',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maskRe: /[0-9a-zA-Z]/,
                                    maxLength:7,
                                    readOnly: false,
                                    width: 60
                                },
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Qty Recor.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                { xtype: 'tbspacer', width: 25 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtQTYREG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 50,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 60
                                },
                                { xtype: 'tbspacer', width: 193 },
                                {
                                    xtype: 'label',
                                    text: 'Library',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60
                                },
                                { xtype: 'tbspacer', width: 57 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtLIBNAME',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 10,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 100
                                }
                                ,
                                { xtype: 'tbspacer', width: 237 },
                                {
                                    xtype: 'label',
                                    text: 'Seq. Num',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60
                                },
                                { xtype: 'tbspacer', width: 30 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSEQNUM',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 60
                                }
                                ,
                                     
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },
                        
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                { xtype: 'tbspacer', heigth: 105 },
                {
                    xtype: 'label',
                    text: 'Control Data',
                    height: 100,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                    width: 234,
                    margin: '4 10 4 35'
                },
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 10 180',
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
                            margin: '5 0 10 180',
                            
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