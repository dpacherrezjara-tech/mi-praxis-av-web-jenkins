
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.ADJAccountingForm.DataAddEntryNew', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataAddEntryNew',
    controller: 'DataAddEntryNewADJAccountingController',
    requires: [
        'Ext.Praxis.controller.sales.ADJAccounting.DataAddEntryNewADJAccountingController'
    ],
    id: prototype.idadjaddnew + '-winaddnew',
    title: 'New Concept',
    header: true,
    height: 700,
    width: 1200,
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
            id: prototype.idadjaddnew + '-formaddnew',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            width: 50,
                            text: 'Ticket: ',
                            style: 'font-weight:normal',
                            padding: '4px 5px 2px 8px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-txtCiaaddnew',
                            hideLabel: true,
                            width: 35,
                            maskRe: /[0-9]/,
                            maxLength: 3,
                            enforceMaxLength: 3,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-txtFrmaSerieaddnew',
                            hideLabel: true,
                            width: 80,
                            maskRe: /[0-9]/,
                            maxLength: 10,
                            enforceMaxLength: 10,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-txtSeqaddnew',
                            hideLabel: true,
                            width: 30,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-txtTransactionaddnew',
                            fieldLabel: 'Transaction',
                            labelWidth: 70,
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-txtCpnaddnew',
                            fieldLabel: 'Cupon',
                            labelWidth: 30,
                            width: 80,
                            maskRe: /[0-4]/,
                            maxLength: 1,
                            enforceMaxLength: 1,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-txtTDOCaddnew',
                            fieldLabel: 'TDOC',
                            labelWidth: 40,
                            width: 110,
                            listeners: {
                                specialkey: 'onSearchkey',
                                change: 'onchange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-txtTFORaddnew',
                            fieldLabel: 'TFOR',
                            labelWidth: 40,
                            width: 110,
                            listeners: {
                                specialkey: 'onSearchkey',
                                change: 'onchange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-Concept1addnew',
                            fieldLabel: 'Concept 1',
                            labelWidth: 65,
                            width: 120,
                            listeners: {
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-Concept2addnew',
                            fieldLabel: 'Concept 2',
                            labelWidth: 65,
                            width: 120,
                            listeners: {
                                change: 'onUpperValue'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-Concept3addnew',
                            fieldLabel: 'Concept 3',
                            labelWidth: 65,
                            width: 120,
                            listeners: {
                                change: 'onUpperValue'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'button',
                            id: prototype.idadjaddnew + '-de-btnSearchaddnew',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search Account',
                            listeners: {
                                click: 'onBtnSearch'
                            }
                        }


                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Document Type',hidden:true,
                            id: prototype.idadjaddnew + '-cmbDocumentType',
                            queryMode: 'local',
                            displayField: 'A1740TITRA',
                            valueField: 'A1740TITRA',
                            width: 200,
                            labelWidth: 100,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender2'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Account Type',hidden:true,
                            id: prototype.idadjaddnew + '-cmbAccountType',
                            queryMode: 'local',
                            displayField: 'A1740TIPODESC',
                            valueField: 'A1740TIPO',
                            width: 200,
                            labelWidth: 100,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Category',hidden:true,
                            id: prototype.idadjaddnew + '-cmbCategory',
                            queryMode: 'local',
                            displayField: 'A1740CATEG',
                            valueField: 'A1740CATEG',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender2'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-txtIATAFLOWN',
                            width: 180,
                            fieldLabel: 'IATA',
                            maskRe: /[0-9]/,
                            maxLength: 8,
                            enforceMaxLength: 8,
                            enableKeyEvents: true,
                            labelWidth: 50
                        },
                        {xtype: 'tbspacer', width: 20}, {
                            xtype: 'button',
                            id: prototype.idadjaddnew + '-de-addaccountaddnew',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Add Account',
                            listeners: {
                                click: 'onAddAccount'
                            }
                        }




                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-CardTypeaddnew',
                            fieldLabel: 'Card Type',
                            labelWidth: 60,
                            readOnly: true,
                            width: 170
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-CardNumberaddnew',
                            fieldLabel: 'Card Number',
                            labelWidth: 75,
                            readOnly: true,
                            width: 170
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idadjaddnew + '-txtcreateARaddnew',
                            labelWidth: 70,
                            labelSeparator: '',
                            fieldLabel: 'Create AR',
                            listeners: {
                                change: 'onChkChangeCPN'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-RFICaddnew',
                            fieldLabel: 'RFIC',
                            labelWidth: 30,
                            readOnly: true,
                            width: 170
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-RFISaddnewa',
                            fieldLabel: 'RFIS',
                            labelWidth: 30,
                            readOnly: true,
                            width: 170
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-VRICOCaddnew',
                            fieldLabel: 'VRICOC',
                            labelWidth: 60,
                            readOnly: true,
                            width: 170
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-CurrLocaddnew',
                            fieldLabel: 'Curr. Loc',
                            labelWidth: 75,
                            readOnly: true,
                            width: 170
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idadjaddnew + '-de-ExchangeRateaddnew',
                            fieldLabel: 'Exchange Rate',
                            labelWidth: 90,
                            width: 200
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-DebitLocaddnew',
                                    fieldLabel: 'Debit Loc',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-CreditLocaddnew',
                                    fieldLabel: 'Credit Loc',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                }


                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-DebitRevaddnew',
                                    fieldLabel: 'Rev',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-CreditRevaddnew',
                                    fieldLabel: 'Rev',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0'
                                }


                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.idadjaddnew + '-txtModifyDebitaddnew',
                                    labelWidth: 40,
                                    labelSeparator: '',
                                    fieldLabel: 'Modify',
                                    listeners: {
                                        change: 'onChkModify1'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.idadjaddnew + '-txtModifyCredaddnew',
                                    labelWidth: 40,
                                    labelSeparator: '',
                                    fieldLabel: 'Modify',
                                    listeners: {
                                        change: 'onChkModify2'
                                    }
                                }


                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                //labelStyle: 'font-weight: bold; color:red;'
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-AccountNumber1',
                                    fieldLabel: 'Account Number',
                                    labelWidth: 100,
                                    width: 400
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                //labelStyle: 'font-weight: bold; color:red;'
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-Description1',
                                    fieldLabel: 'Description',
                                    labelWidth: 60,
                                    width: 300
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                //labelStyle: 'font-weight: bold; color:red;'
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-LIB1',
                                    fieldLabel: 'LIB1',
                                    labelWidth: 30,
                                    width: 170,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                //labelStyle: 'font-weight: bold; color:red;'
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.idadjaddnew + '-txtPTE',
                                    labelWidth: 25,
                                    labelSeparator: '',
                                    fieldLabel: 'PTE'
                                }

                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-Client',
                                    fieldLabel: 'Client',
                                    labelWidth: 100,
                                    width: 200
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                //labelStyle: 'font-weight: bold; color:red;'
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-Provider',
                                    fieldLabel: 'Provider',
                                    labelWidth: 50,
                                    width: 200
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-Adress',
                                    fieldLabel: 'Adress',
                                    labelWidth: 45,
                                    width: 170
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                //labelStyle: 'font-weight: bold; color:red;'
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-DocOracle',
                                    fieldLabel: 'Doc. Oracle',
                                    labelWidth: 70,
                                    width: 170,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idadjaddnew + '-de-CIA1',
                                    fieldLabel: 'CIA1',
                                    labelWidth: 30,
                                    width: 170
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idadjaddnew + '-de-accept',
                                    cls: 'x-btn-sent',
                                    tooltip: 'Accept',
                                    overCls: 'x-btn-sent-over',
                                    text: '<span style="color: white; font-weight: bold;">Accept</span>',
                                    listeners: {
                                        click: 'onBtnAccept'
                                    }
                                }

                            ]
                        }


                    ]
                },
                {
                    xtype: 'grid',
                    padding: '5 0 0 0',
                    id: prototype.idadjaddnew + '-de-gridViewAccounting',
                    width: 1190,
                    height: 400,
                    autoScroll: true,
                    columnLines: true,
                    resizable: false,
                    dockedItems: [{
                            xtype: 'toolbar',
                            items: [{
                                    id: prototype.idadjnew + '-gridonAccept',
                                    cls: 'x-btn-sent',
                                    tooltip: 'Accept',
                                    overCls: 'x-btn-sent-over',
                                    text: '<span style="color: white; font-weight: bold;">Accept</span>',
                                    handler: 'onAcceptClick'
                                }, '-']
                        }],
                    selModel: {
                        selType: 'checkboxmodel',
                        showHeaderCheckbox: false,
                        listeners: {
                            beforeselect: function (grid, record, index, eOpts, metaData) {
                                if (record.data.A1716MODO === '' || record.data.A1716MODO === 'TOTAL') {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    },
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'PTE', width: 40, xtype: 'checkcolumn', dataIndex: 'A1716MARCA',
                                renderer: function (value, meta, record, row, col) {
                                    var me = this;

                                    if (record.data.A1716MODO === '' || record.data.A1716MODO === 'TOTAL') {
                                        meta['tdCls'] = 'x-item-disabled';
                                    } else {
                                        meta['tdCls'] = '';
                                    }
                                    return new Ext.ux.CheckColumn().renderer(value);
                                }
                            },
                            {text: 'TDOC', dataIndex: 'TDOC', width: 45},
                            {text: 'TFOR', width: 45, dataIndex: 'TFOR'},
                            {text: 'C1', width: 30, dataIndex: 'CONCEPT1'},
                            {text: 'C2', width: 30, dataIndex: 'CONCEPT2'},
                            {text: 'C3', width: 30, dataIndex: 'CONCEPT3'},
                            {text: 'Card', width: 40, dataIndex: 'TTARJ'},
                            {text: 'Nbr Card', width: 100, dataIndex: 'NTARJ', renderer: 'onRendererColumnAttr'},
                            {text: 'RFIC', width: 40, dataIndex: 'RFIC'},
                            {text: 'RFIS', width: 40, dataIndex: 'RFIS'},
                            {text: 'LOCAL ',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Debit', dataIndex: 'DEBITO', width: 70, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Credit', dataIndex: 'CREDITO', width: 70, renderer: 'onColumnAmountRenderer'}

                                ]
                            },
                            {text: 'REVENUE ',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Debit', dataIndex: 'DEBITORV', width: 70, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Credit', dataIndex: 'CREDITORV', width: 70, renderer: 'onColumnAmountRenderer'}

                                ]
                            },
                            {text: 'CTA', dataIndex: 'CTA', width: 150, renderer: 'onRendererColumnAttr'},
                            {text: 'LIB1', dataIndex: 'LIB1', width: 40},
                            {text: 'CIA1', dataIndex: 'CIA1', width: 40},
                            {text: 'Client', dataIndex: 'CLIENTE', width: 55},
                            {text: 'Direc.', dataIndex: 'DIRECCION', width: 55},
                            //{text: 'Provi.', dataIndex: 'PROVEEDOR', width: 55},
                            {text: 'Concept', dataIndex: 'TITULO', width: 100, renderer: 'onRendererColumnAttr'}
                            //{text: 'TD_ORACLE', dataIndex: 'TD_ORACLE', width: 80}

                        ]
                    }, viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true
                    }
                },
                {
                    xtype: 'grid',
                    padding: '5 0 0 0',
                    id: prototype.idadjaddnew + '-de-gridFLOWN',
                    width: 1000,
                    height: 400,
                    autoScroll: true,
                    columnLines: true,
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Type', dataIndex: 'A1740TITRA', width: 80},
                            {text: 'Cta Type', width: 80, dataIndex: 'A1740TIPODESC'},
                            {text: 'Sub Type', width: 80, dataIndex: 'A1740SUBTI'},
                            {text: 'Category', width: 80, dataIndex: 'A1740CATEG'},
                            {text: 'CTA', dataIndex: 'A1740CTA', width: 300},
                            {text: 'Concept', dataIndex: 'A1740CLIE', width: 300, renderer: 'onRendererColumnAttr'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 50,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-check ',
                                        tooltip: 'Select',
                                        handler: 'onSelectClick'
                                    }
                                ]
                            }

                        ]
                    }, viewConfig: {
                        //trackOver: false,
                        stripeRows: true,
                        enableTextSelection: true
                    }
                }




            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.idadjaddnew + '-btn-closeaddnew',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});

