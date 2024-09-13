Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.BankDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-BankDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.ExteriorBankReconciliation.BankDetailGridController'
    ],
    controller: 'BankDetailGridController',
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
                text: 'Edit',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'onClickBPO'
                    }
                ]
            },
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 70},
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},

            {text: 'Doc. Type', dataIndex: 'TDOC', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'S': 'Sale',
                        'D': 'Debit'
                    };
                    return opts[value];
                }
            },
            {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
            {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 80},
            {text: 'Status', dataIndex: 'STVAL', width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                    const opts = {
                        '1': 'Match',
                        '2': 'Settlement w/o Statement',
                        '3': 'Statement w/o Settlement',
                        '4': 'Match Difference',
                        '5': 'Match Manual'
                    };
                    return opts[value] || '';
                }
            },
            {text: 'Suggested<br>Processor', dataIndex: 'DESC_SPRO', width: 160},
            {
                text: 'Bank Statement Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#F0D094";
                        return value;
                    }
                },
                columns: [
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 80},
                    {text: 'Bank Code', dataIndex: 'CODEBANK', width: 80},
                    {text: 'Bank Name', dataIndex: 'DESC_BANK', width: 130},
                    {text: 'Accounting<br>Code', dataIndex: 'ACCOUNT', width: 80},
                    {text: 'Profit<br>Center', dataIndex: 'BENCENC', width: 80},
                    {text: 'Bank<br>Account', dataIndex: 'ACCCOMP', width: 80},
                    {text: 'Society', dataIndex: 'SOCIETY', width: 80},
                    {text: 'Reference', dataIndex: 'REFER', width: 150},
                    {text: 'Text', dataIndex: 'TEXTO', width: 400},
                    {text: 'Large Text', dataIndex: 'TEXTOLAR', width: 500},
                    {
                        sortable: false,
                        xtype: 'actioncolumn',
                        width: 50,
                        text: 'Open',
                        align: 'center',
                        items: [
                            {
                                iconCls: 'prx-icon-image-log',
                                tooltip: 'Open Large Text',
                                handler: 'onOpenLargeText'
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Reconciliation Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#B2DAFA";
                        return value;
                    }
                }, columns: [
                    {text: 'NET', dataIndex: 'NETO', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'NET<br>Reconciled', dataIndex: 'NETOC', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
                    {text: 'Local<br>Amount 2', dataIndex: 'LOCAMOUNT2', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Local<br>Currency 2', dataIndex: 'LOCRENCY2', width: 80},
                    {text: 'Settl. Sales<br>Amount', dataIndex: 'SVFOPS', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Qty<br>Sales', dataIndex: 'QTYTKT', width: 70},
                    {text: 'Settl. Debits<br>Amount', dataIndex: 'SVFOPR', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Qty<br>Debits', dataIndex: 'QTYTKTR', width: 70},
                    {text: 'Reconciled<br>Processor', dataIndex: 'DESC_PRO', width: 160}
                ]
            },
            {
                text: 'Update Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return value;
                    }
                }, columns: [
                    {text: 'User', dataIndex: 'USUP', width: 100},
                    {text: 'Date', dataIndex: 'FEUP', width: 80}
                ]
            }
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
            },
            {
                xtype: 'button',
                scale: 'small',
                id: prototype.id + '-bkd-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


