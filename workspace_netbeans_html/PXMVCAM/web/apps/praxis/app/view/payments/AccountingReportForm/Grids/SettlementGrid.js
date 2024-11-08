Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.SettlementGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SettlementGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.SettlementGridController'
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
            {text: 'Client', dataIndex: 'CCUST', width: 180},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 200},
            {text: 'Doc. Type', dataIndex: 'TDOC', width: 100},
            {text: 'Doc.<br>Origin', dataIndex: 'TDOCORG', width: 100},
            {text: 'Debit<br>Type', dataIndex: 'DEBTYPE', width: 100},
            {text: 'Country', dataIndex: 'SCOUNTRY', width: 80},
            {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
            {text: 'Agent', dataIndex: 'SAGENT', width: 100},
            {text: 'Merchant', dataIndex: 'MERCHNC', width: 120},
            {text: 'Sub-Merchant', dataIndex: 'SUCMERCH', width: 120},
            {text: 'PNR', dataIndex: 'SPNR', width: 80},
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
            {text: 'Trans. Nbr', dataIndex: 'TRAN', width: 80},
            {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80},
            {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
            {text: 'Credit Card', dataIndex: 'SCARDN', width: 180},
            {text: 'Auth Code', dataIndex: 'SAUTHOC', width: 100},
            {text: 'Society', dataIndex: 'SOCIETY', width: 70},
            {text: 'Bank Code', dataIndex: 'CODEBANK', width: 70},
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
            {text: 'Acc. Number', dataIndex: 'ACCNUMBER', width: 100},
            {text: 'Qty Tkt', dataIndex: 'QTYTKT', width: 80},
            {text: 'Rule', dataIndex: 'FREGLA', width: 80},
            {text: 'Currency', dataIndex: 'SCURRENCY', width: 80},
            {text: 'Sale<br>Amount', dataIndex: 'SVFOP', width: 120},
            {text: 'Comm.', dataIndex: 'COMISION', width: 120},
            {text: 'Sale<b>Reconciled', dataIndex: 'SVFOPC', width: 120},
            {text: 'Fare', dataIndex: 'FAREC', width: 120},
            {text: 'Fare Diff', dataIndex: 'FAREDIFFC', width: 120},
            {text: 'DATECI', dataIndex: 'DATECI', width: 100},
            {text: 'TRANCI', dataIndex: 'TRANCI', width: 100},
            {text: 'DATEC', dataIndex: 'DATEC', width: 100},
            {text: 'TRANC', dataIndex: 'TRANC', width: 100},
            {text: 'Settlement ID', dataIndex: 'LIQUIDACIO', width: 160},
            {text: 'Qty<br>MPF100', dataIndex: 'QTYSALE', width: 80},
            {text: 'Sum<br>MPF100', dataIndex: 'QTYSUM', width: 80}
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


