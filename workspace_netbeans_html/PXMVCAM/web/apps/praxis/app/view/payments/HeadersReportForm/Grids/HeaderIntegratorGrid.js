Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeaderIntegratorGrid', {
    extend: 'Ext.Praxis.view.widgets.StoreProcGrid',
    alias: 'widget.' + prototype.id + '-HeaderIntegratorGrid',
    requires: [
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.controller.payments.HeadersReport.HeaderIntegratorGridController'
    ],
    library: 'PRAXISMP',
    storeProcedure: 'MPS294',
    pageSize: 20,
    excelTitle: 'Integrator',
    showExcelButton: true,
    customController: 'Ext.Praxis.controller.payments.HeadersReport.HeaderIntegratorGridController',
    rowActions: [
        { action: 'detail', icon: 'prx-icon-search', tooltip: 'Open Detail' }
    ],
    gridColumns: {
        defaults: { align: 'center', menuDisabled: true, sortable: true },
        items: [
            { text: 'RN', locked: true, xtype: 'rownumberer', width: 50 },
            { text: 'File ID', dataIndex: 'FILEID', width: 100 },
            {
                text: 'Status', dataIndex: 'STPRO', width: 120,
                renderer: function (v, m) {
                    const key = String(v || '').trim();
                    const opts = {
                        '1': ['#d3f9d8', '#1a5c1e', 'Found'],
                        '0': ['#fff3bf', '#7d5a00', 'Not found']
                    };
                    const o = opts[key];
                    if (o) {
                        m.style = 'background-color:' + o[0] + ';color:' + o[1] + ';font-weight:bold;';
                        return o[2];
                    }
                    return v || '—';
                }
            },
            {
                text: 'File Type', dataIndex: 'FILETYPE', width: 110,
                renderer: function (v) {
                    const opts = {
                        'ReportSAP': ['#f3d9fa', '#6b21a8', 'ReportSAP'],
                        'REJECT': ['#ffe3e3', '#9b1c1c', 'REJECT'],
                        'SUCCESS': ['#ccfbf1', '#0f5a50', 'SUCCESS']
                    };
                    const key = String(v || '').trim();
                    const o = opts[key] || ['#e2e8f0', '#374151', key || '—'];
                    return '<span style="display:inline-block;background:' + o[0] +
                        ';color:' + o[1] + ';font-weight:700;font-size:11px;border-radius:9px;padding:1px 8px;">' +
                        Ext.htmlEncode(o[2]) + '</span>';
                }
            },
            { text: 'File Name', dataIndex: 'FILENAME', flex: 1 },
            { text: 'File Ref', dataIndex: 'FILEREF', flex: 1 },
            { text: 'Corrl', dataIndex: 'CORRL', width: 50 },
            { text: 'Header Text', dataIndex: 'HEADER', width: 180 },
            { text: 'Qty Rows', dataIndex: 'QTYROWS', width: 100 }
        ]
    }
});
