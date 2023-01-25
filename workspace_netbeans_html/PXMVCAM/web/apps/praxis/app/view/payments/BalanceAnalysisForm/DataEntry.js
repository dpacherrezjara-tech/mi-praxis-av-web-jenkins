Ext.define('Ext.Praxis.view.payments.BalanceAnalysis.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBalanceAnalysis',
    requires:[
        'Ext.Praxis.controller.payments.BalanceAnalysis.BalanceAnalysisController'
    ],
    controller: 'BalanceAnalysisController',
    title:'Balance Analysis - Data Entry Form',
    header:true,
    height:600,
    width:930,
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
                            text: 'Credit Card Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 50'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 50',
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
                                    width: 180
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
                                    id:prototype.id+'-de-txtCODE',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 60,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: 'Name: ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtNAMEC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    maxChars: '40',
                                    width: 290
                                }
                            ]
                        }
                        ,
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 50',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Equivalent Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 200
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCODEQUIV',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 60,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                               
                        { xtype: 'tbspacer', width: 80, height: 10 }
                        ,
                        {
                            xtype: 'label',
                            text: 'Bank Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 50'
                        },   
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 50',
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
                                    width: 180
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
                                    width: 60,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: 'Name: ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtNAMEBANK',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    maxChars: '40',
                                    width: 290
                                },
                                { xtype: 'tbspacer', width: 10 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 50',
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
                                    width: 180,
                                    height: 35
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
                                    id:prototype.id+'-de-txtCOUNTRY',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    width: 60,
                                    readOnly: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
//                                    emptyText: 'All',
//                                    valueField: 'A006PAIS',
//                                    displayField: 'A006PAIS'
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
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
                                    id:prototype.id+'-de-txtCURRENC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 60,
                                    readOnly: false,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                     listeners:{
                                        change: 'onUpperValue'
                                    }
                                },   
                                { xtype: 'tbspacer', width: 250 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 50',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 170,
                                    height: 35
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbFSTAT',
                                    fieldStyle: 'text-align:center;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 90,
                                    editable: false                                
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            ["O", "Open"],
//                                            ["C", "Closed"]
//                                        ]
//                                    })
                                }
                                ,
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: 'Flag Not Bank',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100,
                                    height: 35
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbFNOBANK',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 290,
                                    editable: false                                }
                            ]
                        },
                        { xtype: 'tbspacer', width: 6 },
                        {
                            xtype: 'label',
                            text: 'Financial Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 25,
                            margin: '4 2 4 50'
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 50',
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
                                    width: 200,
                                    height: 35
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRATECON',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 80,
                                    maskRe: /[1-9]/,
                                    maxLength: 5                                  
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: ' Rate IVA',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 285,
                                    height: 35
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRATEIVA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 94,
                                    maskRe: /[1-9]/,
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
                            margin: '4 2 4 50',
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
                                    fieldStyle: 'text-align:center;',
                                    width: 80,
                                    maskRe: /[1-9]/,
                                    maxLength: 5
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: ' Commission Rate Promocional 2',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 285,
                                    height: 35
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRATECOP2',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 94,
                                    maskRe: /[1-9]/,
                                    maxLength: 5
                                },
                                { xtype: 'tbspacer', width: 5 }                        
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Accounting Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 25,
                            margin: '4 2 4 50'
                                
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 50',
//                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Cliente: ',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 200
                                    
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCLIENTE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 350,
                                    maxChars: 8
                                },
                                { xtype: 'tbspacer', width: 5, height: 20 }
                            ]
                        }   
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    textDecoration: 'underline',
                    height: 80,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '4 10 50 50'
                     
                },
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 50',
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
                            margin: '5 0 10 50',
                            
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