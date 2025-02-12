Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.RejectionsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-RejectionsGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.RejectionsGridController'
    ],
    controller: 'RejectionsGridController',
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
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 100},
            {text: 'Date Bank', dataIndex: 'DATECI', width: 80},
            {text: 'Trans. Bank', dataIndex: 'TRANCI', width: 100},
            {text: 'Praxis ID', dataIndex: 'IDCONT', width: 180},
            {text: 'Header ID', dataIndex: 'HEADER', width: 160},
            {text: 'Type', dataIndex: 'TIPOCON', width: 120},
            {text: 'Sub-Type', dataIndex: 'MODO', width: 120},
            {text: 'SEQ', dataIndex: 'SEQNBR', width: 80},
            {text: 'Rejectec<br>Code', dataIndex: 'CODREC', width: 80},
            {text: 'Description', dataIndex: 'DESCR', flex: 1},
            {text: 'User<br>Rej.', dataIndex: 'USCR', width: 100},
            {text: 'DateTime<br>Rej.', dataIndex: 'TSCR', width: 120}
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
                scale: 'small',
                id: prototype.id + '-rej-btnBack',
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


