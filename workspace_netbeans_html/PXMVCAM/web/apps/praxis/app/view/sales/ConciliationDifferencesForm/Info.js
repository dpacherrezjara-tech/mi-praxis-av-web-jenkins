/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ConciliationDifferencesForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    id: prototype.id + '-tnvMain',
                    width: prototype.widthContenedor,
                    hidden: false,
                    activeTab: 0,
                    defaults: {
                        //height: 745,
                        height: 180,
                        border: true,
                        listeners: {
                            activate: 'tnvMain_changeHandler'
                        }
                    },
                    enableKeyEvents: true,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="By Transaction">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">By Transaction</label>',
                            items: [
                                {

                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataByTrx01',
                                    width: prototype.widthGrid,
                                    height: 160,
                                    border: false,
                                    columnLines: true,
                                    enableKeyEvents: true,
                                    listeners: {
                                        //cellclick: 'gridTransactions_itemClickHandler'
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Open Date', dataIndex: 'FREPOR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "font-weight:bold;";
                                                    return (String(data.FREPOR) !== '') ? (String(data.FREPOR).substr(2, 2) + '/' + String(data.FREPOR).substr(4, 2) + '/' + String(data.FREPOR).substr(6, 2)) : '';
                                                }
                                            },
                                            {
                                                text: 'Interact',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Seq', dataIndex: 'SEQ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Station', dataIndex: 'STATION', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Code', dataIndex: 'CODE', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'OP Date', dataIndex: 'OPDT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'OP Time', dataIndex: 'OPTM', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'ST', dataIndex: 'ST', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'CL Date', dataIndex: 'CLDT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'CL Time', dataIndex: 'CLTM', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status<br>Amount', dataIndex: 'SAMT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "font-weight:bold;";
                                                            return (String(data.SAMT) !== '') ? String(data.SAMT) : 'N';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total Transactions',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Interact', dataIndex: 'XTST', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Voids<br>Interact', dataIndex: 'VOIDS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Praxis', dataIndex: 'TTRANSP', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Differences', dataIndex: 'TTRANSP_DIF', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value !== 0)
                                                        metaData.style = "font-weight:bold;color:#FF0000;";
                                                    else
                                                        metaData.style = "font-weight:bold;color:#339900;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Differences<br>Sumary', dataIndex: 'TTRANSP_DET', width: 100,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    
//                                                                    if (value !== 0 )
//                                                                        metaData.style = "font-weight:bold;color:#FF0000;";
//                                                                    else
//                                                                        metaData.style = "font-weight:bold;color:#339900;";
//                                                                    return value;
//                                                                }
                                            },
                                            {
                                                text: 'State', dataIndex: 'STATUS_DIFF', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //console.log(value);
                                                    if (value !== "M")
                                                        metaData.style = "font-weight:bold;color:#FF0000;";
                                                    else
                                                        metaData.style = "font-weight:bold;color:#339900;";
                                                    return record.get('STATUS_DIFF_00');
                                                }
                                            },
//                                                    {
//                                                        text: 'User', dataIndex: 'userLastModify', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var decoration = (String(data.MANUP) === 'X') ? 'underline' : 'normal';
//                                                            metaData.style = "font-weight:bold;text-decoration:" + decoration + ";";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Date', dataIndex: 'dateLastModify', width: 70,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            metaData.style = "font-weight:bold;";
//                                                            return (String(data.dateLastModify) !== '') ? (String(data.dateLastModify).substr(2, 2) + '/' + String(data.dateLastModify).substr(4, 2) + '/' + String(data.dateLastModify).substr(6, 2)) : '';
//                                                        }
//                                                    },
                                            {
                                                xtype: 'actioncolumn',
                                                text: 'Action',
                                                sortable: false,
                                                width: 55,
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: '',
                                                        handler: 'onActionClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // </editor-fold>

                        // <editor-fold defaultstate="collapsed" desc="By amount BSP/ARC">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">By Amount</label>',
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '0 0 0 5',
                                    id: prototype.id + '-gridDataByAmount01',
                                    hidden: false,
                                    height: 160,
                                    width: '99%',
                                    columnLines: true,
                                    resizable: false,
                                    autoScroll: true,
                                    border: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Processing<br>Date', width: 80, dataIndex: 'A1698FPRDA', locked: true},
                                            {text: 'Ending<br>Date', width: 70, dataIndex: 'PPED', locked: true},
                                            {text: 'Country', width: 70, dataIndex: 'A1698PAIS', locked: true},
                                            {text: 'City<br>Bnk', width: 60, dataIndex: 'A1698BANK', locked: true},
                                            {text: 'Fuente', width: 65, dataIndex: 'A1698SOURC', locked: true},
                                            //{text: 'IATA', width: 80, dataIndex: ' ', locked: true},
                                            {text: 'File Id', width: 80, dataIndex: 'A1698IDFIL', locked: true},
                                            {text: 'Curr', width: 60, dataIndex: 'CURRENCY', locked: true},
                                            {text: 'Status', width: 70, dataIndex: 'STATUS_DIFF_00', locked: true,
                                                renderer: function (value, metaData, record, row, col) {
                                                    var status = record.data.STATUS_DIFF;
                                                    if (status === 'A') {
                                                        metaData.style = 'text-align:center; margin-left:0px;color:#339900;font-weight:bold'
                                                    } else {
                                                        metaData.style = 'text-align:center; margin-left:0px;color:#FF0000;font-weight:bold'
                                                    }
                                                    return value;
                                                }
                                            },
//                                            {
//                                                sortable: false, locked: true,
//                                                xtype: 'actioncolumn',
//                                                text: '',
//                                                width: 50,
//                                                align: 'center',
//                                                items: [
//                                                    {
//                                                        iconCls: 'prx-icon-detail',
//                                                        tooltip: 'Detalle',
//                                                        handler: 'onDetalleClick'
//                                                    }
//                                                ]
//                                            },
                                            {text: 'Difference',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Gross', dataIndex: 'DIFF_GROSS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Remittence', dataIndex: 'DIFF_REMITTENCE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', dataIndex: 'DIFF_TAX', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Comm', dataIndex: 'DIFF_COMM', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Cash', dataIndex: 'DIFF_CASH', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Credit', dataIndex: 'DIFF_CREDIT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Sumary Detail',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Gross', dataIndex: 'DIFF_GROSS_DET', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Remittence', dataIndex: 'DIFF_REMITTENCE_DET', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', dataIndex: 'DIFF_TAX_DET', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Comm', dataIndex: 'DIFF_COMM_DET', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Cash', dataIndex: 'DIFF_CASH_DET', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Credit', dataIndex: 'DIFF_CREDIT_DET', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Tkts', dataIndex: 'DIFF_QTY_TKT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :center;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Comment', width: 80, dataIndex: 'A1698COMEN',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left; margin-left:0px;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', width: 85, dataIndex: 'A1698STCON_00',
                                                renderer: function (value, metaData, record, row, col) {
                                                    var status = record.data.A1698STCON;
                                                    if (status === 'A' || status==='M') {
                                                        metaData.style = 'text-align:left; margin-left:0px;color:#339900;font-weight:bold';
                                                    } else {
                                                        metaData.style = 'text-align:left; margin-left:0px;color:#FF0000;font-weight:bold';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                text: 'Edit',
                                                width: 50,
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
                                    id: prototype.id + '-pie',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: true,
                                        padding: '0px 1px 0px 1px'
                                    },
                                    padding: '1px 1px 1px 1px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            //width: 1520,
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                margin: '3px 0px 0px 5px'
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
                                // <editor-fold defaultstate="collapsed" desc="By amount ASR">
                                {
                                    xtype: 'grid',
                                    hidden: true,
                                    id: prototype.id + '-gridDataByAmount02',
                                    width: prototype.widthGrid2,
                                    height: 160,
                                    border: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Station', dataIndex: 'A1530AGENT', width: 75, locked: true,
                                                // listeners: {
                                                //   click: 'gridDataPraxisVsInteract_act1_clickHandler',
                                                // },
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-decoration:underline;";
//                                                    return value;
//                                                }
                                            },
                                            {text: 'Open<br>Date', dataIndex: 'A1530FDESD', width: 70, locked: true},
                                            {text: 'Curr.', dataIndex: 'A1530MDA', width: 50, locked: true},
                                            {text: 'Group', dataIndex: 'A1530GRUPO', width: 80, locked: true},
                                            {
                                                text: 'Header',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'HDTE', width: 70},
                                                    {text: 'Name', dataIndex: 'HNAME', width: 60
                                                    },
                                                    {text: 'Status', dataIndex: 'HSTATUS', width: 70}
                                                ]
                                            },
                                            {
                                                text: 'Difference',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cash', dataIndex: 'CA_SUM_D', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Credit', dataIndex: 'CC_SUM_D', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sumary Difference',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cash', dataIndex: 'CA_SUM_DET', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Credit', dataIndex: 'CC_SUM_DET', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'STATUS_DIFF_00', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    if (value !== "MATCH")
                                                        metaData.style = "font-weight:bold;color:#FF0000;";
                                                    else
                                                        metaData.style = "font-weight:bold;color:#339900;";
                                                    return value;
                                                }
                                            }

                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
}
);

