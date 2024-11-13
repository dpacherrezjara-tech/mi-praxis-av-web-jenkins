Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntryMPF060', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMPF060StatementReconciliationsForm',
    requires: [
        'Ext.Praxis.controller.payments.StatementReconciliations.DataEntryMPF060StatementReconciliationsController'
    ],
    controller: 'DataEntryMPF060StatementReconciliationsController',
    title: 'Statement Reconciliation - Data Entry Form',
    header: true,
    height: 330,
    width: 1040,
    resizable: false,
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                textDecoration: 'underline',
                border: false
            },
            items: [
                {
                    xtype: 'form',
                    height: 300,
                    defaults: {
                        textDecoration: 'underline',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;',
                            layout: 'vbox',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:white;',
                                    margin: '4 0 3 5',
                                    width: 1300,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'General Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 334,
                                            height: 20,
                                            margin: '4 200 4 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;',
                                            style: 'border-top-left-radius: 5px; border-top-right-radius: 5px;',
                                            margin: '0 2 0 10',
                                            width: 1000,
                                            defaults: {
                                                anchor: '100%',
                                                width: 1120
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Processing Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtPRDA',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 70,
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Merchant ID',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtMERCHID',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 70,
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Agent',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 40,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 80},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSAGENT',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 70,
                                                },
                                                {xtype: 'tbspacer', width: 60},
                                                {
                                                    xtype: 'label',
                                                    text: 'Terminal',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 60,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtTERMI',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 70,
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;',
                                            margin: '0 2 0 10',
                                            style: 'border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;',
                                            width: 1000,
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Bank Code',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCODEBANK',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 50
                                                },

                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Processor',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCOREP',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Country',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 50,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 70},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCOUNTRY',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Business',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 70,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-txtNEGOC',
                                                    queryMode: 'local',
                                                    allowBlank: false,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: true,
                                                    listConfig: {maxHeight: 130},
                                                    width: 70,
                                                    typeAhead: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
//                                                    value: '',
                                                    store: {
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            {code: '', name: 'Empty'},
                                                            {code: '1', name: 'Pasajes'},
                                                            {code: '2', name: 'Cargo'},
                                                            {code: '3', name: 'Correo'},
                                                            {code: 'S', name: 'Standby'}
                                                        ]
                                                    }
                                                },
                                            ]
                                        },
                                        //<editor-fold defaultstate="collapsed" desc="Detail Setlement">
                                        {
                                            xtype: 'label',
                                            text: 'Detail Settlement',
                                            id: prototype.id + '-titleDetail',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 280,
                                            margin: '10 2 10 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            id: prototype.id + '-mainDetail',
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;',
                                            margin: '0 2 0 10',
                                            width: 1000,
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Society',
                                                    textAlign: 'center',
                                                    paddingLeft: 3,
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSOCIETYS',
                                                    fieldCls: 'detalle-society-textfield',
                                                    style: 'font-weight:bold;color:#d5f4d5',
                                                    fieldStyle: 'text-align:center',
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Acc Numb',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtACCNUMBERL',
                                                    fieldCls: 'detalle-ACCNUMBERL-textfield',
                                                    style: 'font-weight:bold;color:#d5f4d5',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Value Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtVALDATEL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    xtype: 'label',
                                                    text: 'Currency',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSCURRENCYL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 30
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Neto',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 40
                                                },
                                                {xtype: 'tbspacer', width: 60},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtNETOL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 70
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;',
                                            margin: '0 2 0 10',
                                            style: 'border-top-left-radius: 5px; border-top-right-radius: 5px;',
                                            width: 1000,
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Sales Date',
                                                    id: prototype.id + '-de-txtFromDateBSUMDATE',
                                                    textAlign: 'center',
                                                    paddingLeft: 3,
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtBSUMDATE',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    readOnly: true,
                                                    fieldStyle: 'text-align:center;',
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Doc. Type',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtTDOC',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    xtype: 'label',
                                                    text: 'Doc SAP Bank',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120,
                                                    margin: '3 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtBANDOC',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:center;',
                                                    width: 80,
                                                    maskRe: /[0-9]/,
                                                    readOnly: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 10
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Conci Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80,
                                                    margin: '3 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtDATEC',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 60
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Trans Number',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtTRANC',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;',
                                            style: 'border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;',
                                            margin: '0 2 0 10',
                                            width: 1000,
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Payment Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtPAYDATE',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Card Code',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSCARCODE',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 30
                                                },
                                                {xtype: 'tbspacer', width: 60},
                                                {
                                                    xtype: 'label',
                                                    text: 'Card Account Nbr.',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120,
                                                    margin: '3 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSCARDN',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 110
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Auth. Code',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80,
                                                    margin: '3 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSAUTHOC',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 40
                                                },
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    xtype: 'label',
                                                    text: 'Sequence',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSEQ',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 40
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Control Data',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 280,
                                            margin: '10 2 10 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            id: prototype.id + '-mainDetail',
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;',
                                            margin: '0 2 0 10',
                                            style: 'border-top-left-radius: 5px; border-top-right-radius: 5px;',
                                            width: 1000,
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creator User ',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80,
                                                    height: 20,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtUSCR',
                                                    fieldStyle: 'text-align:center',
                                                    readOnly: true,
                                                    width: 60,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creation Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFECR',
                                                    readOnly: true,
                                                    width: 60,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Creation Time',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtHOCR',
                                                    readOnly: true,
                                                    width: 50,
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
                                            bodyStyle: 'background:#f0f0f0;',
                                            margin: '0 2 0 10',
                                            style: 'border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;',
                                            width: 1000,
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'User Update',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtUSUP',
                                                    readOnly: true,
                                                    width: 60,
                                                    fieldStyle: 'text-align:center',
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    xtype: 'label',
                                                    text: 'Update Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFEUP',
                                                    readOnly: true,
                                                    width: 60,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Update Time',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100,
                                                    margin: '3 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtHOUP',
                                                    readOnly: true,
                                                    width: 50,
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
            margin: '0 0 4 8',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:left',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
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
                    id: prototype.id + '-btn-imgPrev',
                    icon: 'resources/img/botones/16x16/prev.png',
                    margin: '0 0 0 8',
                    hidden: true
                },
                {
                    id: prototype.id + '-btn-imgNext',
                    icon: 'resources/img/botones/16x16/next.png',
                    hidden: true
                }
            ]
        }
    ]
});