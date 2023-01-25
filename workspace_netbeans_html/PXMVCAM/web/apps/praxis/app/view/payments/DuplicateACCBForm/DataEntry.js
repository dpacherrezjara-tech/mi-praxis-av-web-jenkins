Ext.define('Ext.Praxis.view.payments.DuplicateACCBForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDuplicateACCBForm',
    requires:[
        'Ext.Praxis.controller.payments.DuplicateACCB.DataEntryDuplicateACCBController'
    ],
    controller: 'DataEntryDuplicateACCBController',
    title:'Duplicate ACCB - Data Entry Form',
    header:true,
    height:620,
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
                textDecoration: 'underline',
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
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '20 2 4 50',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'ID Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140
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
                                    id:prototype.id+'-de-txtNAID',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    enabled: false,
                                    maxLength: 10,
                                    maskRe: /[a-zA-Z]/,
                                    width: 140,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: 'Status ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-de-cmbSTVAL',
                                    fieldStyle: 'text-align:left;',
                                    width: 150,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 50',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 140,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },                         
                        {
                            xtype: 'label',
                            text: 'Settlement Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 2 50'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 4 50',
                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Settlement Date: ',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                    
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 140,
                                    maxLength: 8,
                                    enforceMaxLength: true,
                                },
                                { xtype: 'tbspacer', width: 560 }
                            ]
                        },                      
                        {
                            xtype: 'label',
                            text: 'Liquidation Information',
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
                            margin: '2 2 2 50',
                            bodyStyle: 'background:#E5ECEF;',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Bank Payment Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140,
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
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtBDATEP',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    editable: false,
                                    readOnly: true,
                                    width: 140,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: 'Merchant Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140
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
                                    id:prototype.id+'-de-txtMERCHN',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 280,
                                    editable: false,
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                },   
                                { xtype: 'tbspacer', width: 250 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '2 2 2 50',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Payment Currency: ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtAMOUNTN',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:right;',
                                    maxLength: '15',
                                    width: 140
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSCURRENCY',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    maxLength: '3',
                                    enforceMaxLength: true,
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 45 },
                                {
                                    xtype: 'label',
                                    text: 'Bank',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130
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
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-de-cmbCODEBANK',
                                    fieldStyle: 'text-align:center;',
                                    width: 280,
                                    editable: false,
                                    valueField: 'CODEBANK',
                                    displayField: 'CODEBANK',
                                },
                                { xtype: 'tbspacer', width: 50 }
                            ]
                        },                    
                        {
                            xtype: 'label',
                            text: 'Payment Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            margin: '8 2 4 50'
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 2 50',
//                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Local Amount',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160,
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtDAMOUNTR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:right;',
                                    width: 140,
                                    maxLength: 15 ,
                                    enforceMaxLength: true,
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCURRENCYR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140,
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtDESCRI',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 280,
                                    maxLength: 100,
                                    enforceMaxLength: true,
                                },
                                { xtype: 'tbspacer', width: 5 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 0 50',
//                            bodyStyle: 'background:#E5ECEF;',
                            items: [
                                { xtype: 'tbspacer', width: 400 },
                                {
                                    xtype: 'label',
                                    text: ' Merchant Nbr.',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 150,
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtMERCHNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 280,
                                    maxLength: 20,
                                    enforceMaxLength: true
                                },
                                { xtype: 'tbspacer', width: 5 }                        
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Sales Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            margin: '0 2 2 50'
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 2 50',
                            bodyStyle: 'background:#E5ECEF;',
                              items: [    
                               {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '2 2 2 5',
                                defaults: {
                                    labelAlign: 'left'
                                },
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Amount ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtAMOUNTS',
                                            width: 140,
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            fieldStyle: 'text-align:right;'
                                            
                                        },
                                        { xtype: 'tbspacer', width: 80 },
                                        {
                                            xtype: 'label',
                                            text: 'Qty Trx.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60,
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtQTYTRAS',
                                            width: 100,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            fieldStyle: 'text-align:right;'
                                        },
                                        { xtype: 'tbspacer', width: 80 },
                                        {
                                            xtype: 'label',
                                            text: 'Qty Doc.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtQTYDOCS',
                                            width: 100,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            fieldStyle: 'text-align:right;'
                                        },
                                        { xtype: 'tbspacer', width: 150 }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Refund Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            margin: '0 1 4 50'
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 2 50',
                            bodyStyle: 'background:#E5ECEF;',
                            
                              items: [    
                               {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '2 2 2 5',
                                defaults: {
                                    labelAlign: 'left'
                                },
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Amount ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120,
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtAMOUNTR',
                                            width: 140,
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            fieldStyle: 'text-align:right;'
                                        },
                                        { xtype: 'tbspacer', width: 80 },
                                        {
                                            xtype: 'label',
                                            text: 'Qty Trx.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtQTYTRAR',
                                            width: 100,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            fieldStyle: 'text-align:right;'
                                        },
                                        { xtype: 'tbspacer', width: 80 },
                                        {
                                            xtype: 'label',
                                            text: 'Qty Doc.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtQTYDOCR',
                                            width: 100,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            fieldStyle: 'text-align:right;'
                                        },
                                        { xtype: 'tbspacer', width: 150 }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Match Information with Sales/ACCB',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            margin: '10 1 4 50'
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 2 50',
//                            bodyStyle: 'background:#E5ECEF;',
                            
                              items: [    
                               {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '4 2 10 5',
                                defaults: {
                                    labelAlign: 'left'
                                },
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Match Date ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120,
                                            height: 20
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtDATEC',
                                            readOnly: true,
                                            width: 140,
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            editable: false,
                                            maxLength: 8,
                                            
                                        },
                                        { xtype: 'tbspacer', width: 60 },
                                        {
                                            xtype: 'label',
                                            text: 'Status.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 50
                                        },
                                        {
                                            xtype: 'combo',
                                            id:prototype.id+'-de-cmbSTATUSC',
                                            fieldStyle: 'text-align:left;',
                                            width: 300,
                                            editable: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true
                                        },
                                        { xtype: 'tbspacer', width: 200 }
                                    ]
                                },
                            ]
                        },
                
                    ]
                },
                
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Information',
                    textDecoration: 'underline',
                    height: 70,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '4 2 50 50'
                     
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