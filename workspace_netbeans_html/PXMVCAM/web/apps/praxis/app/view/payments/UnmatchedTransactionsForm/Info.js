valor = '0';
Ext.define('Ext.Praxis.view.payments.UnmatchedTransactionsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1300,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [              
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1277,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTicket',
                                    width: 1277,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 150,
                                                        listeners: {
                                                            click: 'gridData_act1_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a  style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 150},
                                            {text: 'Error.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CERROR', width: 150, //flex: 1
                                                    }
                                                ]
                                            },
                                            {text: 'Src', dataIndex: 'FTE', width: 35},
                                            {text: 'Sales',
                                                id: prototype.id + '-hcDetTktS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Country', //flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Card Number', dataIndex: 'SCARDN', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Author.', dataIndex: 'SAUTHOC', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "background-color:#AFDBF3;text-align:right;";
                                                        value =  Ext.util.Format.number(value, '0,000.00');
                                                        return value ;
                                                    },
                                            },
                                            {text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                }
                                            },
                                            {text: 'Agent',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                            }
                                                    }
                                                ]
                                            },
                                            {text: 'Flag',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Status', dataIndex: 'strFlagStat', width: 50,
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary',
                                    width: 1277,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 1045, id: prototype.id + '-lblTotS_SVFOP', align: 'center'},
                                        {width: 230},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetCardNbr',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1172,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetCardNbr',
                                    width: 1172,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transaction',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'TDATE', width: 90,
                                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#C4B3B6;";
                                                                    return  value;
                                                                    }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'DATEF', width: 90,
                                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#C4B3B6;";
                                                                    return  value;
                                                                    }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 70},
                                            {text: 'Status', dataIndex: 'STVAL', width: 170},
                                            {text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'SCARCOD', width: 45},
                                                            {text: 'Number', dataIndex: 'SCARDN', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Seq', dataIndex: 'SEQNUM', width: 45},
                                                            {text: 'Merchant', dataIndex: 'MERCHN', width: 90},
                                                        ]
                                                    },
                                            {text: 'Author.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'SAUTHOC', width: 70}
                                                        ]
                                                    },
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50},
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 80},
                                            {text: 'Bank',
//                                                id: prototype.id+'-label_1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Process',
                                                        defaults: {
                                                        menuDisabled: true,
                                                        sortable: false,
                                                        align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Date', dataIndex: 'BDATEP', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#C4B3B6;";
                                                                    return  value;
                                                                    }
                                                            },
                                                        ]
                                                    
                                                    },
                                                    {text: 'Status', dataIndex: 'BSTVAL', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#C4B3B6;";
                                                                    return  value;
                                                                    }
                                                    },     
                                                ]
                                            },
                                            {
                                                text: 'Qty',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYDOC', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }   
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary_2',
                                    width: 1172,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [

                                        {width: 920, id: prototype.id + '-lblTotBS_SVFOP'},
                                        {width: 210, id: prototype.id + '-lblTotBS_QTYDOC'},
                                        {width: 40},
                                    ]
                                },             
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetMerchant',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1067,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetMerchant',
                                    width: 1067,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            
                                            {text: 'Sales',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'SDATE', width: 70}
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 150},
                                            {text: 'Bank Process Information',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Date', dataIndex: 'BDATEP', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Merchant', dataIndex: 'MERCHN', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Amount', dataIndex: 'dblAMOUNT', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                },
                                                            },
                                                        ]
                                            },
                                            {text: 'Bank Payment Information',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Date', dataIndex: 'BDATEL', width: 45,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Merchant', dataIndex: 'MERCHNR', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Curr.', dataIndex: 'ACURRENCY', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Amount', dataIndex: 'dblAMOUNTR', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                },
                                                            },
                                                            {text: 'Description', dataIndex: 'strDescripcion', width: 130},
                                                        ]
                                            },
                                            {
                                                text: 'Quantity',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Trans.', dataIndex: 'lngQTEF', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }   
                                                    },
                                                    {text: 'Tkts.', dataIndex: 'lngQTYDOC', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }   
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary_3',
                                    width: 1067,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [

                                        {width: 540, id: prototype.id + '-lblTotBS_SssVFOP'},
                                        {width: 295, id: prototype.id + '-lblTotBS_QTssYDOC'},
                                        {width: 180},
                                        {width: 50},
                                    ]
                                },             
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxControl',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 862,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridControl',
                                    width: 862,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Ticket',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'strTicket', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            value = value;
                                                            return '<a style="color:#057ECB;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'strDescripcion', width: 150},
                                            {text: 'Group', dataIndex: 'GRUPO', width: 90},
                                            {text: 'Process',
//                                                id: prototype.id + '-hcDetTktS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'State', dataIndex: 'AFLOAD', width: 90, //flex: 1
                                                    }
                                                ]
                                            },
                                            {text: 'Card',
//                                                id: prototype.id+'-label_1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'SCARDN', width: 150},
                                                ]
                                            },
                                            {text: 'FOP',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'AAGENT', width: 70}
                                                ]
                                            },
                                            {text: 'CIA Tarjet',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'AAUTHOC', width: 70}
                                                ]
                                            },
                                            {text: 'Cod approval',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tarjet', dataIndex: 'AFTE', width: 90}
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary_4',
                                    width: 862,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
//                                        {width: 1045, id: prototype.id + '-lblTotS_SVFOP', align: 'center'},
                                        {width: 860},
                                    ]
                                }
                            ]
                        },
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
//                            width: 'auto',
                            height: 25,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: true,
                                        padding: '0px 5px 0px 5px'
                                    },
                                    padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
//                                    width: 'auto',
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },

                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


