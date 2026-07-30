Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.FormateoGrid', {
    extend: 'Ext.Praxis.view.widgets.StoreProcGrid',
    alias: 'widget.' + prototype.id + '-FormateoGrid',
    requires: [
        'Ext.Praxis.view.widgets.StoreProcGrid'
    ],
    library: 'PRAXISMP',
    storeProcedure: 'MPS294',
    pageSize: 20,
    memoryPaging: true,
    showExcelButton: true,
    gridTitle: 'Formatted',
    filterItems: [
        {
            xtype: 'textfield',
            fieldLabel: 'Seq',
            name: 'IN_SEQ',
            labelWidth: 30,
            width: 140,
            emptyText: 'Sequence...'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Error Code',
            name: 'IN_CERROR',
            labelWidth: 75,
            width: 190,
            emptyText: 'Code...'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Reference',
            name: 'IN_REFER',
            labelWidth: 65,
            width: 220,
            emptyText: 'Reference...'
        }
    ],
    gridColumns: {
        defaults: { align: 'center', menuDisabled: true, sortable: true },
        items: [
            { text: 'RN', locked: true, xtype: 'rownumberer', width: 60 },
            { text: 'File ID', dataIndex: 'FILEID', width: 100 },
            { text: 'Reference', dataIndex: 'REFER', width: 150 },
            { text: 'Value Date', dataIndex: 'VALDATE', width: 100 },
            { text: 'Seq', dataIndex: 'SEQ', width: 100 },
            {
                text: 'Record Type', dataIndex: 'TIPOREC', width: 100,
                renderer: function (v) {
                    const opts = { S: 'ReportSAP', R: 'Rejection' };
                    return opts[v] || 'Error';
                }
            },
            {
                text: 'Status', dataIndex: 'STPRO', width: 150,
                renderer: function (v) {
                    const opts = { '0': 'Not found', '1': 'Found' };
                    return opts[v] || 'Error';
                }
            },
            {
                text: 'Error',
                columns: [
                    { text: 'Code', dataIndex: 'CERROR', width: 100, align: 'center', menuDisabled: true },
                    {
                        text: 'Description', dataIndex: 'DESCERR', width: 400, align: 'left', menuDisabled: true,
                        renderer: function (v, meta) {
                            if (v) meta.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(v) + '"';
                            return v || '';
                        }
                    }
                ]
            },
            {
                text: 'Creation',
                columns: [
                    { text: 'Date', dataIndex: 'FECR', width: 100, align: 'center', menuDisabled: true },
                    { text: 'Time', dataIndex: 'HOCR', width: 100, align: 'center', menuDisabled: true }
                ]
            }
        ]
    }
});
