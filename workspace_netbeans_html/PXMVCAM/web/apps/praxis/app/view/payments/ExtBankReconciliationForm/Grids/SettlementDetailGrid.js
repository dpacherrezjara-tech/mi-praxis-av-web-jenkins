Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.SettlementDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SettlementDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.ExteriorBankReconciliation.SettlementDetailGridController'
    ],
    controller: 'SettlementDetailGridController',
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
                width: 60,
                text: 'Phase<br>1',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Phase 1<br>Detail',
                        handler: 'onClickBPOF1'
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 60,
                text: 'Phase<br>2',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Phase 2<br>Detail',
                        handler: 'onClickBPOF2'
                    }
                ]
            },
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 70},
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
            {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 80},
            {text: 'Doc. Type', dataIndex: 'TDOC', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'S': 'Sale',
                        'D': 'Debit',
                        'V': 'Void'
                    };
                    return opts[value];
                }
            },
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
            {
                text: 'Settlement Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 80},
                    {text: 'Merchant', dataIndex: 'MERCHAND', width: 120},
                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 160},
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                    {text: 'Agent', dataIndex: 'SAGENT', width: 80}
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
                    {text: 'Card<br>Type', dataIndex: 'TIPOTAR', width: 70},
                    {text: 'Card<br>Code', dataIndex: 'SCARCOD', width: 50},
                    {text: 'Card Number', dataIndex: 'SCARDN', width: 150},
                    {text: 'Auth', dataIndex: 'SAUTHOC', width: 70},
                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 70},
                    {text: 'Transaction<br>Amount', dataIndex: 'TOTAL', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Sales<br>Amount', dataIndex: 'SVFOP', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Comm.', dataIndex: 'COMISION', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'NET', dataIndex: 'NETO', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                    
                ]
            },
            {
               text: 'Payment Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#fdff85";
                        return value;
                    }
                }, 
                columns:[
                    {text: 'Curr.', dataIndex: 'MONEDAPAGO', width: 80},
                    {text: 'Amount', dataIndex: 'IMPORTEPAG', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#fdff85";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
               text: 'Statement Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#F0D094";
                        return value;
                    }
                }, 
                columns:[
                    {text: 'Transaction<br>Number', dataIndex: 'TRAN', width: 90},
                    {text: 'Bank Code', dataIndex: 'CODEBANK', width: 80},
                    {text: 'Bank Name', dataIndex: 'DESC_BANK', width: 130},
                    {text: 'Society', dataIndex: 'SOCIETY', width: 80},
                    {text: 'Bandoc', dataIndex: 'BANDOC', width: 130},
                    {text: 'Statement', dataIndex: 'LIQUIDACIO', width: 150}
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
                id: prototype.id + '-stl-btnBack',
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


