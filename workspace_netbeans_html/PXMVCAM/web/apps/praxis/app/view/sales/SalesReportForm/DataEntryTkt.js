/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryTkt', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idSale + '-dataEntryTkt',
    controller: prototype.idSale + '-dataEntryTktController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryTktController',
        'Ext.Praxis.view.screens.CtrlDeliveryOrigForm',
        //'Ext.Praxis.view.program.ProFacsimilForm.Facsimil',
        'Ext.Praxis.view.widgets.facsimil',
        'Ext.Praxis.view.widgets.prorrate'
    ],
    title: 'Ticket Information',
    header: true,
    width: 1470,
    height: 800,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idSale + '-DataEntryTkt-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 1460,
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.idSale + '-det-tabMain',
                            width: 1450,
                            height: 750,
                            anchor: '100%',
                            margin: '1 1 1 1',
                            autoScroll: true,
                            bodyStyle: 'background: #E5ECEF',
                            listeners: {
                                tabchange: 'onChangeTab'
                            },
                            items: [

                                // <editor-fold defaultstate="collapsed" desc="Tab SaletInformation">

                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
                                    id: prototype.idSale + '-det-tabSale',
                                    title: 'Sale Information',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    margin: '5 5 5 5',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'hbox',
                                            margin: '1 1 1 1',
                                            border: false,
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="Panel 1 - Campos">

                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 0 1 0',
                                                            border: false,
                                                            defaults: {
                                                                xtype: 'label',
                                                                padding: '5px 3px 5px 3px',
                                                                margin: '1 1 1 1',
                                                                style: 'font-weight:bold;font-size:11px;',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Ticket:'
                                                                },
                                                                {
                                                                    text: 'Transaction:'
                                                                },
                                                                {
                                                                    text: 'Conjuction:'
                                                                },
                                                                {
                                                                    text: 'Transaction Nº:'
                                                                },
                                                                {
                                                                    text: 'Iata Code:'
                                                                },
                                                                {
                                                                    text: 'Tour Code:'
                                                                },
                                                                {
                                                                    text: 'Fare:'
                                                                },
                                                                {
                                                                    text: 'EQV. Fare:'
                                                                },
                                                                {
                                                                    text: 'Discount:'
                                                                },
                                                                {
                                                                    text: 'Q:'
                                                                },
                                                                {
                                                                    text: 'Exchange Rate:'
                                                                },
                                                                {
                                                                    text: 'Local Cur:'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            margin: '1 1 1 1',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    margin: '1',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idSale + '-det-lblCia',
                                                                            width: 30, readOnly: true,
                                                                            fieldLabel: ''
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idSale + '-det-lblDocumento',
                                                                            fieldLabel: '', readOnly: true,
                                                                            width: 70
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idSale + '-det-lblTransaction',
                                                                    xtype: 'textfield',
                                                                    margin: '1',
                                                                    readOnly: true,
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    width: 110
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    margin: '1',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idSale + '-det-lblConjuction',
                                                                            width: 30, readOnly: true,
                                                                            fieldLabel: ''
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idSale + '-det-lblBoleto', readOnly: true,
                                                                            fieldLabel: '',
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            labelAlign: 'left',
                                                                            html: '<strong>/</strong>',
                                                                            width: 10,
                                                                            padding: '5px 0px 5px 0x'

                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotBoleto',
                                                                            fieldLabel: '', readOnly: true,
                                                                            width: 30
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idSale + '-det-lblTransactionNbr',
                                                                    xtype: 'textfield', readOnly: true,
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    readOnly: true,
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    width: 110
                                                                },
                                                                {
                                                                    id: prototype.idSale + '-det-lblIata',
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    width: 110
                                                                },
                                                                {
                                                                    id: prototype.idSale + '-det-lblTourCode',
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    width: 110
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    margin: '2',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        readOnly: true,
                                                                        //fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idSale + '-det-lblFareCur',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idSale + '-det-lblFare',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    margin: '2',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        readOnly: true,
                                                                        //fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idSale + '-det-lblEQVCur',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idSale + '-det-lblEQV',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
//                                                                    padding: '0',
                                                                    margin: '2',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        readOnly: true,
                                                                        //fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idSale + '-det-lblDiscountCur',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idSale + '-det-lblDiscount',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
//                                                                    padding: '0',
                                                                    margin: '2',
                                                                    border: false,
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0 0 0 0',
                                                                        readOnly: true,
                                                                        //fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.idSale + '-det-lblQCur',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idSale + '-det-lblQ',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idSale + '-det-lblExchangeRate',
                                                                    xtype: 'textfield',
                                                                    margin: '2',
                                                                    readOnly: true,
                                                                    fieldStyle: 'text-align:right;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    width: 110
                                                                },
                                                                {
                                                                    id: prototype.idSale + '-det-lblLocalCur',
                                                                    xtype: 'textfield',
                                                                    readOnly: true,
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    width: 60
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                // </editor-fold>

                                                // <editor-fold defaultstate="collapsed" desc="Panel 2">
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'vbox',
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 1 1 1',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    border: false,
                                                                    items: [
                                                                        //PANEL 2_1 Campos_1
                                                                        // <editor-fold defaultstate="collapsed" desc="PANEL 2_1 Campos_1">

                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            border: false,
                                                                            items: [//                                                                                
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    layout: 'vbox',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    margin: '1 1 1 1',
                                                                                    border: false,
                                                                                    defaults: {
                                                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                        readOnly: true
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            id: prototype.idSale + '-det-lblDigito',
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'D:',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            labelWidth: 45,
                                                                                            width: 90
                                                                                        },
                                                                                        {
                                                                                            id: prototype.idSale + '-det-lblDocType',
                                                                                            xtype: 'textfield',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: 'Doc. T.:',
                                                                                            labelWidth: 45,
                                                                                            width: 90
                                                                                        },
                                                                                        {xtype: 'label', padding: '14px 3px 10px 3px'},
                                                                                        {
                                                                                            id: prototype.idSale + '-det-lblSeq',
                                                                                            xtype: 'textfield',
                                                                                            margin: '2',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: 'Seq:',
                                                                                            labelWidth: 45,
                                                                                            width: 90
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        // </editor-fold>
                                                                        //PANEL 2_1 Campos_2
                                                                        // <editor-fold defaultstate="collapsed" desc="PANEL 2_1 Campos_2">
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            border: false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    layout: 'vbox',
                                                                                    margin: '1 0 1 0',
                                                                                    border: false,
                                                                                    defaults: {
                                                                                        xtype: 'label',
                                                                                        padding: '5px 3px 5px 3px',
                                                                                        margin: '1 1 1 1',
                                                                                        style: 'font-weight:bold;font-size:11px;',
                                                                                        width: 80
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            text: 'Group:'
                                                                                        },
                                                                                        {
                                                                                            text: 'Issue Date:'
                                                                                        },
                                                                                        {
                                                                                            text: 'Pax:'
                                                                                        },
                                                                                        {
                                                                                            text: 'Type Pax:'
                                                                                        },
                                                                                        {
                                                                                            text: 'Vou. Reason:'
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    layout: 'vbox',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    margin: '1 1 1 1',
                                                                                    border: false,
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            layout: 'hbox',
                                                                                            margin: '1',
                                                                                            border: false,
                                                                                            bodyStyle: 'background: #E5ECEF',
                                                                                            defaults: {
                                                                                                xtype: 'textfield',
                                                                                                margin: '0 0 0 0',
                                                                                                fieldStyle: 'text-align:left;',
                                                                                                labelSeparator: '',
                                                                                                readOnly: true
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    id: prototype.idSale + '-det-lblGroup',
                                                                                                    width: 65,
                                                                                                    fieldLabel: ''
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.idSale + '-det-lblSource',
                                                                                                    fieldLabel: '',
                                                                                                    width: 50
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.idSale + '-det-lblFileId',
                                                                                                    fieldLabel: 'File ID:',
                                                                                                    labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                                    width: 115,
                                                                                                    labelWidth: 45
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            id: prototype.idSale + '-det-lblIssueDate',
                                                                                            xtype: 'textfield',
                                                                                            margin: '1',
                                                                                            readOnly: true,
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: '',
                                                                                            width: 65
                                                                                        },
                                                                                        {
                                                                                            id: prototype.idSale + '-det-lblPax',
                                                                                            xtype: 'textfield',
                                                                                            margin: '1',
                                                                                            readOnly: true,
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: '',
                                                                                            width: 240
                                                                                        },
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            layout: 'hbox',
                                                                                            margin: '1',
                                                                                            border: false,
                                                                                            bodyStyle: 'background: #E5ECEF',
                                                                                            defaults: {
                                                                                                xtype: 'textfield',
                                                                                                margin: '0 0 0 0',
                                                                                                fieldStyle: 'text-align:left;',
                                                                                                labelSeparator: '',
                                                                                                readOnly: true
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    id: prototype.idSale + '-det-lblType',
                                                                                                    width: 40,
                                                                                                    fieldLabel: ''
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.idSale + '-det-lblFFOP',
                                                                                                    fieldLabel: 'FFOP:',
                                                                                                    labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                                    width: 80,
                                                                                                    labelWidth: 40
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            id: prototype.idSale + '-det-lblVoucherReason',
                                                                                            xtype: 'textfield',
                                                                                            margin: '2',
                                                                                            readOnly: true,
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: '',
                                                                                            width: 240
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        // </editor-fold>
                                                                        //PANEL 2_1 GRID EXCHANGE
                                                                        // <editor-fold defaultstate="collapsed" desc="PANEL 2_1 GRID">
                                                                        {
                                                                            xtype: 'panel',
                                                                            id: prototype.idSale + '-det-panelGridEXCH',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'vbox',
                                                                            margin: '1 1 1 1',
                                                                            width: 564,
                                                                            border: false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'grid',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    padding: '5 0 0 0',
                                                                                    id: prototype.idSale + '-det-gridEXCH',
                                                                                    height: 80,
                                                                                    width: 562,
                                                                                    columnLines: true,
                                                                                    resizable: false,
                                                                                    columns: {
                                                                                        defaults: {
                                                                                            menuDisabled: true,
                                                                                            sortable: true,
                                                                                            resizable: false,
                                                                                            align: 'center'
                                                                                        },
                                                                                        items: [
                                                                                            {text: 'Air', width: 50, dataIndex: 'A730CIA'},
                                                                                            {text: 'Document', width: 100, dataIndex: 'DOCUMENTO'},
                                                                                            {text: 'Coupon', width: 60, dataIndex: 'CUPON'},
                                                                                            {text: 'CNJ', width: 60, dataIndex: 'CNJ'},
                                                                                            {text: 'Curr', width: 50, dataIndex: 'A730MONREG'},
                                                                                            {text: 'Total Values', dataIndex: 'VALUE', width: 100,
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Doc. Father', width: 100, dataIndex: 'DOCUMENTOFAT'},
                                                                                            {text: '', sortable: false, xtype: 'actioncolumn', width: 40, align: 'center',
                                                                                                items: [
                                                                                                    {
                                                                                                        iconCls: 'prx-icon-edit',
                                                                                                        tooltip: 'Edit',
                                                                                                        handler: 'onEditClickEXCH'
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    id: prototype.idSale + '-det-lblReference',
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: 'Reference:',
                                                                                    width: 450,
                                                                                    labelWidth: 75,
                                                                                    labelStyle: 'font-weight:bold;font-size:11px;'
                                                                                },
                                                                                {
                                                                                    id: prototype.idSale + '-det-lblRelated',
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: 'Observation:',
                                                                                    width: 450,
                                                                                    labelWidth: 75,
                                                                                    labelStyle: 'font-weight:bold;font-size:11px;'
                                                                                }
                                                                            ]
                                                                        }
                                                                        // </editor-fold>
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 1 1 1',
                                                            border: false,
                                                            items: [
                                                                //PANEL 2_2 GRILLA
                                                                // <editor-fold defaultstate="collapsed" desc="PANEL 2_2 GRILLA">
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'vbox',
                                                                    margin: '1 1 1 1',
                                                                    width: 1160,
                                                                    border: false,
                                                                    items: [
                                                                        {
                                                                            xtype: 'grid',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            padding: '5 0 0 0',
                                                                            border: true,
                                                                            id: prototype.idSale + '-det-gridDetCpn',
                                                                            height: 170,
                                                                            width: 1150,
                                                                            columnLines: true,
                                                                            resizable: false,
                                                                            columns: {
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: true,
                                                                                    resizable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                items: [
                                                                                    {text: 'Ticket', width: 100, dataIndex: 'TICKET'},
                                                                                    {text: 'CPN', width: 40, dataIndex: 'CUPON'},
                                                                                    {text: 'X/O', width: 35, dataIndex: 'CONEX'},
                                                                                    {text: 'From', width: 45, dataIndex: 'ORIGEN'},
                                                                                    {text: 'To', width: 40, dataIndex: 'DESTINO'},
                                                                                    {text: 'Cr', width: 30, dataIndex: 'CARRIER'},
                                                                                    {text: 'Cl', width: 30, dataIndex: 'CLASE'},
                                                                                    {text: 'Flight<br>Number', width: 60, dataIndex: 'FLIGHT'},
                                                                                    {text: 'Flight<br>Date', width: 65, dataIndex: 'DFLIGHT'},
                                                                                    {text: 'Cr<br>OPE', width: 40, dataIndex: 'CARRIEROPE'},
                                                                                    {text: 'Flight<br>OPE', width: 53, dataIndex: 'FLIGHTOPE'},
                                                                                    {text: 'FareBasis', width: 80, dataIndex: 'FAREBASIS'},
                                                                                    {text: 'Prorate',
                                                                                        defaults: {
                                                                                            menuDisabled: true,
                                                                                            sortable: true,
                                                                                            align: 'center',
                                                                                            border: true
                                                                                        },
                                                                                        columns: [
                                                                                            {text: 'Fare<br> Curr', width: 48, dataIndex: 'CPNCUR'},
                                                                                            {text: 'Fare<br> Amount', dataIndex: 'CPN', width: 70,
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Q <br>Curr', width: 48, dataIndex: 'QCUR'},
                                                                                            {text: 'Q', dataIndex: 'Q', width: 55,
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'YQ', dataIndex: 'YQ', width: 55,
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'IVA', dataIndex: 'IVA', width: 50,
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Comm', dataIndex: 'COMM_G', width: 55,
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Over <br>Comm', dataIndex: 'SCOMM', width: 55,
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Coupon <br>Value', dataIndex: 'CPNLOC', width: 70,
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                //TOTALES
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.idSale + '-det-totales',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 0 1 0',
                                                                    border: false,
                                                                    defaults: {
                                                                        xtype: 'textfield',
                                                                        margin: '0',
                                                                        width: 55,
                                                                        fieldLabel: '',
                                                                        labelwidth: 0,
                                                                        readOnly: true,
                                                                        fieldStyle: 'text-align:right;'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 300},
                                                                        {
                                                                            xtype: 'label',
                                                                            id: prototype.idSale + '-det-lblError',
                                                                            style: {
                                                                                background: '#FFA07A'
                                                                            },
                                                                            text: '',
                                                                            width: 270
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Totals:',
                                                                            labelStyle: 'font-weight:bold;font-size:11px;',
                                                                            width: 50
                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotalCpnCur',
                                                                            fieldStyle: 'text-align:center;',
                                                                            width: 48
                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotalCpn',
                                                                            width: 70
                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotalQCur',
                                                                            fieldStyle: 'text-align:center;',
                                                                            width: 48
                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotalQ'
                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotalYQ'
                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotalIVA',
                                                                            width: 50
                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotalCOM'
                                                                        },
                                                                        {
                                                                            id: prototype.idSale + '-det-lblTotalOVERCOM'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                        // </editor-fold>
                                                    ]
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        //PANEL 3
                                        // <editor-fold defaultstate="collapsed" desc="PANEL 3">
                                        {
                                            xtype: 'panel',
                                            id: prototype.idSale + '-panelDetalles',
                                            width: 1350,
                                            height: 330
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            readOnly: true,
                                            layout: {
                                                type: 'hbox'
                                            },
                                            margin: '1 1 1 1',
                                            border: false,
                                            items: [
                                                // PANEL 3_1 Form of Payment
                                                {
                                                    xtype: 'fieldset',
                                                    title: '<b  style="font-size:12px">Form of Payment<b/>',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    margin: '1 5 0 0',
                                                    width: 340,
                                                    height: 160,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    //border: true,                                                    
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 1 1 1',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold;',
                                                                        width: 35,
                                                                        margin: '1',
                                                                        padding: '1px 2px 0px 2px'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Code'
                                                                        },
                                                                        {
                                                                            text: 'Type'
                                                                        },
                                                                        {
                                                                            text: 'Ref. Number',
                                                                            width: 100
                                                                        },
                                                                        {
                                                                            text: 'Curr'
                                                                        },
                                                                        {
                                                                            text: 'Amount',
                                                                            width: 75
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        width: 30,
                                                                        readOnly: true
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblFOPCode1'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblCardType1'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblRefNumber1',
                                                                            width: 105
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblFOPCur1',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblFOP1',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        width: 30,
                                                                        readOnly: true
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblFOPCode2'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblCardType2'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblRefNumber2',
                                                                            width: 105
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblFOPCur2',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblFOP2',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 50
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Net Remmit:',
                                                                            width: 130
                                                                        },
                                                                        {
                                                                            text: 'Other:'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblFopOtherCur',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblFOPOther',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.idSale + '-det-btnSearch',
                                                                            style: 'background:#E5ECEF',
                                                                            iconCls: 'prx-icon-search',
                                                                            border: false,
                                                                            tooltip: 'Search',
                                                                            width: 30,
                                                                            listeners: {
                                                                                click: 'onClickSearchFOP'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblRemmittanceCur'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblRemmittance',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            width: 25
                                                                        },
                                                                        {
                                                                            text: 'Total:',
                                                                            width: 50
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblFOPCur',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblFOP',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                // PANEL 3_2 Tax / Fee
                                                {
                                                    xtype: 'fieldset',
                                                    title: '<b  style="font-size:12px">Tax / Fee<b/>',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    margin: '1 5 0 5',
                                                    width: 220,
                                                    height: 200,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    //border: true,                                                    
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 1 1 1',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold;',
                                                                        width: 35,
                                                                        margin: '1',
                                                                        padding: '1px 2px 0px 2px'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Code',
                                                                            width: 45
                                                                        },
                                                                        {
                                                                            text: 'Curr'
                                                                        },
                                                                        {
                                                                            text: 'Amount',
                                                                            width: 75
                                                                        },
                                                                        {
                                                                            text: 'PFC'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30,
                                                                        readOnly: true
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAXCode1',
                                                                            width: 40
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAXCur1',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAX1',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblPFC1'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30,
                                                                        readOnly: true
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAXCode2',
                                                                            width: 40
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAXCur2',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAX2',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblPFC2'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30,
                                                                        readOnly: true
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAXCode3',
                                                                            width: 40
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAXCur3',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAX3',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblPFC3'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30,
                                                                        readOnly: true
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAXCode4',
                                                                            width: 40
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAXCur4',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblTAX4',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idSale + '-det-lblPFC4'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Other:',
                                                                            width: 45
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblTAXOtherCur',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblTAXOther',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.idSale + '-det-btnSearch2',
                                                                            style: 'background:#E5ECEF',
                                                                            iconCls: 'prx-icon-search',
                                                                            border: false,
                                                                            tooltip: 'Search',
                                                                            width: 30,
                                                                            listeners: {
                                                                                click: 'onClickSearchTAX'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Total:',
                                                                            width: 45
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblTAXCur',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            id: prototype.idSale + '-det-lblTAX',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: {
                                                        type: 'vbox'
                                                    },
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [

                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            margin: '1 1 1 1',
                                                            border: false,
                                                            items: [
                                                                // PANEL 3_3 Commision
                                                                {
                                                                    xtype: 'fieldset',
                                                                    title: '<b  style="font-size:12px">Commision<b/>',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    margin: '1 5 0 5',
                                                                    width: 305,
                                                                    height: 145,
                                                                    defaults: {
                                                                        border: false
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'vbox',
                                                                            margin: '1 1 1 1',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    layout: 'vbox', margin: '1 1 1 1',
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            bodyStyle: 'background: #E5ECEF',
                                                                                            layout: 'hbox',
                                                                                            margin: '1 1 1 1',
                                                                                            defaults: {
                                                                                                xtype: 'label',
                                                                                                style: 'font-weight:bold;',
                                                                                                width: 35,
                                                                                                margin: '1',
                                                                                                padding: '1px 2px 0px 2px'
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    text: '',
                                                                                                    width: 90
                                                                                                },
                                                                                                {
                                                                                                    text: 'Rate',
                                                                                                    width: 45
                                                                                                },
                                                                                                {
                                                                                                    text: 'Curr'
                                                                                                },
                                                                                                {
                                                                                                    text: 'Amount',
                                                                                                    width: 75
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            bodyStyle: 'background: #E5ECEF',
                                                                                            layout: 'hbox',
                                                                                            margin: '1 1 1 1',
                                                                                            defaults: {
                                                                                                xtype: 'label',
                                                                                                style: 'font-weight:bold',
                                                                                                width: 30,
                                                                                                readOnly: true
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    text: 'Standard:',
                                                                                                    width: 85
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.idSale + '-det-lblCOMMISIONRate1',
                                                                                                    width: 40,
                                                                                                    fieldStyle: 'text-align:right;'
                                                                                                },
                                                                                                {
                                                                                                    width: 5
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.idSale + '-det-lblCOMMISIONCur1',
                                                                                                    width: 35
                                                                                                },
                                                                                                {
                                                                                                    width: 5
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.idSale + '-det-lblCOMMISION1',
                                                                                                    width: 70,
                                                                                                    fieldStyle: 'text-align:right;'
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            bodyStyle: 'background: #E5ECEF',
                                                                                            layout: 'hbox',
                                                                                            margin: '1 1 1 1',
                                                                                            defaults: {
                                                                                                xtype: 'label',
                                                                                                style: 'font-weight:bold',
                                                                                                width: 30,
                                                                                                readOnly: true
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    text: 'Over Comm.:',
                                                                                                    width: 85
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.idSale + '-det-lblCOMMISIONRate2',
                                                                                                    width: 40,
                                                                                                    fieldStyle: 'text-align:right;'
                                                                                                },
                                                                                                {
                                                                                                    width: 5
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.idSale + '-det-lblCOMMISIONCur2',
                                                                                                    width: 35
                                                                                                },
                                                                                                {
                                                                                                    width: 5
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    id: prototype.idSale + '-det-lblCOMMISION2',
                                                                                                    width: 70,
                                                                                                    fieldStyle: 'text-align:right;'
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            bodyStyle: 'background: #E5ECEF',
                                                                                            layout: 'hbox',
                                                                                            margin: '1 1 1 1',
                                                                                            defaults: {
                                                                                                xtype: 'label',
                                                                                                style: 'font-weight:bold',
                                                                                                width: 30
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    text: '',
                                                                                                    width: 85
                                                                                                },
                                                                                                {
                                                                                                    text: 'Other:',
                                                                                                    width: 40
                                                                                                },
                                                                                                {
                                                                                                    width: 5
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    readOnly: true,
                                                                                                    id: prototype.idSale + '-det-lblCOMMISIONCurOther',
                                                                                                    width: 35
                                                                                                },
                                                                                                {
                                                                                                    width: 5
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    readOnly: true,
                                                                                                    id: prototype.idSale + '-det-lblCOMMISIONOther',
                                                                                                    width: 70,
                                                                                                    fieldStyle: 'text-align:right;'
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'button',
                                                                                                    id: prototype.idSale + '-det-btnSearch3_1',
                                                                                                    style: 'background:#E5ECEF',
                                                                                                    iconCls: 'prx-icon-search',
                                                                                                    border: false,
                                                                                                    tooltip: 'Search',
                                                                                                    width: 40,
                                                                                                    listeners: {
                                                                                                        click: 'onClickSearchCOMM'
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'panel',
                                                                                            bodyStyle: 'background: #E5ECEF',
                                                                                            layout: 'hbox',
                                                                                            margin: '1 1 1 1',
                                                                                            defaults: {
                                                                                                xtype: 'label',
                                                                                                style: 'font-weight:bold',
                                                                                                width: 30
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    text: '',
                                                                                                    width: 85
                                                                                                },
                                                                                                {
                                                                                                    text: 'Total:',
                                                                                                    width: 40
                                                                                                },
                                                                                                {
                                                                                                    width: 5
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    readOnly: true,
                                                                                                    id: prototype.idSale + '-det-lblCOMMISIONCur',
                                                                                                    width: 35
                                                                                                },
                                                                                                {
                                                                                                    width: 5
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'textfield',
                                                                                                    readOnly: true,
                                                                                                    id: prototype.idSale + '-det-lblCOMMISION',
                                                                                                    width: 70,
                                                                                                    fieldStyle: 'text-align:right;'
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }

                                                                    ]
                                                                },
                                                                // PANEL 3_4 Tax on Commission
                                                                {
                                                                    xtype: 'fieldset',
                                                                    title: '<b  style="font-size:12px">Tax On Commission<b/>',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    margin: '1 5 0 5',
                                                                    width: 250,
                                                                    height: 145,
                                                                    defaults: {
                                                                        border: false
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'vbox',
                                                                            margin: '1 1 1 1',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    layout: 'hbox',
                                                                                    margin: '1 1 1 1',
                                                                                    defaults: {
                                                                                        xtype: 'label',
                                                                                        style: 'font-weight:bold;',
                                                                                        width: 35,
                                                                                        margin: '1',
                                                                                        padding: '1px 2px 0px 2px'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            text: 'Rate',
                                                                                            width: 45
                                                                                        },
                                                                                        {
                                                                                            text: 'Code',
                                                                                            width: 55
                                                                                        },
                                                                                        {
                                                                                            text: 'Curr'
                                                                                        },
                                                                                        {
                                                                                            text: 'Amount',
                                                                                            width: 75
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    layout: 'hbox',
                                                                                    margin: '1 1 1 1',
                                                                                    defaults: {
                                                                                        xtype: 'label',
                                                                                        style: 'font-weight:bold',
                                                                                        width: 30,
                                                                                        readOnly: true
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            width: 0
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            id: prototype.idSale + '-det-lblTAXCOMMISSIONRate1',
                                                                                            width: 40,
                                                                                            fieldStyle: 'text-align:right;'
                                                                                        },
                                                                                        {
                                                                                            width: 5
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            id: prototype.idSale + '-det-lblTAXCOMMISSIONCode1',
                                                                                            width: 55
                                                                                        },
                                                                                        {
                                                                                            width: 5
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            id: prototype.idSale + '-det-lblTAXCOMMISSIONCur1',
                                                                                            width: 35
                                                                                        },
                                                                                        {
                                                                                            width: 5
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            id: prototype.idSale + '-det-lblTAXCOMMISSION1',
                                                                                            width: 70,
                                                                                            fieldStyle: 'text-align:right;'
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    layout: 'hbox',
                                                                                    margin: '1 1 1 1',
                                                                                    defaults: {
                                                                                        xtype: 'label',
                                                                                        style: 'font-weight:bold',
                                                                                        width: 30
                                                                                    },
                                                                                    items: [{}]
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    layout: 'hbox',
                                                                                    margin: '1 1 1 1',
                                                                                    defaults: {
                                                                                        xtype: 'label',
                                                                                        style: 'font-weight:bold',
                                                                                        width: 30
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            text: '',
                                                                                            width: 35
                                                                                        },
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            id: prototype.idSale + '-det-btnSearch4',
                                                                                            style: 'background:#E5ECEF',
                                                                                            iconCls: 'prx-icon-search',
                                                                                            border: false,
                                                                                            tooltip: 'Search',
                                                                                            width: 30,
                                                                                            listeners: {
                                                                                                click: 'onClickSearchTAXCOMM'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            text: 'Other:',
                                                                                            width: 40
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            readOnly: true,
                                                                                            id: prototype.idSale + '-det-lblTAXCOMMISSIONOtherCur',
                                                                                            width: 35
                                                                                        },
                                                                                        {
                                                                                            width: 5
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            readOnly: true,
                                                                                            id: prototype.idSale + '-det-lblTAXCOMMISSIONOther',
                                                                                            width: 70,
                                                                                            fieldStyle: 'text-align:right;'
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    layout: 'hbox',
                                                                                    margin: '1 1 1 1',
                                                                                    defaults: {
                                                                                        xtype: 'label',
                                                                                        style: 'font-weight:bold',
                                                                                        width: 30
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            text: '',
                                                                                            width: 65
                                                                                        },
                                                                                        {
                                                                                            text: 'Total:',
                                                                                            width: 40
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            readOnly: true,
                                                                                            id: prototype.idSale + '-det-lblTAXCOMMISSIONCur',
                                                                                            width: 35
                                                                                        },
                                                                                        {
                                                                                            width: 5
                                                                                        },
                                                                                        {
                                                                                            xtype: 'textfield',
                                                                                            readOnly: true,
                                                                                            id: prototype.idSale + '-det-lblTAXCOMMISSION',
                                                                                            width: 70,
                                                                                            fieldStyle: 'text-align:right;'
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }

                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        // <editor-fold defaultstate="collapsed" desc="PANEL 2_1 GRID">
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.idSale + '-det-panelGridEMD',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 1 1 1',
                                                            width: 510,
                                                            border: false,
                                                            items: [
                                                                /*{
                                                                 xtype: 'label',
                                                                 labelAlign: 'left',
                                                                 html: '<strong>EMD INFORMATION</strong>',
                                                                 padding: '1px 5px 0px 10px'
                                                                 
                                                                 },*/
                                                                {
                                                                    xtype: 'grid',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    padding: '5 0 0 0',
                                                                    id: prototype.idSale + '-det-gridEMD',
                                                                    height: 112,
                                                                    width: 500,
                                                                    columnLines: true,
                                                                    resizable: false,
                                                                    columns: {
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            resizable: false,
                                                                            align: 'center'
                                                                        },
                                                                        items: [
                                                                            {text: 'Ticket', width: 100, dataIndex: 'TKTEMD'},
                                                                            {text: 'CPN', width: 40, dataIndex: 'CUPONEMD'},
                                                                            {text: 'RFIC', width: 40, dataIndex: 'RFIC'},
                                                                            {text: 'RFIS', width: 50, dataIndex: 'RFIS'},
                                                                            {text: 'Cost', dataIndex: 'COST', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = 'text-align :right;';
                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                }
                                                                            },
                                                                            {text: 'Tax Value', dataIndex: 'TAXVALUE', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = 'text-align :right;';
                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                }
                                                                            },
                                                                            {text: 'Curr Tax', width: 60, dataIndex: 'TAXCURR'}
                                                                            /*{text: 'TKT CNX', width: 100, dataIndex: 'TKTCNX'},
                                                                             {text: 'CPN <br> CNX', width: 60, dataIndex: 'CUPONCNX'}*/
                                                                        ]
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        // </editor-fold
                                                    ]
                                                },
                                                // PANEL 3_5 Other
                                                {
                                                    xtype: 'fieldset',
                                                    title: '<b  style="font-size:12px">Other<b/>',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    margin: '1 5 0 5',
                                                    width: 250,
                                                    height: 310,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    //border: true,                                                    
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 1 1 1',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'vbox', margin: '1 1 1 1',
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold;',
                                                                                width: 100,
                                                                                margin: '1',
                                                                                padding: '1px 2px 0px 2px'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: ''
                                                                                },
                                                                                {
                                                                                    text: 'Curr',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    text: 'Amount',
                                                                                    width: 75
                                                                                }

                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Fare:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblFARE2Cur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblFARE2',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Adc:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblADCCur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblADC',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Original Fare:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALCur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINAL',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Original COMM:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALCOMCur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALCOM',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Original O.CMM:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALOVERCOMCur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALOVERCOM',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Original YQ:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALYQCur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALYQ',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Original IVA:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALIVACur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblORIGINALIVA',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Diff Pax:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblPAXDIFFCur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblPAXDIFF',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'hbox',
                                                                            margin: '1 1 1 1',
                                                                            defaults: {
                                                                                xtype: 'label',
                                                                                style: 'font-weight:bold',
                                                                                width: 100
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Other Incomes:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblOtherIncomenCur',
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idSale + '-det-lblOtherIncomen',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
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
                                        // </editor-fold>
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'bottom',
                                            ui: 'footer',
                                            margin: '1 1 1 1',
                                            defaults: {
                                                scale: 'medium'
                                            },
                                            style: 'aling:center padding: 5px;',
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    text: '<strong style="color:white;">Farecalc<strong>',
                                                    id: prototype.idSale + '-det-btnFareCalc',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    listeners: {
                                                        click: 'onFareCalc'
                                                    }
                                                },
                                                {
                                                    text: '<strong style="color:white;">Delivery<strong>',
                                                    id: prototype.idSale + '-det-btnDeliveryTKT',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    listeners: {
                                                        click: 'onDelivery'
                                                    }
                                                },
                                                {
                                                    text: '<strong style="color:white;">Balance<strong>',
                                                    id: prototype.idSale + '-det-btnBalance',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    listeners: {
                                                        click: 'onBalance'
                                                    }
                                                }/*,
                                                 {
                                                 text: '<strong style="color:white;">Taxes-TUAS<strong>',
                                                 id: prototype.idSale + '-det-btnTUAS',
                                                 cls: 'x-btn-sent',
                                                 overCls: 'x-btn-sent-over',
                                                 listeners: {
                                                 click: 'onTaxes'
                                                 }
                                                 }*/
                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>

                                // <editor-fold defaultstate="collapsed" desc="Tab Prorrateo">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    id: prototype.idSale + '-det-tabProrrateo',
                                    title: 'Prorate',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.idSale + '-contenedor-form',
                                            width: 1446,
                                            height: 740,
                                            items: [
                                                {
                                                    xtype: 'prorrate',
                                                    id: prototype.idSale + '-widget-prorrate'
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>

                            ]
                        }
                    ]
                }

            ]
        }
    ]

});

