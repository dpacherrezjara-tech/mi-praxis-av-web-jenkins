Ext.define('Ext.Praxis.view.payments.ClarificationDashboardForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryClarificationDashboardForm',
    requires:[
        'Ext.Praxis.controller.payments.ClarificationDashboard.DataEntryClarificationDashboardController'
    ],
    controller: 'DataEntryClarificationDashboardController',
    title:'Payment Reconciliation - Data Entry Form',
    header:true,
    height:650,
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
                            margin: '20 2 4 10',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Ticket Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'CCIA(3)+FORMA(4)+SERIE(6)+CUPON (1)'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTicket',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    maxLength: 14,
                                    width: 140,
                                    
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Sequence',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 75,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtSEQ',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    maxLength: 1,
                                    width: 40
                                },
                                { xtype: 'tbspacer', width: 40 },
                                {
                                    xtype: 'label',
                                    text: 'Document Type',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id+'-de-cmbTDOC',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            [null, "&nbsp;"],
//                                            ["S", "Sales"],
//                                            ["R", "Refund"]
//                                        ]
//                                    }),
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 90,
                                    disabled: true,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 10',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 110,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id+'-de-cmbSCARCOD',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            [null, "&nbsp;"],
//                                            ["S", "Sales"],
//                                            ["R", "Refund"]
//                                        ]
//                                    }),
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 300,
                                    disabled: true,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'CODE', displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                { xtype: 'tbspacer', width: 40 },
                                {
                                    xtype: 'label',
                                    text: 'Card Number',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    padding: '3 0',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtCard1',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    maskRe: /[0-9, */]/,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'label',
                                    text: '*****(*)',
                                    padding: '3 0',
                                    width: 50,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                                    }
                                },
                                { xtype: 'tbspacer', width: 8},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtCard2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    maskRe: /[0-9, */]/,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 60
                                },
                            ]
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 10',
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
                                    width: 130
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 130
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    xtype: 'label',
                                    text: 'Agent Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSAGENT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 140
                                }
                            ]
                        },   
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 10',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 130,
                                    padding: '3 0'
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id+'-de-cmbSCOUNTRY',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            [null, "&nbsp;"],
//                                            ["S", "Sales"],
//                                            ["R", "Refund"]
//                                        ]
//                                    }),
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 300,
                                    disabled: true,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'PAIS', displayField: 'NOMBRE',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                { xtype: 'tbspacer', width: 100 },
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 70,
                                    padding: '3 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id+'-de-cmbSTVAL',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            [null, "&nbsp;"],
//                                            ["S", "Sales"],
//                                            ["R", "Refund"]
//                                        ]
//                                    }),
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 210,
                                    disabled: true,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 10',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Local Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 130,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtSVFOP',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtSCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 40
                                },
                                { xtype: 'tbspacer', width: 190},
                                {
                                    xtype: 'label',
                                    text: 'Authorization Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120,
                                    padding: '3 0'
                                },
                                { xtype: 'tbspacer', width: 13 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtSAUTHOC',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    padding: '3 0',
                                    width: 212
                                },
                                
                                
                            ]
                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Boomer Information</strong>',
//                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '2 2 2 10'
                        },  
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '2 2 2 10',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 130,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id+'-de-cmbBCARCOD',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            [null, "&nbsp;"],
//                                            ["S", "Sales"],
//                                            ["R", "Refund"]
//                                        ]
//                                    }),
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 300,
                                    disabled: true,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'CODE', displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                { xtype: 'tbspacer', width: 48 },
                                {
                                    xtype: 'label',
                                    text: 'Card Number',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 84,
                                    padding: '3 0'
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtCardB1',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    maskRe: /[0-9, */]/,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'label',
                                    text: '*****(*)',
                                    padding: '3 0',
                                    width: 50,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                                    }
                                },
                                { xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtCardB2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    maskRe: /[0-9, */]/,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 60
                                },
                                { xtype: 'tbspacer', width: 70},
                            ]
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 4 10',
                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Local Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 127,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtDAMOUNT',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtBCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 40
                                },
                                { xtype: 'tbspacer', width: 183 },
                                {
                                    xtype: 'label',
                                    text: 'Process Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtBDATEP',
                                    fieldStyle: 'text-align:left',
                                    margin: '0 0 0 3',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 187},
                            ]
                        },                      
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Reconciliation Information</strong>',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 10'
                        },                         
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 2 10',
//                            bodyStyle: 'background:#E5ECEF;',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Payment Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130,
                                },                               
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtDATEP',
                                    fieldStyle: 'text-align:left;',
                                    editable: false,
                                    readOnly: true,
                                    width: 163,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true
                                },
                                { xtype: 'tbspacer', width: 190 },
                                {
                                    xtype: 'label',
                                    text: 'Bank',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 50,
                                    padding: '3 0'
                                },
                                { xtype: 'tbspacer', width: 50 },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id+'-de-cmbCODEBANK',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            [null, "&nbsp;"],
//                                            ["S", "Sales"],
//                                            ["R", "Refund"]
//                                        ]
//                                    }),
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 270,
                                    disabled: true,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'CODEBANK', displayField: 'NAMEBANK',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },  
                                { xtype: 'tbspacer', width: 250 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '2 2 2 10',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Local Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 110,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtDAMOUNTR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtCURRENCYR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 45
                                },
                                { xtype: 'tbspacer', width: 190 },
                                {
                                    xtype: 'label',
                                    text: 'Merchant',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 80
                                },
                                { xtype: 'tbspacer', width: 18 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtMERCHNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 160,
                                    editable: false,
                                    readOnly: true,
                                    padding: '3 0',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9, */]/,
                                    maxLength: 10,
                                }, 
                            ]
                        },                    
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 10',
//                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '3 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtDESCRI',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 615,
                                    readOnly: true,
                                },
                                { xtype: 'tbspacer', width: 5 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 10',
//                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Error',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtCERROR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    readOnly: true,
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-de-txtDESERROR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 150,
                                    readOnly: true,
                                    width: 540,
                                    margin: '0 0 0 3'
                                },
                                { xtype: 'tbspacer', width: 5 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 2 10',
                            bodyStyle: 'background:#E5ECEF;',
                              items: [    
                               {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                padding: '3 0',
                                defaults: {
                                    labelAlign: 'left'
                                },
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#121E31; text-decoration: underline; ">Sales Conciliation Information</strong>',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 200,
                                            
                                        },
                                        
                                        { xtype: 'tbspacer', width: 20 },
                                        {
                                            xtype: 'combobox',
                                            id: prototype.id+'-de-cmbSTATUSC',
        //                                    store: new Ext.data.SimpleStore({
        //                                        fields: ['code', 'name'],
        //                                        data: [
        //                                            [null, "&nbsp;"],
        //                                            ["S", "Sales"],
        //                                            ["R", "Refund"]
        //                                        ]
        //                                    }),
                                            fieldStyle: 'color:#074066;',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            selectOnFocus: false,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: false,
                                            width: 100,
                                            disabled: true,
                                            value: null,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        { xtype: 'tbspacer', width: 30 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-de-txtDATEC',
                                            width: 110,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            fieldStyle: 'text-align:right;',
                                            readOnly: true,
                                        },
                                        { xtype: 'tbspacer', width: 410 }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 4 10',
                            bodyStyle: 'background:#E5ECEF;',
                              items: [    
                               {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                padding: '3 0',
                                defaults: {
                                    labelAlign: 'left'
                                },
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#121E31; text-decoration: underline; ">Update Information</strong>',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 200
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Comment',
                                            style: 'font-weight:bold;color:#121E31;',
                                            width: 90,
                                            padding: '4 0',
                                            margin: '0 0 0 7',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Comment'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 20
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-de-txtComment',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 47,
                                            margin: '0 0 0 3',
                                            maskRe: /[0-9a-zA-Z]/,
                                            width: 500
                                        },
                                        { xtype: 'tbspacer', width: 20 }
                                    ]
                                },
                            ]
                        },
                    ]
                },
                
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    html: '<strong style="color:#121E31; text-decoration: underline; ">Control Information</strong>',
                    textDecoration: 'underline',
                    height: 70,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '8 2 50 20'
                     
                },
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 4 50',
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