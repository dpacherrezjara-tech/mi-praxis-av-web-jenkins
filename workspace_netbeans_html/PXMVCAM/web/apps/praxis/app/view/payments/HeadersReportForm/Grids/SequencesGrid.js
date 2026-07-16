Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.SequencesGrid', {
    extend: 'Ext.Praxis.view.widgets.StoreProcGrid',
    alias: 'widget.' + prototype.id + '-SequencesGrid',
    requires: [
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.controller.payments.HeadersReport.SequencesGridController'
    ],
    library: 'PRAXISMP',
    storeProcedure: 'MPS307',
    pageSize: 20,
    excelTitle: 'Sequences',
    showExcelButton: true,
    customController: 'Ext.Praxis.controller.payments.HeadersReport.SequencesGridController',
    rowActions: [
        { action: 'detail', icon: 'prx-icon-search', tooltip: 'Open Phase 1 Detail' }
    ],
    gridColumns: {
        defaults: { align: 'center', menuDisabled: true, sortable: true },
        items: [
            { text: 'RN', xtype: 'rownumberer', width: 40 },
            {
                text: 'Type', dataIndex: 'TIPOCON', width: 100,
                renderer: function (v) {
                    const opts = { DEB: 'Debits', REG: 'Regular', ADJ: 'Adjustment', ADM: 'ADM' };
                    return '<b>' + (opts[v] || 'Without Header') + '</b>';
                }
            },
            { text: 'Processor', dataIndex: 'CODPRO', width: 80 },
            {
                text: 'Header ID', dataIndex: 'CORRLAV', width: 200,
                renderer: function (v) { return v ? v.trimEnd() : v; }
            },
            {
                text: 'File Name', dataIndex: 'FILENAM', flex: 1,
                renderer: function (v) { return v ? v.trimEnd() : v; }
            },
            {
                text: 'Status', dataIndex: 'STSAP', width: 150,
                renderer: function (v, m) {
                    const opts = {
                        '1': ['#2d8cf0', '#ffffff', 'SFTP'],
                        '2': ['#43bf68', '#ffffff', 'Loaded'],
                        '3': ['#de5959', '#ffffff', 'Rejected'],
                        '4': ['#fcda2d', '#000000', 'Partial Rejected'],
                        '5': ['#f5a623', '#000000', 'Partial Loaded'],
                        '6': ['#EB6ECD', '#000000', 'Reverse Loaded']
                    };
                    const o = opts[v];
                    if (o) {
                        m.style = 'background-color:' + o[0] + ';color:' + o[1] + ';font-weight:bold;';
                        return o[2];
                    }
                    return 'Error';
                }
            },
            {
                text: 'Acc.<br>Period', dataIndex: 'FCONT', width: 80,
                renderer: function (v) { return v ? v.slice(0, 6) : v; }
            },
            { text: 'Date<br>Send', dataIndex: 'DATETIME_SEND', width: 120 },
            { text: 'Date<br>Received', dataIndex: 'DATETIME_SAP', width: 120 },
            { text: 'Qty<br>Responses', dataIndex: 'QTY_SAP', width: 80 },
            { text: 'Praxis ID', dataIndex: 'IDCONT', width: 200 },
            { text: 'Qty.<br>Sequence', dataIndex: 'TOT_SECUENCIAS', width: 100 },
            { text: 'Rej.<br>Sequence', dataIndex: 'REJ_SECUENCIAS', width: 100 }
        ]
    }
});
