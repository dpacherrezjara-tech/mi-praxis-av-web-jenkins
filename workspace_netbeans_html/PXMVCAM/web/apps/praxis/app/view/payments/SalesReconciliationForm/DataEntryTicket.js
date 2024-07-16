Ext.define('Ext.Praxis.view.payments.SalesReconciliationForm.DataEntryTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTicketSalesReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliation.DataEntryTicketSalesReconciliationController'
    ],
    controller: 'DataEntryTicketSalesReconciliationController',
    title: 'Ticket - Data Entry Form',
    header: true,
    height: 850,
    width: 1021,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-2-box1',
            defaults: {
                style: 'margin: 2px 5px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Ticket Number',
                            style: 'font-weight:bold;color:#121E31;',
                            width: 109,
                            padding: '3 0',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'CCIA(3)+FORMA(4)+SERIE(6)+CUPON (1)'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-2-txtTicket',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 14,
                            readOnly: true,
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Sequence',
                            style: 'font-weight:bold;color:#121E31;',
                            width: 90,
                            padding: '3 0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-2-txtSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            readOnly: true,
//                            maxLength: 1,
                            width: 35
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Document Type',
                            style: 'font-weight:bold;color:#121E31;',
                            width: 120,
                            padding: '3 0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-2-cmbTDOC',
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    [null, "&nbsp;"],
//                                    ["S", "Sales"],
//                                    ["R", "Refund"],
//                                    ["A", "Adjust."]
//                                ]
//                            }),
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            width: 90,
//                            maxLength: 14,
                            readOnly: true,
                            listeners: {
//                                select: function (comp, record, index) {
//                                    if (comp.rawValue === "&nbsp;") {
//                                        comp.setValue(null);
//                                    }
//                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 2},
                        {
                            xtype: 'label',
                            text: 'Source',
                            style: 'font-weight:bold;color:#121E31;',
                            width: 70,
                            padding: '3 0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-2-cmbFTE',
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    [null, "&nbsp;"],
//                                    ["B", "BSP"],
//                                    ["A", "ARC"],
//                                    ["S", "ASR"]
//                                ]
//                            }),
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            width: 90,
//                            maxLength: 14,
                            readOnly: true,
                            listeners: {
//                                select: function (comp, record, index) {
//                                    if (comp.rawValue === "&nbsp;") {
//                                        comp.setValue(null);
//                                    }
//                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;color:#121E31;',
                            width: 60,
                            padding: '3 0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-2-cmbSTVAL',
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    [null, "&nbsp;"],
//                                    ["1", "Match"],
//                                    ["", "Sales without Reconcili."],
//                                    ["3", "Reconcili. without Sales"],
//                                    ["4", "Match with Differences"],
//                                    ["5", "Match Manual"]
//                                ]
//                            }),
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            width: 150,
//                            maxLength: 14,
                            readOnly: true,
                            listeners: {
//                                select: function (comp, record, index) {
//                                    if (comp.rawValue === "&nbsp;") {
//                                        comp.setValue(null);
//                                    }
//                                }
                            }
                        }
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="Sales Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 500 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 120px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Sales Information</strong>'
                                }
                            ]
                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'column',
//                            margin: '0 0 4 0',
//                            border: false,
//                            bodyStyle: 'background: #E5ECEF',
//                            items: [
//                            ]
//                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Load Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    hidden: true,
                                    width: 102,
                                    margin: '0 0 0 7',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format: YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSDATEL',
                                    hidden: true,
                                    fieldStyle: 'text-align:left',
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: 'Load Type',
                                    hidden: true,
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 126,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-2-cmbSFLOAD',
                                    hidden: true,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            [null, "&nbsp;"],
                                            ["A", "Automatic"],
                                            ["M", "Manual"]
                                        ]
                                    }),
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 100,
                                    disabled: true,
                                    value: "",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    triggerAction: 'all',
                                    listeners: {
                                        select: function (comp, record, index) {
                                            if (comp.rawValue === "&nbsp;") {
                                                comp.setValue(null);
                                            }
                                        }
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                               {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 102,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSCOUNTRY',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    readOnly: true,
                                    margin: '0 0 0 3',
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: 'Agent',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 123,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSAGENT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    margin: '0 0 0 3',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Invoice',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 137,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSINVN',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 14,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Invoice Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 126,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSIDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 100,
                                    margin: '0 0 0 3',
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 102,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    margin: '0 0 0 3',
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 123,
                                    padding: '3 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'PNR - PNR Provider'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSPNR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    margin: '0 0 0 3',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Payment Type',
                                    hidden: true,
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 137,
                                    margin: '0 0 0 7',
                                    padding: '3 0',
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSPAYMENT',
                                    hidden: true,
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    readOnly: true,
//                                    margin: '0 0 0 3',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Contracting Card',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 137,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSTCNTR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    readOnly: true,
//                                    margin: '0 0 0 3',
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 102,
                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
//                                    width: 18,
//                                    padding: '4 0',
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSCARCOD',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    margin: '0 0 0 3',
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: 'Card Nbr',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 123,
                                    padding: '3 0',
                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
//                                    width: 18,
//                                    padding: '4 0',
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSCARDN',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 17,
                                    maskRe: /[0-9, */]/,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Auth. Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 137,
                                    padding: '3 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Authorization Code'
                                    }
                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
//                                    width: 22,
//                                    padding: '4 0',
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSAUTHOC',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100,
//                                    margin: '0 0 0 3',
                                },
                                {
                                    xtype: 'label',
                                    text: 'Expiration Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 126,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSDATEXP',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100,
                                    margin: '0 0 0 3',
                                },
                                {
                                    xtype: 'label',
                                    text: 'Transaction Code',
                                    hidden: true,
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 128,
                                    margin: '0 0 0 3'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtTRNCU',
                                    hidden: true,
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 102,
                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:#9C1717;font-size:9px;',
//                                    width: 18,
//                                    padding: '4 0',
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSVFOP',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 40
                                },
                                {
                                    xtype: 'label',
                                    text: 'Balance',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 80,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSVFOPINST',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Installment Payment',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 137,
                                    padding: '3 0',
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtINSTPAY',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
//                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 35
                                },
                                {
                                    xtype: 'label',
                                    text: 'Installment Plan',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 72',
                                    width: 126,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtINSTPLA',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 35
                                },
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Adjustment Information">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pnlAdjust',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Adjustment Information</strong>'
                                },
                                {xtype: 'tbspacer', width: 500}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 102,
                                    margin: '0 0 0 7',
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSVFOPADJ',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSCURRENCYADJ',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 40
                                },
                                {
                                    xtype: 'label',
                                    text: 'Document Type',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtDTYPEADJ',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    text: 'Error',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 35,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtERRORADJ',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 100,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtDescError2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 150,
                                    readOnly: true,
                                    width: 303,
                                    margin: '0 0 0 3'                              
                                },                   
                                
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Reconciliation Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Reconciliation Information</strong>'
                                },
                                {xtype: 'tbspacer', width: 500}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Date Conciliation',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    width: 117,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtDATCO',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 100,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 60
                                },
                                {
                                    xtype: 'label',
                                    text: 'Transac. Conciliation -',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 140,
                                    margin: '0 0 0 7',
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtDATECTRANC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
//                                    maxLength: 15,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 125
                                },
                                {
                                    xtype: 'label',
                                    text: 'Doc. Sap. Bank',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 10',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtBANDOC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 70
                                },
                        {
                            xtype: 'panel',
                                    layout: 'column',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [        
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '0 0 4 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                            ]
                                        },        
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '10 0 4 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Error',
                                                    style: 'font-weight:bold;color:#121E31;',
                                                    width: 120,
                                                    padding: '3 0',
                                                    margin: '0 0 0 10',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Error Code - Description'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-2-txtError',
                                                    fieldStyle: 'text-align:left',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 30
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-2-txtDescError',
                                                    fieldStyle: 'text-align:left',
                                                    enforceMaxLength: true,
                                                    maxLength: 150,
                                                    readOnly: true,
                                                    width: 303,
                                                    margin: '0 0 0 3'
                                                },
                                            ]
                                        }
                                    ]
                                },                                
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Accounting Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Accounting Information</strong>'
                                },
                                {xtype: 'tbspacer', width: 500}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Status Accounting',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120,
                                    margin: '0 0 0 7',
                                    
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSTCON',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 90
                                },
                                 {xtype: 'tbspacer', width:50},
                                {
                                    xtype: 'label',
                                    text: 'Date Accounting',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 105,
                                    padding: '3 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format: YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtFCONT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 60
                                },                               
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Settlement Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Settlement Information</strong>'
                                },
                                {xtype: 'tbspacer', width: 500}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
//                                {
//                                    xtype: 'label',
//                                    text: 'Load Date',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 102,
//                                    margin: '0 0 0 7',
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Format: YYYYMMDD'
//                                    }
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-2-txtDATEF',
//                                    fieldStyle: 'text-align:left',
//                                    enforceMaxLength: true,
//                                    maxLength: 20,
//                                    margin: '0 0 0 3',
//                                    readOnly: true,
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'label',
//                                    text: 'Load Date Praxis',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    margin: '0 0 0 3',
//                                    width: 126,
//                                    padding: '3 0'
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-2-txtTDATE',
//                                    fieldStyle: 'text-align:left',
//                                    enforceMaxLength: true,
//                                    maxLength: 20,
//                                    margin: '0 0 0 3',
//                                    readOnly: true,
//                                    width: 100
//                                }
                                {
                                    xtype: 'label',
                                    text: 'Card Nbr',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 123,
                                    padding: '3 0',
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSCARDNL',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 17,
                                    maskRe: /[0-9, */]/,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: 'Auth. Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 137,
                                    padding: '3 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Authorization Code'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSAUTHOCL',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    readOnly: true,
                                    width: 100,
                                },
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 7',
                                    width: 102,
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtSVFOPL',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 120
                                },
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Banks Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Banks Information</strong>'
                                },
                                {xtype: 'tbspacer', width: 500}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Load Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 102,
                                    padding: '4 0',
                                    margin: '0 0 0 7',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Match Manual Comment'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtBDATEL',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 127,
                                    padding: '3 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format: YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-2-cmbBSTVAL',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            [null, "&nbsp;"],
                                            ["1", "Accepted"],
                                            ["2", "Rejected"],
                                            ["3", "Suspect"]
                                        ]
                                    }),
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
                                    triggerAction: 'all',
                                    listeners: {
                                        select: function (comp, record, index) {
                                            if (comp.rawValue === "&nbsp;") {
                                                comp.setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Payment Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 137,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtBDATEP',
                                    fieldStyle: 'text-align:left',
                                    margin: '0 0 0 3',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Payment Status',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 127,
                                    padding: '3 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Payment Status'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-2-cmbBSTVALP',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Pending"],
                                            ["1", "Paid"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 100,
                                    disabled: true,
                                    value: "",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Rejection Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 102,
                                    padding: '4 0',
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtCREJEC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 350
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-2-chkFADYEN',
                                    boxLabel: '<b style="color:#0B333C;">ADYEN</b>',
                                    checked: false,
                                    margin: '0 0 0 70',
                                    width: 90
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Phases Conciliation Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Phases Conciliation Information</strong>'
                                },
                                {xtype: 'tbspacer', width: 500}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 4 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Conciliation Date 2nd Phase',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 200,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtDATEC2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    margin: '0 0 0 3',
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Conciliation Date 3rd Phase',
                                    style: 'font-weight:bold;color:#121E31;',
                                    margin: '0 0 0 3',
                                    width: 197,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtDATEC3',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-2-ControlData',
                    title: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
                    width: 760,
                    border: true,
                    defaults: {
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtUSCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtFECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtHOCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
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
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtUSUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtFEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-2-txtHOUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 0 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Cancel',
                    id: prototype.id + '-2-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'button',
                    id: prototype.id + '-2-imgPrev',
                    icon: 'resources/img/botones/prev.png',
                    tooltip: 'View Previous Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onPrevClick'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-2-imgNext',
                    icon: 'resources/img/botones/next2.png',
                    tooltip: 'View Next Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onNextClick'
                    }
                }
            ]
        }
    ]
});