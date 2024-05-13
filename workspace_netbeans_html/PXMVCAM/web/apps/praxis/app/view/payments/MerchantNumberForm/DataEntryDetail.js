Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.DataEntryDetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMerchantNumberDetailForm',
    requires: [
        'Ext.Praxis.controller.payments.MerchantNumber.DataEntryMerchantNumberDetailController'
    ],
    controller: 'DataEntryMerchantNumberDetailController',
    title: 'Merchant Number - Data Entry Detail Form',
    header: true,
    height: 800,
    width: 1179,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background:#E5ECEF;',
                    layout: 'vbox',
                    width: 1129,
                    margin: '0 0 0 20',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Merchant Nbr.',
                                        style: 'font-weight:bold;',
                                        width: 110
                                    },
//                                    {
//                                        xtype: 'label',
//                                        text: '(*)',
//                                        style: 'font-weight:bold;color:red;',
//                                        width: 20,
//                                        autoEl: {
//                                            tag: 'label',
//                                            'data-qtip': 'Mandatory Field'
//                                        }
//                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtMERCHN_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    
                                    {
                                        xtype: 'label',
                                        text: 'Branch Affiliate',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtAFBRANCH_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130,
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Mode Down. Report',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtDOWNREPORT_D',
                                        fieldStyle: 'text-align:left',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
//                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 160
                                    },
                                    
                                    
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Code AP',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtAPCODE_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 45,
                                        valueField: 'VALUE',
                                        displayField: 'NAME',
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Acquirer/Processor',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtACQPROC_D',
                                        fieldStyle: 'text-align:left',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
//                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 1',
                                        style: 'font-weight:bold;',
                                        width: 110
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtFRANCH1_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        valueField: 'CODE',
                                        displayField: 'NAME',
                                        maxLength: 45,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130,
                                    },
                                    
                                    
                                    
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 2',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtFRANCH2_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        valueField: 'CODE',
                                        displayField: 'NAME',
                                        maxLength: 45,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 3',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtFRANCH3_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        valueField: 'CODE',
                                        displayField: 'NAME',
                                        maxLength: 45,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 4',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtFRANCH4_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        valueField: 'CODE',
                                        displayField: 'NAME',
                                        maxLength: 45,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    },
                                    
                                    
                                    
                                ]
                            },
                             {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-bankSection_D',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        text: 'BANK SECTION',
                                        style: 'font-weight:bold; text-decoration:underline',
                                        width: 115
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-bSection_1_D',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Bank Code',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-CODEBANK_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Bank Name',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-BANKNAM_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 30,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Bank Company',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-BANKCM_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-bSection_2_D',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Deposit Curr.',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-BANKCUR_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Acc. Number',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-ACCNUMB_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Aux Bank Acc',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-ACCNUMA_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                id: prototype.id + '-bSection_3',
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Prof. Cent. Bank',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-BENCEN_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-iataSection_D',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        text: 'IATA SECTION',
                                        style: 'font-weight:bold; text-decoration:underline',
                                        width: 115
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-iSection_1_D',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Debt. SAP',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-DEUSAP_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'IATA',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SAGENT_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Channel',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-CANAL_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-iSection_2_D',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Process',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-PROCES_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Country',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SCOUNTRY_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Sales Comp.',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SOCIETY_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                id: prototype.id + '-iSection_3_D',
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Currency',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SCURRENCY_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Prof. Cent.',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SBENCEN_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Cost. Cent.',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-COSTCEN_D',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: []
                            }
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
//                            margin: '4 2 4 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Merchant Nbr.',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 130
//                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:red;',
//                                    width: 20,
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 5},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtMERCHN',
//                                    fieldStyle: 'text-align:left',
//                                    enforceMaxLength: true,
//                                    editable: true,
//                                    enabled: false,
//                                    maxLength: 15,
//                                    maskRe: /[0-9]/,
//                                    readOnly: false,
//                                    width: 290
//                                },
//                                {xtype: 'tbspacer', width: 40},
//                                {
//                                    xtype: 'label',
//                                    text: 'Canal: ',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 5},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-de-cmbCANAL',
//                                    queryMode: 'local',
//                                    width: 110,
//                                    fieldStyle: 'color:#074066;',
//                                    forceSelection: true,
//                                    selectOnFocus: false,
//                                    caseSensitive: false,
//                                    hidden: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    disabled: false,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all',
//                                    listeners: {
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                ,
//                                {xtype: 'tbspacer', width: 105}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                            bodyStyle: 'background:#E5ECEF;',
//                            margin: '4 2 4 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Merchant Name',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 150
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtDESCR',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    fieldStyle: 'text-align:left;',
//                                    maxChars: '40',
//                                    width: 520
//                                },
//                                {xtype: 'tbspacer', width: 50}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            margin: '4 2 4 20',
////                            bodyStyle: 'background:#E5ECEF;',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Social Reason',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 150
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtRSOCIAL',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    fieldStyle: 'text-align:left;',
//                                    maxChars: '40',
//                                    width: 520
//                                },
//                                {xtype: 'tbspacer', width: 50}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            margin: '4 2 4 20',
//                            // bodyStyle: 'background:#E5ECEF;',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Merchant Payment',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 130
//                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:red;',
//                                    width: 20,
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 5},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtMERCHP',
//                                    fieldStyle: 'text-align:left',
//                                    enforceMaxLength: true,
//                                    editable: true,
//                                    enabled: false,
//                                    maxLength: 15,
//                                    maskRe: /[0-9]/,
//                                    readOnly: false,
//                                    width: 290
//                                },
//                                
//                                {xtype: 'tbspacer', width: 50}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            margin: '4 2 4 20',
////                            bodyStyle: 'background:#E5ECEF;',
//
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Country',
//                                    fontSize: 15,
//                                    textAlign: 'center',
//                                    paddingLeft: 3,
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 150
//                                },
//                                {xtype: 'tbspacer', width: 4},
////                                {
////                                    xtype: 'combo',
////                                    id: prototype.id + '-de-cmbSCOUNTRY',
////                                    style: 'font-weight:bold;color:#0B333C;',
////                                    enforceMaxLength: true,
////                                    fieldStyle: 'text-align:left;',
////                                    width: 150,
////                                    maskRe: /[a-zA-Z]/,
////                                    maxLength: 2
////                                },
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-de-cmbSCOUNTRY',
//                                    queryMode: 'local',
//                                    width: 130,
//                                    fieldStyle: 'color:#074066;',
//                                    forceSelection: true,
//                                    selectOnFocus: false,
//                                    caseSensitive: false,
//                                    hidden: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    disabled: false,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all'
//                                },
//                                {xtype: 'tbspacer', width: 30},
//                                {
//                                    xtype: 'label',
//                                    text: 'Name',
//                                    fontSize: 15,
//                                    textAlign: 'center',
//                                    paddingLeft: 3,
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtNameCTRY',
//                                    style: 'font-weight:bold;color:#0B333C;',
////                                    enforceMaxLength: true,
//                                    fieldStyle: 'text-align:left;',
//                                    readOnly: true,
//                                    width: 286,
//                                    maskRe: /[a-zA-Z]/
////                                    maxLength: 5
//                                },
//                                {xtype: 'tbspacer', width: 5}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            margin: '4 2 4 20',
////                            bodyStyle: 'background:#E5ECEF;',
//
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Operational Unit',
//                                    fontSize: 15,
//                                    textAlign: 'center',
//                                    paddingLeft: 3,
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 150
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-de-cmbUNIOPE',
//                                    queryMode: 'local',
//                                    width: 130,
//                                    fieldStyle: 'color:#074066;',
//                                    queryMode: 'local',
//                                    forceSelection: true,
//                                    selectOnFocus: false,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    disabled: false,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all'
//                                },
//                                {xtype: 'tbspacer', width: 30},
//                                {
//                                    xtype: 'label',
//                                    text: 'Status',
//                                    fontSize: 15,
//                                    textAlign: 'center',
//                                    paddingLeft: 3,
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-de-cmbSTATUS',
//                                    queryMode: 'local',
//                                    width: 150,
//                                    fieldStyle: 'color:#074066;',
//                                    queryMode: 'local',
//                                    forceSelection: true,
//                                    selectOnFocus: false,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    disabled: false,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all'
//                                },
//                                {xtype: 'tbspacer', width: 50},
//                                {xtype: 'tbspacer', width: 136},
//                                {xtype: 'tbspacer', width: 5}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: "Add IATA's",
//                                    style: 'font-weight:bold; color:#121E31; text-decoration: underline;',
//                                    width: 90,
//                                    margin: '2 2 0 20',
//                                }
//                            ]
//                        },
//                        {xtype: 'panel',
//                            layout: 'vbox',
//                            border: false,
//                            width: 620,
//                            margin: '2 2 0 20',
//                            height: 200,
//                            defaults: {
//                                anchor: '100%',
//                                width: 580,
//                                align: 'center'
//                            },
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    defaults: {
//                                        anchor: '100%',
//                                        width: 580,
//                                        align: 'center'
//                                    },
//                                    items: [
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'label',
//                                            text: 'IATA',
//                                            style: 'font-weight:bold;color:#121E31;',
//                                            width: 50,
//                                            padding: '3 0'
//                                        },
//                                        {
//                                            xtype: 'label',
//                                            labelAlign: 'center',
//                                            padding: '1px 1px 1px 1px',
//                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
//                                            width: 30,
//                                            autoEl: {
//                                                tag: 'label',
//                                                'data-qtip': 'Required field'
//                                            }
//                                        }
//                                    ]
//                                },
//                                //*****
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    bodyStyle: 'background: transparent;',
//                                    defaults: {
//                                        anchor: '100%',
//                                        width: 550,
//                                        align: 'center'
//                                    },
//                                    items: [
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-txtIATA',
//                                            enforceMaxLength: true,
////                                            enforceMinLength: true,
////                                            minLength: 5,
//                                            maxLength: 8,
//                                            maskRe: /[0-9/]/,
//                                            padding: '3 0',
//                                            fieldStyle: 'text-align:center',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 3},
//                                        {
//                                            xtype: 'button',
//                                            width: 25,
//                                            margin: '4 1 1 1',
//                                            iconCls: 'prx-icon-add',
//                                            tooltip: 'Add',
//                                            listeners: {
//                                                click: 'addIATA'
//                                            }
//
//                                        },
//                                        {xtype: 'tbspacer', width: 3},
//                                        {
//                                            xtype: 'button',
//                                            width: 25,
//                                            margin: '4 1 1 1',
//                                            iconCls: 'prx-icon-clear',
//                                            tooltip: 'clear',
//                                            listeners: {
//                                                click: 'clearIATA'
//                                            }
//                                        }
//                                    ]
//                                },
//                                //grilla------
//                                {
//                                    xtype: 'panel',
//                                    margin: '5 5 0 10',
//                                    padding: '0 0 0 0',
//                                    width: 620,
//                                    height: 135,
//                                    autoScroll: true,
//                                    align: 'center',
//                                    border: false,
//                                    //title: '<b style="font-size:13px;color:white">RAPID Information</b>',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center',
//                                    },
//                                    items: [
//                                        {xtype: 'tbspacer', width: 60},
//                                        {
//                                            xtype: 'grid',
//                                            id: prototype.id + '-gridIATA',
//                                            width: 500,
//                                            height: 130,
//                                            columnLines: true,
//                                            padding: '1',
//                                            margin: '1',
//                                            defaults: {
//                                                sortable: true,
//                                                align: 'center'
//                                            },
//                                            columns: [
//                                                {
//                                                    header: 'IATA',
//                                                    id: prototype.id + '-colIATA',
//                                                    dataIndex: 'CIATA',
//                                                    xtype: 'gridcolumn',
//                                                    align: 'center',
//                                                    width: 80
//                                                },
//                                                {
//                                                    header: 'Name',
//                                                    id: prototype.id + '-colIataName',
//                                                    dataIndex: 'strDESCRIP',
//                                                    xtype: 'gridcolumn',
//                                                    align: 'center',
//                                                    width: 200
//                                                },
//                                                {
//                                                    header: 'Country',
//                                                    id: prototype.id + '-colCountry',
//                                                    dataIndex: 'SCOUNTRY',
//                                                    xtype: 'gridcolumn',
//                                                    align: 'center',
//                                                    width: 80
//                                                },
//                                                {
//                                                    header: 'Chanel',
//                                                    id: prototype.id + '-colCanal',
//                                                    dataIndex: 'CANAL',
//                                                    xtype: 'gridcolumn',
//                                                    align: 'center',
//                                                    width: 80
//                                                },
//                                                {
//                                                    header: '',
//                                                    dataIndex: '',
//                                                    xtype: 'widgetcolumn',
//                                                    align: 'center',
//                                                    width: 40,
//                                                    widget: {
//                                                        xtype: 'button',
//                                                        iconCls: 'prx-icon-delete',
//                                                        tooltip: 'remove',
//                                                        listeners: {
//                                                            click: function (button, e, eOpts) {
//                                                                var record = button.getWidgetRecord();
//                                                                meDE.removeIATA(record);
//                                                            }
//                                                        }
//                                                    }
//
//                                                }
//                                            ]
//                                        }
//                                    ]
//                                }
//                            ]
//                        },
                        // <editor-fold defaultstate="collapsed" desc="Commission Policy Information">
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                                bodyStyle: 'background:#E5ECEF;',
////                                bodyStyle: 'background:#efe5e5',
//                            margin: '2 2 0 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {
//                                    xtype: 'label',
//                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Commission Policy Information</strong>',
////                                        bodyStyle: 'background:#E5ECEF;',
//                                    fontSize: '11',
//                                    margin: '0 0 0 7',
//                                    width: 234,
//                                    height: 20
//                                },
//                                {xtype: 'tbspacer', width: 470}
//                            ]
//                        },
//                        // </editor-fold>
//                        // <editor-fold defaultstate="collapsed" desc="Client Code 1">
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                                bodyStyle: 'background:#E5ECEF;',
//                            bodyStyle: 'background:#efe5e5',
//                            margin: '4 2 4 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Client Code 1',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 120,
//                                    padding: '3 0'
//                                },
//                                {xtype: 'tbspacer', width: 35},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtCODCLIT1',
//                                    fieldStyle: 'text-align:left',
//                                    //                                    margin: '0 0 0 3',
//                                    enforceMaxLength: true,
//                                    maxLength: 5,
////                                        readOnly: true,
//                                    width: 70
//                                },
//                                {xtype: 'tbspacer', width: 110},
//                                {
//                                    xtype: 'label',
//                                    text: 'Client Address 1',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 100,
//                                    padding: '3 0'
//                                },
//                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtDIRCLIT1',
//                                    fieldStyle: 'text-align:left',
//                                    margin: '0 0 0 3',
//                                    enforceMaxLength: true,
//                                    maxLength: 8,
////                                        readOnly: true,
//                                    width: 218
//                                },
//                                {xtype: 'tbspacer', width: 30}
//                            ]
//                        },
//                        // </editor-fold>
//                        // <editor-fold defaultstate="collapsed" desc="Chargeback Policy Information">
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                                bodyStyle: 'background:#E5ECEF;',
////                                bodyStyle: 'background:#efe5e5',
//                            margin: '2 2 0 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {
//                                    xtype: 'label',
//                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Chargeback Policy Information</strong>',
////                                        bodyStyle: 'background:#E5ECEF;',
//                                    fontSize: '11',
//                                    margin: '0 0 0 7',
//                                    width: 234,
//                                    height: 20
//                                },
//                                {xtype: 'tbspacer', width: 665}
//                            ]
//                        },
//                        // </editor-fold>
//                        // <editor-fold defaultstate="collapsed" desc="Client Code 1">
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                                bodyStyle: 'background:#E5ECEF;',
//                            bodyStyle: 'background:#efe5e5',
//                            margin: '4 2 4 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Client Code 2',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 120,
//                                    padding: '3 0'
//                                },
//                                {xtype: 'tbspacer', width: 35},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtCODCLIT2',
//                                    fieldStyle: 'text-align:left',
//                                    //                                    margin: '0 0 0 3',
//                                    enforceMaxLength: true,
//                                    maxLength: 5,
////                                        readOnly: true,
//                                    width: 70
//                                },
//                                {xtype: 'tbspacer', width: 110},
//                                {
//                                    xtype: 'label',
//                                    text: 'Client Address 2',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 100,
//                                    padding: '3 0'
//                                },
//                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtDIRCLIT2',
//                                    fieldStyle: 'text-align:left',
//                                    margin: '0 0 0 3',
//                                    enforceMaxLength: true,
//                                    maxLength: 8,
////                                        readOnly: true,
//                                    width: 218
//                                },
//                                {xtype: 'tbspacer', width: 30}
//                            ]
//                        }
                        // </editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'panel',
                    
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center' 
                    },
//                                bodyStyle: 'background:#E5ECEF;',
//                                bodyStyle: 'background:#efe5e5',
                    margin: '10 0 0 0',
                    defaults: {
                        anchor: '100%',
                        width: 1080
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
//                                        bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            margin: '0 0 0 7',
                            width: 234
                        }
//                        { xtype: 'tbspacer', width: 470}
                    ]
                },
                // </editor-fold>

                {
                    items: [
                        {
                            xtype: 'panel',
//                            layout: 'hbox',
                            layout: {
                                type: 'hbox',
                                pack: 'center' 
                            },
                            border: false,
                            margin: '30 0 4 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR_D',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR_D',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR_D',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
//                            layout: 'hbox',
                            layout: {
                                type: 'hbox',
                                pack: 'center' 
                            },
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP_D',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP_D',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP_D',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
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
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save_D',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick_D'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update_D',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick_D'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete_D',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick_D'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel_D',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick_D'
                    }
                }
            ]
        }
    ]
}
);