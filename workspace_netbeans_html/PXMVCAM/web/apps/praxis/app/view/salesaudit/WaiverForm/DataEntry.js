/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.salesaudit.Waiver.DataEntryWaiverController'
    ],
    title: "Maintenance Waiver",
    header: true,
    width: 960,
    height: 530,
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
                    width: 960,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            // bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E5ECEF;',
                                    padding: '1',
                                    margin: '1',
                                    //width: 100,    
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Request Date',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-RequestDate',
                                                    fieldStyle: 'text-align:center;color:blue;',
                                                    maskRe: /[0-9]/,
                                                    fieldLabel: '',
                                                    enforceMaxLength: true,
                                                    width: 100,
                                                    labelWidth: 0
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    margin: '0 0 0 5',
                                                    text: 'Rfnd Date',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-RfndDate',
                                                    fieldStyle: 'text-align:center;color:blue;',
                                                    maskRe: /[0-9]/,
                                                    fieldLabel: '',
                                                    enforceMaxLength: true,
                                                    width: 100,
                                                    labelWidth: 0
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Emission Date',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-EmissionDate',
                                                    fieldStyle: 'text-align:center;color:blue;',
                                                    maskRe: /[0-9]/,
                                                    fieldLabel: '',
                                                    enforceMaxLength: true,
                                                    width: 100,
                                                    labelWidth: 0
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Flown Date',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'Y/m/d',
                                                    id: prototype.id + '-de-FlownDate',
                                                    fieldStyle: 'text-align:center;color:blue;',
                                                    maskRe: /[0-9]/,
                                                    fieldLabel: '',
                                                    enforceMaxLength: true,
                                                    width: 100,
                                                    labelWidth: 0
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Country',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-Country',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    maskRe: /[a-zA-Z]/
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Ticket',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCia',
                                                    value: '139',
                                                    fieldLabel: '',
                                                    width: 40,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFrmaSerie',
                                                    fieldLabel: '',
                                                    width: 60,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Tour Code',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-TourCode',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 20
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'PNR',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-Pnr',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 6
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'IATA',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-Iata',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    maskRe: /[a-zA-Z]/
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Name Agency',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-NameAgency',
                                                    fieldLabel: '',
                                                    width: 305,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 50
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Agent',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-Agent',
                                                    fieldLabel: '',
                                                    width: 200,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 50
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Nº Pax',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-NPax',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    maskRe: /[a-zA-Z]/
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Name Pax',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-NamePax',
                                                    fieldLabel: '',
                                                    width: 305,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 50
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Route',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-Route',
                                                    fieldLabel: '',
                                                    width: 200,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 7
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Class',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-Classe',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 1
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Appli. Sale',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-AppliSale',
                                                    editable: false,
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Appli. Rfnd',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-AppliRfnd',
                                                    editable: false,
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Appli. Exch',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-AppliExch',
                                                    editable: false,
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Rate Appli',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-RateAppli',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Cur. Appli',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-CurAppli',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Rate Pay',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-RatePay',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Cur. Pay',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-CurPay',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1',
                                            margin: '1',
                                            //width: 100,    
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Rate Lower',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-RateLower',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Cur. Lower',
                                                    margin: '0 0 0 5',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-CurLower',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: ' Rate Waiver',
                                                    margin: '0 0 0 5',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-CodeWaiver',
                                                    fieldLabel: '',
                                                    width: 100,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '0',
                                            margin: '0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textareafield',
                                                    grow: true,
                                                    anchor: '100%',
                                                    id: prototype.id + '-de-AcctionWaiver',
                                                    required: true,
                                                    readOnly: false,
                                                    fieldLabel: 'Acction Waiver',
                                                    width: 700,
                                                    labelWidth: 80,
                                                    enforceMaxLength: true,
                                                    maxLength: 50,
                                                    labelAlign: 'left',
                                                    padding: '0'

                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '0',
                                            margin: '0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textareafield',
                                                    grow: true,
                                                    anchor: '100%',
                                                    id: prototype.id + '-de-lbldescri',
                                                    required: true,
                                                    readOnly: false,
                                                    fieldLabel: 'Description',
                                                    width: 700,
                                                    labelWidth: 80,
                                                    enforceMaxLength: true,
                                                    maxLength: 100,
                                                    labelAlign: 'left',
                                                    padding: '0'

                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '0',
                                            margin: '0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'color:red;font-size:13px;',
                                                    text: '(*)Required Fields',
                                                    width: 200
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-ControlData',
                                    title: 'Control Data',
                                    //margin: '15 0 8 0',
                                    width: 680,
                                    border: true,
                                    defaults: {
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
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creator User',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtREGIS',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creation Date',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFREGI',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creation Time',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtHREGI',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
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
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: 'User Update',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtREVIS',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Update Date',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFREVI',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Update Time',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtHREVI',
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
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
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});