Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.ReverseGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ReverseGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.ReverseGridController'
    ],
    controller: 'ReverseGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {
                text: 'RN',
                locked: true,
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Info',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'onLoadDetail'
                    }
                ]
            },
            {text: 'Client', dataIndex: 'CCUST', width: 60},
            {text: 'Reverse<br>Nbr.', dataIndex: 'NREV', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#bbe3ac;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Trans.<br>Date', dataIndex: 'DATEC', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#bbe3ac;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Trans.<br>Nbr.', dataIndex: 'TRANC', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#bbe3ac;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#bbe3ac;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const opts = {
                        'S': 'Sale',
                        'R': 'Refund'
                    };
                    return opts[value] ? opts[value] : '';
                }
            },
            {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 100},
            {text: 'Agent', dataIndex: 'SAGENT', width: 100},
            {text: 'Merchant', dataIndex: 'MERCHNC', width: 150},
            {text: 'PRAXIS ID<br>Adjustment', dataIndex: 'IDCADJ', width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#6E9AF5;text-align:center;";
                    return value;
                }
            },
            {text: 'Header', dataIndex: 'CORRLAV', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#6E9AF5;text-align:center;";
                    return value;
                }
            },

            {text: 'Qty.<br>TKT', dataIndex: 'QTYTKT', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-decoration:underline;cursor:pointer;font-weight:bolder;color:#5bc611;";
                    value = Ext.util.Format.number(value, '0,000');
                    return value;
                },
                listeners: {
                    click: 'onLoadDetail'
                }
            },
            {text: 'Card Number', dataIndex: 'SCARDN', width: 200},
            {text: 'Auth Code', dataIndex: 'SAUTHOC', width: 100},
            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#dcdf3a;text-align:center;";
                    return value;
                }
            },
            {text: 'Amount', dataIndex: 'SVFOP', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Curr.<br>Rev.', dataIndex: 'MONEDAPAGO', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#dcdf3a;text-align:center;";
                    return value;
                }
            },
            {text: 'Amount Rev.', dataIndex: 'IMPORTEPAG', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Error<br>Code', dataIndex: 'CERROR', width: 70},
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
            {text: 'Reference', dataIndex: 'REFER', width: 120}
            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


