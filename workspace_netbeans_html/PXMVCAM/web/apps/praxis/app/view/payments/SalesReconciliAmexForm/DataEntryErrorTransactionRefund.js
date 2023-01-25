Ext.define('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataEntryErrorTransactionRefund', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryErrorTransactionRefundSalesReconciliAmexForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliAmex.DataEntryErrorTransactionRefundSalesReconciliAmexController'
    ],
    controller: 'DataEntryErrorTransactionRefundSalesReconciliAmexController',
    title: 'Refund Transaction DataEntry',
    header: true,
//    height: 650,
    width: 1075,
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
                    width: 1075,
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
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
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
                                    text: 'Processing Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPRDA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'AX Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAXPAYNBR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Merchant ID',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHID',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Refund Merchant ID',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSMERCHID',
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
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 0 20',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'ID Submission',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDITEMS',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'ID Transaction',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDITEMT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Inst. Plan',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNBRINSTA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Inst. Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtINSTANBR',
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
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 0 20',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Zone',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtZone',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCountry',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 525}
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Accounting Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
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
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSTCONL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;',
                                    width: 105,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFCONTL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'ID',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDCONL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    readOnly: true,
                                    width: 355,
                                },
                                {xtype: 'tbspacer', width: 5},
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Error Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 280,
                            height: 20,
                            margin: '4 2 4 8'
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
                                    text: 'History',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCERRORHST',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Reconcil. Sett.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCERROIN',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDES_CERROIN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 5},
                                {xtype: 'tbspacer', width: 160},
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Flag Selection',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFLAG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Sett. vs Refund',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCERROR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDES_CERROR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 5},
                                {xtype: 'tbspacer', width: 160},
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Refund Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
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
                                    text: 'Refund Date',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBSUMDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Payment Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPAYDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Diff. Days',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPASSED_DAYS',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Card Account Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCARDN',
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
                            border: false,
                            margin: '0 2 0 20',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Transact. Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTRANSDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'TICKET',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtISREFNBR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 100,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    maxLength: 15
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSPNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9a-zA-Z]/,
                                    maxLength: 6,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Approval Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAUTHOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5}
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Conciliate',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 280,
                            height: 20,
                            margin: '4 2 4 8'
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Status',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSTVAL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Qty Tkts',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYTKT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Transact. Amount',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTGROSAMOUN',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
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
                                    text: 'Rule',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtdescFREGLA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Doc. Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTDOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Void',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtVOID',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Refund Amount',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSVFOPS',
                                    fieldStyle: 'text-align:right',
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
                            border: false,
                            margin: '0 2 0 20',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Reverse Policy',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFREVERSA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Flag Compl.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFCOMPL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {xtype: 'tbspacer', width: 120},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'tbspacer', width: 100},
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Diff. Amount',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDIFF_AMOUNT',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5}
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Scan',
                            id: prototype.id + '-labelScan',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 15,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelScan',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            margin: '0 2 0 100',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                /*{
                                 xtype: 'button',
                                 width: 25,
                                 hidden: true,
                                 //margin: '4 1 1 1',
                                 iconCls: 'prx-icon-add',
                                 tooltip: 'Add',
                                 listeners: {
                                 click: 'txtTKTScan_keyDownHandler'
                                 }
                                 
                                 },*/
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Reset Scan',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'button',
                                    width: 25,
                                    //margin: '4 1 1 1',
                                    icon: 'resources/img/icon/48x48/exchange.png',
                                    tooltip: 'Reset',
                                    listeners: {
                                        click: 'resetScan_keyDownHandler'
                                    }

                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkBlocked',
                                    boxLabel: '<b>Blocked</b>',
                                    checked: false,
                                    width: 90,
                                    listeners: {
                                        change: 'cambiarGrillaChk'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'MSI Tracking',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'button',
                                    width: 25,
                                    //margin: '4 4 4 4',
                                    iconCls: 'prx-icon-update',
                                    //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                    tooltip: 'MSI Tracking',
                                    listeners: {
                                        click: 'msiTracking_keyDownHandler'
                                    }

                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelBpo',
                                    layout: 'hbox',
                                    hidden: true,
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Bpo Rev.',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            id: prototype.id + '-openBpoObserv',
                                            //margin: '4 4 4 4',
                                            //iconCls: 'prx-icon-add',
                                            icon: 'resources/img/botones/facsimil.png',
                                            tooltip: 'BPO Rev.',
                                            listeners: {
                                                click: 'bpoRev_keyDownHandler'
                                            }

                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-closeBpoObserv',
                                            hidden: true,
                                            width: 25,
                                            //margin: '4 4 4 4',
                                            //iconCls: 'prx-icon-add',
                                            icon: 'resources/img/botones/cancel.png',
                                            tooltip: 'Close BPO Rev.',
                                            listeners: {
                                                click: 'closeBpoRev_keyDownHandler'
                                            }

                                        }
                                    ]
                                },
                                //150                                                              
                            ]
                        },
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelScanCard',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            margin: '0 2 0 50',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Add Ticket',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-input-txtTKTScan',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 100,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'Add C. Card',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCard1',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    width: 100,
                                    enableKeyEvents: true,
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'label',
                                    text: '*****(*)',
                                    padding: '3 0',
                                    width: 65,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCard2',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 4,
                                    width: 65,
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'label',
                                    text: 'Approval',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtApproval',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    width: 85,
                                    enableKeyEvents: true,
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Refund Date',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFromDate',
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
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'button',
                                    width: 25,
                                    //margin: '4 4 4 4',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add',
                                    listeners: {
                                        click: 'addCreditCard_keyDownHandler'
                                    }

                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'button',
                                    width: 25,
                                    //margin: '4 4 4 4',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clean',
                                    listeners: {
                                        click: 'clear_keyDownHandler'
                                    }

                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelBpoObserv',
                            layout: 'hbox',
                            hidden: true,
                            border: false,
                            margin: '0 2 0 100',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'BPO Observation',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBpoOBSERV-RO',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    readOnly: false,
                                    maxLength: 50,
                                    width: 320,
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMsiTracing',
                            layout: 'hbox',
                            hidden: true,
                            border: false,
                            margin: '0 2 0 100',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'MSI Tracking',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'button',
                                    width: 25,
                                    //margin: '4 4 4 4',
                                    iconCls: 'prx-icon-update',
                                    //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                    tooltip: 'MSI Tracking',
                                    listeners: {
                                        click: 'msiTracking_keyDownHandler'
                                    }

                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Reverse Match',
                                    id: prototype.id + '-labelReverse',
                                    textAlign: 'center',
                                    hidden: true,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 4 4 4',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'button',
                                    width: 25,
                                    //margin: '4 4 4 4',
                                    iconCls: 'prx-icon-image-log',
                                    hidden: true,
                                    id: prototype.id + '-btnReverse',
                                    //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                    tooltip: 'Reverse match',
                                    listeners: {
                                        click: 'reverseMatch_keyDownHandler'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataInfoScan',
                            layout: 'vbox',
                            border: false,
                            width: 795,
                            height: 245,
                            hidden: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 12 20',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataInfoScan',
                                    width: 795,
                                    height: 220,
//                                    hidden: false,
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
                                            {text: 'Status', dataIndex: 'STMANUAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    /*if (record.data.FDUPLI > 0) {
                                                     metaData.style = "text-align:center;background-color:#f58989";
                                                     }*/

                                                    value = 'Refund';

                                                    if (record.data.FDUPLIB > 0) {
                                                        value = 'Blocked'
                                                    }

                                                    if (record.data.FDESGLOSE === '1') {
                                                        value = 'Concil.'
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            /*if (record.data.FDUPLI > 0) {
                                                             metaData.style = "text-align:center;background-color:#f58989";
                                                             }
                                                             
                                                             if (record.data.FDUPLIB > 0) {
                                                             metaData.style = "text-align:center;background-color:#e7f589";
                                                             }
                                                             
                                                             if (record.data.FDESGLOSE === '1') {
                                                             metaData.style = "text-align:center;background-color:#9cfa89";
                                                             }*/

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 115,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval', dataIndex: 'A1531CAPL', width: 65,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Amount', dataIndex: 'A1531VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Refund<br>Amount', dataIndex: 'tot_VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Refund<br>Date', dataIndex: 'A720FECVTA', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'A720PNR', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 112,
                                                //editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';

                                                },
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                            },
                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Coupons',
                                                id: prototype.id + '-coupons_refund',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '1', dataIndex: 'USOS', width: 35,                                                        
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var cpn = value.slice(-4);
                                                            if (cpn[0] === undefined) {
                                                                return '';
                                                            } else {
                                                                return cpn[0];
                                                            }
                                                        }
                                                    },
                                                    {text: '2', dataIndex: 'USOS', width: 35,                                                        
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var cpn = value.slice(-4);
                                                            if (cpn[1] === undefined) {
                                                                return '';
                                                            } else {
                                                                return cpn[1];
                                                            }
                                                        }
                                                    },
                                                    {text: '3', dataIndex: 'USOS', width: 35,                                                        
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var cpn = value.slice(-4);
                                                            if (cpn[2] === undefined) {
                                                                return '';
                                                            } else {
                                                                return cpn[2];
                                                            }
                                                        }
                                                    },
                                                    {text: '4', dataIndex: 'USOS', width: 35,                                                        
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var cpn = value.slice(-4);
                                                            if (cpn[3] === undefined) {
                                                                return '';
                                                            } else {
                                                                return cpn[3];
                                                            }
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                header: '',
                                                dataIndex: '',
                                                xtype: 'widgetcolumn',
                                                id: prototype.id + '-gridColumnDelete',
                                                align: 'center',
                                                width: 40,
                                                widget: {
                                                    xtype: 'button',
                                                    icon: 'resources/img/icon/delete.png',
                                                    tooltip: 'remove',
                                                    listeners: {
                                                        click: function (button, e, eOpts) {
                                                            var record = button.getWidgetRecord();
                                                            if (record.data.FDESGLOSE !== '1') {
                                                                meDE.removeTKT(record);
                                                            }

                                                        }
                                                    }
                                                }

                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 30,
                                                text: '',                                                
                                                id: prototype.id + '-gridColumnFill',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Fill TKT & PNR',
                                                        handler: 'onTktPnr'
                                                    }
                                                ]
                                            },
                                            /*{
                                             text: 'Select',
                                             xtype: 'checkcolumn',
                                             id: prototype.id + '-id_checkManual',
                                             width: 50,
                                             dataIndex: 'false',
                                             listeners: {
                                             checkchange: 'checkManual'
                                             },
                                             },*/
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 150},
                                        {
                                            xtype: 'label',
                                            text: 'Sum Amount',
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
                                            width: 70,
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataInfoBlocked',
                            layout: 'vbox',
                            border: false,
                            width: 725,
                            height: 245,
                            hidden: true,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 12 100',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataInfoBlocked',
                                    width: 725,
                                    height: 220,
//                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Status', dataIndex: 'STMANUAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    /*if (record.data.FDUPLI > 0) {
                                                     metaData.style = "text-align:center;background-color:#f58989";
                                                     }*/

                                                    value = 'Refund';

                                                    if (record.data.FDUPLIB > 0) {
                                                        value = 'Blocked'
                                                    }

                                                    if (record.data.FDESGLOSE === '1') {
                                                        value = 'Concil.'
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            /*if (record.data.FDUPLI > 0) {
                                                             metaData.style = "text-align:center;background-color:#f58989";
                                                             }
                                                             
                                                             if (record.data.FDUPLIB > 0) {
                                                             metaData.style = "text-align:center;background-color:#e7f589";
                                                             }
                                                             
                                                             if (record.data.FDESGLOSE === '1') {
                                                             metaData.style = "text-align:center;background-color:#9cfa89";
                                                             }*/

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 115,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval', dataIndex: 'A1531CAPL', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Amount', dataIndex: 'A1531VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Refund<br>Amount', dataIndex: 'tot_VFOPB', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Refund<br>Date', dataIndex: 'A720FECVTA', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'A720PNR', width: 62,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 112,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                            },
                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 62,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: true,
                                    margin: '0 2 0 100',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 150},
                                        {
                                            xtype: 'label',
                                            text: 'Sum Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSumAmountBlocked',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 70,
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '8 2 4 100'
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 100',
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
                                {xtype: 'tbspacer', width: 40},
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
                                {xtype: 'tbspacer', width: 40},
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
                            margin: '8 2 4 100',
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
                                {xtype: 'tbspacer', width: 40},
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
                                {xtype: 'tbspacer', width: 40},
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
                }
            ]
        }
    ]
}
);