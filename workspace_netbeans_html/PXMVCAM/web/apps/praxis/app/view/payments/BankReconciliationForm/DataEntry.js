Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBankReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.BankReconciliation.DataEntryBankReconciliationController'
    ],
    controller: 'DataEntryBankReconciliationController',
    title: 'Bank Reconciliation - Data Entry Form',
    header: true,
    height: 740,
    width: 930,
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
                            bodyStyle: 'background:white;',
                            margin: '40 20 3 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 95
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-de-txtSDATE',
                                    fieldStyle: 'text-align:left;',
                                    format: 'Ymd',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYYMMDD',
                                    hideTrigger: true,
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 8,
                                    width: 110,
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: 'Document Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbTDOC',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 133,
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: 'Bank',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 65
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbCODEBANK',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'CODEBANK',
                                    displayField: 'IN_CODE_IN_NAME',
                                    width: 183,
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 3 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 98
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 1},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbSCOUNTRY',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    width: 271,
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 89
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbSCARCOD',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    allowBlank: false,
                                    validator: function(value) {
                                        if (value === "") {
                                            return "It requires you to enter a Card Code";
                                        } else
                                            return true;
                                    },
                                    width: 278,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 3 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Card Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 98
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 22
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCard1',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    width: 85,
                                    listeners: {
                                        keyup: 'tarjeta_keyDownHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: '*****(*)',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                                    },
                                    width: 55
                                },
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCard2',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 4,
                                    width: 65
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Authorization Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 142
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 29
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAUTHOC',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 6,
                                    minLength: 1,
                                    allowBlank: false,
                                    validator: function(value) {
                                        if (value === "") {
                                            return "It requires you to enter a Sales Authorization Code";
                                        } else
                                            return true;
                                    },
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 75},
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 55
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPNR',
                                    fieldStyle: 'text-align:center;',
//                                    enableKeyEvents: true,
//                                    enforceMaxLength: true,
//                                    editable: true,
//                                    maskRe: /[0-9]/,
//                                    maxLength: 4,
//                                    readOnly: true,
                                    width: 68
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 3 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Local Amount',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 95
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSVFOP',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    editable: true,
                                    maxLength: 15,
                                    allowBlank: false,
                                    validator: function(value) {
                                        if (parseFloat(value) < 1) {
                                            return "The value entered is too small.";
                                        } else
                                            return true;
                                    },
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCURRENCY',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maxLength: 3,
                                    minLength: 1,
                                    allowBlank: true,
                                    validator: function(value) {
                                        if (value === "") {
                                            return "It requires you to enter a Sales Currency";
                                        } else
                                            return true;
                                    },
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 130},
                                {
                                    xtype: 'label',
                                    text: 'Sequence',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSEQNUM',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 2,
                                    minLength: 2,
                                    allowBlank: false,
                                    validator: function(value) {
                                        if (value === "") {
                                            return "It requires you to enter a Sequence Number";
                                        } else
                                            return true;
                                    },
                                    width: 45
                                },
                                {xtype: 'tbspacer', width: 110},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-de-chkFADYEN',
                                    boxLabel: '<b>ADYEN</b>',
                                    checked: false,
                                    width: 90,
                                    listeners: {
                                        change: 'cambiarColorChk'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '1 20 1 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSTVAL',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: false,
                                    width: 271
                                },
                                {xtype: 'tbspacer', width: 9},
                                {
                                    xtype: 'label',
                                    text: 'Merchant',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHN',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    editable: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 10,
                                    minLength: 1,
                                    allowBlank: false,
                                    validator: function(value) {
                                        if (value === "") {
                                            return "It requires you to enter a Merchant Number";
                                        } else
                                            return true;
                                    },
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: '',
                                    id: prototype.id + '-de-lblMERCHNNAME',
                                    style: 'font-weight:bold;',
                                    width: 115
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Bank Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                            width: 170
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Transaction Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbTRNXCODE',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 245,
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            typeAhead: true,
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Reference Number',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 135
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNUMREF',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 23,
                                            width: 220
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbBSTVAL',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 150,
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            typeAhead: true,
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Card Type',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 95
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbTIPOTAR',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 132,
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            typeAhead: true,
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'POS Entry Mode',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbPEM',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 143,
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            typeAhead: true,
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Agent Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSAGENT',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            allowBlank: true,
                                            validator: function(value) {
                                                if (parseInt(value) < 1) {
                                                    return "The value entered is too small.";
                                                } else
                                                    return true;
                                            },
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Load Type',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format: YYYYMMDD'
                                            },
                                            width: 135
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbFLOAD',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 132,
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            typeAhead: true,
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Load Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format: YYYYMMDD'
                                            },
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtLDATE',
                                            fieldStyle: 'text-align:left;',
                                            format: 'Ymd',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYYMMDD',
                                            hideTrigger: true,
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maxLength: 8,
                                            width: 143
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 5 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Rejection',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtREASONREJ',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maxLength: 4,
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 24},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDESREJ',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            width: 442
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#EFE9E5;',
                            margin: '1 20 1 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#EFE9E5;',
                                    margin: '5 0 0 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Settlement Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                            width: 170
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#EFE9E5;',
                                    margin: '5 0 5 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Transaction Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format: YYYYMMDD'
                                            },
                                            width: 130
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:#9C1717;',
                                            width: 25
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtTDATE',
                                            fieldStyle: 'text-align:left;',
                                            format: 'Ymd',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYYMMDD',
                                            hideTrigger: true,
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maxLength: 8,
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'TEF Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtDATEF',
                                            fieldStyle: 'text-align:left;',
                                            format: 'Ymd',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYYMMDD',
                                            hideTrigger: true,
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maxLength: 8,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Source',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbSORIG',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 120,
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            typeAhead: true,
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#EFE9E5;',
                            margin: '1 20 1 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#EFE9E5;',
                                    margin: '5 0 0 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Bank Process Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                            width: 190
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#EFE9E5;',
                                    margin: '5 0 5 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Process Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format: YYYYMMDD'
                                            },
                                            width: 130
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:#9C1717;',
                                            width: 25
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtBDATEP',
                                            fieldStyle: 'text-align:left;',
                                            format: 'Ymd',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYYMMDD',
                                            hideTrigger: true,
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maxLength: 8,
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Qty. Tkts',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYDOC',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            editable: true,
                                            maxLength: 5,
                                            allowBlank: false,
                                            validator: function(value) {
                                                if (parseInt(value) < 1) {
                                                    return "The value entered is too small.";
                                                } else
                                                    return true;
                                            },
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Bank Id',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBAID',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 14,
                                            width: 225
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Bank Account',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                            width: 220
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 5 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Status Load',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbFLOADE',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 110,
                                            editable: false,
                                            disabled: true
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Load Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format: YYYYMMDD'
                                            },
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtLDATEE',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: false,
                                            maxLength: 8,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Conciliation',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Conciliation Status / Date'
                                            },
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbSTATUSC',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 100,
                                            editable: false,
                                            disabled: true
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDATEC',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: false,
                                            maxLength: 8,
                                            width: 105
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Clarification / ChargeBack Transaction',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                            width: 300
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 5 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Source',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbSTATT',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 110,
                                            editable: false,
                                            disabled: true
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDATET',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: false,
                                            maxLength: 8,
                                            width: 100
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 20 1 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 5 0',
                                    width: 850,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Update Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration:underline;',
                                            width: 220
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Comment :',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Comment'
                                            },
                                            width: 104
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:#9C1717;',
                                            width: 25
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtComment',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            editable: true,
                                            maxLength: 54,
                                            width: 400
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '5 20 5 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
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
                            margin: '1 20 3 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Creation',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 135
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtUSCR',
                                    readOnly: true,
                                    width: 110,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFECR',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtHOCR',
                                    readOnly: true,
                                    width: 100,
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
                            margin: '1 20 1 20',
                            width: 850,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 135
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtUSUP',
                                    readOnly: true,
                                    width: 110,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFEUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtHOUP',
                                    readOnly: true,
                                    width: 100,
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
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'left'
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
                },
                {xtype: 'tbspacer', width: 30},
                {
//                    text: 'View Previous Ticket',
                    id: prototype.id + '-btn-imgPrev',
                    icon: 'resources/img/botones/16x16/prev.png',
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'View Previous Ticket'
                    }
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                },
                {
//                    text: 'View Next Ticket',
                    id: prototype.id + '-btn-imgNext',
                    icon: 'resources/img/botones/16x16/next.png',
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'View Next Ticket'
                    }
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                }
            ]
        }
    ]
});