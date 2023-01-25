Ext.define('Ext.Praxis.view.payments.BoomerReconciliationForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBoomerReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.BoomerReconciliation.DataEntryBoomerReconciliationController'
    ],
    controller: 'DataEntryBoomerReconciliationController',
    title: 'Payment Reconciliation - Data Entry Form',
    header: true,
//    height: 575,
    width: 895,
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
                textDecoration: 'underline',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Ticket Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 109,
                                    margin: '0 0 0 5',
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
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTicket',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    maxLength: 14,
                                    width: 140

                                },
                                {xtype: 'tbspacer', width: 20},
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
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSEQ',
                                    fieldStyle: 'text-align:center',
//                                    enforceMaxLength: true,
                                    readOnly: true,
//                                    maxLength: 1,
                                    width: 41
                                },
                                {xtype: 'tbspacer', width: 40},
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
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbTDOC',
                                    queryMode: 'local',
                                    width: 90,
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    disabled: true,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 160}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 107,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbSCARCOD',
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 300,
                                    disabled: true,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 39},
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
                                    id: prototype.id + '-de-txtCard1',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    maskRe: /[0-9, */]/,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 2},
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
                                {xtype: 'tbspacer', width: 8},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCard2',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    maskRe: /[0-9, */]/,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 40}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130
                                },
//                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'label',
                                    text: 'Agent Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 28},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAGENT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Authorization Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 22},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAUTHOC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    padding: '3 0',
                                    width: 210
                                },                                
                                {xtype: 'tbspacer', width: 38},
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 130,
                                    padding: '3 0'
                                },
//                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbSCOUNTRY',
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
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 39},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 70,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbSTVAL',
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
                                {xtype: 'tbspacer', width: 39}

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Local Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 130,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSVFOP',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 125
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    padding: '3 0',
                                    readOnly: true,
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 173},
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 101},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSPNR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 210
                                },
                                {xtype: 'tbspacer', width: 38}
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="Boomer Information">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '4 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Boomer Information</strong>',
                                    bodyStyle: 'background:#efe5e5;',
                                    fontSize: '11',
                                    margin: '0 0 0 2',
                                    width: 234,
                                    height: 20
                                },
                                {xtype: 'tbspacer', width: 630}
                            ]
                        },
                        // </editor-fold>  
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 130,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbBCARCOD',
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
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 45},
                                {
                                    xtype: 'label',
                                    text: 'Card Number',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 84,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCardB1',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    maskRe: /[0-9, */]/,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 2},
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
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCardB2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    maskRe: /[0-9, */]/,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 70}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 4 5',
                            bodyStyle: 'background:#efe5e5;',

                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Local Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 127,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDAMOUNT',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
//                                    padding: '3 0',
                                    readOnly: true,
                                    width: 45
                                },
                                {xtype: 'tbspacer', width: 178},
                                {
                                    xtype: 'label',
                                    text: 'Process Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 100,
                                    padding: '3 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format: YYYYMMDD'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBDATEP',
                                    fieldStyle: 'text-align:left',
                                    margin: '0 0 0 3',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 187}
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="Reconciliation Information">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Reconciliation Information</strong>',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    margin: '0 0 0 2',
                                    width: 234,
                                    height: 20
                                },
                                {xtype: 'tbspacer', width: 630}
                            ]
                        },
                        // </editor-fold>
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 2 5',
                            bodyStyle: 'background:#E5ECEF;',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Payment Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDATEP',
                                    fieldStyle: 'text-align:left;',
                                    editable: false,
                                    readOnly: true,
                                    width: 163,
                                    enforceMaxLength: true,
                                    maxLength: 8
                                },
                                {xtype: 'tbspacer', width: 185},
                                {
                                    xtype: 'label',
                                    text: 'Bank',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 50,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 55},
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbCODEBANK',
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
                                    valueField: 'CODEBANK',
                                    displayField: 'NAMEBANK',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 6}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Local Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 110
//                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDAMOUNTR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
//                                    padding: '3 0',
                                    readOnly: true,
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCURRENCYR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
//                                    padding: '3 0',
                                    readOnly: true,
                                    width: 45
                                },
                                {xtype: 'tbspacer', width: 183},
                                {
                                    xtype: 'label',
                                    text: 'Merchant',
                                    style: 'font-weight:bold;color:#0B333C;',
//                                    padding: '3 0',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 162,
                                    editable: false,
                                    readOnly: true,
//                                    padding: '3 0',
//                                    enforceMaxLength: true,
                                    maskRe: /[0-9, */]/
//                                    maxLength: 10
                                },
                                {xtype: 'tbspacer', width: 114}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 2 5',
                            bodyStyle: 'background:#E5ECEF;',

                            items: [
                                {xtype: 'tbspacer', width: 7},
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
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDESCRI',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    width: 615,
                                    readOnly: true
                                },
                                {xtype: 'tbspacer', width: 114}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 2 5',
                            bodyStyle: 'background:#E5ECEF;',
                            items: [
                                {xtype: 'tbspacer', width: 7},
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
                                    id: prototype.id + '-de-txtCERROR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    readOnly: true,
                                    width: 63
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDESERROR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 150,
                                    readOnly: true,
                                    width: 540,
                                    margin: '0 0 0 3'
                                },
                                {xtype: 'tbspacer', width: 113}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 2 5',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
//                                padding: '1 0',
//                                defaults: {
//                                    labelAlign: 'left'
//                                },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#121E31; text-decoration: underline; ">Sales Conciliation Information</strong>',
                                            style: 'font-weight:bold;color:#0B333C;',
//                                            margin: '0 0 0 2',
                                            width: 200
                                        },

                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'combobox',
                                            id: prototype.id + '-de-cmbSTATUSC',
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
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDATEC',
                                            width: 110,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            fieldStyle: 'text-align:right;',
                                            readOnly: true
                                        },
                                        {xtype: 'tbspacer', width: 398}
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '2 2 4 5',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    padding: '1 0',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
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
                                            id: prototype.id + '-de-txtComment',
                                            fieldStyle: 'text-align:text',
                                            enforceMaxLength: true,
                                            maxLength: 47,
                                            margin: '0 0 0 3',
//                                            maskRe: /[0-9a-zA-Z]/,
                                            width: 500
                                        },
                                        {xtype: 'tbspacer', width: 9}
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
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '8 2 50 10'

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
                                    id: prototype.id + '-txtUSCR',
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
                                    id: prototype.id + '-txtFECR',
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
                                    id: prototype.id + '-txtHOCR',
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
                            layout: 'hbox',
                            margin: '5 0 10 50',

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
                                    id: prototype.id + '-txtUSUP',
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
                                    id: prototype.id + '-txtFEUP',
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
                                    id: prototype.id + '-txtHOUP',
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
            margin: '3 0 20 0',
//            layout: {
//                pack: 'center'
//            },
            fieldStyle: 'text-align:left',
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
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
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
}
);