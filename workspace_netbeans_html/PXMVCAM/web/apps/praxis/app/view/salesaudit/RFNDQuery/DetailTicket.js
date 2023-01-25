/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailTicket',
    controller: 'DetailTicketController',
    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDQuery.DetailTicketController'
    ],
    id: prototype.idDetailTicket + '-win',
    title: 'TICKET DETAIL',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 880,
    width: 1090,
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
            id: prototype.idDetailTicket + '-form',
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
                            id: prototype.idDetailTicket + '-txtfolio',
                            fieldLabel: 'Folio',
                            labelWidth: 30,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txttkt',
                            fieldLabel: 'TKT',
                            labelWidth: 30,
                            width: 190,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtcpn',
                            fieldLabel: 'CPNs',
                            labelWidth: 30,
                            width: 80,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txttrnc',
                            fieldLabel: 'TRNC',
                            labelWidth: 30,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtIssdate',
                            fieldLabel: 'Iss. date',
                            labelWidth: 55,
                            width: 150,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txttidoc',
                            fieldLabel: 'Type',
                            labelWidth: 35,
                            width: 120,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idDetailTicket + '-CmbConto',
                            fieldLabel: 'CJT',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 120,
                            labelWidth: 30,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 100
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idDetailTicket + '-CmbTRFND',
                            fieldLabel: 'T.RFND',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 120,
                            labelWidth: 40,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 100
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
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtpax',
                            fieldLabel: 'Pax. name',
                            labelWidth: 80,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtReqReason',
                            fieldLabel: 'Req. Reason',
                            labelWidth: 75,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 350
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtRemarks',
                            fieldLabel: 'Remarks',
                            labelWidth: 50,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 350
                        },
                        {
                            xtype: 'button', hidden: true,
                            id: prototype.idDetailTicket + '-txtImageView',
                            iconCls: 'prx-icon-image-view',
                            tooltip: 'View files',
                            listeners: {
                                click: 'onImageViewClick'
                            }
                        },
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
                            id: prototype.idDetailTicket + '-txtEndorse',
                            fieldLabel: 'Endorsements',
                            labelWidth: 80,
                            width: 650,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtiata',
                            fieldLabel: 'IATA',
                            labelWidth: 30,
                            width: 120,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtzone',
                            fieldLabel: 'Zone',
                            labelWidth: 30,
                            width: 165,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            text: 'History',
                            id: prototype.idDetailTicket + '-txtHistory',
                            iconCls: 'prx-icon-104-ticket',
                            listeners: {
                                click: 'OnListHistoryRenderer'
                            }

                            //iconCls: 'prx-icon-104-ticket'
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
                            id: prototype.idDetailTicket + '-txtFareCal',
                            fieldLabel: 'FareCalculation',
                            labelWidth: 80,
                            width: 650,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtFlag',
                            fieldLabel: 'Status',
                            labelWidth: 40,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtrefundable',
                            fieldLabel: 'Refundable',
                            labelWidth: 70,
                            width: 120,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Error',
                            labelStyle: 'font-weight: bold;',
                            labelWidth: 35
                        },
                        {
                            xtype: 'button',
                            icon: 'resources/img/botones/16x16/swap.png',
                            id: prototype.idDetailTicket + '-txterror',
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
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtRfndFee',
                            fieldLabel: 'Fee',
                            labelWidth: 80,
                            width: 650,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtStatus',
                            fieldLabel: 'BPO',
                            labelWidth: 25,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtCOUNTRY',
                            fieldLabel: 'Country',
                            labelWidth: 45,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtpnr',
                            fieldLabel: 'PNR',
                            labelWidth: 25,
                            width: 100,
                            value: '0000',
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
                            id: prototype.idDetailTicket + '-gridCPN',
                            title: 'COUPON',
                            //collapsible: true,
                            // collapseDirection: "right",
                            //collapsed: true,
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {text: 'Nbr', dataIndex: 'A3654CPN', width: 50},
                                    {text: 'Cx', dataIndex: 'A3654STOP', width: 30},
                                    {text: 'Al', dataIndex: 'A3654MARKE', width: 50},
                                    {text: 'FIt', dataIndex: 'A3654NFLGH', width: 50},
                                    {text: 'Cl', dataIndex: 'A3654CLAS', width: 50},
                                    {text: 'Dep', dataIndex: 'A3654FORIG', width: 90},
                                    {text: 'Frm', dataIndex: 'A3654ORIGE', width: 50},
                                    {text: 'To', dataIndex: 'A3654DESTI', width: 50},
                                    {text: 'Time', dataIndex: 'A3654HORIG', width: 60},
                                    {text: 'Bk St', dataIndex: 'A3654BOOKI', width: 40},
                                    {text: 'Fb', dataIndex: 'A3654FBASI', width: 100},
                                    {text: 'Stat', dataIndex: 'A3654CURS1', width: 60},
                                    {text: 'FF', dataIndex: 'A2548MDA', width: 60},
                                    {text: 'Bags', dataIndex: 'A3654BAGAL', width: 60},
                                    {text: 'Net', dataIndex: 'A3654MONTO', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 120,
                            width: 900
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtCase',
                            fieldLabel: 'SF Case',
                            labelWidth: 50,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
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
                            id: prototype.idDetailTicket + '-gridListTaxes',
                            title: 'TAXES', hidden: true,
                            //collapsible: true,
                            //collapseDirection: "right",
                            //collapsed: true,
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
                                    {text: 'Cur', dataIndex: 'A3652MONED', width: 60},
                                    {text: 'Tax</br>Code', dataIndex: 'A3652CDTAX', width: 80},
                                    {text: 'Airport<br>PFC', width: 60, dataIndex: 'A3652APFC'},
                                    {text: 'Amount', dataIndex: 'A3652TXDIF', width: 100, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 320
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idDetailTicket + '-gridTaxes', hidden: true,
                            //collapsible: true,
                            //collapseDirection: Ext.Component.DIRECTION_LEFT,
                            //columnLines: true,
                            title: 'TAXES',
                            autoScroll: true,
                            selModel: 'cellmodel',
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Taxes',
                                            id: prototype.idDetailTicket + '-gridTaxesADD',
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
                                    {text: 'Cur', dataIndex: 'A3652MONED', flex: 1},
                                    {text: 'Tax', dataIndex: 'A3652CDTAX', align: 'center', flex: 1, editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 3, enforceMaxLength: 3,
                                                listeners: {
                                                    change: 'onchange'
                                                }
                                            }
                                        }},
                                    {text: 'Airport<br>PFC', width: 60, dataIndex: 'A3652APFC', editor: {
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
                                    {text: 'Net', dataIndex: 'A3652TXDIF', flex: 1, align: 'right', editor: 'numberfield',
                                        hideTrigger: true, keyNavEnabled: false, mouseWheelEnabled: false,
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary', //summaryType: 'sum',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                total = total + parseFloat(records[j].get('A3652TXDIF'));
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
                                                handler: 'OnTaxRFNDRemove'
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
                            width: 400
                        }, {
                            xtype: 'grid',
                            id: prototype.idDetailTicket + '-gridPAYMENT',
                            title: 'FORM OF PAYMENT', hidden: true,
                            //collapsible: true,
                            //collapseDirection: Ext.Component.DIRECTION_LEFT,
                            //columnLines: true,
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
                                            id: prototype.idDetailTicket + '-gridFopADD',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onAddFopClick'
                                        }, '-']
                                }],
                            autoScroll: true,
                            columns: {
                                items: [//maxLength: 3,enforceMaxLength: 3,
                                    {text: 'Code', width: 50, dataIndex: 'A3653CFOP', editor: {
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
                                    {text: 'Card<br>Type', width: 45, dataIndex: 'A3653TYCAR', editor: {
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
                                    {text: 'Ref Number', width: 150, dataIndex: 'A3653NTARJ', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 19, enforceMaxLength: 19
                                            }
                                        }},
                                    {text: 'Expired<br>Card Date', width: 80, dataIndex: 'A3653FEXP', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 8, enforceMaxLength: 8,
                                                format: 'Y/m/d', maskRe: /[0-9]/
                                            }
                                        }},
                                    {text: 'Approval<br>Card', width: 70, dataIndex: 'A3653CAPL', editor: {
                                            completeOnEnter: false,
                                            field: {
                                                xtype: 'textfield',
                                                maxLength: 6, enforceMaxLength: 6,
                                                maskRe: /[0-9]/
                                            }
                                        }
                                    },
                                    {text: 'Net', dataIndex: 'A3653TOTAL', width: 120, align: 'right', editor: 'numberfield',
                                        renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary',
                                        summaryType: function (records) {
                                            // do your logic and return a value.
                                            var total = 0;
                                            var lenn = records.length;
                                            for (var j = 0; j < lenn; ++j) {
                                                total = total + parseFloat(records[j].get('A3653TOTAL'));
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
                                                handler: 'OnFopRemove'
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
                            width: 570
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idDetailTicket + '-gridPAYMENTQUERY',
                            title: 'FORM OF PAYMENT', hidden: true,
                            //collapsible: true,
                            //collapseDirection: "left",
                            //collapsed: true,
                            //collapsible: true,
                            //collapseDirection: Ext.Component.DIRECTION_LEFT,
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
                                    {text: 'Type', dataIndex: 'A3653CFOP', width: 70},
                                    {text: 'Card Type', dataIndex: 'A3653TYCAR', width: 45},
                                    {text: 'Credit Card Number', dataIndex: 'A3653NTARJ', width: 150},
                                    {text: 'Amount', dataIndex: 'A3653TOTAL', width: 90, align: 'right', editor: 'numberfield',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Expired<br>Card Date', width: 80, dataIndex: 'A3653FEXP'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            width: 570
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
                            xtype: 'grid',
                            id: prototype.idDetailTicket + '-gridDataStatus',
                            title: 'USES COUPONS',
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Update CPN',
                                            id: prototype.idDetailTicket + '-txtUpdateUsos',
                                            iconCls: 'prx-icon-update',
                                            handler: 'OnUpdateUsosCPN'
                                        }, '-']
                                }],
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {
                                        text: 'Ticket',
                                        dataIndex: 'A3660TICKT',
                                        width: 100
                                    },
                                    {
                                        text: 'CPN',
                                        dataIndex: 'A3660CPN',
                                        width: 40
                                    },
                                    /*{
                                     text: 'Code',
                                     dataIndex: 'A3660CODE',
                                     width: 75
                                     },*/
                                    {
                                        text: 'Previous <br> status',
                                        dataIndex: 'A3660STINI',
                                        width: 80
                                    },
                                    {
                                        text: 'Current <br> status',
                                        dataIndex: 'A3660STFIN',
                                        width: 80
                                    },
                                    {
                                        text: 'Date',
                                        dataIndex: 'A3660FCAMB',
                                        width: 70
                                    },
                                    {
                                        text: 'Hour',
                                        dataIndex: 'A3660HCAMB',
                                        width: 70
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 150,
                            width: 460,
                            listeners: {
                                afterrender: 'OnLoadGridAfterrender'
                            }
                        },
                        {xtype: 'tbspacer', width: 100},
                        {
                            xtype: 'grid',
                            id: prototype.idDetailTicket + '-gridRazonesTkt',
                            columnLines: true,
                            title: 'LIST OF REASONS',
                            autoScroll: true,
                            selModel: 'cellmodel',
                            dockedItems: [{
                                    xtype: 'toolbar',
                                    items: [{
                                            text: 'Add Reasons',
                                            id: prototype.idDetailTicket + '-txtRazonesadd',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onWinFormRazonesClick'
                                        }, '-']
                                }],
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns: {
                                items: [
                                    {text: 'Code', dataIndex: 'A3649CODE', width: 50},
                                    {text: 'Description', dataIndex: 'A3649ERROR', flex: 1, editor: 'textfield'},
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnRazonRFNDRemove'
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
                            height: 150,
                            width: 440
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        labelWidth: 120,
                        border: false,
                        labelSeparator: '',
                        style: 'margin:1px !important'

                    },
                    items: [
                        {xtype: 'tbspacer', width: 80},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'PRAXIS Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'XML Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'AM Calculation',
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 100},
                        {
                            xtype: 'combo',
                            id: prototype.idDetailTicket + '-ComboStatus',
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
                    //hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtFare',
                            fieldLabel: 'Fare',
                            labelWidth: 70,
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtFareXml',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: '0.00',
                            readOnly: true
                        },
                        {
                            xtype: 'numberfield',
                            id: prototype.idDetailTicket + '-txtTotalFareAm',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: 0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            // allowNegative: true,
                            // maskRe: /[0-9.-]/,
                            enableKeyEvents: true,
                            listeners: {
                                specialkey: 'onSearchkey',
                                blur: 'onTotaFare'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtmda',
                            fieldLabel: '',
                            width: 80,
                            value: '',
                            readOnly: true,
                            listeners: {
                                change: 'onchange'
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
                            id: prototype.idDetailTicket + '-txtFareEq',
                            fieldLabel: 'Eq. Fare',
                            labelWidth: 70,
                            readOnly: true,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtFareEqXml',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: '0',
                            readOnly: true
                        },
                        {
                            xtype: 'numberfield',
                            id: prototype.idDetailTicket + '-txtTotalEqFareAm',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: 0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            //maskRe: /[0-9.-]/,
                            enableKeyEvents: true,
                            listeners: {
                                specialkey: 'onSearchkey',
                                blur: 'onTotaFare'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtEqmda',
                            fieldLabel: '',
                            width: 80,
                            value: '',
                            readOnly: true,
                            listeners: {
                                change: 'onchange'
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
                            id: prototype.idDetailTicket + '-txtTotalTax',
                            fieldLabel: 'Total Tax',
                            readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtTotalTaxXml',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtTotalTaxAm',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {xtype: 'tbspacer', width: 70},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idDetailTicket + '-checkApplyBPO',
                            labelWidth: 170,
                            labelSeparator: '',
                            fieldLabel: 'Apply change status / BPO',
                            labelStyle: 'font-weight: bold; color:red;'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idDetailTicket + '-checkApplyrobot',
                            labelWidth: 115,
                            labelSeparator: '',
                            fieldLabel: 'Apply robot sabre',
                            labelStyle: 'font-weight: bold; color:red;'
                        }
                        //Combochangestatus




                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //hidden: true,
                    defaults: {
                        border: false,
                        labelSeparator: '',
                        style: 'margin:1px !important'

                    },
                    items: [

                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtCommission',
                            fieldLabel: 'Commission:',
                            readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtCommissionXml',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtCommissionAm',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        }/*,
                         {
                         xtype: 'displayfield',
                         fieldLabel: 'Total RFND',
                         labelStyle: 'font-weight: bold;'
                         },*/
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
                            id: prototype.idDetailTicket + '-txtTotal',
                            fieldLabel: 'Total',
                            labelWidth: 70,
                            readOnly: true,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtTotalXml',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDetailTicket + '-txtTotalram',
                            fieldLabel: '', readOnly: true,
                            labelWidth: 70,
                            value: '0'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Coupon',
                            labelWidth: 50
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idDetailTicket + '-txtCpn1',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '1'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon2',
                            id: prototype.idDetailTicket + '-txtCpn2',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '2'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon3',
                            id: prototype.idDetailTicket + '-txtCpn3',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '3'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon1',
                            id: prototype.idDetailTicket + '-txtCpn4',
                            //checked: true,
                            labelWidth: 3,
                            fieldLabel: '4'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idDetailTicket + '-txtCpn5',
                            name: 'Cupon5', hidden: true,
                            labelWidth: 3,
                            fieldLabel: '5'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon6',
                            id: prototype.idDetailTicket + '-txtCpn6',
                            hidden: true,
                            labelWidth: 3,
                            fieldLabel: '6'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon7',
                            id: prototype.idDetailTicket + '-txtCpn7',
                            hidden: true,
                            labelWidth: 3,
                            fieldLabel: '7'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'Cupon8',
                            id: prototype.idDetailTicket + '-txtCpn8',
                            hidden: true,
                            labelWidth: 3,
                            fieldLabel: '8'
                        },
                        {xtype: 'tbspacer', width: 5},
                        /*{
                         xtype: 'displayfield',
                         id: prototype.idDetailTicket + '-txtusoCpn',
                         fieldLabel: 'All coupons are used',
                         labelStyle: 'font-weight: bold; color:red;',
                         labelWidth: 150,
                         labelSeparator: '',
                         hidden: true
                         },*/
                        {
                            xtype: 'checkboxfield',
                            id: prototype.idDetailTicket + '-txtShowcoupons',
                            labelWidth: 100,
                            labelSeparator: '',
                            fieldLabel: 'Show all coupons',
                            listeners: {
                                change: 'onChkChangeCPN'
                                        // checkchange:'onChkChangeCPN',
                            }
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
                    id: prototype.idDetailTicket + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onClickSave'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.idDetailTicket + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});

