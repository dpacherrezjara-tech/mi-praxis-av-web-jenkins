Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryDebits', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDebitsBankReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.BankReconciliation.DataEntryDebitsBankReconciliationController'
    ],
    controller: 'DataEntryDebitsBankReconciliationController',
    title: 'Bank Reconciliation - Data Entry Debits Form',
    header: true,
    height: 920,
    width: 1100,
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
            height: 950,
            width: 1100,
            scrollable: true,
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
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '0 20 3 10',
                            width: 1100,
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
                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            text: 'Agent',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSAGENT',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 360,
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
                                            text: 'Inst.Pay. Plan',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtINSTPLA',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 60},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCOUNTRY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 265}
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
                                            text: 'Invoice Ref.Nbr',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtINVORNBR',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Zone',
                                            hidden: true,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
//                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtZONE',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            hidden: true,
                                            width: 100
                                        },
//                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Inst. Payment',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtINSTPAY',
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
                                        {xtype: 'tbspacer', width: 265},
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
                                            id: prototype.id + '-de-txtSTCON',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
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
                                            id: prototype.id + '-de-txtFCONT',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            border: true,
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
                                            id: prototype.id + '-de-txtIDCON',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            readOnly: true,
                                            width: 360,
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
                                            id: prototype.id + '-de-txtCERRORHST',
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
                                            id: prototype.id + '-de-txtCERROIN',
                                            fieldStyle: 'text-align:center',
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
                                            id: prototype.id + '-de-txtDES_CERROIN',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 200
                                        },
                                        {xtype: 'tbspacer', width: 165},
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
                                            id: prototype.id + '-de-txtFLAG',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-de-txtFromDateCERROR',
                                            text: 'Sett. vs Sales',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCERROR',
                                            fieldStyle: 'text-align:center',
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
                                            id: prototype.id + '-de-txtDES_CERROR',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 200
                                        },
                                        {xtype: 'tbspacer', width: 165},
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: 'Debits Information',
                                    id: prototype.id + '-txtFromDateTITULO',
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
                                            text: 'Trans. Date',
                                            id: prototype.id + '-de-txtFromDateBSUMDATE',
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
                                            text: 'Card Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 62
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCARCODE',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 36
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Account Nbr.',
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
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Authorization Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 31},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSAUTHOC',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 47
                                        },
                                        {xtype: 'tbspacer', width: 28},
                                        {
                                            xtype: 'label',
                                            text: 'Bank Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 64
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCODEBANK',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 57
                                        },
                                        {xtype: 'tbspacer', width: 1}
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
                                            text: 'PNR',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 35
                                        },
                                        {xtype: 'tbspacer', width: 8},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSPNR',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 6,
                                            width: 60,
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
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 23},
                                        {
                                            xtype: 'label',
                                            text: 'Debit Type',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDTYPE',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDebitType',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            width: 254,
                                            hidden: true,
                                            hiddenLabel: false
                                        },
                                        {xtype: 'tbspacer', width: 155, id: prototype.id + '-spcByDT'},
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
                                            id: prototype.id + '-de-txtSTVAL',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSTVALHide',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            hidden: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSVFOPHide',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            hidden: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
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
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Conciliation Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDATEC',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Transaction Conc.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTRANC',
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
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
//                                        {
//                                            xtype: 'label',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            text: 'Procesing Date',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtPRDA',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 100
//                                        },
//                                        {xtype: 'tbspacer', width: 24},
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
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'label',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            text: 'Sales Status',
                                            width: 95
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSTVALS',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Doc SAP',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBANDOC',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                            maskRe: /[0-9]/,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 10
                                        },
                                        {xtype: 'tbspacer', width: 265},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    id: prototype.id + '-PanelGridAndComments',
                                    margin: '10 0 10 100',
                                    items: [
                                        {
                                            xtype: 'tbspacer',
                                            width: 60,
                                            margin: '30 30 0 30',
                                            id: prototype.id + '-vacioComment',
                                        },
                                        {
                                            xtype: 'button',
                                            width: 30,
                                            margin: '30 30 0 30',
                                            id: prototype.id + '-mostrarComment',
                                            icon: 'resources/img/botones/Comment.png',
                                            tooltip: 'BPO Comment',
                                            listeners: {
                                                click: 'mostrarComment'
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            margin: '0 0 0 0',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    margin: '10 0 10 0',
                                                    id: prototype.id + '-PanelComments',
                                                    hidden: true,
                                                    height: 30,
                                                    width: 592,
                                                    bodyStyle: 'background:#efe5e5;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
//                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            margin: '5 0 0 10',
                                                            text: 'BPO Comment:',
                                                            width: 90
                                                        },
                                                        {xtype: 'tbspacer', width: 5},
                                                        {
                                                            xtype: 'label',
                                                            text: '(*)',
                                                            margin: '5 2 0 0',
                                                            id: prototype.id + '-COMENT_Forced',
                                                            hidden: true,
                                                            style: 'font-weight:bold;color:red;',
                                                            width: 20
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbCOMENT',
                                                            margin: '5 0 0 0',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            fieldStyle: 'text-align:left;',
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            valueField: 'CODE',
                                                            displayField: 'NAME',
                                                            width: 460,
                                                            labelWidth: 10,
                                                            hidden: false,
                                                            hiddenLabel: false
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    id: prototype.id + '-PanelAmountsMain',
                                                    margin: '0 0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridAmounts',
                                                            width: 692,
                                                            height: 158,
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
                                                                    {
                                                                        text: 'Commission',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: '', dataIndex: 'label1', width: 110,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'amount1', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'label2', width: 110,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'amount2', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return value;
                                                                                }
                                                                            },
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconciliation',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: '', dataIndex: 'label3', width: 110,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'amount3', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return value;
                                                                                }
                                                                            },
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 25,
                                                            //margin: '4 4 4 4',
                                                            id: prototype.id + '-mostrarDetalle',
                                                            icon: 'resources/img/botones/grid.png',
                                                            tooltip: 'Show Detail',
                                                            listeners: {
                                                                click: 'mostrarDeta'
                                                            }
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    hidden: true,
                                                    border: false,
                                                    id: prototype.id + '-PanelAmountsDeta',
                                                    margin: '0 0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridAmountsExtras',
                                                            width: 693,
                                                            height: 132,
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
                                                                    {
                                                                        text: 'Liquidación',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: '', dataIndex: 'label1EX', width: 110,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'amount1EX', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'label2EX', width: 110,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;background-color:#b1e1fc;";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'amount2EX', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b1e1fc;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'label3EX', width: 110,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {text: '', dataIndex: 'amount3EX', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                                    return value;
                                                                                }
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 25,
                                                            //margin: '4 4 4 4',
                                                            id: prototype.id + '-mostrarMain',
                                                            icon: 'resources/img/botones/grid.png',
                                                            tooltip: 'Show Main',
                                                            listeners: {
                                                                click: 'mostrarMain'
                                                            }
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
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
                                            text: 'Reverse ADM',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFREVADM',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'ADM',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFADM',
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
                                        {xtype: 'tbspacer', width: 5},
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
                                    hidden: true,
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
                                        //150
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Adj. Pago Duplicado',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            //margin: '4 4 4 4',
                                            iconCls: 'prx-icon-add',
                                            //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                            tooltip: 'Add Adjustment',
                                            listeners: {
                                                click: 'addAdjustment_keyDownHandler'
                                            }

                                        },
                                        {xtype: 'tbspacer', width: 30},
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
                                    ]
                                },
                                {xtype: 'tbspacer', height: 5},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelScanCard',
                                    layout: 'hbox',
                                    hidden: false,
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, higth: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Add Ticket',
                                            textAlign: 'center',
                                            id: prototype.id + '-lbl-TKTSCAN1',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-input-txtTKTScan1',
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
                                            id: prototype.id + '-txtCard11',
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
                                            id: prototype.id + '-txtCard22',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 4,
                                            width: 65,
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'label',
                                            text: 'Authorization',
                                            id: prototype.id + '-lblApproval',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtApproval',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
//                                            maskRe: /[0-9]/,
                                            maxLength: 6,
                                            width: 85,
                                            enableKeyEvents: true,
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-txtFromDateSDATE',
                                            text: 'Sales Date',
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
                                            style: {
                                                background: '#EFE5E5'
                                            },
                                            listeners: {
                                                click: 'clear_keyDownHandler'
                                            }

                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            id: prototype.id + '-btnClearCustom',
                                            //margin: '4 4 4 4',
                                            iconCls: 'prx-icon-image-trash',
                                            tooltip: 'Clean Detail',

                                            listeners: {
                                                click: 'clear_tableNormal'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 35},
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            id: prototype.id + '-btnRefresh',
                                            hidden:true,
                                            //margin: '4 4 4 4',
                                            iconCls: 'prx-icon-refresh',
                                            tooltip: 'Refresh Detail',

                                            listeners: {
                                                click: 'allRefreshDataEntryDebits'
                                            }
                                        },
//                                        {xtype: 'tbspacer', width: 5},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelScanCard_2',
                                    layout: 'hbox',
                                    hidden: false,
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, hight: 24},
                                        {
                                            xtype: 'label',
                                            text: 'PNR',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtScanPNR',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/,
                                            maxLength: 6,
                                            width: 65,
                                        },
                                        {xtype: 'tbspacer', width: 38},
                                        {
                                            xtype: 'label',
                                            text: 'Agent',
                                            id: prototype.id + '-lblScanSAGENT',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtScanSAGENT',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9/]/,
                                            maxLength: 8,
                                            width: 65,
                                        },
                                        {xtype: 'tbspacer', width: 710, id: prototype.id + '-spcGeneral'},
                                        
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelAdjustment',
                                    layout: 'hbox',
                                    hidden: true,
                                    border: false,
                                    margin: '0 0 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Adj Ticket',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-input-txtAdjTKTScan1',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 13,
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            //margin: '4 4 4 4',
                                            iconCls: 'prx-icon-add',
                                            tooltip: 'Add',
                                            listeners: {
                                                click: 'addAdjTicket_keyDownHandler'
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
                                    margin: '0 2 0 2',
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
                                            hidden: true,
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
                                            iconCls: 'prx-icon-image-log',
                                            id: prototype.id + '-btnReverse',
                                            hidden: true,
                                            //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                            tooltip: 'Reverse match',
                                            listeners: {
                                                click: 'reverseMatch_keyDownHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Adjustment',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-CODADJU',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 50,
                                            width: 200,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Observation',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtOBSERV-RO',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 50,
                                            width: 320,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 0 0 20',
                                    items: [
                                        {
                                            xtype: 'tabpanel',
                                            id: prototype.id + '-tabTableDebits',
                                            deferredRender: true,
                                            width: 1024,
                                            border: false,
//                                            height: 182, //820
//                                            anchor: '100%',
                                            margin: '0 0 0 0',
                                            autoScroll: true,
                                            bodyStyle: 'background: #B0533F',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panel_tab_REFND',
                                                    title: 'REFND',
                                                    listeners: {
                                                        activate: 'onWindowREFND'
                                                    },

                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            hidden: true,
                                                            id: prototype.id + '-panelScanRefnd',
                                                            layout: 'vbox',
                                                            border: false,
                                                            width: 1024,
//                                                            height: 180,
                                                            hidden: false,
                                                            autoScroll: true,
                                                            items: [
                                                                {
                                                                    xtype: 'tabpanel',
                                                                    id: prototype.id + '-tabMain_1',
                                                                    deferredRender: true,
                                                                    width: 1024,
                                                                    border: false,
                        //                                            height: 182, //820
                        //                                            anchor: '100%',
                                                                    margin: '0 0 0 0',
                                                                    autoScroll: true,
                                                                    bodyStyle: 'background: transparent',
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            id: prototype.id + '-panel_normal_REFND',
                                                                            title: 'Normal',
                                                                            listeners: {
                                                                                activate: 'onWindowNormal_REFND'
                                                                            },

                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    hidden: true,
                                                                                    id: prototype.id + '-panelDataInfoScan_REFND',
                                                                                    layout: 'vbox',
                                                                                    border: false,
                                                                                    width: 1024,
                        //                                                            height: 180,
                                                                                    hidden: false,
                                                                                    autoScroll: true,
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataInfoScan_REFND',
                                                                                            width: 1024,
                                                                                            height: 180,
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
                                                                                                    {text: 'Status', dataIndex: 'STVAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Match';
                                                                                                            if (record.data.STVAL === '1') {
                                                                                                                value = 'Match'
                                                                                                            } else if (record.data.STVAL === '5') {
                                                                                                                value = 'Match manual.'
                                                                                                            } else {
                                                                                                                value = 'Open'
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,hidden:true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            if (record.data.TDOC === 'A') {
                                                                                                                metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
//                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
//                                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                                            metaData.style = "text-align:center;";
//                                                                                                            return value;
//                                                                                                        }
//                                                                                                    },
                                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridA720FECVTA',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                        //                                                                                listeners: {
                        //                                                                                    click: 'onGridDataViewTktFinal'
                        //                                                                                },
                                                                                                        //editor: {xtype: 'textfield', editable: false},
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {sortable: true, text: 'Author.<br>Code', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Amount', dataIndex: 'A1531VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                        //                                                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85, id: prototype.id + '-gridTot_VFOPs',
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'CFUENTE', dataIndex: 'CFUENTE', width: 75, hidden: true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Authorization', dataIndex: 'SCLOSE', width: 90,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        sortable: false,
                                                                                                        xtype: 'actioncolumn',
                                                                                                        width: 40,
                                                                                                        text: 'Del.',
                                                                                                        id: prototype.id + '-gridColumnDelete_REFND',
                                                                                                        align: 'center',
                                                                                                        items: [
                                                                                                            {
                                                                                                                iconCls: 'prx-icon-image-trash',
                                                                                                                tooltip: 'Delete',
                                                                                                                handler: 'removeTKT_REFND'
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        sortable: false,
                                                                                                        xtype: 'actioncolumn',
                                                                                                        width: 40,
                                                                                                        text: 'Adj.',
                                                                                                        id: prototype.id + '-gridColumnAdj_REFND',
                                                                                                        align: 'center',
                                                                                                        items: [
                                                                                                            {
                                                                                                                iconCls: 'prx-icon-add',
                                                                                                                tooltip: 'Create adjustment',
                                                                                                                handler: 'onAdjust_REFND'
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        },
                                                                                        {xtype: 'tbspacer', height: 2},
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            layout: 'hbox',
                                                                                            id: prototype.id + '-panelADJ_REFND',
                                                                                            border: false,
                                                                                            hidden: true,
                                                                                            margin: '0 2 0 20',
                                                                                            bodyStyle: 'background:#efe5e5;',
                                                                                            items: [
                                                                                                {xtype: 'tbspacer', width: 30},
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    text: 'Adjustment Type',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    width: 120
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 10},
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    id: prototype.id + '-cmbADJTYPE_REFND',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    fieldStyle: 'text-align:left;',
                                                                                                    queryMode: 'local',
                                                                                                    triggerAction: 'all',
                                                                                                    valueField: 'CODE',
                                                                                                    displayField: 'NAME',
                                                                                                    width: 180,
                                                                                                    labelWidth: 10,
                                                                                                    hidden: false,
                                                                                                    hiddenLabel: false
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 30},
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    text: 'Observation',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    hidden: true,
                                                                                                    width: 100
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 10},
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.id + '-de-txtOBSERV_REFND',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    fieldStyle: 'text-align:left;',
                                                                                                    enforceMaxLength: true,
                                                                                                    maxLength: 50,
                                                                                                    hidden: true,
                                                                                                    width: 320,
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 50},
                                                                                            ]
                                                                                        },
                                                                                        {xtype: 'tbspacer', height: 2},
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataAdjustment_REFND',
                                                                                            width: 1014,
                                                                                            height: 60,
                                                                                            hidden: true,
                                                                                            columnLines: true,
                                                                                            //margin: '0 2 0 100',
                                                                                            plugins: [
                                                                                                {
                                                                                                    ptype: 'cellediting',
                                                                                                    clicksToEdit: 1
                                                                                                }
                                                                                            ],
                                                                                            hideHeaders: true,
                                                                                            columns: {
                                                                                                defaults: {
                                                                                                    menuDisabled: true,
                                                                                                    sortable: true,
                                                                                                    align: 'center'
                                                                                                },
                                                                                                items: [
                                                                                                    {text: 'Status', dataIndex: 'STMANUAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Adjustment';
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Adj.';
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridAdjA720FECVTA',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                                                                                                        editor: {xtype: 'textfield', editable: false},
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Authorization', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {header: 'Amount', dataIndex: 'A1531VFOP', width: 85, xtype: 'gridcolumn',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;background-color:#F0FA8F";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        },
                                                                                                        listeners: {
                                                                                                            click: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
                                                                                                                meDE.gridAdjustmentRowIndex = rowNum;
                                                                                                            },
                                                                                                        },
                                                                                                        editor: {
                                                                                                            xtype: 'textfield',
                                                                                                            editable: true,
                                                                                                            allowBlank: false,
                                                                                                            enableKeyEvents: true,
                                                                                                            maskRe: /[0-9\.-]/,
                                                                                                            selectOnFocus: true,
                                                                                                            listeners: {
                                                                                                                /*blur: function (field, e, eOpts) {
                                                                                                                 var newVal = field.getValue().trim();
                                                                                                                 field.setValue(newVal);
                                                                                                                 meDE.refreshValuesAdjustment(self, e, eOpts);
                                                                                                                 }*/
                                                                                                                specialkey: 'eventKeyAdjustment_REFND',
                                                                                                            }
                                                                                                        },
                                                                                                    },
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85, id: prototype.id + '-gridAdjTot_VFOPs',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: '', dataIndex: '', width: 40,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return '';
                                                                                                        }
                                                                                                    },
                                                                                                    {text: '', dataIndex: '', width: 30,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return '';
                                                                                                        }
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        }

                                                                                    ],

                                                                                },
                                                                            ],

                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            id: prototype.id + '-panel_blocked_REFND',
                                                                            title: 'Blocked',
                                                                            listeners: {
                                                                                activate: 'onWindowBlocked_REFND'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    hidden: true,
                                                                                    id: prototype.id + '-panelDataInfoScanBlocked_REFND',
                                                                                    layout: 'vbox',
                                                                                    border: false,
                                                                                    width: 1024,
                        //                                                            height: 180,
                                                                                    hidden: false,
                                                                                    autoScroll: true,
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataInfoScanBlocked_REFND',
                                                                                            width: 1022,
                                                                                            height: 180,
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
                                                                                                    {text: 'Status', dataIndex: 'STVAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Match';
                                                                                                            if (record.data.STVAL === '1') {
                                                                                                                value = 'Match'
                                                                                                            } else if (record.data.STVAL === '5') {
                                                                                                                value = 'Match manual.'
                                                                                                            } else {
                                                                                                                value = 'Open'
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,hidden:true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            if (record.data.TDOC === 'A') {
                                                                                                                metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                        //                                                                                listeners: {
                        //                                                                                    click: 'onGridDataViewTktFinal'
                        //                                                                                },
                                                                                                        //editor: {xtype: 'textfield', editable: false},
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Author.<br>Code', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Amount', dataIndex: 'A1531VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Authorization', dataIndex: 'SCLOSE', width: 90,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        },
                                                                                    ]
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                        
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panel_tab_Chgbak',
                                                    title: 'CHARGEBACK',
                                                    listeners: {
                                                        activate: 'onWindowChargebak'
                                                    },

                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            hidden: true,
                                                            id: prototype.id + '-panelScanChargebak',
                                                            layout: 'vbox',
                                                            border: false,
                                                            width: 1024,
//                                                            height: 180,
                                                            hidden: false,
                                                            autoScroll: true,
                                                            items: [
                                                                {
                                                                    xtype: 'tabpanel',
                                                                    id: prototype.id + '-tabMain_2',
                                                                    deferredRender: true,
                                                                    width: 1024,
                                                                    border: false,
                        //                                            height: 182, //820
                        //                                            anchor: '100%',
                                                                    margin: '0 0 0 0',
                                                                    autoScroll: true,
                                                                    bodyStyle: 'background: transparent',
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            id: prototype.id + '-panel_normal_Chgbak',
                                                                            title: 'Normal',
                                                                            listeners: {
                                                                                activate: 'onWindowNormal_Chgbak'
                                                                            },

                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    hidden: true,
                                                                                    id: prototype.id + '-panelDataInfoScan_Chgbak',
                                                                                    layout: 'vbox',
                                                                                    border: false,
                                                                                    width: 1024,
                        //                                                            height: 180,
                                                                                    hidden: false,
                                                                                    autoScroll: true,
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataInfoScan_Chgbak',
                                                                                            width: 1024,
                                                                                            height: 180,
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
                                                                                                    {text: 'Status', dataIndex: 'STVAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Match';
                                                                                                            if (record.data.STVAL === '1') {
                                                                                                                value = 'Match'
                                                                                                            } else if (record.data.STVAL === '5') {
                                                                                                                value = 'Match manual.'
                                                                                                            } else {
                                                                                                                value = 'Open'
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 71,hidden: true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            if (record.data.TDOC === 'A') {
                                                                                                                metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Trans.<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridA720FECVTA_Chgbak',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,hidden:true,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110, hidden: true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                        //                                                                                listeners: {
                        //                                                                                    click: 'onGridDataViewTktFinal'
                        //                                                                                },
                                                                                                        //editor: {xtype: 'textfield', editable: false},
                                                                                                    },
                                                                                                    {
                                                                                                        text: 'Charg. Concept',
                                                                                                        defaults: {
                                                                                                            menuDisabled: true,
                                                                                                            sortable: false,
                                                                                                            align: 'center'
                                                                                                        },
                                                                                                        columns: [
                                                                                                            {text: 'ID', dataIndex: 'IDDEB', width: 70,
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Name', dataIndex: 'NOMCONCEP', width: 110,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },

                                                                                                        ]
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {sortable: true, text: 'Author.<br>Code', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Amount', dataIndex: 'A1531VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                        //                                                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85, id: prototype.id + '-gridTot_VFOPs',
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'CFUENTE', dataIndex: 'CFUENTE', width: 75, hidden: true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        sortable: false,
                                                                                                        xtype: 'actioncolumn',
                                                                                                        width: 40,
                                                                                                        text: 'Del.',
                                                                                                        id: prototype.id + '-gridColumnDelete_Chgbak',
                                                                                                        align: 'center',
                                                                                                        items: [
                                                                                                            {
                                                                                                                iconCls: 'prx-icon-image-trash',
                                                                                                                tooltip: 'Delete',
                                                                                                                handler: 'removeTKT_Chgbak'
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        sortable: false,
                                                                                                        xtype: 'actioncolumn',
                                                                                                        width: 40,
                                                                                                        text: 'Adj.',
                                                                                                        id: prototype.id + '-gridColumnAdj_Chgbak',
                                                                                                        align: 'center',
                                                                                                        items: [
                                                                                                            {
                                                                                                                iconCls: 'prx-icon-add',
                                                                                                                tooltip: 'Create adjustment',
                                                                                                                handler: 'onAdjust_Chgbak'
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        },
                                                                                        {xtype: 'tbspacer', height: 2},
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            layout: 'hbox',
                                                                                            id: prototype.id + '-panelADJ_Chgbak',
                                                                                            border: false,
                                                                                            hidden: true,
                                                                                            margin: '0 2 0 20',
                                                                                            bodyStyle: 'background:#efe5e5;',
                                                                                            items: [
                                                                                                {xtype: 'tbspacer', width: 30},
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    text: 'Adjustment Type',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    width: 120
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 10},
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    id: prototype.id + '-cmbADJTYPE_Chgbak',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    fieldStyle: 'text-align:left;',
                                                                                                    queryMode: 'local',
                                                                                                    triggerAction: 'all',
                                                                                                    valueField: 'CODE',
                                                                                                    displayField: 'NAME',
                                                                                                    width: 180,
                                                                                                    labelWidth: 10,
                                                                                                    hidden: false,
                                                                                                    hiddenLabel: false
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 30},
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    text: 'Observation',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    hidden: true,
                                                                                                    width: 100
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 10},
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.id + '-de-txtOBSERV_Chgbak',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    fieldStyle: 'text-align:left;',
                                                                                                    enforceMaxLength: true,
                                                                                                    maxLength: 50,
                                                                                                    hidden: true,
                                                                                                    width: 320,
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 50},
                                                                                            ]
                                                                                        },
                                                                                        {xtype: 'tbspacer', height: 2},
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataAdjustment_Chgbak',
                                                                                            width: 1014,
                                                                                            height: 60,
                                                                                            hidden: true,
                                                                                            columnLines: true,
                                                                                            //margin: '0 2 0 100',
                                                                                            plugins: [
                                                                                                {
                                                                                                    ptype: 'cellediting',
                                                                                                    clicksToEdit: 1
                                                                                                }
                                                                                            ],
                                                                                            hideHeaders: true,
                                                                                            columns: {
                                                                                                defaults: {
                                                                                                    menuDisabled: true,
                                                                                                    sortable: true,
                                                                                                    align: 'center'
                                                                                                },
                                                                                                items: [
                                                                                                    {text: 'Status', dataIndex: 'STMANUAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Adjustment';
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Adj.';
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridAdjA720FECVTA_Chgbak',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                                                                                                        editor: {xtype: 'textfield', editable: false},
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Authorization', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {header: 'Amount', dataIndex: 'A1531VFOP', width: 85, xtype: 'gridcolumn',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;background-color:#F0FA8F";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        },
                                                                                                        listeners: {
                                                                                                            click: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
                                                                                                                meDE.gridAdjustmentRowIndex = rowNum;
                                                                                                            },
                                                                                                        },
                                                                                                        editor: {
                                                                                                            xtype: 'textfield',
                                                                                                            editable: true,
                                                                                                            allowBlank: false,
                                                                                                            enableKeyEvents: true,
                                                                                                            maskRe: /[0-9\.-]/,
                                                                                                            selectOnFocus: true,
                                                                                                            listeners: {
                                                                                                                /*blur: function (field, e, eOpts) {
                                                                                                                 var newVal = field.getValue().trim();
                                                                                                                 field.setValue(newVal);
                                                                                                                 meDE.refreshValuesAdjustment(self, e, eOpts);
                                                                                                                 }*/
                                                                                                                specialkey: 'eventKeyAdjustment_Chgbak',
                                                                                                            }
                                                                                                        },
                                                                                                    },
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85, id: prototype.id + '-gridAdjTot_VFOPs_Chgbak',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: '', dataIndex: '', width: 40,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return '';
                                                                                                        }
                                                                                                    },
                                                                                                    {text: '', dataIndex: '', width: 30,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return '';
                                                                                                        }
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        }

                                                                                    ],

                                                                                },
                                                                            ],

                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            id: prototype.id + '-panel_blocked_Chgbak',
                                                                            title: 'Blocked',
                                                                            listeners: {
                                                                                activate: 'onWindowBlocked_Chgbak'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    hidden: true,
                                                                                    id: prototype.id + '-panelDataInfoScanBlocked_Chgbak',
                                                                                    layout: 'vbox',
                                                                                    border: false,
                                                                                    width: 1024,
                        //                                                            height: 180,
                                                                                    hidden: false,
                                                                                    autoScroll: true,
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataInfoScanBlocked_Chgbak',
                                                                                            width: 1022,
                                                                                            height: 180,
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
                                                                                                    {text: 'Status', dataIndex: 'STVAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Match';
                                                                                                            if (record.data.STVAL === '1') {
                                                                                                                value = 'Match'
                                                                                                            } else if (record.data.STVAL === '5') {
                                                                                                                value = 'Match manual.'
                                                                                                            } else {
                                                                                                                value = 'Open'
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 71, hidden: true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            if (record.data.TDOC === 'A') {
                                                                                                                metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63, hidden: true,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,hidden:true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                        //                                                                                listeners: {
                        //                                                                                    click: 'onGridDataViewTktFinal'
                        //                                                                                },
                                                                                                        //editor: {xtype: 'textfield', editable: false},
                                                                                                    },
                                                                                                    {
                                                                                                        text: 'Charg. Concept',
                                                                                                        defaults: {
                                                                                                            menuDisabled: true,
                                                                                                            sortable: false,
                                                                                                            align: 'center'
                                                                                                        },
                                                                                                        columns: [
                                                                                                            {text: 'ID', dataIndex: 'IDDEB', width: 70,
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Name', dataIndex: 'NOMCONCEP', width: 110,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },

                                                                                                        ]
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Author.<br>Code', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Amount', dataIndex: 'A1531VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        },
                                                                                    ]
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                        
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panel_tab_Acredit',
                                                    title: 'ACREDITATIONS',
                                                    listeners: {
                                                        activate: 'onWindowAcredit'
                                                    },

                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            hidden: true,
                                                            id: prototype.id + '-panelScanAcredit',
                                                            layout: 'vbox',
                                                            border: false,
                                                            width: 1024,
//                                                            height: 180,
                                                            hidden: false,
                                                            autoScroll: true,
                                                            items: [
                                                                {
                                                                    xtype: 'tabpanel',
                                                                    id: prototype.id + '-tabMain_3',
                                                                    deferredRender: true,
                                                                    width: 1024,
                                                                    border: false,
                        //                                            height: 182, //820
                        //                                            anchor: '100%',
                                                                    margin: '0 0 0 0',
                                                                    autoScroll: true,
                                                                    bodyStyle: 'background: transparent',
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            id: prototype.id + '-panel_normal_Acredit',
                                                                            title: 'Normal',
                                                                            listeners: {
                                                                                activate: 'onWindowNormal_Acredit'
                                                                            },

                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    hidden: true,
                                                                                    id: prototype.id + '-panelDataInfoScan_Acredit',
                                                                                    layout: 'vbox',
                                                                                    border: false,
                                                                                    width: 1024,
                        //                                                            height: 180,
                                                                                    hidden: false,
                                                                                    autoScroll: true,
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataInfoScan_Acredit',
                                                                                            width: 1024,
                                                                                            height: 180,
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
                                                                                                    {text: 'Status', dataIndex: 'STVAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Match';
                                                                                                            if (record.data.STVAL === '1') {
                                                                                                                value = 'Match'
                                                                                                            } else if (record.data.STVAL === '5') {
                                                                                                                value = 'Match manual.'
                                                                                                            } else {
                                                                                                                value = 'Open'
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,hidden: true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            if (record.data.TDOC === 'A') {
                                                                                                                metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridA720FECVTA_Acredit',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                        //                                                                                listeners: {
                        //                                                                                    click: 'onGridDataViewTktFinal'
                        //                                                                                },
                                                                                                        //editor: {xtype: 'textfield', editable: false},
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {sortable: true, text: 'Author.<br>Code', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Amount', dataIndex: 'A1531VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                        //                                                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85, id: prototype.id + '-gridTot_VFOPs',
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'CFUENTE', dataIndex: 'CFUENTE', width: 75, hidden: true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        sortable: false,
                                                                                                        xtype: 'actioncolumn',
                                                                                                        width: 40,
                                                                                                        text: 'Del.',
                                                                                                        id: prototype.id + '-gridColumnDelete_Acredit',
                                                                                                        align: 'center',
                                                                                                        items: [
                                                                                                            {
                                                                                                                iconCls: 'prx-icon-image-trash',
                                                                                                                tooltip: 'Delete',
                                                                                                                handler: 'removeTKT_Acredit'
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        sortable: false,
                                                                                                        xtype: 'actioncolumn',
                                                                                                        width: 40,
                                                                                                        text: 'Adj.',
                                                                                                        id: prototype.id + '-gridColumnAdj_Acredit',
                                                                                                        align: 'center',
                                                                                                        items: [
                                                                                                            {
                                                                                                                iconCls: 'prx-icon-add',
                                                                                                                tooltip: 'Create adjustment',
                                                                                                                handler: 'onAdjust_Acredit'
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        },
                                                                                        {xtype: 'tbspacer', height: 2},
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            layout: 'hbox',
                                                                                            id: prototype.id + '-panelADJ_Acredit',
                                                                                            border: false,
                                                                                            hidden: true,
                                                                                            margin: '0 2 0 20',
                                                                                            bodyStyle: 'background:#efe5e5;',
                                                                                            items: [
                                                                                                {xtype: 'tbspacer', width: 30},
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    text: 'Adjustment Type',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    width: 120
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 10},
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    id: prototype.id + '-cmbADJTYPE_Acredit',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    fieldStyle: 'text-align:left;',
                                                                                                    queryMode: 'local',
                                                                                                    triggerAction: 'all',
                                                                                                    valueField: 'CODE',
                                                                                                    displayField: 'NAME',
                                                                                                    width: 180,
                                                                                                    labelWidth: 10,
                                                                                                    hidden: false,
                                                                                                    hiddenLabel: false
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 30},
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    text: 'Observation',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    hidden: true,
                                                                                                    width: 100
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 10},
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.id + '-de-txtOBSERV_Acredit',
                                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                                    fieldStyle: 'text-align:left;',
                                                                                                    enforceMaxLength: true,
                                                                                                    maxLength: 50,
                                                                                                    hidden: true,
                                                                                                    width: 320,
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 50},
                                                                                            ]
                                                                                        },
                                                                                        {xtype: 'tbspacer', height: 2},
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataAdjustment_Acredit',
                                                                                            width: 1014,
                                                                                            height: 60,
                                                                                            hidden: true,
                                                                                            columnLines: true,
                                                                                            //margin: '0 2 0 100',
                                                                                            plugins: [
                                                                                                {
                                                                                                    ptype: 'cellediting',
                                                                                                    clicksToEdit: 1
                                                                                                }
                                                                                            ],
                                                                                            hideHeaders: true,
                                                                                            columns: {
                                                                                                defaults: {
                                                                                                    menuDisabled: true,
                                                                                                    sortable: true,
                                                                                                    align: 'center'
                                                                                                },
                                                                                                items: [
                                                                                                    {text: 'Status', dataIndex: 'STMANUAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Adjustment';
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Adj.';
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridAdjA720FECVTA_Acredit',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                                                                                                        editor: {xtype: 'textfield', editable: false},
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Authorization', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {header: 'Amount', dataIndex: 'A1531VFOP', width: 85, xtype: 'gridcolumn',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;background-color:#F0FA8F";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        },
                                                                                                        listeners: {
                                                                                                            click: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
                                                                                                                meDE.gridAdjustmentRowIndex = rowNum;
                                                                                                            },
                                                                                                        },
                                                                                                        editor: {
                                                                                                            xtype: 'textfield',
                                                                                                            editable: true,
                                                                                                            allowBlank: false,
                                                                                                            enableKeyEvents: true,
                                                                                                            maskRe: /[0-9\.-]/,
                                                                                                            selectOnFocus: true,
                                                                                                            listeners: {
                                                                                                                /*blur: function (field, e, eOpts) {
                                                                                                                 var newVal = field.getValue().trim();
                                                                                                                 field.setValue(newVal);
                                                                                                                 meDE.refreshValuesAdjustment(self, e, eOpts);
                                                                                                                 }*/
                                                                                                                specialkey: 'eventKeyAdjustment_Acredit',
                                                                                                            }
                                                                                                        },
                                                                                                    },
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85, id: prototype.id + '-gridAdjTot_VFOPs_Acredit',
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: '', dataIndex: '', width: 40,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return '';
                                                                                                        }
                                                                                                    },
                                                                                                    {text: '', dataIndex: '', width: 30,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return '';
                                                                                                        }
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        }

                                                                                    ],

                                                                                },
                                                                            ],

                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            id: prototype.id + '-panel_blocked_Acredit',
                                                                            title: 'Blocked',
                                                                            listeners: {
                                                                                activate: 'onWindowBlocked_Acredit'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    hidden: true,
                                                                                    id: prototype.id + '-panelDataInfoScanBlocked_Acredit',
                                                                                    layout: 'vbox',
                                                                                    border: false,
                                                                                    width: 1024,
                        //                                                            height: 180,
                                                                                    hidden: false,
                                                                                    autoScroll: true,
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'grid',
                                                                                            id: prototype.id + '-gridDataInfoScanBlocked_Acredit',
                                                                                            width: 1022,
                                                                                            height: 180,
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
                                                                                                    {text: 'Status', dataIndex: 'STVAL', width: 100,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            value = 'Match';
                                                                                                            if (record.data.STVAL === '1') {
                                                                                                                value = 'Match'
                                                                                                            } else if (record.data.STVAL === '5') {
                                                                                                                value = 'Match manual.'
                                                                                                            } else {
                                                                                                                value = 'Open'
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,hidden: true,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            if (record.data.TDOC === 'A') {
                                                                                                                metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                                                                            }
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        },
                        //                                                                                listeners: {
                        //                                                                                    click: 'onGridDataViewTktFinal'
                        //                                                                                },
                                                                                                        //editor: {xtype: 'textfield', editable: false},
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
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Number', dataIndex: 'A1531NREF', width: 130,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            },
                                                                                                            {text: 'Author.<br>Code', dataIndex: 'A1531CAPL', width: 65,
                                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                                    metaData.style = "text-align:center;";
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
                                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:center;";
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Amount', dataIndex: 'A1531VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                    {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85,
                                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                            metaData.style = "text-align:right;";
                                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                                            return value;
                                                                                                        }
                                                                                                    },
                                                                                                ]
                                                                                            }
                                                                                        },
                                                                                    ]
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                        
                                                    ]
                                                }
                                                
                                            ]                   
                                        }
                                    ]
                                    
                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    margin: '0 0 0 0',
//
//                                    //bodyStyle: 'background:#efe5e5;',
//                                    items: [
//                                        {
//                                            xtype: 'tabpanel',
//                                            id: prototype.id + '-tabMain',
//                                            deferredRender: true,
//                                            width: 1109,
//                                            border: false,
////                                            height: 182, //820
////                                            anchor: '100%',
//                                            margin: '5 0 1 20',
//                                            autoScroll: true,
//                                            bodyStyle: 'background: transparent',
//                                            items: [
//                                                {
//                                                    xtype: 'panel',
////                                                    id: prototype.id + '-SalesAnalysis_tab',
//                                                    title: 'Normal',
//                                                    listeners: {
//                                                        activate: 'onWindowNormal'
//                                                    },
//
//                                                    items: [
//                                                        {
//                                                            xtype: 'panel',
//                                                            hidden: true,
//                                                            id: prototype.id + '-panelDataInfoScan',
//                                                            layout: 'vbox',
//                                                            border: false,
//                                                            width: 1109,
////                                                            height: 180,
//                                                            hidden: false,
//                                                            autoScroll: true,
//                                                            items: [
//                                                                {
//                                                                    xtype: 'grid',
//                                                                    id: prototype.id + '-gridDataInfoScan',
//                                                                    width: 1107,
//                                                                    height: 180,
//                                                                    columnLines: true,
//                                                                    plugins: [
//                                                                        {
//                                                                            ptype: 'cellediting',
//                                                                            clicksToEdit: 1
//                                                                        }
//                                                                    ],
//                                                                    columns: {
//                                                                        defaults: {
//                                                                            menuDisabled: true,
//                                                                            sortable: true,
//                                                                            align: 'center'
//                                                                        },
//                                                                        items: [
//                                                                            {text: 'Status', dataIndex: 'STVAL', width: 100,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    value = 'Match';
//                                                                                    if (record.data.STVAL === '1') {
//                                                                                        value = 'Match'
//                                                                                    } else if (record.data.STVAL === '5') {
//                                                                                        value = 'Match manual.'
//                                                                                    } else {
//                                                                                        value = 'Open'
//                                                                                    }
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    if (record.data.TDOC === 'A') {
//                                                                                        metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
//                                                                                    }
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridA720FECVTA',
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'PNR', dataIndex: 'A720PNR', width: 63,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                },
////                                                                                listeners: {
////                                                                                    click: 'onGridDataViewTktFinal'
////                                                                                },
//                                                                                //editor: {xtype: 'textfield', editable: false},
//                                                                            },
//                                                                            {
//                                                                                text: 'Credit Card',
//                                                                                defaults: {
//                                                                                    menuDisabled: true,
//                                                                                    sortable: false,
//                                                                                    align: 'center'
//                                                                                },
//                                                                                columns: [
//                                                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    },
//                                                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 130,
//                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    },
//                                                                                    {sortable: true, text: 'Author.<br>Code', dataIndex: 'A1531CAPL', width: 65,
//                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    }
//                                                                                ]
//                                                                            },
//                                                                            {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Amount', dataIndex: 'A1531VFOP', width: 85,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                                                    return value;
//                                                                                }
//                                                                            },
////                                                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85, id: prototype.id + '-gridTot_VFOPs',
//                                                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'CFUENTE', dataIndex: 'CFUENTE', width: 75, hidden: true,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {
//                                                                                sortable: false,
//                                                                                xtype: 'actioncolumn',
//                                                                                width: 40,
//                                                                                text: 'Del.',
//                                                                                id: prototype.id + '-gridColumnDelete',
//                                                                                align: 'center',
//                                                                                items: [
//                                                                                    {
//                                                                                        iconCls: 'prx-icon-image-trash',
//                                                                                        tooltip: 'Delete',
//                                                                                        handler: 'removeTKT'
//                                                                                    }
//                                                                                ]
//                                                                            },
//                                                                            {
//                                                                                sortable: false,
//                                                                                xtype: 'actioncolumn',
//                                                                                width: 40,
//                                                                                text: 'Adj.',
//                                                                                id: prototype.id + '-gridColumnAdj',
//                                                                                align: 'center',
//                                                                                items: [
//                                                                                    {
//                                                                                        iconCls: 'prx-icon-add',
//                                                                                        tooltip: 'Create adjustment',
//                                                                                        handler: 'onAdjust'
//                                                                                    }
//                                                                                ]
//                                                                            },
//                                                                        ]
//                                                                    }
//                                                                },
//                                                                {xtype: 'tbspacer', height: 2},
//                                                                {
//                                                                    xtype: 'panel',
//                                                                    layout: 'hbox',
//                                                                    id: prototype.id + '-panelADJ',
//                                                                    border: false,
//                                                                    hidden: true,
//                                                                    margin: '0 2 0 20',
//                                                                    bodyStyle: 'background:#efe5e5;',
//                                                                    items: [
//                                                                        {xtype: 'tbspacer', width: 30},
//                                                                        {
//                                                                            xtype: 'label',
//                                                                            text: 'Adjustment Type',
//                                                                            style: 'font-weight:bold;color:#0B333C;',
//                                                                            width: 120
//                                                                        },
//                                                                        {xtype: 'tbspacer', width: 10},
//                                                                        {
//                                                                            xtype: 'combo',
//                                                                            id: prototype.id + '-cmbADJTYPE',
//                                                                            style: 'font-weight:bold;color:#0B333C;',
//                                                                            fieldStyle: 'text-align:left;',
//                                                                            queryMode: 'local',
//                                                                            triggerAction: 'all',
//                                                                            valueField: 'CODE',
//                                                                            displayField: 'NAME',
//                                                                            width: 180,
//                                                                            labelWidth: 10,
//                                                                            hidden: false,
//                                                                            hiddenLabel: false
//                                                                        },
//                                                                        {xtype: 'tbspacer', width: 30},
//                                                                        {
//                                                                            xtype: 'label',
//                                                                            text: 'Observation',
//                                                                            style: 'font-weight:bold;color:#0B333C;',
//                                                                            hidden: true,
//                                                                            width: 100
//                                                                        },
//                                                                        {xtype: 'tbspacer', width: 10},
//                                                                        {
//                                                                            xtype: 'textfield',
//                                                                            id: prototype.id + '-de-txtOBSERV',
//                                                                            style: 'font-weight:bold;color:#0B333C;',
//                                                                            fieldStyle: 'text-align:left;',
//                                                                            enforceMaxLength: true,
//                                                                            maxLength: 50,
//                                                                            hidden: true,
//                                                                            width: 320,
//                                                                        },
//                                                                        {xtype: 'tbspacer', width: 50},
//                                                                    ]
//                                                                },
//                                                                {xtype: 'tbspacer', height: 2},
//                                                                {
//                                                                    xtype: 'grid',
//                                                                    id: prototype.id + '-gridDataAdjustment',
//                                                                    width: 1014,
//                                                                    height: 60,
//                                                                    hidden: true,
//                                                                    columnLines: true,
//                                                                    //margin: '0 2 0 100',
//                                                                    plugins: [
//                                                                        {
//                                                                            ptype: 'cellediting',
//                                                                            clicksToEdit: 1
//                                                                        }
//                                                                    ],
//                                                                    hideHeaders: true,
//                                                                    columns: {
//                                                                        defaults: {
//                                                                            menuDisabled: true,
//                                                                            sortable: true,
//                                                                            align: 'center'
//                                                                        },
//                                                                        items: [
//                                                                            {text: 'Status', dataIndex: 'STMANUAL', width: 100,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    value = 'Adjustment';
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    value = 'Adj.';
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridAdjA720FECVTA',
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'PNR', dataIndex: 'A720PNR', width: 63,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                },
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                            },
//                                                                            {
//                                                                                text: 'Credit Card',
//                                                                                defaults: {
//                                                                                    menuDisabled: true,
//                                                                                    sortable: false,
//                                                                                    align: 'center'
//                                                                                },
//                                                                                columns: [
//                                                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    },
//                                                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 130,
//                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    },
//                                                                                    {text: 'Authorization', dataIndex: 'A1531CAPL', width: 65,
//                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    }
//                                                                                ]
//                                                                            },
//                                                                            {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {header: 'Amount', dataIndex: 'A1531VFOP', width: 85, xtype: 'gridcolumn',
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;background-color:#F0FA8F";
//                                                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                                                    return value;
//                                                                                },
//                                                                                listeners: {
//                                                                                    click: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
//                                                                                        meDE.gridAdjustmentRowIndex = rowNum;
//                                                                                    },
//                                                                                },
//                                                                                editor: {
//                                                                                    xtype: 'textfield',
//                                                                                    editable: true,
//                                                                                    allowBlank: false,
//                                                                                    enableKeyEvents: true,
//                                                                                    maskRe: /[0-9\.-]/,
//                                                                                    selectOnFocus: true,
//                                                                                    listeners: {
//                                                                                        /*blur: function (field, e, eOpts) {
//                                                                                         var newVal = field.getValue().trim();
//                                                                                         field.setValue(newVal);
//                                                                                         meDE.refreshValuesAdjustment(self, e, eOpts);
//                                                                                         }*/
//                                                                                        specialkey: 'eventKeyAdjustment',
//                                                                                    }
//                                                                                },
//                                                                            },
//                                                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85, id: prototype.id + '-gridAdjTot_VFOPs',
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: '', dataIndex: '', width: 40,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return '';
//                                                                                }
//                                                                            },
//                                                                            {text: '', dataIndex: '', width: 30,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return '';
//                                                                                }
//                                                                            },
//                                                                        ]
//                                                                    }
//                                                                }
//
//                                                            ],
//
//                                                        },
//                                                    ],
//
//                                                },
//                                                {
//                                                    xtype: 'panel',
////                                                    id: prototype.id + '-FlownAnalysis_tab',
//                                                    title: 'Blocked',
//                                                    listeners: {
//                                                        activate: 'onWindowBlocked'
//                                                    },
//                                                    items: [
//                                                        {
//                                                            xtype: 'panel',
//                                                            hidden: true,
//                                                            id: prototype.id + '-panelDataInfoScanBlocked',
//                                                            layout: 'vbox',
//                                                            border: false,
//                                                            width: 1024,
////                                                            height: 180,
//                                                            hidden: false,
//                                                            autoScroll: true,
//                                                            items: [
//                                                                {
//                                                                    xtype: 'grid',
//                                                                    id: prototype.id + '-gridDataInfoScanBlocked',
//                                                                    width: 1022,
//                                                                    height: 180,
//                                                                    columnLines: true,
//                                                                    plugins: [
//                                                                        {
//                                                                            ptype: 'cellediting',
//                                                                            clicksToEdit: 1
//                                                                        }
//                                                                    ],
//                                                                    columns: {
//                                                                        defaults: {
//                                                                            menuDisabled: true,
//                                                                            sortable: true,
//                                                                            align: 'center'
//                                                                        },
//                                                                        items: [
//                                                                            {text: 'Status', dataIndex: 'STVAL', width: 100,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    value = 'Match';
//                                                                                    if (record.data.STVAL === '1') {
//                                                                                        value = 'Match'
//                                                                                    } else if (record.data.STVAL === '5') {
//                                                                                        value = 'Match manual.'
//                                                                                    } else {
//                                                                                        value = 'Open'
//                                                                                    }
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    if (record.data.TDOC === 'A') {
//                                                                                        metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
//                                                                                    }
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'PNR', dataIndex: 'A720PNR', width: 63,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                },
////                                                                                listeners: {
////                                                                                    click: 'onGridDataViewTktFinal'
////                                                                                },
//                                                                                //editor: {xtype: 'textfield', editable: false},
//                                                                            },
//                                                                            {
//                                                                                text: 'Credit Card',
//                                                                                defaults: {
//                                                                                    menuDisabled: true,
//                                                                                    sortable: false,
//                                                                                    align: 'center'
//                                                                                },
//                                                                                columns: [
//                                                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    },
//                                                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 130,
//                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    },
//                                                                                    {text: 'Author.<br>Code', dataIndex: 'A1531CAPL', width: 65,
//                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    }
//                                                                                ]
//                                                                            },
//                                                                            {text: 'Curr', dataIndex: 'A1531MFOP', width: 45,
//                                                                                editor: {xtype: 'textfield', editable: false},
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:center;";
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Amount', dataIndex: 'A1531VFOP', width: 85,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 85,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                                                    return value;
//                                                                                }
//                                                                            },
//                                                                        ]
//                                                                    }
//                                                                },
//                                                            ]
//                                                        },
//                                                    ]
//                                                },
//                                            ]
//                                        },
////                                       
//                                    ]
//                                },

                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 0 0 217',
                                    id: prototype.id + '-panelSumAmount',
                                    //bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 460},
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
                                            width: 90,
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
                            width: 180,
                            margin: '8 2 4 19'
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
                            text: 'Reverse Match',
                            id: prototype.id + '-btn-reverse',
                            iconCls: 'prx-icon-delete',
                            hidden: true,
                            listeners: {
                                click: 'onReverseClick'
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
    ]
}
);