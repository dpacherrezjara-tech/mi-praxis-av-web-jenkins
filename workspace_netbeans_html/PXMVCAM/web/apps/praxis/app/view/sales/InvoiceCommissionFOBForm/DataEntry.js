/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.InvoiceCommissionFOBForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.InvoiceCommissionFOB.DataEntryInvoiceCommissionFOBController'
    ],
    title: 'Invoice Commission FOB',
    header: true,
    width: 600,
    height: 550,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 720,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,                            
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,                                    
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">IATA Code:</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757IATA',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 80,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                focusleave: 'get_ValidaCodeIATA',
                                                keypress: function(obj , e ){
                                                    if ( e.getKey() === e.ENTER ){
                                                        Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003KEY3',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 320,
                                            labelWidth: 0,                                            
                                            padding: '2px 5px 2px 3px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,                                    
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Invoice Number:</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757NFACT',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 250,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 40,                                            
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function(obj , e ){
                                                    if ( e.getKey() === e.ENTER ){
                                                        Ext.getCmp(prototype.id+'-de-txtA1757FFACT').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 50,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Seq.:</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757SEQ',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 40,
                                            labelWidth: 0,
                                            value: '00',                                            
                                            padding: '2px 5px 2px 3px'                                            
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,                                    
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Invoice Date:</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'datefield',
                                            format: 'Y/m/d',
                                            id: prototype.id + '-de-txtA1757FFACT',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 10,
                                            width: 100,
                                            listeners: {
                                                keypress: function(obj , e ){
                                                    if ( e.getKey() === e.ENTER ){
                                                        Ext.getCmp(prototype.id+'-de-txtA1757LOTE').focus();
                                                    }
                                                }
                                            }                                            
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,                                    
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Batch Number:</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1757LOTE',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 150,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 20,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function(obj , e ){
                                                    if ( e.getKey() === e.ENTER ){
                                                        Ext.getCmp(prototype.id+'-txtA1757INDAP').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Currency:</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 38,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757MONED',                                            
                                            disabled: false,
                                            readOnly: true,
                                            width: 100,
                                            labelWidth: 0,                                                                                        
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 3                                                                                        
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,                                    
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Invoice Application:</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 38,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757INDAP',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 100,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 1,
                                            maskRe: /[cCsS]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                focusleave: 'setEnabledMontoCash',
                                                keypress: function(obj , e ){
                                                    if ( e.getKey() === e.ENTER ){
                                                        Ext.getCmp(prototype.id+'-txtA1757COMM').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 300,
                                            border:true,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;font-size:11px">C = Compensation S = Balance Credit</strong>'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,                                    
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 92,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  "></strong>'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 119,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  "> Invoice</strong>'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 119,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Pre Invoice</strong>'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 119,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Invoice Sumn.</strong>'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 119,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Difference</strong>'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'right',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Commission:</strong>'
                                        },
                                        {                                            
                                            xtype: 'textfield',                                            
                                            id: prototype.id + '-txtA1757COMM',                                            
                                            width: 99,
                                            labelWidth: 0,                                            
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',                                                                                        
                                            enableKeyEvents: true,                                            
                                            padding: '2px 5px 2px 3px',                                            
                                            //maskRe: /0-9./                                            
                                            maskRe:/[1234567890\.]/,
                                            listeners: {                                            
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'set_Calculatedifference',                                                
                                                keypress: function(obj , e ){
                                                    if ( e.getKey() === e.ENTER ){
                                                        Ext.getCmp(prototype.id+'-txtA1757IVA').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757COMM_P',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align:right',
                                            padding: '2px 5px 2px 3px',
                                            margin: '0 0 0 8' 
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757COMM_IN',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',
                                            margin: '0 0 0 8'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757COMM_D',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',
                                            margin: '0 0 0 8'                                            
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'right',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">IVA:</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757IVA',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 99,
                                            labelWidth: 0,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,                                            
                                            padding: '2px 5px 2px 3px',
                                            maskRe:/[1234567890\.]/,
                                            listeners: {                                                
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'getTotalPref',  
                                                keypress: function(obj , e ){
                                                    if ( e.getKey() === e.ENTER ){
                                                        Ext.getCmp(prototype.id+'-txtA1757STATU').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757IVA_P',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            fieldStyle: 'text-align:right',
                                            padding: '2px 5px 2px 3px',
                                            margin: '0 0 0 8'                                            
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757IVA_IN',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',                                            
                                            margin: '0 0 0 8'                                            
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757IVA_D',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',
                                            margin: '0 0 0 8'                                            
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'right',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Comm + IVA:</strong>'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757COMIV',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            labelWidth: 0,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            padding: '2px 5px 2px 3px'                                            
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757COMIV_P',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,                                            
                                            fieldStyle: 'text-align:right',
                                            padding: '2px 5px 2px 3px',
                                            margin: '0 0 0 8'                                          
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757COMIV_IN',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',
                                            margin: '0 0 0 8'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757COMIV_D',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,                                           
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',
                                            margin: '0 0 0 8'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'right',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Cash:</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757TCASH',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            labelWidth: 0,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',                                            
                                            padding: '2px 5px 2px 3px',
                                            enableKeyEvents: true,                                                                                        
                                            maskRe:/[1234567890,\.]/,
                                            listeners: {                                                
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'set_Calculatedifference'                                                
                                            }                                            
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757TCASH_P',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            fieldStyle: 'text-align:right',
                                            padding: '2px 5px 2px 3px',
                                            margin: '0 0 0 8',
                                            maxLength: 13
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757TCASH_IN',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',
                                            margin: '0 0 0 8'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757TCASH_D',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',
                                            margin: '0 0 0 8'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'right',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Cash - Comm:</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757CAMCO',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            labelWidth: 0,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',                                           
                                            padding: '2px 5px 2px 3px'                                            
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757CAMCO_P',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            fieldStyle: 'text-align:right',
                                            padding: '2px 5px 2px 3px',
                                            margin: '0 0 0 8'                                            
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757CAMCO_IN',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,                                            
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',                                            
                                            margin: '0 0 0 8'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757CAMCO_D',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 99,
                                            value: '0.00',
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:right',
                                            margin: '0 0 0 8'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'right',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Status:</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA1757STATU',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 59,
                                            labelWidth: 0,
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 1,
                                            maskRe: /[aAmMdDpPbB]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'right',
                                            width: 400,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;font-size:11px">A=Match M=Manual D=Difference P=Pending B=Balanced </strong>'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-ControlData',
                                    title: 'Control Data',
                                    width: 550,
                                    margin: '10 10 0 10',
                                    defaults: {
                                        border: false
                                    },
                                    border: true,
                                    hidden: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            margin: '5 0 5 0',
                                            defaults: {
                                                labelAlign: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1757REGIS',
                                                    fieldLabel: '<strong style="color:#000;">Created by</strong>',
                                                    labelWidth: 78,
                                                    labelTextAlign: 'right',
                                                    margin: '0 10 0 0',
                                                    readOnly: true,
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1757FREGI',
                                                    fieldLabel: '<strong style="color:#000;">Date</strong>',
                                                    labelWidth: 40,
                                                    labelTextAlign: 'right',
                                                    margin: '0 10 0 0',
                                                    readOnly: true,
                                                    width: 130
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1757HREGI',
                                                    fieldLabel: '<strong style="color:#000;"> Time</strong>',
                                                    labelWidth: 35,
                                                    labelTextAlign: 'right',
                                                    margin: '0 10 0 0',
                                                    readOnly: true,
                                                    width: 100
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
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1757REVIS',
                                                    fieldLabel: '<strong style="color:#000;">Modified by</strong>',
                                                    labelWidth: 78,
                                                    labelTextAlign: 'right',
                                                    readOnly: true,
                                                    margin: '0 10 0 0',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1757FREVI',
                                                    fieldLabel: '<strong style="color:#000;">Date</strong>',
                                                    labelWidth: 40,
                                                    labelTextAlign: 'right',
                                                    readOnly: true,
                                                    margin: '0 10 0 0',
                                                    width: 130
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1757HREVI',
                                                    fieldLabel: '<strong style="color:#000;">Time</strong>',
                                                    labelWidth: 35,
                                                    labelTextAlign: 'right',
                                                    readOnly: true,
                                                    margin: '0 10 0 0',
                                                    width: 100
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }

            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    //hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    text: '',
                    id: prototype.id + '-btnCalculatedifference',
                    hidden:true,
                    listeners: {
                        click: 'set_Calculatedifference'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});