/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryAdm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idAdm + '-dataEntryAdm',
    controller: prototype.id + '-dataEntryAdmController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryAdmController',
        //'Ext.Praxis.view.screens.CtrlDeliveryOrigForm'
        //'Ext.Praxis.view.program.ProFacsimilForm.Facsimil',
        //'Ext.Praxis.view.widgets.facsimil',
        'Ext.Praxis.view.widgets.prorrate'
    ],
    title: 'Memo Information',
    header: true,
    width: 710,
    height: 465,
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
            id: prototype.idAdm + '-DataEntryAdm-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 700,
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: #E5ECEF',
                            id: prototype.idAdm + '-det-Memo',
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
                                                            text: 'Exchange Rate:'
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
                                                                    id: prototype.idAdm + '-det-lblCia',
                                                                    width: 30,
                                                                    fieldLabel: ''
                                                                },
                                                                {xtype: 'tbspacer', width: 10},
                                                                {
                                                                    id: prototype.idAdm + '-det-lblDocumento',
                                                                    fieldLabel: '',
                                                                    width: 70
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            id: prototype.idAdm + '-det-lblTransaction',
                                                            xtype: 'textfield',
                                                            margin: '1',
                                                            fieldStyle: 'text-align:left;',
                                                            labelSeparator: '',
                                                            fieldLabel: '',
                                                            width: 110
                                                        },
                                                        {
                                                            id: prototype.idAdm + '-det-lblExchangeRate',
                                                            xtype: 'textfield',
                                                            margin: '2',
                                                            fieldStyle: 'text-align:right;',
                                                            labelSeparator: '',
                                                            fieldLabel: '',
                                                            width: 110
                                                        }
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
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    border: false,
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'vbox',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            margin: '1 1 1 1',
                                                                            border: false,
                                                                            defaults: {
                                                                                labelStyle: 'font-weight:bold;font-size:11px;'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    id: prototype.idAdm + '-det-lblDigito',
                                                                                    xtype: 'textfield',
                                                                                    fieldLabel: 'D:',
                                                                                    margin: '1',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    labelWidth: 60,
                                                                                    width: 110
                                                                                },
                                                                                {
                                                                                    id: prototype.idAdm + '-det-lblDocType',
                                                                                    xtype: 'textfield',
                                                                                    margin: '1',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: 'Doc. T.:',
                                                                                    labelWidth: 60,
                                                                                    width: 110
                                                                                },
                                                                                {
                                                                                    id: prototype.idAdm + '-det-lblLocalCur',
                                                                                    xtype: 'textfield',
                                                                                    margin: '2',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: 'Local Curr:',
                                                                                    labelWidth: 60,
                                                                                    width: 110
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
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
                                                                                    text: 'Iata Code:'
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
                                                                                            id: prototype.idAdm + '-det-lblGroup',
                                                                                            width: 65,
                                                                                            fieldLabel: ''
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idAdm + '-det-lblSource',
                                                                                            fieldLabel: '',
                                                                                            width: 50
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idAdm + '-det-lblFileId',
                                                                                            fieldLabel: 'File ID:',
                                                                                            labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                            width: 115,
                                                                                            labelWidth: 45
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    id: prototype.idAdm + '-det-lblIssueDate',
                                                                                    xtype: 'textfield',
                                                                                    margin: '1',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: '',
                                                                                    width: 65
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
                                                                                            id: prototype.idAdm + '-det-lblIata',
                                                                                            width: 65,
                                                                                            fieldLabel: ''
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idAdm + '-det-lblSaleCity',
                                                                                            fieldLabel: 'Sale City:',
                                                                                            labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                            width: 100,
                                                                                            labelWidth: 60
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idAdm + '-det-lblSalePais',
                                                                                            fieldLabel: '',
                                                                                            width: 40
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
                                            ]
                                        }
                                    ]
                                },
                                //PANEL 3
                                // <editor-fold defaultstate="collapsed" desc="PANEL 3">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
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
                                            margin: '1 5 0 5',
                                            width: 230,
                                            height: 120,
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
                                                                    text: 'Code'
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
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblFOPCode'
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblFOPCur'
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblFOP',
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
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    readOnly:true,
                                                                    id: prototype.idAdm + '-det-lblRemmittanceCur'
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    readOnly:true,
                                                                    id: prototype.idAdm + '-det-lblRemmittance',
                                                                    width: 70,
                                                                    fieldStyle: 'text-align:right;'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        // PANEL 3_2 Fare
                                        {
                                            xtype: 'fieldset',
                                            title: '<b  style="font-size:12px">Fare<b/>',
                                            bodyStyle: 'background: #E5ECEF',
                                            margin: '1 5 0 5',
                                            width: 180,
                                            height: 120,
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
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblFareCur'
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblFare',
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
                                        // PANEL 3_3 Tax / Fee
                                        {
                                            xtype: 'fieldset',
                                            title: '<b  style="font-size:12px">Tax / Fee<b/>',
                                            bodyStyle: 'background: #E5ECEF',
                                            margin: '1 5 0 5',
                                            width: 180,
                                            height: 120,
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
                                                                    text: 'Code',
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
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblTAXCode',
                                                                    width: 40
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblTAXCur'
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblTAX',
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
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    margin: '1 1 1 1',
                                    border: false,
                                    items: [
                                        // PANEL 4_1 Commision
                                        {
                                            xtype: 'fieldset',
                                            title: '<b  style="font-size:12px">Commision<b/>',
                                            bodyStyle: 'background: #E5ECEF',
                                            margin: '1 5 0 5',
                                            width: 230,
                                            height: 120,
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Standard:',
                                                                            width: 85
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idAdm + '-det-lblCOMMISIONCur1'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idAdm + '-det-lblCOMMISION1',
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
                                                                            text: 'Over Comm.:',
                                                                            width: 85
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idAdm + '-det-lblCOMMISIONCur2'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idAdm + '-det-lblCOMMISION2',
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
                                        // PANEL 4_2 Tax on Commission
                                        {
                                            xtype: 'fieldset',
                                            title: '<b  style="font-size:12px">Tax On Commission<b/>',
                                            bodyStyle: 'background: #E5ECEF',
                                            margin: '1 5 0 5',
                                            width: 180,
                                            height: 120,
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
                                                                width: 30
                                                            },
                                                            items: [
                                                                {
                                                                    width: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblTAXCOMMISSIONCur'
                                                                },
                                                                {
                                                                    width: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.idAdm + '-det-lblTAXCOMMISSION',
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
                                {
                                    xtype: 'panel',
                                    id:prototype.idAdm+'-det-totales',
                                    bodyStyle: 'background: #E5ECEF',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    height: 30,
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
                                        //{xtype: 'tbspacer', width: 300},
                                        {
                                            xtype: 'label',
                                            id: prototype.idAdm + '-det-lblError',
                                            text: 'hola',
                                            width: 270
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
                                            text: '<strong style="color:white;">Delivery<strong>',
                                            id: prototype.idAdm + '-det-btnDeliveryTKT',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            listeners: {
                                                click: 'onDelivery'
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

});

