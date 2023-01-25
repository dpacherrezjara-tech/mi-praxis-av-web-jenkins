Ext.define('Ext.Praxis.view.payments.IntalmentSalesForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryIntalmentSalesForm',
    requires: [
        'Ext.Praxis.controller.payments.IntalmentSales.DataEntryIntalmentSalesController'
    ],
    controller: 'DataEntryIntalmentSalesController',
    title: 'MSI Reconciliation - Data Entry Form',
    header: true,
    height: 700,
    width: 970,
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
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'ADM Selected:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: 'ADM',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 30
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-de-txtFADM',
                                    checked: false,
                                    width: 90,
                                    listeners: {
                                        change: 'ShowADM'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '',
                                    id: prototype.id + '-de-lblstrFADM',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '5 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSDATE',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[0-9]/,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Document Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 20
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTDOC',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[0-9]/,
                                    width: 35
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtstrTOPER',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[0-9]/,
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Source Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFTE',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 35
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtstrSCARF',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 70
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '5 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Bank Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                    width: 120
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Bank Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODEBANK',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 35
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Card Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 20
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCARCOD',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'CC Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 20
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCARDN',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
//                                    maskRe: /[a-zA-Z]/,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Authorization Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 20
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAUTHOC',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
//                                    maskRe: /[a-zA-Z]/,
                                    width: 60
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCOUNTRY',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 35
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 104
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSPNR',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Merchat Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 28},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHN',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 80
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Agent',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAGENT',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtstrComment',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 180
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '5 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Accounting Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                    width: 150
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Nbr. Fees',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtINSTLCOUNT',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'label',
                                    text: 'Total Charge',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCURRENPAY',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 35
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTOTALCHRG',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Fee Amount',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFIRSTINSAM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Total Commission',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                    width: 150
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Charge',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTOTALCOM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 22},
                                {
                                    xtype: 'label',
                                    text: 'List',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 88
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTCOMISCA',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    text: 'Differences',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtdiffTCOMIS',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
//                                    maskRe: /[a-zA-Z]/,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Quantity Tkts',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYTKT',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    maskRe: /[a-zA-Z]/,
                                    width: 50
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '5 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Zone',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtstrSORIG',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    editable: false,
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 22},
                                {
                                    xtype: 'label',
                                    text: 'Settlement Crossing',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSDATEL',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    editable: false,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 88
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtstrDescStatus',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    editable: false,
                                    width: 200
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '5 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'ADM Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                    width: 120
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'ADM Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFADM1',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    editable: false,
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'PRE-ADM Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtADMNUM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    editable: false,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'label',
                                    text: 'ADM Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNUMADM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    editable: false,
                                    width: 80
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 920,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Date Create',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDATEADM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    editable: false,
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Value Commission',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCURRADM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    editable: false,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTOTADM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    editable: false,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '10 20 1 20',
                            width: 700,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Control Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                    width: 150
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 120',
                            width: 700,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User of Creation',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtUSCR',
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
                                    id: prototype.id + '-de-txtFECR',
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
                                    id: prototype.id + '-de-txtHOCR',
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
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 120',
                            width: 700,
                            defaults: {
                                anchor: '100%',
                                margin: '5 0 5 0'
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
                                    id: prototype.id + '-de-txtUSUP',
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
                                    id: prototype.id + '-de-txtFEUP',
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
                                    id: prototype.id + '-de-txtHOUP',
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
                // <editor-fold defaultstate="collapsed" desc="ControlData">
//                {
//                    xtype: 'fieldset',
//                    id: prototype.id + '-ControlData',
//                    title: 'Control Data',
//                    border: true,
//                    defaults: {
//                        style: 'margin: 3px;',
//                        border: false
//                    },
//                    items: [
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            margin: '5 0 10 0',
//                            defaults: {
//                                labelAlign: 'center'
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Creator User',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtUSCR',
//                                    readOnly: true,
//                                    width: 80,
//                                    listeners: {
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'label',
//                                    text: 'Creation Date',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtFECR',
//                                    readOnly: true,
//                                    width: 80,
//                                    listeners: {
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'label',
//                                    text: 'Creation Time',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtHOCR',
//                                    readOnly: true,
//                                    width: 80,
//                                    listeners: {
//                                        change: 'onUpperValue'
//                                    }
//                                }
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            margin: '5 0 10 0',
//                            defaults: {
//                                labelAlign: 'center'
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'User Update',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtUSUP',
//                                    readOnly: true,
//                                    width: 80,
//                                    listeners: {
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'label',
//                                    text: 'Update Date',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtFEUP',
//                                    readOnly: true,
//                                    width: 80,
//                                    listeners: {
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'label',
//                                    text: 'Update Time',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtHOUP',
//                                    readOnly: true,
//                                    width: 80,
//                                    listeners: {
//                                        change: 'onUpperValue'
//                                    }
//                                }
//                            ]
//                        }
//                    ]
//                }
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
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
//                {
//                    text: 'Delete',
//                    id: prototype.id + '-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    listeners: {
//                        click: 'onDeleteClick'
//                    }
//                },
                {
                    text: 'Cancel',
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