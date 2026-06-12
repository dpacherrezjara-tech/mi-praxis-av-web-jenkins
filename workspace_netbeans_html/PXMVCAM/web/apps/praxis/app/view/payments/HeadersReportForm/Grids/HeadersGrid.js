Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid', {
    extend: 'Ext.Praxis.view.widgets.StoreProcGrid',
    alias: 'widget.' + prototype.id + '-HeadersGrid',
    requires: [
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.controller.payments.HeadersReport.HeadersGridController'
    ],
    library: 'PRAXISMP',
    storeProcedure: 'SPHRP001',
    pageSize: 20,
    excelTitle: 'Headers',
    showExcelButton: true,
    customController: 'Ext.Praxis.controller.payments.HeadersReport.HeadersGridController',
    rowActions: [
        { action: 'edit', icon: 'prx-icon-edit', tooltip: 'Update' }
    ],
    gridColumns: {
        defaults: { align: 'center', menuDisabled: true, sortable: true },
        items: [
            { text: 'RN', locked: true, xtype: 'rownumberer', width: 40 },
            {
                text: 'Type', dataIndex: 'TIPOCON', width: 100,
                renderer: function (v) {
                    const opts = { DEB: 'Debits', REG: 'Regular', ADJ: 'Adjustment' };
                    return '<b>' + (opts[v] || v) + '</b>';
                }
            },
            {
                text: 'Header ID', dataIndex: 'FILENAM', flex: 1,
                renderer: function (v) { return v ? v.trimEnd() : v; }
            },
            {
                text: 'Period', dataIndex: 'FCONT', width: 80,
                renderer: function (v) { return v ? v.slice(0, 6) : v; }
            },
            { text: 'Date', dataIndex: 'FCONT', width: 80 },
            { text: 'Praxis ID', dataIndex: 'IDCONT', width: 200 },
            {
                text: 'Status', dataIndex: 'STCONT', width: 150,
                renderer: function (v, m) {
                    const opts = {
                        '5': ['#638be1', '#ffffff', 'SFTP 🆗'],
                        'L': ['#88d556', '#000000', 'Loaded to SAP ☑'],
                        '6': ['#efd773', '#ce3232', 'Partially Rejected ↩'],
                        '9': ['#efd773', '#000000', 'Partially Justified ↩'],
                        'J': ['#b0d7dc', '#000000', 'Justified ⎺'],
                        'R': ['#fd5858', '#dbdb12', 'Rejected ⚠']
                    };
                    const o = opts[v];
                    if (o) {
                        m.style = 'background-color:' + o[0] + ';color:' + o[1] + ';font-weight:bold;';
                        return o[2];
                    }
                    return v;
                }
            },
            { text: 'Qty<br>Documents',  dataIndex: 'CUR_BANDOCS', width: 90 },
            { text: 'Rej.<br>Documents', dataIndex: 'REJ_BANDOCS', width: 90 },
            { text: 'Jus.<br>Documents', dataIndex: 'JUS_BANDOCS', width: 90 },
            { text: 'Rep.<br>Documents', dataIndex: 'REP_BANDOCS', width: 90 },
            { text: 'User<br>Created',   dataIndex: 'USCR',        width: 90 },
            {
                text: 'Date<br>Created', dataIndex: 'TSCR', width: 150,
                renderer: function (v) { return v ? global.formatTimeStamp(v) : v; }
            },
            { text: 'User<br>Update', dataIndex: 'USUP', width: 90 },
            {
                text: 'Date<br>Update', dataIndex: 'TSUP', width: 150,
                renderer: function (v) { return v ? global.formatTimeStamp(v) : v; }
            }
        ]
    }
});
