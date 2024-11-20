Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.SettlementGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SettlementGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.SettlementGridController'
    ],
    controller: 'SettlementGridController',
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
            {text: 'Client', dataIndex: 'CCUST', width: 60},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 200},
            {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 60},
            {text: 'Doc.<br>Origin', dataIndex: 'TDOCORG', width: 60},
            {text: 'Debit<br>Type', dataIndex: 'DEBTYPE', width: 80},
            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70},
            {text: 'Merchant', dataIndex: 'MERCHNC', width: 120},
            {text: 'Sub-Merchant', dataIndex: 'SUCMERCH', width: 120},
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
            {text: 'Trans. Nbr', dataIndex: 'TRAN', width: 80},
            {text: 'Society', dataIndex: 'SOCIETY', width: 70},
            {text: 'Bank Code', dataIndex: 'CODEBANK', width: 70},
            {text: 'Rule', dataIndex: 'FREGLA', width: 80},
            {text: 'Settlement ID', dataIndex: 'LIQUIDACIO', width: 350},
            {
                text: 'Reconciliation Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#b7f989;";
                        return value;
                    }
                },
                columns:[
                    {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                    {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80},
                    {text: 'Agent', dataIndex: 'SAGENT', width: 100},
                    {text: 'Credit Card', dataIndex: 'SCARDN', width: 180},
                    {text: 'Auth Code', dataIndex: 'SAUTHOC', width: 100},
                    {text: 'PNR', dataIndex: 'SPNR', width: 80},
                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80},
                    {text: 'Sale<br>Amount', dataIndex: 'SVFOP', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#b7f989;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Comm.', dataIndex: 'COMISION', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#b7f989;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Qty Tkt', dataIndex: 'QTYTKT', width: 80},
                    {text: 'Sale<b>Reconciled', dataIndex: 'SVFOPC', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#b7f989;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Bank Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#92c3c6;";
                        return value;
                    }
                },
                columns:[
                    {text: 'Acc. Number', dataIndex: 'ACCNUMBER', width: 120},
                    {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
                    {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
                    {text: 'DATECI', dataIndex: 'DATECI', width: 100},
                    {text: 'TRANCI', dataIndex: 'TRANCI', width: 100}
                ]
            },
            {
                text: 'MPF100 Info',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#edf989;font-weight:bold;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Qty', dataIndex: 'QTYSALE', width: 100},
                    {text: 'Sum', dataIndex: 'QTYSUM', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#edf989;font-weight:bold;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'DATEC', dataIndex: 'DATEC', width: 100},
                    {text: 'TRANC', dataIndex: 'TRANC', width: 100}
                ]
            },
            {text: 'Acc. Status', dataIndex: 'STCON', width: 80},
            {text: 'Acc. Date', dataIndex: 'FCONT', width: 100},
            {text: 'Regular ID', dataIndex: 'IDCONT', width: 350},
            {text: 'Debit Date', dataIndex: 'FDEBIT', width: 100},
            {text: 'Debit ID', dataIndex: 'IDCDEB', width: 350},
            {text: 'Adj Date', dataIndex: 'FAJUST', width: 100},
            {text: 'Adjustment ID', dataIndex: 'IDCADJ', width: 350}

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
                id: prototype.id + '-settl-btnBack',
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


