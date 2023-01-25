Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryStatementReconciliationsForm',
    requires:[
        'Ext.Praxis.controller.payments.StatementReconciliations.DataEntryStatementReconciliationsController'
    ],
    controller: 'DataEntryStatementReconciliationsController',
    title:'Payment Reconciliation - Data Entry Form',
    header:true,
    height:598,
    width:880,
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
                            margin: '10 2 4 10',
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
                                    width: 138
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
                                    fieldStyle: 'text-align:left',
//                                    enableKeyEvents: false,
//                                    enforceMaxLength: true,
                                    readOnly: true,
                                    enabled: false,
//                                    maxLength: 10,
//                                    maskRe: /[a-zA-Z]/,
                                    width: 140
//                                    listeners:{
//                                        change: 'onUpperValue'
//                                    }
                                },
                                { xtype: 'tbspacer', width: 103 },
                                {
                                    xtype: 'label',
                                    text: 'Status ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 14 },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-de-cmbSTVAL',
                                    fieldStyle: 'text-align:left;',
                                    width: 150,
                                    editable: false,
                                    readOnly: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 4 10',
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
                                { xtype: 'tbspacer', width: 2 },
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
                        // <editor-fold defaultstate="collapsed" desc="Settlement Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#efe5e5',
                                margin: '4 2 0 10',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Settlement Information</strong>',
    //                                    bodyStyle: 'background:#e5efe7',
                                        fontSize: '11',
                                        margin: '0 0 4 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 600 }
                                ]
                            },
                            // </editor-fold>
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 4 10',
                            bodyStyle: 'background:#efe5e5',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Settlement Date: ',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 160
                                    
                                },
                                { xtype: 'tbspacer', width: 2 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    width: 140
                                    
                                },
                                { xtype: 'tbspacer', width: 532 }
                            ]
                        },                      
                        // <editor-fold defaultstate="collapsed" desc="Liquidation Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '4 2 0 10',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Liquidation Information</strong>',
    //                                    bodyStyle: 'background:#e5efe7',
                                        fontSize: '11',
                                        margin: '0 0 4 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 600 }
                                ]
                            },
                            // </editor-fold>                         
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 2 10',
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
                                    width: 140
                                },
                                { xtype: 'tbspacer', width: 1 },
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
                                    maxLength: 8
                                },
                                { xtype: 'tbspacer', width: 104 },
                                {
                                    xtype: 'label',
                                    text: 'Merchant Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 5 },
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
//                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtMERCHN',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 280,
                                    editable: false,
                                    readOnly: true
//                                    enforceMaxLength: true,
//                                    maxLength: 20
                                },   
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 10',
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
                                { xtype: 'tbspacer', width: 55 },
                                {
                                    xtype: 'label',
                                    text: 'Bank',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 105
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
                                    fieldStyle: 'text-align:left;',
                                    width: 280,
                                    editable: false,
                                    readOnly: true,
                                    valueField: 'CODEBANK',
                                    displayField: 'CODEBANK',
                                    emptyText: 'All',
                                },
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },                    
                        {
                            xtype: 'label',
                            text: 'Payment Information',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            margin: '6 2 6 15'
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 2 10',
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
                                    enforceMaxLength: true
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
                                { xtype: 'tbspacer', width: 56 },
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 24 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtDESCRI',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 280,
                                    maxLength: 100,
                                    enforceMaxLength: true
                                },
                                { xtype: 'tbspacer', width: 5 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 0 10',
//                            bodyStyle: 'background:#E5ECEF;',
                            items: [
                                { xtype: 'tbspacer', width: 413 },
                                {
                                    xtype: 'label',
                                    text: ' Merchant Nbr.',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 24 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtMERCHNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 280
//                                    maxLength: 20,
//                                    enforceMaxLength: true
                                },
                                { xtype: 'tbspacer', width: 5 }                        
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="Sales Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#efe5e5',
                                margin: '4 2 0 10',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Sales Information</strong>',
    //                                    bodyStyle: 'background:#e5efe7',
                                        fontSize: '11',
                                        margin: '0 0 4 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 600 }
                                ]
                            },
                            // </editor-fold>
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 4 10',
                            bodyStyle: 'background:#efe5e5',
                              items: [    
                               {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#efe5e5;',
//                                margin: '2 2 2 5',
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
                                        { xtype: 'tbspacer', width: 85 },
                                        {
                                            xtype: 'label',
                                            text: 'Qty Trx.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
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
                                        { xtype: 'tbspacer', width: 89 }
                                    ]
                                }
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="Refund Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#E5ECEF',
                                margin: '4 2 0 10',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Refund Information</strong>',
    //                                    bodyStyle: 'background:#e5efe7',
                                        fontSize: '11',
                                        margin: '0 0 4 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 600 }
                                ]
                            },
                            // </editor-fold>
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 4 10',
                            bodyStyle: 'background:#E5ECEF;',
                            
                              items: [    
                               {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
//                                margin: '2 2 2 5',
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
                                            id:prototype.id+'-de-txtAMOUNTR',
                                            width: 140,
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            fieldStyle: 'text-align:right;'
                                        },
                                        { xtype: 'tbspacer', width: 85 },
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
                                        { xtype: 'tbspacer', width: 89 }
                                    ]
                                }
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="Match Information with Sales/ACCB">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#efe5e5',
                                margin: '4 2 0 10',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Match Information with Sales/ACCB</strong>',
    //                                    bodyStyle: 'background:#e5efe7',
                                        fontSize: '11',
                                        margin: '0 0 4 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 600 }
                                ]
                            },
                            // </editor-fold>
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 6 10',
//                            bodyStyle: 'background:#E5ECEF;',
                              items: [    
                               {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#efe5e5;',
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
                                            height: 30
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtDATEC',
                                            readOnly: true,
                                            width: 140,
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            editable: false,
                                            maxLength: 8
                                            
                                        },
                                        { xtype: 'tbspacer', width: 85 },
                                        {
                                            xtype: 'label',
                                            text: 'Status.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 20 },
                                        {
                                            xtype: 'combo',
                                            id:prototype.id+'-de-cmbSTATUSC',
                                            fieldStyle: 'text-align:left;',
                                            width: 300,
                                            editable: false,
                                            readOnly: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true
                                        },
                                        { xtype: 'tbspacer', width: 129 }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    html: '<strong style="color:#121E31; text-decoration: underline; ">Control Information</strong>',
                    textDecoration: 'underline',
                    height: 70,
//                    fontSize: '5',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '6 2 0 20'
                     
                },
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 2 50',
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
                            margin: '1 0 0 50',
                            
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
            margin: '0 0 0 8',
//            layout:{
//                pack: 'center'
//            },
            fieldStyle: 'text-align:left',
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
                {
                    id:prototype.id+'-btn-imgPrev',
                    icon: 'resources/img/botones/16x16/prev.png',
                    margin: '0 0 0 8',
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                },
                {
                    id:prototype.id+'-btn-imgNext',
                    icon: 'resources/img/botones/16x16/next.png'
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                }
            ]
        }
    ]
  }
);