Ext.define('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataEntrySettlement', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySettlementSalesReconciliAmexForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliAmex.DataEntrySettlementSalesReconciliAmexController'
    ],
    controller: 'DataEntrySettlementSalesReconciliAmexController',
    title: 'Sales Reconciliation by Amex - Settlement Form',
    header: true,
//    height: 650,
    //width: 985,
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
                    //width: 970,
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    text: 'Sales Merchant ID',
                                    id: prototype.id + '-txtSalesMerchantID',
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 315}
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
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 40
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
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'ID',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDCONL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 340,
                                },
                                {xtype: 'tbspacer', width: 5}
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 215}
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
                                    id: prototype.id + '-txtSettvsSales',
                                    text: 'Sett. vs Sales',
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 215}
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
                                {xtype: 'tbspacer', width: 80},
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
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 215}
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Sales Information',
                            id: prototype.id + '-txtSalesInformation',
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
                                    text: 'Sales Date',
                                    id: prototype.id + '-txtSalesDate',
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                    readOnly: true
                                },
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 315},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'label',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Sales Amount',
                                    id: prototype.id + '-txtSalesAmount',
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
                            xtype: 'label',
                            text: 'Breakdown',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataInfoScan',
                            layout: 'vbox',
                            border: false,
                            width: 800,
                            height: 250,
                            hidden: false,
                            //bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 12 20',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataInfoScan',
                                    width: 795,
                                    height: 250,
                                    margin: '0 0 0 0',
//                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 61,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (value === '') {
                                                                return 'AX';
                                                            } else {
                                                                return value;
                                                            }

                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'SCARDN', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval', dataIndex: 'SAUTHOC', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
//                                            {text: 'Adjust.', dataIndex: 'SADJUST', width: 70,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:right;";
//                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                    return value;
//                                                }
//                                            },
                                            {text: 'Amount', dataIndex: 'TGROSAMOUN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Total <br> Amount', dataIndex: 'totTGROSAMOUN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales Date', dataIndex: 'TRANSDATE', width: 90, id: prototype.id + '-txtSalesDate2',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'SPNR', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'ISREFNBR', width: 130,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Coupons',
                                                id: prototype.id + '-coupons_sales',
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
                                            /*{
                                             header: '',
                                             dataIndex: '',
                                             xtype: 'widgetcolumn',
                                             align: 'center',                                                
                                             width: 40,
                                             widget: {
                                             xtype: 'button',
                                             icon: 'resources/img/icon/delete.png',
                                             tooltip: 'remove',
                                             listeners: {
                                             click: function (button, e, eOpts) {
                                             var record = button.getWidgetRecord();
                                             meDE.removeTKT(record);
                                             }
                                             }
                                             }
                                             
                                             },
                                             {
                                             sortable: false,
                                             xtype: 'actioncolumn',
                                             width: 30,
                                             text: '',
                                             align: 'center',
                                             items: [
                                             {
                                             iconCls: 'prx-icon-edit',
                                             tooltip: 'Fill TKT & PNR',
                                             handler: 'onTktPnr'
                                             }
                                             ]
                                             },*/
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
                    margin: '8 2 4 8'
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 20',
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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
                            margin: '8 2 4 20',
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
                                {xtype: 'tbspacer', width: 80},
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
                                {xtype: 'tbspacer', width: 80},
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