/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.DebitBilledReportForm.DataEntryDebitBilledForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDebitBilledForm',

    controller: 'DataEntryDebitBilledController',

    requires: [
        'Ext.Praxis.controller.salesaudit.DebitBilledReportForm.DataEntryDebitBilledController'
    ],
    id: prototype.id01 + '-win',

    title: 'Detail Debit/Credit',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 650,
    width: 900,
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
            id: prototype.id01 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id01 + '-titu1',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: []
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
                            id: prototype.id01 + '-txtCountry',
                            fieldLabel: 'Country',
                            labelWidth: 50,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtIata',
                            fieldLabel: 'Iata',
                            labelWidth: 40,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtSource',
                            fieldLabel: 'Source',
                            labelWidth: 50,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtArea',
                            fieldLabel: 'Area',
                            labelWidth: 50,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtType',
                            fieldLabel: 'Type',
                            labelWidth: 50,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
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
                            id: prototype.id01 + '-txtAudited',
                            fieldLabel: 'Audited by',
                            labelWidth: 65,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtDate',
                            fieldLabel: 'Date',
                            labelWidth: 40,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtNMemo',
                            fieldLabel: 'N° Memo',
                            labelWidth: 60,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotal',
                            fieldLabel: 'Total ADM-ACM',
                            labelWidth: 100,
                            width: 300,
                            value: 'xxxxxx',
                            readOnly: true
                        }


                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridReasons',
                            title: 'Reasons',
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {text: 'Code', dataIndex: 'A2553CODE', width: 50},
                                    {text: 'Description', dataIndex: 'A2553DESCR', flex: 1}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 120,
                            flex: 1
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridtktAGENT',
                            title: 'Documents',
                            columnLines: true,
                            autoScroll: true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'TKT\'S', dataIndex: 'A2548TIKET', flex: 1},
                                    {text: 'Currency', dataIndex: 'A2548MDA', flex: 1},
                                    {text: 'Amount', dataIndex: 'A2548NETO', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 120,
                            flex: 1
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
                            id: prototype.id01 + '-txtTotalFare',
                            fieldLabel: 'Total Fare',
                            labelWidth: 80,
                            value: '0',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalTax',
                            fieldLabel: 'Total Tax',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalPenalty',
                            fieldLabel: 'Total Penalty',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalcharges',
                            fieldLabel: 'Total charges',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
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
                            id: prototype.id01 + '-txtTotalCommi',
                            fieldLabel: 'Total Commi.',
                            labelWidth: 80,
                            value: '0',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalOverCom',
                            fieldLabel: 'Total Over Com',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtToca',
                            fieldLabel: 'Toca',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtIvacharge',
                            fieldLabel: 'Iva(charge)',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
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
                            id: prototype.id01 + '-txtNeto',
                            fieldLabel: 'Total Neto',
                            labelWidth: 80,
                            value: '0',
                            readOnly: true,
                            width: 200
                        }


                    ]
                },
                //segundo
                 {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id01 + '-titu2',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: []
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id01 + '-cabece1',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAudited2',
                            fieldLabel: 'Audited by',
                            labelWidth: 65,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtDate2',
                            fieldLabel: 'Date',
                            labelWidth: 40,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtNMemo2',
                            fieldLabel: 'N° Memo',
                            labelWidth: 60,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotal2',
                            fieldLabel: 'Total ADM-ACM',
                            labelWidth: 100,
                            width: 300,
                            value: 'xxxxxx',
                            readOnly: true
                        }


                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id01 + '-cabece2',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridReasons2',
                            title: 'Reasons',
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {text: 'Code', dataIndex: 'A2553CODE', width: 50},
                                    {text: 'Description', dataIndex: 'A2553DESCR', flex: 1}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 120,
                            flex: 1
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridtktAGENT2',
                            title: 'Documents',
                            columnLines: true,
                            autoScroll: true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'TKT\'S', dataIndex: 'A2548TIKET', flex: 1},
                                    {text: 'Currency', dataIndex: 'A2548MDA', flex: 1},
                                    {text: 'Amount', dataIndex: 'A2548NETO', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 120,
                            flex: 1
                        }
                    ]
                },

                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id01 + '-cabece3',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalFare2',
                            fieldLabel: 'Total Fare',
                            labelWidth: 80,
                            value: '0',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalTax2',
                            fieldLabel: 'Total Tax',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalPenalty2',
                            fieldLabel: 'Total Penalty',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalcharges2',
                            fieldLabel: 'Total charges',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id01 + '-cabece4',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalCommi2',
                            fieldLabel: 'Total Commi.',
                            labelWidth: 80,
                            value: '0',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalOverCom2',
                            fieldLabel: 'Total Over Com',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtToca2',
                            fieldLabel: 'Toca',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtIvacharge2',
                            fieldLabel: 'Iva(charge)',
                            labelWidth: 80,
                            width: 200,
                            value: '0',
                            readOnly: true,
                            labelAlign: 'right'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id01 + '-cabece5',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtNeto2',
                            fieldLabel: 'Total Neto',
                            labelWidth: 80,
                            value: '0',
                            readOnly: true,
                            width: 200
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
                    text: 'Save',
                    id: prototype.id01 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id01 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});
