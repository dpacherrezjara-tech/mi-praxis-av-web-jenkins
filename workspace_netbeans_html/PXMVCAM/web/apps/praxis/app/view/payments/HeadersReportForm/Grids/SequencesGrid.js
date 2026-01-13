Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.SequencesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SequencesGrid',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.SequencesGridController'
    ],
    controller: 'SequencesGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    store: [],
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
            { text: 'RN', xtype: 'rownumberer', width: 40 },
            {
                text: 'Type', dataIndex: 'TIPOCON', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold;";
                    const opts = {
                        'DEB': 'Debits',
                        'REG': 'Regular',
                        'ADJ': 'Adjustment',
                        'ADM': 'ADM'
                    };
                    return opts[value] || 'Without Header';
                }
            },
            { text: 'Processor', dataIndex: 'CODPRO', width: 80 },
            {
                text: 'Header ID', dataIndex: 'CORRLAV', width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value.trimEnd();
                }
            },
            {
                text: 'File Name', dataIndex: 'FILENAM', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value.trimEnd();
                }
            },
            {
                text: 'Status', dataIndex: 'STSAP', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "background-color:#838187";
                    const opts = {
                        '1': () => {
                            metaData.style = "background-color:#2d8cf0;color:#ffffff;font-weight:bold"; // Azul - Enviado
                            return 'SFTP';
                        },
                        '2': () => {
                            metaData.style = "background-color:#43bf68;color:#ffffff;font-weight:bold"; // Verde - Cargado con éxito
                            return 'Loaded';
                        },
                        '3': () => {
                            metaData.style = "background-color:#de5959;color:#ffffff;font-weight:bold"; // Rojo - Rechazo total
                            return 'Rejected';
                        },
                        '4': () => {
                            metaData.style = "background-color:#fcda2d;color:#ffffff;font-weight:bold"; // Amarillo - Rechazo parcial
                            return 'Partial Rejected';
                        },
                        '5': () => {
                            metaData.style = "background-color:#f5a623;color:#000000;font-weight:bold"; // Naranja - Rechazo manual
                            return 'Partial Loaded';
                        }
                    };

                    return opts[value] ? opts[value]() : 'Error';
                }
            },
            {
                text: 'Acc.<br>Period', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                    return record.data.FCONT.slice(0, 6);
                }
            },
            { text: 'Date<br>Send', dataIndex: 'FSEND', width: 80 },
            { text: 'Praxis ID', dataIndex: 'IDCONT', width: 200 },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 60,
                text: 'Detail',
                locked: false,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-search',
                        tooltip: 'Open Phase 1<br>Detail',
                        handler: 'onUpdateSequences'
                    }
                ]
            },
            { text: 'Qty.<br>Sequence', dataIndex: 'TOT_SECUENCIAS', width: 100 },
            { text: 'Rej.<br>Sequence', dataIndex: 'REJ_SECUENCIAS', width: 100 }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
