Ext.util.CSS.createStyleSheet(`
    .row-with-comments .x-grid-cell {
        background-color: #1AB092 !important; /* pastel amarillito */
        color: #856404 !important;
    }
    .row-with-commentsICCS .x-grid-cell {
        background-color: #057ECB !important; /* pastel amarillito */
        color: #856404 !important;
    }
`, 'customRowStyles');


Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntryCash', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCashStatementReconciliationsForm',
    requires: [
        'Ext.Praxis.controller.payments.StatementReconciliations.DataEntryCashStatementReconciliationsController'
    ],
    controller: 'DataEntryCashStatementReconciliationsController',
    title: 'Statement Reconciliation - Agency Sales - Data Entry Form',
    header: true,
    height: 780,
    width: 1200,
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
            style: {
                border: '1px solid #6c757d'
            },
            defaults: {
                style: 'margin: 3px;',
                textDecoration: 'underline',
                border: false
            },
            items: [
                {
                    xtype: 'form',
                    height: 830,
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
                                    margin: '0 0 3 10',
                                    width: 1170,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Bank Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 234,
                                            height: 20,
                                            margin: '4 200 4 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#efe5e5;',
                                            margin: '0 2 0 20',
                                            defaults: {
                                                anchor: '100%',
                                                width: 1080
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Doc Type',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtdescTDOC',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtTDOC',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    hidden: true,
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Bank',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCODEBANK',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    hidden: true,
                                                    width: 90
                                                },

                                                //

                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtNAME',
//                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 160
                                                },
                                                {xtype: 'tbspacer', width: 50},

                                                //
                                                //
                                                {
                                                    xtype: 'label',
                                                    text: 'Account',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 60
                                                },
                                                
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtACCOUNTCASH',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 160
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'USD',
                                                    margin: '3 0 0 3',
                                                    id: prototype.id + '-lblUSD',
                                                    width: 35
                                                },
                                                {
                                                    xtype: 'component',
                                                    id: prototype.id + '-btnTS_HEADER',
                                                    margin: '3 0 0 3',
                                                    width: 40,
                                                    html: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Modo Alternancia</title><style>.toggle-container{display:inline-block;position:relative;width:30px;height:16px;}.toggle-input{opacity:0;width:0;height:0;}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}.toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}.toggle-input:checked+.toggle-slider{background-color:#4c7daf;}.toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}</style></head><body><label class="toggle-container"><input type="checkbox" id="chkHeader" class="toggle-input"><span class="toggle-slider"></span></label></body></html>',
                                                    tooltip: 'Export to Report',
                                                    listeners: {
                                                    }

                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'EUR',
                                                    margin: '3 0 0 3',
                                                    id: prototype.id + '-lblEUR',
                                                    width: 35
                                                },

//                                           


                                                //
                                                //
                                                {
                                                    xtype: 'label',
                                                    text: 'Country',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120,
                                                    hidden: true
                                                },
                                                {xtype: 'tbspacer', width: 130},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCountryBank',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 160,
                                                    hidden: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtCOREPL',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 160,
                                                    hidden: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtNAMEP',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    hidden: true,
                                                    width: 160
                                                },

//                                                {xtype: 'tbspacer', width: 50},



                                                {xtype: 'tbspacer', width: 215}
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#efe5e5;',
                                            margin: '0 2 0 20',
                                            defaults: {
                                                anchor: '100%',
                                                width: 1080
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Bank Account',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtACCOUNT',
                                                    fieldCls: 'detalle-ACCNUMBER',
                                                    style: 'font-weight:bold;color:#d5f4d5',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 110
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Country',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 40
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSCOUNTRY_COD',
                                                    style: 'font-weight:bold;color:#d5f4d5',
//                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 160,
                                                    hidden: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSCOUNTRY',
                                                    style: 'font-weight:bold;color:#d5f4d5',
//                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 160
                                                },
                                                {xtype: 'tbspacer', width: 340},
                                                {xtype: 'tbspacer', width: 275}
                                            ]
                                        },
                                        //<editor-fold defaultstate="collapsed" desc="Stattement Information">
                                        {
                                            xtype: 'label',
                                            text: 'Stattement Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 234,
                                            height: 20,
                                            margin: '10 2 4 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#efe5e5;',
                                            margin: '0 2 0 20',
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Status',
                                                    textAlign: 'center',
                                                    paddingLeft: 3,
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSTVAL',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    readOnly: true,
                                                    fieldStyle: 'text-align:center;',
                                                    width: 110
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Value Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtVALDATE',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Date Conci.',
                                                    textAlign: 'center',
                                                    paddingLeft: 3,
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtDATECI',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Tranc Numb.',
                                                    textAlign: 'center',
                                                    paddingLeft: 3,
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtTRANCI',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Qty Sett.',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 60
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtQTYTRAN1',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '0 2 0 20',
                                            bodyStyle: 'background:#efe5e5;',
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
                                                    id: prototype.id + '-de-txtSOCIETY',
                                                    fieldCls: 'detalle-society-textfield',
                                                    style: 'font-weight:bold;color:#d5f4d5',
                                                    fieldStyle: 'text-align:center',
                                                    readOnly: true,
                                                    width: 110
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Merchant',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtMERCHAND',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Id.Bank',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtBANDOC',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Currency',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSCURRENCY',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Neto',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 60
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtNETO',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>

                                        //<editor-fold defaultstate="collapsed" desc="Detail Setlement">
                                        {
                                            xtype: 'label',
                                            text: 'Header Settlement',
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
                                            margin: '0 2 0 20',
                                            bodyStyle: 'background:#efe5e5;',
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
                                                    width: 110
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Merchant',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtMERCHANDL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Id.Bank',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtBANDOCL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Currency',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSCURRENCYL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Neto',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 60
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtNETOL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            id: prototype.id + '-mainDetail2',
                                            border: false,
                                            bodyStyle: 'background:#efe5e5;',
                                            margin: '0 2 0 20',
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Bank Account',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100
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
                                                    width: 110
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Value Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtVALDATEL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Fuente',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtInput',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Negocio',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtNegoc',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    xtype: 'label',
                                                    text: 'Diff',
                                                    textAlign: 'center',
                                                    paddingLeft: 3,
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 60
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtDIFF',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelScanCard',
                                            layout: 'hbox',
                                            hidden: true,
                                            border: false,
                                            margin: '10 2 10 10',
                                            bodyStyle: 'background:#;',
                                            items: [
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Value Date:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-txtFromADATE',
                                                    fieldStyle: 'text-align:center',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Format valid YYYY/MM/DD',
                                                    minValue: new Date(1990, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                                    width: 90
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'To:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-txtToADATE',
                                                    fieldStyle: 'text-align:center',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Format valid YYYY/MM/DD',
                                                    minValue: new Date(1990, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                                    width: 90
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id01 + '-chkADATE',
                                                    checked: true,
                                                    padding: '0px 0px 0px 5px',
                                                    //boxLabel: 'Value'
                                                    listeners: {
                                                        change: 'cambiaParams'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Acc Number:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtACCNUMBER',
                                                    fieldStyle: 'text-align:center',
                                                    maxLength: 25,
                                                    enforceMaxLength: true,
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id01 + '-chkACCNUMBER',
                                                    checked: true,
                                                    padding: '0px 0px 0px 5px',
                                                    //boxLabel: 'Value'
                                                    listeners: {
                                                        change: 'cambiaParams'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Amount:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 60
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtNETO',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 16,
                                                    width: 110,
                                                    enableKeyEvents: true
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Merchant:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 0 4 4',
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtMERCHANT',
                                                    fieldStyle: 'text-align:center',
                                                    width: 110,
                                                    maxLength: 15,
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id01 + '-chkMERCHANT',
                                                    checked: true,
                                                    padding: '0px 0px 0px 5px',
                                                    listeners: {
                                                        change: 'cambiaParams'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    iconCls: 'prx-icon-search',
                                                    tooltip: 'Add',
                                                    listeners: {
                                                        click: 'cambiaParams'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    iconCls: 'prx-icon-clear',
                                                    tooltip: 'Clean',
                                                    listeners: {
                                                        click: 'clear_keyDownHandler'
                                                    }

                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    id: prototype.id + '-btnClearCustom',
                                                    iconCls: 'prx-icon-image-trash',
                                                    tooltip: 'Clean Detail',

                                                    listeners: {
                                                        click: 'clear_tableNormal'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    id: prototype.id + '-btnRefresh',
                                                    hidden: true,
                                                    iconCls: 'prx-icon-refresh',
                                                    tooltip: 'Refresh Detail',

                                                    listeners: {
                                                        click: 'onGridPending'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    iconCls: 'prx-icon-excel',
                                                    tooltip: 'Download excel',
                                                    listeners: {
                                                        click: 'getExcel'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    iconCls: 'prx-icon-edit',
                                                    tooltip: 'Calculate Differences',
                                                    reference: 'calculateButton',
                                                    listeners: {
                                                        click: 'calcularDiferencias'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelScanCard2',
                                            layout: 'hbox',
                                            border: false,
                                            hidden: true,
                                            margin: '0 2 0 10',
                                            bodyStyle: 'background:#;',
                                            items: [
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Sale Date:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-txtFromSDATE',
                                                    fieldStyle: 'text-align:center',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Format valid YYYY/MM/DD',
                                                    minValue: new Date(1990, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                                    width: 90
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'To:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-txtToSDATE',
                                                    fieldStyle: 'text-align:center',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Format valid YYYY/MM/DD',
                                                    minValue: new Date(1990, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                                    width: 90
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id01 + '-chkSDATE',
                                                    checked: true,
                                                    padding: '0px 0px 0px 5px',
                                                    //boxLabel: 'Value'
                                                    listeners: {
                                                        change: 'cambiaParams'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Card Code:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmbSCARCOD',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:left;',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'CODE',
                                                    displayField: 'NAME',
                                                    width: 120,
                                                    labelWidth: 10,
                                                    hiddenLabel: false,
                                                    editable: false
                                                },
                                                {xtype: 'tbspacer', width: 27},
                                                {
                                                    xtype: 'label',
                                                    text: 'Agency:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 0 4 4',
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtSAGENT',
                                                    fieldStyle: 'text-align:center',
                                                    width: 110,
                                                    maxLength: 8,
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Terminal:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 0 4 4',
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTERMI',
                                                    fieldStyle: 'text-align:center',
                                                    width: 110,
                                                    maxLength: 8,
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Seq:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 0 4 4',
                                                    width: 35
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtSEQ',
                                                    fieldStyle: 'text-align:center',
                                                    width: 35,
                                                    maxLength: 2,
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Red:',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 0 4 4',
                                                    width: 35
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtRED',
                                                    fieldStyle: 'text-align:center',
                                                    width: 35,
                                                    maxLength: 2,
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true
                                                },
                                            ]
                                        },
                                        //</editor-fold>
                                        //<editor-fold defaultstate="collapsed" desc="Detail new Setlement">
                                        {xtype: 'tbspacer', height: 15},
                                        {
                                            xtype: 'label',
                                            text: 'Detail Settlement',
                                            id: prototype.id + '-titleDetailSettlement',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 280,
                                            margin: '10 2 10 8'
                                        },
                                        {xtype: 'tbspacer', width: 1000},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnExcelCash',
                                            iconCls: 'prx-icon-excel',
                                            tooltip: 'Export to csv',
                                            handler: 'ExportCSV'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '10 0 0 30',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panelDataInfoScan',
                                                    layout: 'vbox',
                                                    border: false,
                                                    width: 1156,
                                                    height: 280,
                                                    autoScroll: true,
                                                    items: [
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataInfoScan',
                                                            width: 1100,
                                                            height: 250,
                                                            columnLines: true,
                                                            plugins: [
                                                                {
                                                                    ptype: 'cellediting',
                                                                    clicksToEdit: 1
                                                                }
                                                            ],
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            viewConfig: {
                                                                getRowClass: function (record) {

                                                                    if (record.get('REFERENCE') && record.get('REFERENCE').trim() !== '') {
                                                                        return 'row-with-comments';
                                                                    }
                                                                    return '';
                                                                },
                                                                listeners: {
                                                                    itemmouseenter: function (view, record, item) {
                                                                        if (record.get('REFERENCE') && record.get('REFERENCE').trim() !== '') {
                                                                            Ext.tip.QuickTipManager.register({
                                                                                target: item, // fila
                                                                                text: `<b>Reference:</b> ${record.get('REFERENCE') || ''}<br>
                                                                                       <b>Comments:</b> ${record.get('COMMENTS') || ''}`
                                                                            });
                                                                        }
                                                                    },
                                                                    itemmouseleave: function (view, record, item) {
                                                                        Ext.tip.QuickTipManager.unregister(item);
                                                                    }
                                                                }
                                                            },
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Value <br> Date',
                                                                        dataIndex: 'ADATE',
                                                                        width: 82,
                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Concept',
                                                                        dataIndex: 'CONCEPT',
                                                                        id: prototype.id + '-columnCONCEPT',
                                                                        width: 80,
                                                                        renderer: function (value, metaData, record) {
                                                                            metaData.style = "text-align:center;";

                                                                            const agent = (record.get('AGENT') || '').trim();
                                                                            if (value === 'P') {
                                                                                value = 'Positive Billing';
                                                                            } else if (value === 'N') {
                                                                                value = 'Negative Billing';
                                                                            } else if (value === 'X') {
                                                                                value = 'No Billing';
                                                                            } else if (value === 'A') {
                                                                                value = 'Adjusment';
                                                                            } else if (value === 'M') {
                                                                                value = 'Automatic';
                                                                            } else if (value === 'C') {
                                                                                value = 'Compensation';
                                                                            } else {
                                                                                value = 'Billing';
                                                                            }

                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Country',
                                                                        dataIndex: 'DESC_SCOUNTRY',
                                                                        id: prototype.id + '-columnDESC_SCOUNTRY',
                                                                        width: 143,
                                                                        renderer: function (value, metaData, record) {
                                                                            var data = record.data;
                                                                            metaData.style = "text-align:center;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SCOUNTRY + '"';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Agent',
                                                                        dataIndex: 'SAGENT',
                                                                        id: prototype.id + '-columnSAGENT',
                                                                        width: 106,
                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:center;";
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Sconsol',
                                                                        dataIndex: 'SCONSOL',
                                                                        id: prototype.id + '-columnSCONSOL',
                                                                        width: 95,
                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Currency',
                                                                        dataIndex: 'SCURRENCY',
                                                                        width: 77,
                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Neto',
                                                                        dataIndex: 'NETO',
                                                                        width: 101,
                                                                        xtype: 'numbercolumn',
                                                                        summaryType: 'sum', // 🔥 suma automático

                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.SUM_NETO, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {
                                                                        text: 'Issued Payment',
                                                                        dataIndex: 'PAYAMOU',
                                                                        width: 125,
                                                                        id: prototype.id + '-columnPAYAMOU',
                                                                        xtype: 'numbercolumn',
                                                                        summaryType: 'sum', // 🔥 suma automático
                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.SUM_PAYAMOU, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount USD',
                                                                        dataIndex: 'USDEQUI',
                                                                        width: 121,
                                                                        id: prototype.id + '-columnUSDEQUI',
                                                                        xtype: 'numbercolumn',
                                                                        summaryType: 'sum', // 🔥 suma automático
                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.SUM_USDEQUI, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Star <br> Date',
                                                                        dataIndex: 'STRDATE',
                                                                        width: 78,
                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'End <br> Date',
                                                                        dataIndex: 'ENDDATE',
                                                                        width: 77,
                                                                        renderer: function (value, metaData) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        
                                        {
    xtype: 'panel',
    layout: 'hbox',
    border: false,
    margin: '10 0 0 30',
    items: [
        {
            xtype: 'panel',
            layout: 'fit', // 🔥 CAMBIO: Usar fit o anchor ayuda a que se adapte mejor
            id: prototype.id + '-panelDataInfoScanARC',
            border: false,
            width: 1156,
            height: 160, // 🔥 CAMBIO: Reducido de 280 a 160 (suficiente para cabecera + 2 filas + sumario)
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataInfoScanArc',
                    // width: 1100, // 🔥 CAMBIO: Quitamos ancho fijo para que se adapte al panel padre (1156) o usamos forceFit
                    width: '100%', 
                    height: 150, // 🔥 CAMBIO: Reducido de 250 a 150 para quitar el espacio blanco
                    columnLines: true,
                    // 🔥 CAMBIO: forceFit hace que las columnas se estiren para llenar TODO el ancho (arregla la barra azul)
                    forceFit: true, 
                    plugins: [
                        {
                            ptype: 'cellediting',
                            clicksToEdit: 1
                        }
                    ],
                    features: [{
                        ftype: 'summary'
                    }],
                    viewConfig: {
                        getRowClass: function (record) {
                            if (record.get('REFERENCE') && record.get('REFERENCE').trim() !== '') {
                                return 'row-with-comments';
                            }
                            return '';
                        },
                        listeners: {
                            itemmouseenter: function (view, record, item) {
                                if (record.get('REFERENCE') && record.get('REFERENCE').trim() !== '') {
                                    Ext.tip.QuickTipManager.register({
                                        target: item,
                                        text: `<b>Reference:</b> ${record.get('REFERENCE') || ''}<br><b>Comments:</b> ${record.get('COMMENTS') || ''}`
                                    });
                                }
                            },
                            itemmouseleave: function (view, record, item) {
                                Ext.tip.QuickTipManager.unregister(item);
                            }
                        }
                    },
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {
                                text: 'Value <br> Date',
                                dataIndex: 'ADATE',
                                width: 85,
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {
                                text: 'Concept',
                                dataIndex: 'CONCEPT',
                                width: 120, // 🔥 CAMBIO: Ajuste de ancho
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;";
                                    return 'Disbursement advice';
                                }
                            },
                            {
                                text: 'Country',
                                dataIndex: 'DESC_SCOUNTRY',
                                width: 100, // 🔥 CAMBIO: Esta columna se estirará para llenar el espacio vacío
                                renderer: function (value, metaData, record) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;";
                                    metaData.tdAttr = 'data-qtip="' + data.SCOUNTRY + '"';
                                    return value;
                                }
                            },
                            {
                                text: 'Sconsol',
                                dataIndex: 'SCONSOL',
                                width: 95,
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {
                                text: 'Currency',
                                dataIndex: 'SCURRENCY',
                                width: 70,
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {
    text: 'Neto Sales',
    dataIndex: 'NETO',
    width: 110,
    xtype: 'numbercolumn',
    // Quitamos summaryType porque estaba llegando vacío
    renderer: function (value, metaData) {
        metaData.style = "text-align:right;";
        return Ext.util.Format.number(value, '0,000.00');
    },
    summaryRenderer: function (value, summaryData, dataIndex) {
        // 🔥 ESTRATEGIA SEGURA: Buscamos la grilla y su store manualmente
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanArc');
        var total = 0;

        if (grid && grid.getStore()) {
            grid.getStore().each(function(record) {
                var rawVal = record.get('NETO');
                // Convertimos a String para evitar error si ya es numero, y quitamos comas
                var stringVal = String(rawVal).replace(/,/g, ''); 
                var numberVal = parseFloat(stringVal);

                if (!isNaN(numberVal)) {
                    total += numberVal;
                }
            });
        }
        
        return '<b>' + Ext.util.Format.number(total, '0,000.00') + '</b>';
    }
},
{
    text: 'Neto EECC',
    dataIndex: 'PAYAMOU',
    width: 110,
    xtype: 'numbercolumn',
    renderer: function (value, metaData) {
        metaData.style = "text-align:right;";
        return Ext.util.Format.number(value, '0,000.00');
    },
    summaryRenderer: function (value, summaryData, dataIndex) {
        // 🔥 MISMA ESTRATEGIA PARA PAYAMOU
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanArc');
        var total = 0;

        if (grid && grid.getStore()) {
            grid.getStore().each(function(record) {
                var rawVal = record.get('PAYAMOU');
                var stringVal = String(rawVal).replace(/,/g, ''); 
                var numberVal = parseFloat(stringVal);

                if (!isNaN(numberVal)) {
                    total += numberVal;
                }
            });
        }

        return '<b>' + Ext.util.Format.number(total, '0,000.00') + '</b>';
    }
},
                            {
                                text: 'Settlement Day',
                                dataIndex: 'DPERIOD',
                                width: 90,
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {
                                text: 'Billing From',
                                dataIndex: 'STRDATE',
                                width: 85,
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {
                                text: 'Billing To',
                                dataIndex: 'ENDDATE',
                                width: 85,
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ]
},

                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '0 0 0 180',
                                            items: [
                                                {xtype: 'tbspacer', width: 500},

                                                {
                                                    xtype: 'label',
                                                    text: 'Sum Amount:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    hidden: false,
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSumAmount',
                                                    fieldStyle: 'text-align:right',
                                                    enforceMaxLength: true,
                                                    hidden: false,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Qty:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 30
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtQty',
                                                    fieldStyle: 'text-align:right',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 40
                                                },
                                                {xtype: 'tbspacer', width: 150},
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="ControlData">
                        {
                            xtype: 'tbspacer', higth: 20
                        },
                        {
                            xtype: 'label',
                            text: 'Control Data',
                            fontSize: '11',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            width: 180,
                            margin: '8 2 4 20'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            margin: '0 2 0 30',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '8 2 4 2',
                                    defaults: {
                                        labelAlign: 'center'
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
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUSCR',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Creation Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFECR',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Creation Time',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHOCR',
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
                                    border: false,
                                    layout: 'hbox',
                                    margin: '8 2 4 2',
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
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUSUP',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Update Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFEUP',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Update Time',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHOUP',
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
                        // </editor-fold>
                    ]
                }
            ]
        },
        {id: prototype.id + '-spacerPanel', xtype: 'tbspacer', width: 5, hidden: true},
        {
            xtype: 'form',
            hidden: true,
            id: prototype.id + '-formQueryAgrupa',
            style: {
                border: '1px solid #6c757d'
            },
            defaults: {
                style: 'margin: 3px;',
                textDecoration: 'underline',
                border: false
            },
            height: 696,
            items: [
                {
                    xtype: 'form',
                    defaults: {
                        border: false
                    },
                    bodyStyle: 'background-color: #E3EAF9;',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: true,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            width: 672,
                            //                    margin: '0 0 10 445',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxPaginacion_Agrupa',
                                    hidden: false,
                                    width: 100,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-first_Agrupa',
                                                    iconCls: 'prx-icon-pagination-first',
                                                    tooltip: 'First Page',
                                                    handler: 'pagFirst'

                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-previous_Agrupa',
                                                    iconCls: 'prx-icon-pagination-previous',
                                                    tooltip: 'Previous Page',
                                                    handler: 'pagPrevious'

                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-next_Agrupa',
                                                    iconCls: 'prx-icon-pagination-next',
                                                    tooltip: 'Next Page',
                                                    handler: 'pagNext'

                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-last_Agrupa',
                                                    iconCls: 'prx-icon-pagination-last',
                                                    tooltip: 'Last Page',
                                                    handler: 'pagLast'

                                                },
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-paggin_Agrupa',
                                                    pageSize: 10,
                                                    border: false,
                                                    displayInfo: false,
                                                    hidden: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'panel',
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnSearch_Agrupa',
                                                    iconCls: 'prx-icon-search',
                                                    tooltip: 'Search',
                                                    handler: 'searchQueryAgrupa'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnExcel_Agrupa',
                                                    iconCls: 'prx-icon-excel',
                                                    tooltip: 'Export to Excel',
                                                    handler: 'exportQueryAgrupa'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnClear_Agrupa',
                                                    iconCls: 'prx-icon-clear',
                                                    tooltip: 'Clear Options',
                                                    handler: 'cleanFiltersQueryAgrupa'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            margin: '0 0 10 0',
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Value Date:',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFromADATEAG',
                                    fieldStyle: 'text-align:center',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Format valid YYYY/MM/DD',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: false,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                    width: 90
                                },
                                {
                                    xtype: 'label',
                                    text: 'To:',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 20
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtToADATEAG',
                                    fieldStyle: 'text-align:center',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Format valid YYYY/MM/DD',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: false,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Liquid Num:',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtLIQUIDACIOAG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 16,
                                    width: 120,
                                    enableKeyEvents: true
                                },
                                {xtype: 'tbspacer', width: 10}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            boder: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Merchant:',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 65
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtMERCHANDAG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 16,
                                    width: 120,
                                    enableKeyEvents: true
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Amount:',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 55
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNETOAG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 16,
                                    width: 120,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelAgrupa',
                            bodyStyle: 'background-color: #E3EAEF;',
                            hidden: false,
                            width: 800,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAgrupa',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 582,
                                    titleAlign: 'center',
                                    columnLines: true,
                                    enableColumnMove: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Society', dataIndex: 'CCUST', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Merchant', dataIndex: 'AFILIADO', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Liquid Num', dataIndex: 'LIQUIDAC', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Value<br>Date', dataIndex: 'FECHA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Neto', dataIndex: 'MONTO', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAgrupa').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETO, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Flag', dataIndex: 'FSELECT', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Process', dataIndex: 'CODPRO', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            },
                                            {text: 'Society', dataIndex: 'CCUSTPRO', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie_Agrupa',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 742,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 742,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage_Agrupa',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount_Agrupa',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total_Agrupa',
                                            text: '0',
                                            width: 50
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
            margin: '0 0 0 8',
            layout: {
                pack: 'center'
            },
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
                    hidden: true,
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Reverse Match',
                    id: prototype.id + '-btn-reverse',
                    hidden: true,
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onReverseClick'
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
}
);