Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.AdmsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-AdmsGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.AdmsGridController'
    ],
    controller: 'AdmsGridController',
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
            {text: 'Ticket Nbr', dataIndex: 'TICKET', width: 150},
            {text: 'Seq', dataIndex: 'SEQ', width: 60},
            {text: 'Invoice', dataIndex: 'INVOICE', width: 150},
            {text: 'Reject<br>Code', dataIndex: 'CREJEC', width: 70},
            {text: 'Error<br>Code', dataIndex: 'CERROR', width: 70},
            {text: 'ADM Number', dataIndex: 'ADMNUM', width: 120},
            {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 100},
            {text: 'Agent', dataIndex: 'SAGENT', width: 100},
            {text: 'Consolidator', dataIndex: 'SCONSOL', width: 100},
            {text: 'PNR', dataIndex: 'SPNR', width: 100},
            {text: 'Card<br>Code', dataIndex: 'SCARCOD', width: 80},
            {text: 'Card Number', dataIndex: 'SCARDN', width: 200},
            {text: 'Auth Code', dataIndex: 'SAUTHOC', width: 100},
            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 80},
            {text: 'Amount', dataIndex: 'SVFOP', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Curr.<br>Rev.', dataIndex: 'SCURREVEN', width: 80},
            {text: 'Amount Rev.', dataIndex: 'SVFOPUSD', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'PRAXIS ID', dataIndex: 'IDCONT', width: 150},
            {text: 'Header', dataIndex: 'CORRLAV', width: 150}
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


