Ext.define('Ext.Praxis.view.sales.ConciliationASRForm.Info', {
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
            id: prototype.id + '-boxPrincipal',
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
//                    autoScroll: true,
                    defaults: {
                        height: 745,
                        border: true,
                        listeners: {
                            activate : 'tnvMain_changeHandler'
                        }
                    },
                    enableKeyEvents: true,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="By Transaction">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">By Transaction</label>',
                            id: prototype.id + '-Grid1',
                            items: [
                                {
                                    region: 'center',
                                    border: false,
                                    width: prototype.widthContenedor,
                                    layout: {
                                        type: 'vbox',
                                        align: 'left'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: transparent;',
                                        border: false,
                                        align: 'center'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridTransactions">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridTransactions',
                                            width: prototype.widthGrid,
                                            //height: 717,
                                            height: 530,
                                            border: true,
                                            columnLines: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                cellclick: 'gridTransactions_itemClickHandler'
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Station', dataIndex: 'STATION', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Code', dataIndex: 'CODE', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'OP Date', dataIndex: 'OPDT', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'OP Time', dataIndex: 'OPTM', width: 70,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'ST', dataIndex: 'ST', width: 50,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'CL Date', dataIndex: 'CLDT', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'CL Time', dataIndex: 'CLTM', width: 70,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status<br>Amount', dataIndex: 'SAMT', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Voids', dataIndex: 'VOIDS', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Praxis', dataIndex: 'TTRANSP', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Differences', dataIndex: 'diffTransactions', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value !== "0") metaData.style = "font-weight:bold;color:#FF0000;";
                                                                    else metaData.style = "font-weight:bold;color:#339900;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'State', dataIndex: 'processState', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value !== "MATCH") metaData.style = "font-weight:bold;color:#FF0000;";
                                                            else metaData.style = "font-weight:bold;color:#339900;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'User', dataIndex: 'userLastModify', width: 55,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var decoration = (String(data.MANUP) === 'X') ? 'underline' : 'normal';
                                                            metaData.style = "font-weight:bold;text-decoration:" + decoration + ";";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'dateLastModify', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "font-weight:bold;";
                                                            return (String(data.dateLastModify) !== '') ? (String(data.dateLastModify).substr(2, 2) + '/' + String(data.dateLastModify).substr(4, 2) + '/' + String(data.dateLastModify).substr(6, 2)) : '';
                                                        }
                                                    },
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
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="By Amount">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">By Amount</label>',
                            id: prototype.id + '-boxDataByCurrency',
                            items: [
                                {
                                    region: 'center',
                                    border: false,
                                    width: prototype.widthContenedor,
                                    layout: {
                                        type: 'vbox',
                                        align: 'left'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: transparent;',
                                        border: false,
                                        align: 'center'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridDataByCurrency">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataByCurrency',
                                            width: prototype.widthGrid,
                                            //height: 717,
                                            height: 530,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Station', dataIndex: 'WKSTAT', width: 75, locked: true,
                                                        listeners: {
                                                            click: 'gridDataByCurrency_act1_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-decoration:underline;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Open<br>Date', dataIndex: 'FREPOR', locked: true, width: 70, style: 'background:#BECB54;',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Currency', dataIndex: 'MDA', locked: true, width: 55,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Header',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'HDTE', width: 70,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'HNAME', width: 55,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'HSTATUS', width: 65,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sale',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cash', dataIndex: 'SCASH', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit', dataIndex: 'SCREDIT', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Exchange', dataIndex: 'TEXCHA', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'T.Voucher', dataIndex: 'TTVOUCHER', width: 75,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Refund',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cash', dataIndex: 'RCASH', width: 70,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit', dataIndex: 'RCREDIT', width: 70,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'T.Voucher', dataIndex: 'RTVOUCHER', width: 70,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Praxis',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cash', dataIndex: 'A1530_A1720_CA_SUM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit', dataIndex: 'A1530_A1720_CC_SUM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Exchange', dataIndex: 'A1530_A1720_EX_SUM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'T.Voucher', dataIndex: 'A1530_A1720_TV_SUM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'STATUS_RECORD', width: 58, 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var intA1530_A1720_CA_SUM = Number(data.SCASH) - Number(data.RCASH);
//                                                            var intA1530_A1720_CC_SUM = Number(data.SCREDIT) - Number(data.RCREDIT);
//                                                            switch (data.STATUS) {
//                                                                case 'A':
//                                                                    value = 'MATCH'; //MATCH AUTOMATIC.
//                                                                    break;
//                                                                case 'M':
//                                                                    value = 'MATCH'; //MATCH MANUAL.
//                                                                    break;
//                                                                case 'D':
//                                                                    value = 'DIFF'; //DIFFERENCE.
//                                                                    break;
//                                                                case '': //CALCULATE.
//                                                                    if (intA1530_A1720_CA_SUM === Number(data.A1530_A1720_CA_SUM) && intA1530_A1720_CC_SUM === Number(data.A1530_A1720_CC_SUM)) {
//                                                                        value = 'MATCH';
//                                                                    } else {
//                                                                        value = 'DIFF';
//                                                                    }
//                                                                    break;
//                                                                default:
//                                                                    value = data.STATUS;
//                                                            }
                                                            if (value !== "MATCH") metaData.style = "font-weight:bold;color:#FF0000;";
                                                            else metaData.style = "font-weight:bold;color:#339900;";
                                                            return value;
                                                        }
                                                    },
                                                    
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
                                                                handler: 'gridDataPraxisVsInteract_act2_clickHandler'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                {
                    xtype: 'tabpanel',
                    id: prototype.id + '-tnvPraxisVsInteract',
                    width: prototype.widthContenedor,
                    hidden: true,
//                    autoScroll: true,
                    defaults: {
                        height: 645,
                        border: true
                    },
                    enableKeyEvents: true,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="PRAXIS vs Interact">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">PRAXIS vs Interact</label>',
                            id: prototype.id + '-boxDataPraxisVsInteract',
                            listeners: {
//                                change: 'tnvMain_changeHandler',
                                activate : function(tab, x) {
//                                    window.alert("holaz");
                                    //console.log(tab);
                                    //console.log(x);
                                },
                            },
                            items: [
                                {
                                    region: 'center',
                                    border: false,
                                    width: prototype.widthContenedor,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: transparent;',
                                        border: false,
                                        height: 510,
                                        align: 'center'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridDataPraxisVsInteract">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataPraxisVsInteract',
                                            width: prototype.widthGrid2,
                                            height: 530,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Station', dataIndex: 'A1530AGENT', width: 75,locked: true,
                                                        listeners: {
                                                            click: 'gridDataPraxisVsInteract_act1_clickHandler',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-decoration:underline;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Open<br>Date', dataIndex: 'A1530FDESD', width: 70, locked: true,
                                                    },
                                                    {
                                                        text: 'Currency', dataIndex: 'A1530MDA', width: 50, locked: true,
                                                    },
                                                    {
                                                        text: 'Group', dataIndex: 'A1530GRUPO', width: 80, locked: true,
                                                    },
                                                    {
                                                        text: 'Header',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'HDTE', width: 70
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'HNAME', width: 60
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'HSTATUS', width: 70
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sale',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cash', dataIndex: 'SCASH', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit', dataIndex: 'SCREDIT', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Exchange', dataIndex: 'TEXCHA', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'T.Voucher', dataIndex: 'TTVOUCHER', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Refund',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cash', dataIndex: 'RCASH', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit', dataIndex: 'RCREDIT', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'T.Voucher', dataIndex: 'RTVOUCHER', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Praxis',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cash', dataIndex: 'A1530_A1720_CA_SUM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit', dataIndex: 'A1530_A1720_CC_SUM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Exchange', dataIndex: 'A1530_A1720_EX_SUM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'T.Voucher', dataIndex: 'A1530_A1720_TV_SUM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'STATUS_RECORD', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var intA1530_A1720_CA_SUM = Number(data.SCASH) - Number(data.RCASH);
                                                            var intA1530_A1720_CC_SUM = Number(data.SCREDIT) - Number(data.RCREDIT);
                                                            switch (data.STATUS) {
                                                                case 'A':
                                                                    value = 'MATCH'; //MATCH AUTOMATIC.
                                                                    break;
                                                                case 'M':
                                                                    value = 'MATCH'; //MATCH MANUAL.
                                                                    break;
                                                                case 'D':
                                                                    value = 'DIFF'; //DIFFERENCE.
                                                                    break;
                                                                case '': //CALCULATE.
                                                                    if ( intA1530_A1720_CA_SUM === Number(data.A1530_A1720_CA_SUM) && 
                                                                            intA1530_A1720_CC_SUM === Number(data.A1530_A1720_CC_SUM)) {
                                                                        value = 'MATCH';
                                                                    } else {
                                                                        value = 'DIFF';
                                                                    }
                                                                    break;
                                                                default:
                                                                    value = data.STATUS;
                                                            }
                                                            if (value !== "MATCH") metaData.style = "font-weight:bold;color:#FF0000;";
                                                            else metaData.style = "font-weight:bold;color:#339900;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: '',
                                                        sortable: false,
                                                        width: 45,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: '',
//                                                                source="{(data.A1530AGENT != undefined) ? 'assets/icons/16x16/1326498593_018.png' : 'assets/icons/16x16/spacer16x16.png'}"
                                                                //handler: 'onActionClick',
                                                                handler: 'gridDataPraxisVsInteract_act2_clickHandler',
                                                                
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="pie">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-pie',
                                            width: prototype.widthGrid,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            border: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: true
                                            },
                                            padding: '1px 0px 1px 0px',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: prototype.widthGrid,
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
                                        }
                                        // </editor-fold>
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
});