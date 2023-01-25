/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : Info                                              *
 * Created on : 20-09-2016, 17:19:55                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.sales.ConciliationASR.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sales-conciliation-asr-form-info',
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: 'border',
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
                {
                    xtype: 'tabpanel',
                    id: 'vConciliationASR-tabInfo',
                    width: 1320,
                    height: 500,
                    anchor: '100%',
                    defaults: {
                        border: false,
                        width: '100%',
                        height: '100%',
                        anchor: '100%'
                    },
                    autoScroll:true,
                    items: [
                        {
                            xtype: 'grid',
                            id: 'vConciliationASR-gridTransactions',
                            store: Ext.create('PXMVCAMHome.store.sales.ConciliationASR.GridTransactions'),
                            title: 'By Transaction',
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Open Date', dataIndex: 'FREPOR', width: 80,
                                        renderer: function(value, metadata) {
//                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            var dataFREPOR = value;
                                            return (String(dataFREPOR) !== '') ? (String(dataFREPOR).substr(2, 2) + '/' + String(dataFREPOR).substr(4, 2) + '/' + String(dataFREPOR).substr(6, 2)) : '';
                                        }
                                    },
                                    {
                                        text: 'Interact',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Seq',           dataIndex: 'SEQ', width: 40},
                                            {text: 'Station',       dataIndex: 'STATION', width: 80},
                                            {text: 'Code',          dataIndex: 'CODE', width: 60},
                                            {text: 'OP Date',       dataIndex: 'OPDT', width: 60},
                                            {text: 'OP Time',       dataIndex: 'OPTM', width: 60},
                                            {text: 'ST',            dataIndex: 'ST', width: 30},
                                            {text: 'CL Date',       dataIndex: 'CLDT', width: 60},
                                            {text: 'CL Time',       dataIndex: 'CLTM', width: 60},
                                            {text: 'Status Amount', dataIndex: 'SAMT', width: 100}
                                        ]
                                    },
                                    {
                                        text: 'Total Transactions',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Interact',      dataIndex: 'XTST', width: 80},
                                            {text: 'Voids',         dataIndex: 'VOIDS', width: 80},
                                            {text: 'Praxis',        dataIndex: 'TTRANSP', width: 80},
                                            {text: 'Differences',   dataIndex: 'diffTransactions', width: 80,
                                                renderer: function(value, metadata) {
                                                    if(parseInt(value) !== 0){
                                                        metadata.style = 'color:red;font-weight:bold;';
                                                    }else{
                                                        metadata.style = 'color:#339900;font-weight:bold;';
                                                    }
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'State',     dataIndex: 'processState', width: 60,
                                        renderer: function(value, metadata) {
                                            if(value !== 'MATCH'){
                                                metadata.style = 'color:red;font-weight:bold;';
                                            }else{
                                                metadata.style = 'color:#339900;font-weight:bold;';
                                            }
                                            return value;
                                        }
                                    },
                                    {text: 'User',      dataIndex: 'userLastModify', width: 60,
                                        renderer: function(value, metadata, record) {
                                            if(record.get('MANUP') === 'X'){
                                                metadata.style = 'text-decoration:underline;';
                                            }else{
                                                metadata.style = 'text-decoration:normal';
                                            }
                                            return value;
                                        }
                                    },
                                    {text: 'Date',      dataIndex: 'dateLastModify', width: 80},
                                    {text: 'Action',    dataIndex: 'action_row', width: 50,
                                        renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                                            return (
                                                    '<div class="gk-icon-grid">'
                                                +   '<img src="resources/img/icon/edit.png" data-qtip="Click for edit record" onclick="PXMVCAMHome.app.getController(\'sales.ConciliationASR.ConciliationASR\').gridTransactions_act1_itemClick(' + rowIndex + ');">'
                                                +   '</div>'
                                            );
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            id: 'vConciliationASR-gridDataByCurrency',
                            store: Ext.create('PXMVCAMHome.store.sales.ConciliationASR.GridDataByCurrencys'),
                            title: 'By Amount',
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Station', dataIndex: 'WKSTAT', width: 70,
                                        renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                                            metadata.style = 'text-decoration:underline;';
                                            return (
                                                    '<span data-qtip="Click for view transaction source" onclick="PXMVCAMHome.app.getController(\'sales.ConciliationASR.ConciliationASR\').gridDataByCurrency_act1_itemClick(' + rowIndex + ');">'
                                                +   value
                                                +   '</span>'
                                            );
                                        }
                                    },
                                    {text: 'Open Date', dataIndex: 'FREPOR', width: 80,
                                        renderer: function (value, metadata) {
                                            var dataFREPOR = value;
                                            return (String(dataFREPOR) !== '') ? (String(dataFREPOR).substr(2, 2) + '/' + String(dataFREPOR).substr(4, 2) + '/' + String(dataFREPOR).substr(6, 2)) : '';
                                        }
                                    },
                                    {text: 'Currency', dataIndex: 'MDA', width: 70},
                                    {
                                        text: 'Header',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date',      dataIndex: 'HDTE', width: 60},
                                            {text: 'Name',      dataIndex: 'HNAME', width: 70},
                                            {text: 'Status',    dataIndex: 'HSTATUS', width: 60}
                                        ]
                                    },
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'right'
                                        },
                                        columns: [
                                            {text: 'Cash',          dataIndex: 'SCASH', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Credit',        dataIndex: 'SCREDIT', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Exchange',      dataIndex: 'TEXCHA', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'T. Voucher',    dataIndex: 'TTVOUCHER', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Refund',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'right'
                                        },
                                        columns: [
                                            {text: 'Cash',          dataIndex: 'RCASH', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Credit',        dataIndex: 'RCREDIT', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'T. Voucher',    dataIndex: 'RTVOUCHER', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Praxis',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'right'
                                        },
                                        columns: [
                                            {text: 'Cash',          dataIndex: 'A1530_A1720_CA_SUM', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Credit',        dataIndex: 'A1530_A1720_CC_SUM', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Exchange',      dataIndex: 'A1530_A1720_EX_SUM', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'T. Voucher',    dataIndex: 'A1530_A1720_TV_SUM', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Status',    dataIndex: 'STATUS_RECORD', width: 60,
                                        renderer: function(value, metadata) {
                                            if(value !== 'MATCH'){
                                                metadata.style = 'color:red;font-weight:bold;';
                                            }else{
                                                metadata.style = 'color:#339900;font-weight:bold;';
                                            }
                                            return value;
                                        }
                                    },
                                    {text: 'Action',    dataIndex: 'action_row', width: 50,
                                        renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                                            return (
                                                    '<div class="gk-icon-grid">'
                                                +   '<img src="resources/img/icon/edit.png" data-qtip="Click for edit record" onclick="PXMVCAMHome.app.getController(\'sales.ConciliationASR.ConciliationASR\').gridDataByCurrency_act2_itemClick(' + rowIndex + ');">'
                                                +   '</div>'
                                            );
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            id: 'vConciliationASR-gridDataPraxisVsInteract',
                            store: Ext.create('PXMVCAMHome.store.sales.ConciliationASR.GridDataPraxisVsInteracts'),
                            title: 'PRAXIS vs Interact',
                            hidden: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Station', dataIndex: 'A1530AGENT', width: 70,
                                        renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                                            metadata.style = 'text-decoration:underline;';
                                            return (
                                                    '<span data-qtip="Click for view transaction source" onclick="PXMVCAMHome.app.getController(\'sales.ConciliationASR.ConciliationASR\').gridDataPraxisVsInteract_act1_itemClick(' + rowIndex + ');">'
                                                +   value
                                                +   '</span>'
                                            );
                                        }
                                    },
                                    {text: 'Open Date', dataIndex: 'A1530FDESD', width: 80,
                                        renderer: function (value, metadata) {
                                            var dataA1530FDESD = value;
                                            return (String(dataA1530FDESD) !== '') ? (String(dataA1530FDESD).substr(2, 2) + '/' + String(dataA1530FDESD).substr(4, 2) + '/' + String(dataA1530FDESD).substr(6, 2)) : '';
                                        }
                                    },
                                    {text: 'Currency', dataIndex: 'A1530MDA', width: 70},
                                    {
                                        text: 'Header',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date',      dataIndex: 'HDTE', width: 60},
                                            {text: 'Name',      dataIndex: 'HNAME', width: 70},
                                            {text: 'Status',    dataIndex: 'HSTATUS', width: 60}
                                        ]
                                    },
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'right'
                                        },
                                        columns: [
                                            {text: 'Cash',          dataIndex: 'SCASH', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Credit',        dataIndex: 'SCREDIT', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Exchange',      dataIndex: 'TEXCHA', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'T. Voucher',    dataIndex: 'TTVOUCHER', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Refund',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'right'
                                        },
                                        columns: [
                                            {text: 'Cash',          dataIndex: 'RCASH', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Credit',        dataIndex: 'RCREDIT', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'T. Voucher',    dataIndex: 'RTVOUCHER', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Praxis',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'right'
                                        },
                                        columns: [
                                            {text: 'Cash',          dataIndex: 'A1530_A1720_CA_SUM', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Credit',        dataIndex: 'A1530_A1720_CC_SUM', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Exchange',      dataIndex: 'A1530_A1720_EX_SUM', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'T. Voucher',    dataIndex: 'A1530_A1720_TV_SUM', width: 80,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Status',    dataIndex: 'STATUS_RECORD', width: 60,
                                        renderer: function(value, metadata) {
                                            if(value !== 'MATCH'){
                                                metadata.style = 'color:red;font-weight:bold;';
                                            }else{
                                                metadata.style = 'color:#339900;font-weight:bold;';
                                            }
                                            return value;
                                        }
                                    },
                                    {text: 'Action',    dataIndex: 'action_row', width: 50,
                                        renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                                            return (
                                                    '<div class="gk-icon-grid">'
                                                +   '<img src="resources/img/icon/edit.png" data-qtip="Click for edit record" onclick="PXMVCAMHome.app.getController(\'sales.ConciliationASR.ConciliationASR\').gridDataPraxisVsInteract_act2_itemClick(' + rowIndex + ');">'
                                                +   '</div>'
                                            );
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
                
            ]
        }
    ]
});
