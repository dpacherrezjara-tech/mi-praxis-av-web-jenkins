/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.MassiveRefunduatpFormTicket',
    controller: 'MassiveRefunduatpFormTicketController',
    requires: [
        'Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicketController'
    ],
    id: prototype.idMassiveRefunduatpFormTicket + '-win',
    title: 'TICKET DETAIL',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 640,
    width: 950,
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
            id: prototype.idMassiveRefunduatpFormTicket + '-form',
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
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtfolio',
                            fieldLabel: 'Folio',
                            labelWidth: 30,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttkt',
                            fieldLabel: 'TKT',
                            labelWidth: 30,
                            width: 190,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtcpn',
                            fieldLabel: 'CPN',
                            labelWidth: 30,
                            width: 190,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtuse',
                            fieldLabel: 'USE',
                            labelWidth: 30,
                            width: 190,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttrnc',
                            fieldLabel: 'TRNC',
                            labelWidth: 30,
                            width: 180,
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
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtRefe',
                            fieldLabel: 'Refe',
                            labelWidth: 30,
                            value: 'xxxxxx',
                            //readOnly: true,
                            width: 348,
                            maxLength: 80,
                            enforceMaxLength: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtStatus',
                            fieldLabel: 'Status',
                            labelWidth: 35,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtBPO',
                            fieldLabel: 'BPO',
                            labelWidth: 30,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtAudit',
                            fieldLabel: 'Audit',
                            labelWidth: 35,
                            width: 150,
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
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtIssdate',
                            fieldLabel: 'Iss. date',
                            labelWidth: 55,
                            width: 150,
                            value: 'xxxxxx',
                            maxLength: 8,
                            enforceMaxLength: 8
                                    //readOnly: true
                        }, {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtSystemDate',
                            fieldLabel: 'Sys. Date',
                            labelWidth: 60,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txttidoc',
                            fieldLabel: 'Tdoc',
                            labelWidth: 35,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtType',
                            fieldLabel: 'Type',
                            labelWidth: 35,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtBase',
                            fieldLabel: 'Base',
                            labelWidth: 35,
                            width: 180,
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
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtGruop',
                            fieldLabel: 'Group',
                            labelWidth: 40,
                            width: 180,
                            value: 'xxxxxx',
                            readOnly: true
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Error',
                            labelStyle: 'font-weight: bold;',
                            labelWidth: 35
                        },
                        {
                            xtype: 'button',
                            icon: 'resources/img/botones/16x16/swap.png',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txterror',
                            tooltip: 'Check Error Detail',
                            listeners: {
                                click: 'onSeguimietoClick'
                            }
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
                            id: prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT',
                            title: 'FORM OF PAYMENT', hidden: true,
                            columnLines: true,
                            selModel: 'cellmodel',

                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            plugins: {
                                cellediting: {
                                    clicksToEdit: 1
                                }
                            },
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Fop',
                                            id: prototype.idMassiveRefunduatpFormTicket + '-gridFopADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onAddFopClick'
                                        }, '-']
                                }],
                            autoScroll: true,
                            columns: {
                                items: [
                                    {text: 'Type', width: 50, dataIndex: 'A4077CFOP', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 2, enforceMaxLength: 2,
                                                maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                listeners: {
                                                    change: 'onchange'
                                                }
                                            }
                                        }},
                                    {text: 'Card<br>Type', width: 45, dataIndex: 'A4077TYCAR', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 2, enforceMaxLength: 2,
                                                maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                listeners: {
                                                    change: 'onchange'
                                                }
                                            }
                                        }},
                                    {text: 'Ref Number', width: 150, dataIndex: 'A4077NTARJ', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 19, enforceMaxLength: 19
                                            }
                                        }},
                                    {text: 'Net', dataIndex: 'A4077TOTAL', width: 120, align: 'right', editor: 'numberfield',
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                total = total + parseFloat(records[j].get('A4077TOTAL'));
                                            }
                                            return total.toFixed(2);
                                            //console.log(records);
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text: 'Delete',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'onDeleteFopClick'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 500
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idMassiveRefunduatpFormTicket + '-gridFop',
                            title: 'FORM OF PAYMENT',
                            columnLines: true, hidden: true,
                            autoScroll: true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Type', dataIndex: 'A4077CFOP', width: 70},
                                    {text: 'Card Type', dataIndex: 'A4077TYCAR', width: 45},
                                    {text: 'Credit Card<br> Number', dataIndex: 'A4077NTARJ', width: 250},
                                    {text: 'Net', dataIndex: 'A4077TOTAL', width: 90, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 500
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes',
                            columnLines: true, hidden: true,
                            title: 'TAXES AM',
                            autoScroll: true,
                            selModel: 'cellmodel',
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Taxes',
                                            id: prototype.idMassiveRefunduatpFormTicket + '-gridTaxesADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'OnAddTaxRenderer'
                                        }, '-']
                                }],
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Tax', dataIndex: 'A4078CDTAX', align: 'center', width: 60, editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 3, enforceMaxLength: 3,
                                                listeners: {
                                                    change: 'onchange'
                                                }
                                            }
                                        }},
                                    {text: 'Ato', width: 60, dataIndex: 'A4078CDATO', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 3, enforceMaxLength: 3,
                                                maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                listeners: {
                                                    change: 'onchange'
                                                }
                                            }
                                        }},
                                    {text: 'Net', dataIndex: 'A4078TXDIF', width: 120, align: 'right', editor: 'numberfield',
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary', //summaryType: 'sum',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                total = total + parseFloat(records[j].get('A4078TXDIF'));
                                            }
                                            return total.toFixed(2);
                                            //console.log(records);
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'onDeleteTaxClick'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 450
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idMassiveRefunduatpFormTicket + '-gridTax',
                            title: 'TAXES', hidden: true,
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
                                    {text: 'Cur', dataIndex: 'A4078MONED', width: 45},
                                    {text: 'Tax</br>Code', dataIndex: 'A4078CDTAX', width: 80},
                                    {text: 'Ato', dataIndex: 'A4078CDATO', width: 60},
                                    {text: 'Amount', dataIndex: 'A4078TXDIF', width: 150, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 330
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtFaremda',
                            readOnly: true,
                            value: '',
                            width: 30
                        }, {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtFare',
                            fieldLabel: 'Fare',
                            labelWidth: 33,
                            //readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkey',
                                //blur: 'onTotaFare'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtEquivamda',
                            //readOnly: true,
                            value: '',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv',
                            fieldLabel: 'Equivalent',
                            labelWidth: 65,
                            //readOnly: true,
                            value: '0.00',
                            listeners: {
                                specialkey: 'onSearchkey',
                                //blur: 'onTotaFare'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax',
                            fieldLabel: 'Total Tax',
                            readOnly: true,
                            labelWidth: 65,
                            value: '0.00'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTotal',
                            fieldLabel: 'Total RFND',
                            labelWidth: 65,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTotalPraxis',
                            fieldLabel: 'Total Praxis',
                            labelWidth: 65,
                            readOnly: true,
                            value: '0.00'
                        }


                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtCommi1',
                            fieldLabel: 'Commission',
                            labelWidth: 65,
                            //readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTcambi1',
                            fieldLabel: 'Rate',
                            labelWidth: 40,
                            readOnly: true,
                            value: '0.00'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtToca1',
                            fieldLabel: 'Toca.',
                            labelWidth: 65,
                            //readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-txtTcambi2',
                            fieldLabel: 'Rate',
                            labelWidth: 40,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idMassiveRefunduatpFormTicket + '-ComboCambio',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'left',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [{
                            xtype: 'textareafield',
                            id: prototype.idMassiveRefunduatpFormTicket + '-Argument',
                            labelWidth: 85,
                            width: 850,
                            height: 80,
                            grow: true,
                            maxLength: 300,
                            enforceMaxLength: true,
                            name: 'Argument',
                            fieldLabel: 'Argument'
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
                    icon: 'resources/img/botones/24x24/1337982029_3floppy_unmount.png',
                    text: 'Save', id: prototype.idMassiveRefunduatpFormTicket + '-Save',
                    height: 30, hidden: true,
                    scale: 'medium',
                    listeners: {
                        click: 'onClickSave'
                    }
                }, {
                    text: 'Close',
                    id: prototype.idMassiveRefunduatpFormTicket + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});



