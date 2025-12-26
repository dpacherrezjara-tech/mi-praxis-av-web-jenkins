Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryAMDPCASH', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAMDPCASHBankReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.BankReconciliation.DataEntryAMDPCASHBankReconciliationController'
    ],
    controller: 'DataEntryAMDPCASHBankReconciliationController',
    title: 'Bank Reconciliation - Data Entry Form 2',
    header: true,
    height: 920,
    width: 1310,
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
            width: 1310,
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
                            width: 1310,
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
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1120
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtStatusCash',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'label',
                                            text: 'Source',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSource',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            text: 'Adate',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtAdate',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 180,
                                        },
                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            text: 'Scountry',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtScountry',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 130,
                                        },
                                        {xtype: 'tbspacer', width: 10},
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
                                            text: 'Currency',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtScurrency',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'label',
                                            text: 'Negocio',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNegocio',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            text: 'Account',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtAccount',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 180
                                        },
                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            text: 'Bandoc',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBandoc',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 130
                                        },
                                        {xtype: 'tbspacer', width: 10}
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
                                            text: 'Neto',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNeto',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'label',
                                            text: 'Qty Tkt',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQtyTkt',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 660}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
//                                    margin: '0 2 0 20',
//                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
//                                            margin: '0 2 0 20',
//                                            bodyStyle: 'background:#E5ECEF;',
                                            height: 20,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Conciliate',
                                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                                    bodyStyle: 'background:#E5ECEF;',
                                                    fontSize: '11',
                                                    width: 380,
//                                                    height: 20,
                                                    margin: '4 2 4 8'
                                                },
                                            ]
                                        },

                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
//                                            margin: '0 2 0 20',
                                            height: 20,
                                            width: 240,
                                            margin: '0 0 0 152',
                                            bodyStyle: 'background:#f4fff9;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    text: 'Phase I',
                                                    width: 120,
                                                    margin: '4 0 0 95',
//                                                    bodyStyle: 'background:#f8fcc5;',

                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
//                                            margin: '0 2 0 20',
                                            height: 20,
                                            width: 255,
                                            bodyStyle: 'background:#dfffec;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    text: 'Phase II CASH',
                                                    margin: '4 0 0 100',
                                                    bodyStyle: 'background:#dfffec;',
                                                    width: 120
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
                                        {xtype: 'tbspacer', width: 7},
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
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Rule',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
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
                                        {xtype: 'tbspacer', width: 45},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#f4fff9;',
                                            items: [
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80,
                                                    margin: '0 0 0 0',
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtDATECI',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 25},
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#dfffec;',
                                            items: [
                                                {xtype: 'tbspacer', width: 25},
                                                {
                                                    xtype: 'label',
                                                    text: 'Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90
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
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 12},

                                        {
                                            xtype: 'label',
                                            text: 'Neto Match.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNetConciliado',
                                            fieldCls: 'detalle-society-textfield',
                                            style: 'font-weight:bold;color:#d5f4d5',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 10}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, },
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
                                            margin: '2 0 0 0',
                                            readOnly: true,
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Qty Settl.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYDOC',
                                            fieldStyle: 'text-align:center',
                                            margin: '2 0 0 0',
                                            fieldCls: 'detalle-qtydoc-textfield',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100,
                                        },
                                        {xtype: 'tbspacer', width: 45},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#f4fff9;',
                                            items: [
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Transaction',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtTRANCI',
                                                    margin: '2 0 0 0',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 25},
                                            ]
                                        },

                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#dfffec;',
                                            items: [
                                                {xtype: 'tbspacer', width: 25},

                                                {
                                                    xtype: 'label',
                                                    text: 'Transaction',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtTRANC',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    margin: '2 0 0 0',
                                                    readOnly: true,
                                                    width: 100,
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 12},
                                        {
                                            xtype: 'label',
                                            text: 'Neto Pend.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNetoPending',
                                            fieldCls: 'detalle-society-textfield',
                                            margin: '2 0 0 0',
                                            style: 'font-weight:bold;color:#d5f4d5',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                    ]
                                },

                                {
                                    xtype: 'label',
                                    text: 'Settlement Detail',
                                    id: prototype.id + '-txtFromDateTITULO',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 334,
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
                                            text: 'Currency',
                                            id: prototype.id + '-de-txtFromDateBSUMDATE',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCurrency191',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCOUNTRY191',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Consol',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCONSOL_191',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 120,
                                            maskRe: /[0-9]/,
                                            readOnly: true,
                                            enforceMaxLength: true,
                                            maxLength: 10
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Strdate',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSTRDATE',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Enddate',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtENDDATE',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
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
                                            text: 'Billing Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtPAYAMOU191',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Neto',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNETO191',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Adjustment.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCOMISION191',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'QTYTKT',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYTKT191',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 50},

                                        {xtype: 'tbspacer', width: 160},
                                    ]
                                },

                                //CONTAIN
                                {
                                    xtype: 'container',
                                    id: prototype.id + '-containerPanelScan',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            hidden: true,
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
                                                {xtype: 'tbspacer', width: 145},
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Settlement Delivery',
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
//                                        {
//                                            xtype: 'panel',
//                                            layout: 'hbox',
//                                            border: false,
//                                            width: 1205,
//                                            margin: '0 0 0 20',
////                                            bodyStyle: 'background: transparent',
////                                            width: 1225,
////                                            bodyStyle: 'background:#e0e0e0;',
//                                            bodyStyle: 'background:#e0e0e0; border-radius: 10px 10px 0 0;',
//                                            items: [
//                                                {
//                                                    xtype: 'label',
//                                                    text: 'Date',
//                                                    style: 'font-weight:bold;color:#0B333C;',
//                                                    width: 80,
//                                                    margin: '0 0 0 780',
//                                                },
//                                                {xtype: 'tbspacer', width: 5},
//                                                {
//                                                    xtype: 'textfield',
//                                                    id: prototype.id + '-de-txtDATECI',
//                                                    fieldStyle: 'text-align:center',
//                                                    enforceMaxLength: true,
//                                                    readOnly: true,
//                                                    width: 100
//                                                },
//                                                {xtype: 'tbspacer', width: 5},
//                                                {
//                                                    xtype: 'label',
//                                                    text: 'Transaction',
//                                                    style: 'font-weight:bold;color:#0B333C;',
//                                                    width: 80
//                                                },
//                                                {xtype: 'tbspacer', width: 5},
//                                                {
//                                                    xtype: 'textfield',
//                                                    id: prototype.id + '-de-txtTRANCI',
//                                                    fieldStyle: 'text-align:center',
//                                                    enforceMaxLength: true,
//                                                    readOnly: true,
//                                                    width: 100
//                                                },
//                                            ]
//                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '8 0 8 0',
                                            width: 1225,
                                            //bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnExcelCash',
                                                    iconCls: 'prx-icon-excel',
                                                    tooltip: 'Export to csv',
                                                    handler: 'ExportCSV'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnShowWOSales',
                                                    text: 'Show W/O Sales',
                                                    margin: '0 5 0 5',
                                                    width: 130,
                                                    handler: 'onShowWOSales'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'button',
                                                    width: 30,
//                                                    margin: '30 30 0 30',
                                                    id: prototype.id + '-mostrarCommentCash',
                                                    icon: 'resources/img/botones/Comment.png',
                                                    tooltip: 'BPO Comment',
                                                    listeners: {
                                                        click: 'mostrarCommentCash'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    margin: '0 0 0 0',
                                                    id: prototype.id + '-PanelCommentsCash',
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
                                                            id: prototype.id + '-COMENT_ForcedCash',
                                                            hidden: true,
                                                            style: 'font-weight:bold;color:red;',
                                                            width: 20
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbCOMENTCASH',
                                                            margin: '5 0 0 0',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            fieldStyle: 'text-align:left;',
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            valueField: 'CODE',
                                                            displayField: 'NAME',
                                                            width: 300,
                                                            labelWidth: 10,
                                                            hidden: false,
                                                            hiddenLabel: false
                                                        },
                                                        {xtype: 'tbspacer', width: 5},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnUpdateCommentsCash',
                                                            iconCls: 'prx-icon-update',
                                                            text: 'Update Comments',
                                                            margin: '4 10 0 10',
                                                            width: 130,
//                                                            style: 'font-weight:bold;background:#6A95AF;color:white;',
                                                            handler: 'onUpdateCommentsCash'
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '0 0 0 0',
                                            width: 1225,
                                            //bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    id: prototype.id + '-tabMain',
                                                    deferredRender: true,
                                                    width: 1225,
                                                    border: false,
                                                    height: 280, //820
                                                    //                                            anchor: '100%',
                                                    margin: '0 0 1 20',
                                                    autoScroll: true,
                                                    bodyStyle: 'background: transparent',
                                                    items: [

                                                        {
                                                            xtype: 'panel',
                                                            //                                                    id: prototype.id + '-SalesAnalysis_tab',
                                                            title: 'Normal',
                                                            listeners: {
                                                                activate: 'onWindowNormal'
                                                            },

                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    hidden: true,
                                                                    id: prototype.id + '-panelDataInfoScan',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    width: 1276,
                                                                    height: 280,
                                                                    autoScroll: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'grid',
                                                                            id: prototype.id + '-gridDataInfoScan',
                                                                            width: 1220,
                                                                            height: 250,
                                                                            columnLines: true,
                                                                            plugins: [
                                                                                {
                                                                                    ptype: 'cellediting',
                                                                                    clicksToEdit: 1
                                                                                },
                                                                                {
                                                                                    ptype: 'gridfilters' // ✅ Filtros locales activados
                                                                                }
                                                                            ],
                                                                            features: [{
                                                                                    ftype: 'summary'
                                                                                }],
                                                                            viewConfig: {
                                                                                getRowClass: function (record) {

                                                                                    if (record.get('DES_CERROR_COMMENT') && record.get('DES_CERROR_COMMENT').trim() !== '') {
                                                                                        return 'row-with-cerrorC';
                                                                                    }

                                                                                    if ((record.get('REFERENCE') && record.get('REFERENCE').trim() !== '') ||
                                                                                            (record.get('COMMENTS') && record.get('COMMENTS').trim() !== '') ||
                                                                                            (record.get('DES_CERROR') && record.get('DES_CERROR').trim() !== '')) {
                                                                                        return 'row-with-comments';
                                                                                    }
                                                                                    return '';
                                                                                },
                                                                                selModel: {
                                                                                    mode: 'SINGLE',
                                                                                    allowDeselect: true
                                                                                },
                                                                                listeners: {
                                                                                    itemmouseenter: function (view, record, item) {
                                                                                        if ((record.get('REFERENCE') && record.get('REFERENCE').trim() !== '') ||
                                                                                                (record.get('COMMENTS') && record.get('COMMENTS').trim() !== '')) {
                                                                                            Ext.tip.QuickTipManager.register({
                                                                                                target: item,
                                                                                                text: `<b>Reference:</b> ${record.get('REFERENCE') || ''}<br>
                                                                                                       <b>Comments:</b> ${record.get('COMMENTS') || ''}`
                                                                                            });
                                                                                        }
                                                                                        if (record.get('DES_CERROR') && record.get('DES_CERROR').trim() !== '') {
                                                                                            Ext.tip.QuickTipManager.register({
                                                                                                target: item,
                                                                                                text: `<b>Codigo:</b> ${record.get('DES_CERROR') || ''}`
                                                                                            });
                                                                                        }
                                                                                        if (record.get('CERROR') && record.get('CERROR').trim() !== '') {
                                                                                            Ext.tip.QuickTipManager.register({
                                                                                                target: item,
                                                                                                text: `<b>Comment:</b> ${record.get('DES_CERROR_COMMENT') || ''}`
                                                                                            });
                                                                                        }
                                                                                    },
                                                                                    itemmouseleave: function (view, record, item) {
                                                                                        Ext.tip.QuickTipManager.unregister(item);
                                                                                    },
                                                                                    select: function (rowModel, record) {
                                                                                        console.log('Seleccionado:', record.data);
                                                                                    },
                                                                                    deselect: function (rowModel, record) {
                                                                                        console.log('Deseleccionado:', record.data);
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
                                                                                        text: 'Status',
                                                                                        dataIndex: 'descSTVAL',
                                                                                        width: 100,
                                                                                        filter: 'string', // 🔹 Filtro por texto
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Value <br> Date',
                                                                                        dataIndex: 'VALDATE',
                                                                                        width: 110,
                                                                                        filter: 'date', // 🔹 Filtro de rango de fechas
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Concept',
                                                                                        dataIndex: 'CONCEPT',
                                                                                        width: 155,
                                                                                        filter: {
                                                                                            type: 'list', // 🔹 Lista desplegable con opciones
                                                                                            options: ['P', 'N', 'A', 'C', 'M', 'X']
                                                                                        },
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            const map = {
                                                                                                P: 'Positive Billing',
                                                                                                N: 'Negative Billing',
                                                                                                A: 'Adjustment',
                                                                                                C: 'Compensation',
                                                                                                M: 'Automatic',
                                                                                                X: 'No Billing'
                                                                                            };
                                                                                            return map[value] || 'Billing';
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Agent',
                                                                                        dataIndex: 'SAGENT',
                                                                                        width: 80,
                                                                                        filter: 'string',
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Consol.',
                                                                                        dataIndex: 'SCONSOL',
                                                                                        width: 80,
                                                                                        filter: 'string',
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Currency',
                                                                                        dataIndex: 'SCURRENCY',
                                                                                        width: 80,
                                                                                        filter: {
                                                                                            type: 'list',
                                                                                            options: ['USD', 'EUR', 'PEN', 'GBP'] // 💰 puedes ajustar tus monedas reales
                                                                                        },
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Neto',
                                                                                        dataIndex: 'NETO',
                                                                                        width: 115,
                                                                                        xtype: 'numbercolumn',
                                                                                        summaryType: 'sum',
                                                                                        filter: 'number',
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
                                                                                        width: 115,
                                                                                        xtype: 'numbercolumn',
                                                                                        summaryType: 'sum',
                                                                                        filter: 'number',
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
                                                                                        text: 'Period',
                                                                                        columns: [
                                                                                            {
                                                                                                text: 'Start',
                                                                                                dataIndex: 'STRDATE',
                                                                                                width: 80,
                                                                                                filter: 'string',
                                                                                                renderer: function (value, metaData) {
                                                                                                    metaData.style = "text-align:center;";
                                                                                                    return value;
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                text: 'End',
                                                                                                dataIndex: 'ENDDATE',
                                                                                                width: 80,
                                                                                                filter: 'string',
                                                                                                renderer: function (value, metaData) {
                                                                                                    metaData.style = "text-align:center;";
                                                                                                    return value;
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        text: 'Qty. Tkt.',
                                                                                        dataIndex: 'QTYTKT',
                                                                                        width: 70,
                                                                                        filter: 'number',
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:underline;";
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.SUM_TKT) + '<b>';
                                                                                        },
                                                                                        listeners: {
                                                                                            click: 'onGridViewTKTAgent'
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Type <br> Payment',
                                                                                        dataIndex: 'TPERIOD',
                                                                                        width: 70,
                                                                                        filter: {
                                                                                            type: 'list',
                                                                                            options: ['E', 'C']
                                                                                        },
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return (value == 'E') ? 'EP' : 'CA';
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'checkcolumn',
                                                                                        text: 'Select',
                                                                                        dataIndex: 'selected',
                                                                                        width: 70,
                                                                                        stopSelection: false,
                                                                                        listeners: {
                                                                                            beforecheckchange: function (checkColumn, rowIndex, checked, record, e, eOpts) {
                                                                                                // Obtener el grid
                                                                                                const grid = checkColumn.up('grid');
                                                                                                const store = grid.getStore();

                                                                                                // Desmarcar todos los demás registros
                                                                                                store.each(function (rec) {
                                                                                                    if (rec !== record && rec.get('selected')) {
                                                                                                        rec.set('selected', false);
                                                                                                    }
                                                                                                });

                                                                                                // Permitir marcar solo uno
                                                                                                record.set('selected', checked);
                                                                                                return false; // Evita que el valor se duplique
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    ]
                                                                },

                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-panelDataInfoScanICCS',
                                                                    hidden: true,
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    width: 1276,
                                                                    height: 280,
                                                                    autoScroll: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'grid',
                                                                            id: prototype.id + '-gridDataInfoScanICCS',
                                                                            width: 1276,
                                                                            height: 250,
                                                                            columnLines: true,
                                                                            plugins: [
                                                                                {
                                                                                    ptype: 'cellediting',
                                                                                    clicksToEdit: 1
                                                                                }
                                                                            ],
                                                                            features: [{
                                                                                    ftype: 'summary' // 👈 activa el totalizador en el footer
                                                                                }],
                                                                            viewConfig: {
                                                                                getRowClass: function (record) {
                                                                                    // Si hay comentario -> aplicar clase
                                                                                    if ((record.get('REFERENCE') && record.get('REFERENCE').trim() !== '') ||
                                                                                            (record.get('COMMENTS') && record.get('COMMENTS').trim() !== '')) {
                                                                                        return 'row-with-blue';
                                                                                    }
                                                                                    return '';
                                                                                },
                                                                                selModel: {
                                                                                    mode: 'SINGLE', // ✅ solo una fila seleccionada a la vez
                                                                                    allowDeselect: true // permite deseleccionar
                                                                                },
                                                                                listeners: {
                                                                                    itemmouseenter: function (view, record, item) {
                                                                                        if ((record.get('REFERENCE') && record.get('REFERENCE').trim() !== '') ||
                                                                                                (record.get('COMMENTS') && record.get('COMMENTS').trim() !== '')) {
                                                                                            Ext.tip.QuickTipManager.register({
                                                                                                target: item, // fila
                                                                                                text: `<b>Reference:</b> ${record.get('REFERENCE') || ''}<br>
                                                                                       <b>Comments:</b> ${record.get('COMMENTS') || ''}`
                                                                                            });
                                                                                        }
                                                                                    },
                                                                                    itemmouseleave: function (view, record, item) {
                                                                                        Ext.tip.QuickTipManager.unregister(item);
                                                                                    },
                                                                                    select: function (rowModel, record) {
                                                                                        console.log('Seleccionado:', record.data);
                                                                                        // Aquí puedes guardar el registro seleccionado en una variable global o pasarlo a tu lógica
                                                                                    },
                                                                                    deselect: function (rowModel, record) {
                                                                                        console.log('Deseleccionado:', record.data);
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
                                                                                        text: 'Status',
                                                                                        dataIndex: 'descSTVAL',
                                                                                        width: 150,
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Abono <br> Date',
                                                                                        dataIndex: 'ADATE',
                                                                                        width: 120,
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Country',
                                                                                        dataIndex: 'DESC_SCOUNTRY',
                                                                                        width: 120,
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:left;";
                                                                                            if (!value)
                                                                                                return '';
                                                                                            value = value.toLowerCase();
                                                                                            return value.charAt(0).toUpperCase() + value.slice(1);
                                                                                        }
                                                                                    },

                                                                                    {
                                                                                        text: 'Consol.',
                                                                                        dataIndex: 'SCONSOL',
                                                                                        width: 90,
                                                                                        renderer: function (value, metaData, record) {
                                                                                            var data = record.data;
                                                                                            let valueFinal = ''
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (data.TINPUT == 'I') {
                                                                                                valueFinal = data.SCONSOL_TABLE
                                                                                            } else if (data.TINPUT == 'B') {
                                                                                                valueFinal = value
                                                                                            } else {
                                                                                                valueFinal = value
                                                                                            }
                                                                                            return valueFinal;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Currency',
                                                                                        dataIndex: 'SCURRENCY',
                                                                                        width: 80,
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'Neto',
                                                                                        dataIndex: 'NETO',
                                                                                        width: 130,
                                                                                        xtype: 'numbercolumn',
                                                                                        summaryType: 'sum',

                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:right;";
                                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                                        },
                                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataInfoScanICCS').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.SUM_NETO, '0,000.00') + '<b>';
                                                                                        }

                                                                                    },
                                                                                    {
                                                                                        text: 'Star <br> Date',
                                                                                        dataIndex: 'STRDATE',
                                                                                        width: 90,
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: 'End <br> Date',
                                                                                        dataIndex: 'ENDDATE',
                                                                                        width: 90,
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }

                                                                                    },
                                                                                    {
                                                                                        text: 'Cicle',
                                                                                        dataIndex: 'DCYCLE',
                                                                                        width: 90,
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }

                                                                                    },

                                                                                    {
                                                                                        text: 'QTYTKT',
                                                                                        dataIndex: 'QTYTKT',
                                                                                        width: 80,
                                                                                        renderer: function (value, metaData) {
                                                                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:underline;;";
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataInfoScanICCS').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.SUM_TKT) + '<b>';
                                                                                        },
                                                                                        listeners: {
                                                                                            click: 'onGridViewTKTAgent'
                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        text: '<span style="color:white;font-weight:bold;">Download File</span>',
                                                                                        width: 90,
                                                                                        align: 'center',
                                                                                        style: 'padding:2px; background: #6C87A8; border-color:white',
                                                                                        renderer: function (value, metaData, record) {
                                                                                            let file = record.get('FILE_NAME');  // o el campo que tú uses para descargar

                                                                                            return `<img src="resources/img/botones/excel-png-office-xlsx-icon-3.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                                                        },
                                                                                        listeners: {
                                                                                            click: 'onDownloadBSP'
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'checkcolumn',
                                                                                        text: 'Select',
                                                                                        dataIndex: 'selected',
                                                                                        width: 70,
                                                                                        stopSelection: false,
                                                                                        listeners: {
                                                                                            beforecheckchange: function (checkColumn, rowIndex, checked, record, e, eOpts) {
                                                                                                // Obtener el grid
                                                                                                const grid = checkColumn.up('grid');
                                                                                                const store = grid.getStore();

                                                                                                // Desmarcar todos los demás registros
                                                                                                store.each(function (rec) {
                                                                                                    if (rec !== record && rec.get('selected')) {
                                                                                                        rec.set('selected', false);
                                                                                                    }
                                                                                                });

                                                                                                // Permitir marcar solo uno
                                                                                                record.set('selected', checked);
                                                                                                return false; // Evita que el valor se duplique
                                                                                            }
                                                                                        }
                                                                                    }


                                                                                ]
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {xtype: 'tbspacer', height: 2},
                                                            ],

                                                        },
                                                    ],

                                                },
                                            ]
                                        },
                                                //                                       
                                    ]
                                },

                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    hidden: true,
                                    border: false,
                                    margin: '0 0 0 300',
                                    id: prototype.id + '-panelSumAmount',
                                    //bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 600},

                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Qty Settlement:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-QtyTkt',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 90,
                                        },
                                    ]
                                },

                                {xtype: 'tbspacer', height: 5},
                                {xtype: 'tbspacer', height: 2},
                                {
                                    xtype: 'label',
                                    text: 'Scan Tkt',
                                    id: prototype.id + '-labelScanTkt',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 234,
                                    height: 15,
                                    margin: '0 0 0 20'
                                },
                                {xtype: 'tbspacer', height: 2},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelScanCashContainer',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    padding: '6 10 6 20',
                                    defaults: {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        border: false,
                                        bodyStyle: 'background:#efe5e5;',
                                        defaults: {
                                            margin: '2 5 2 0'
                                        }
                                    },
                                    items: [
                                        {
                                            items: [
                                                {xtype: 'label', text: 'Add Ticket', width: 80, style: 'font-weight:bold;color:#0B333C;'},
                                                {xtype: 'textfield', id: prototype.id + '-input-txtTKTScanCash', fieldStyle: 'text-align:center;', width: 120, maxLength: 13, maskRe: /[0-9]/},
                                                {xtype: 'tbspacer', width: 10},
                                                {xtype: 'label', text: 'Agent', width: 60, style: 'font-weight:bold;color:#0B333C;'},
                                                {xtype: 'textfield', id: prototype.id + '-txtScanSAGENT', fieldStyle: 'text-align:center;', width: 90, maxLength: 8, maskRe: /[0-9/]/},
                                                {xtype: 'tbspacer', width: 10},
                                                {xtype: 'label', text: 'Consol.', width: 70, style: 'font-weight:bold;color:#0B333C;'},
                                                {xtype: 'textfield', id: prototype.id + '-txtScanSconsol', fieldStyle: 'text-align:center;', width: 90, maxLength: 8, maskRe: /[0-9/]/},
                                                {xtype: 'tbspacer', width: 10},
                                                {xtype: 'label', text: 'Customer', width: 80, style: 'font-weight:bold;color:#0B333C;'},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmbCLIENT',
                                                    fieldStyle: 'text-align:left;',
                                                    valueField: 'CODE',
                                                    displayField: 'NAME',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    value: '134',
                                                    editable: false,
                                                    width: 120,
                                                    store: Ext.create('Ext.data.Store', {
                                                        fields: ['CODE', 'NAME'],
                                                        data: [
                                                            {CODE: '', NAME: 'All'},
                                                            {CODE: '134', NAME: 'AVIANCA'},
                                                            {CODE: '202', NAME: 'TACA'},
                                                            {CODE: '133', NAME: 'LACSA'},
                                                            {CODE: '547', NAME: 'AEROGAL'}
                                                        ]
                                                    })
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {xtype: 'label', text: 'Country', width: 70, style: 'font-weight:bold;color:#0B333C;'},
                                                {xtype: 'textfield', id: prototype.id + '-txtScanScountry', fieldStyle: 'text-align:center;', width: 90},
                                                {xtype: 'label', text: 'Currency', width: 70, style: 'font-weight:bold;color:#0B333C;'},
                                                {xtype: 'textfield', id: prototype.id + '-txtScanScurrency', fieldStyle: 'text-align:center;', width: 90},
                                                {xtype: 'tbspacer', width: 60},
                                            ]
                                        },
                                        {
                                            items: [
                                                {xtype: 'label', text: 'From Date', width: 80, style: 'font-weight:bold;color:#0B333C;'},
                                                {xtype: 'datefield', id: prototype.id + '-txtFromDateCash', fieldStyle: 'text-align:center;', format: 'Y/m/d', width: 110, editable: false},
                                                {xtype: 'tbspacer', width: 30},
                                                {xtype: 'label', text: 'To Date', width: 60, style: 'font-weight:bold;color:#0B333C;'},
                                                {xtype: 'datefield', id: prototype.id + '-txtToDateCash', fieldStyle: 'text-align:center;', format: 'Y/m/d', width: 110, editable: false},
                                                {xtype: 'tbspacer', width: 30},
                                                {xtype: 'label', text: 'Mclos', width: 60, style: 'font-weight:bold;color:#0B333C;'},
                                                {xtype: 'datefield', id: prototype.id + '-txtMclos', fieldStyle: 'text-align:center;', format: 'Y/m/d', width: 110, editable: false},
                                                {xtype: 'tbspacer', width: 30},
                                                {xtype: 'label', text: 'Type Payment', width: 80, style: 'font-weight:bold;color:#0B333C;'},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmbTypePayment',
                                                    fieldStyle: 'text-align:left;',
                                                    valueField: 'CODE',
                                                    displayField: 'NAME',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    editable: false,
                                                    value: 'CA',
                                                    width: 60,
                                                    store: Ext.create('Ext.data.Store', {
                                                        fields: ['CODE', 'NAME'],
                                                        data: [
                                                            {CODE: 'CA', NAME: 'CA'},
                                                            {CODE: 'EP', NAME: 'EP'}
                                                        ]
                                                    })
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 28,
                                                    iconCls: 'prx-icon-add',
                                                    tooltip: 'Add',
                                                    listeners: {click: 'addCash_keyDownHandler'}
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 28,
                                                    iconCls: 'prx-icon-clear',
                                                    tooltip: 'Clean',
                                                    style: 'background:#efe5e5;',
                                                    listeners: {click: 'clear_keyDownHandler'}
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 28,
                                                    iconCls: 'prx-icon-image-trash',
                                                    tooltip: 'Clean Detail',
                                                    listeners: {click: 'clear_tableNormal'}
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 28,
                                                    iconCls: 'prx-icon-refresh',
                                                    tooltip: 'Refresh Detail',
                                                    hidden: true,
                                                    listeners: {click: 'allRefreshDataEntryAMDPCASH'}
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 28,
                                                    iconCls: 'prx-icon-excel',
                                                    tooltip: 'Export to Excel',
                                                    listeners: {click: 'getExcelCashTicket'},

                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 28,
                                                    iconCls: 'prx-icon-add',
                                                    tooltip: 'Add Adjustment',
                                                    listeners: {click: 'AddAdjustCash'}
                                                },
                                                {xtype: 'tbspacer', width: 3},
                                            ]
                                        }
                                    ]
                                },

                                {
                                    xtype: 'label',
                                    text: 'Tickets',
                                    id: prototype.id + '-labelScanAgent',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    hidden: true,
                                    width: 234,
                                    height: 15,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    id: prototype.id + '-panelDataInfoScanAgent',
                                    layout: 'vbox',
                                    border: false,
                                    width: 1209,
                                    margin: '0 0 0 20',
                                    //                                                            height: 180,
                                    autoScroll: true,
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataInfoScanAgent',
                                            width: 1207,
                                            height: 200,
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
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'rownumberer',
                                                        text: 'N°',
                                                        width: 50,
                                                        align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex) {
                                                            metaData.style = "text-align:center;";
                                                            return rowIndex + 1;
                                                        }
                                                    },
                                                    {text: 'Status', dataIndex: 'STVAL', width: 90,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = 'Match';
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
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
                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 80,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                                value = 'Adjust'
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Agent', dataIndex: 'SAGENT', width: 80,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Consol.', dataIndex: 'SCONSOL', width: 80,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, id: prototype.id + '-gridA720FECVTA',
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Fpaymen', dataIndex: 'MCLOS', width: 80,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Ticket', dataIndex: 'TKT', width: 135,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        },
                                                        //                                                                                listeners: {
                                                        //                                                                                    click: 'onGridDataViewTktFinal'
                                                        //                                                                                },
                                                        //editor: {xtype: 'textfield', editable: false},
                                                    },
                                                    {text: 'Curr', dataIndex: 'SCURRENCY', width: 55,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount',
                                                        dataIndex: 'SVFOPNETR', // puedes dejar cualquiera, el renderer controla el valor mostrado
                                                        width: 90,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";

                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }

                                                            let amount = 0;
                                                            if (record.data.SPAYMENT === 'CA') {
                                                                amount = record.data.SVFOPNETR || 0;
                                                            } else {
                                                                amount = record.data.SVFOP || 0;
                                                            }

                                                            return Ext.util.Format.number(amount, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            let grid = Ext.getCmp(prototype.id + '-gridDataInfoScanAgent');
                                                            let store = grid.getStore();

                                                            let total = 0;
                                                            store.each(function (rec) {
                                                                if (rec.get('SPAYMENT') === 'CA') {
                                                                    total += rec.get('SVFOPNETR') || 0;
                                                                } else {
                                                                    total += rec.get('SVFOP') || 0;
                                                                }
                                                            });

                                                            metaData.style = 'text-align:right; margin-right:3px;';
                                                            return '<b>' + Ext.util.Format.number(total, '0,000.00') + '</b>';
                                                        }
                                                    },

                                                    {text: 'Invoice', dataIndex: 'INVOICE', width: 132, id: prototype.id + '-columnINVOICE',
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        },
                                                    },

                                                    {text: 'Source', dataIndex: 'CFUENTE', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
                                                            return value;
                                                        }
                                                    },

                                                    {text: 'Type <br> Payment', dataIndex: 'SPAYMENT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            if (record.data.TDOC === 'A') {
                                                                metaData.style += "background-color:#bff5bf;";
                                                            }
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
                                                    },
                                                ]
                                            }
                                        },
                                    ],

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
                    text: 'Conciliacion',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onConciliationCash'
                    }
                },
                {
                    text: 'Conciliacion <br> Adjust',
                    id: prototype.id + '-btn-Adjust',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onConciliationCashAdjust'
                    }
                },
//                        {
//                            text: 'Delete',
//                            id: prototype.id + '-btn-delete',
//                            iconCls: 'prx-icon-delete',
//                            listeners: {
//                                click: 'onDeleteClick'
//                            }
//                        },
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
