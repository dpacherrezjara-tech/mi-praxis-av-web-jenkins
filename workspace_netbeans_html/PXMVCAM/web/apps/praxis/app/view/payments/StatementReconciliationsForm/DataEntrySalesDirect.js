Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntrySalesDirect', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySalesDirectStatementReconciliationsForm',
    requires: [
        'Ext.Praxis.controller.payments.StatementReconciliations.DataEntrySalesDirectStatementReconciliationsController'
    ],
    controller: 'DataEntrySalesDirectStatementReconciliationsController',
    title: 'Statement Reconciliation - Direct Sales - Data Entry Form',
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
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtNAME',
//                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 160
                                                },
                                                {xtype: 'tbspacer', width: 50},
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
                                                {xtype: 'tbspacer', width: 335}
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
                                                {xtype: 'tbspacer', width: 270},
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
                                        {xtype: 'tbspacer', height: 5},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '10 0 0 30',
                                            //bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panelDataInfoScan',
                                                    layout: 'vbox',
                                                    border: false,
                                                    width: 1250,
                                                    height: 280,
                                                    autoScroll: true,
                                                    items: [
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataInfoScan',
                                                            width: 1194,
                                                            height: 250,
                                                            columnLines: true,
                                                            plugins: [
                                                                {
                                                                    ptype: 'cellediting',
                                                                    clicksToEdit: 1
                                                                }
                                                            ],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {text: 'Status', dataIndex: 'descSTVAL', width: 85,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {text: 'Sales <br> Date', dataIndex: 'SDATE', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {text: 'Pay. <br> Date', dataIndex: 'MCLOS', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },

                                                                    {
                                                                        text: 'Ticket',
                                                                        dataIndex: 'CCIA', // puede ser cualquiera de los tres, no importa porque usamos el renderer
                                                                        width: 120,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";

                                                                            // Concatenamos los tres valores
                                                                            var ccia = record.get('CCIA') || '';
                                                                            var forma = record.get('FORMA') || '';
                                                                            var serie = record.get('SERIE') || '';

                                                                            return ccia  + forma + serie;
                                                                        }
                                                                    },
                                                                    {text: 'Agent', dataIndex: 'SAGENT', width: 75,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {text: 'Sconsol', dataIndex: 'SCONSOL', width: 75,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }   
                                                                    },
                                                                    {text: 'Account', dataIndex: 'ACCOUNT', width: 75,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }   
                                                                    },
                                                                    
                                                                    
                                                                    {text: 'Source', dataIndex: 'CFUENTE', width: 65,
                                                                        //                                                                editor: {xtype: 'textfield', editable: true},
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {text: 'Sub <br> Source', dataIndex: 'SUBFTE', width: 65,
                                                                        //                                                                editor: {xtype: 'textfield', editable: true},
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {text: 'Reference', dataIndex: 'REFERENCE', width: 125,
                                                                        //                                                                editor: {xtype: 'textfield', editable: true},
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Neto',
                                                                        dataIndex: 'SVFOPNETR',
                                                                        width: 95,
                                                                        xtype: 'gridcolumn',
                                                                        cls: 'detalle-neto', // Agrega una clase personalizada a las celdas de detalle NETO
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        editor: {
                                                                            xtype: 'textfield',
                                                                            editable: true,
                                                                            allowBlank: false,
                                                                            enableKeyEvents: true,
                                                                            maskRe: /[0-9\.-]/,
                                                                            selectOnFocus: true,
                                                                            listeners: {
                                                                                specialkey: 'eventKeyAdjustment'
                                                                            }
                                                                        }
                                                                    },
                                                                    {text: 'SOCIETY', dataIndex: 'SOCIETY', width: 85,
                                                                        //                                                                editor: {xtype: 'textfield', editable: true},
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {text: 'Days', dataIndex: 'PASSED_DAYS', width: 43,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }   
                                                                    },
                                                                    {
                                                                        sortable: false,
                                                                        xtype: 'actioncolumn',
                                                                        width: 40,
                                                                        text: 'Del.',
                                                                        id: prototype.id + '-gridColumnDelete',
                                                                        align: 'center',
                                                                        items: [
                                                                            {
                                                                                iconCls: 'prx-icon-image-trash',
                                                                                tooltip: 'Delete',
                                                                                handler: 'removeTKT'
                                                                            }
                                                                        ]
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
                                            margin: '0 0 0 333',
                                            items: [
                                                {xtype: 'tbspacer', width: 320},
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
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Sum Amount:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSumAmount',
                                                    fieldStyle: 'text-align:right',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                }
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
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Reverse Match',
                    id: prototype.id + '-btn-reverse',
                    hidden: false,
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