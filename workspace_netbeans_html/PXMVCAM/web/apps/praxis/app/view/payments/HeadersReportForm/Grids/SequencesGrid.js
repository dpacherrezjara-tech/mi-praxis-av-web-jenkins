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
            {text: 'Type', dataIndex: 'TYPE', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold;";
                    const opts = {
                        'DEB': 'Debits',
                        'REG': 'Regular',
                        'ADJ': 'Adjustment'
                    };
                    return opts[value];
                }
            },        
            {text: 'Header ID', dataIndex: 'CORRLAV', width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value.trimEnd();
                }
            },
            {text: 'File Name', dataIndex: 'FILENAM', width: 400,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value.trimEnd();
                }
            },
             {text: 'Status<br>Praxis', dataIndex: 'STATUS_PRAXIS', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "background-color:#838187";
                    const opts = {
                            '1': () => {
                                metaData.style = "background-color:#2d8cf0;color:#ffffff;font-weight:bold"; // Azul - Enviado
                                return 'SENT';
                            },
                            '2': () => {
                                metaData.style = "background-color:#43bf68;color:#ffffff;font-weight:bold"; // Verde - Cargado con éxito
                                return 'LOADED';
                            },
                            '4': () => {
                                metaData.style = "background-color:#de5959;color:#ffffff;font-weight:bold"; // Rojo - Rechazo total
                                return 'TOTAL REJECTED';
                            },
                            '5': () => {
                                metaData.style = "background-color:#fcda2d;color:#ffffff;font-weight:bold"; // Amarillo - Rechazo parcial
                                return 'PARTIAL REJECTED';
                            },
                            'R': () => {
                                metaData.style = "background-color:#f5a623;color:#000000;font-weight:bold"; // Naranja - Rechazo manual
                                return 'MANUAL REJECTED';
                            },
                            'L': () => {
                                metaData.style = "background-color:#4dc9c1;color:#ffffff;font-weight:bold"; // Turquesa - Cargado manual
                                return 'MANUAL LOADED';
                            },
                            'S': () => {
                                metaData.style = "background-color:#4dc9c1;color:#ffffff;font-weight:bold"; // Turquesa - Cargado manual
                                return 'RESOLVED';
                            }
                        };

                    return opts[value]();
                }
            },
            {text: 'Acc.<br>Period', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                    return record.data.FCONT.slice(0, 6);
                }
            },
            {text: 'Date<br>Send', dataIndex: 'FSEND', width: 80},
            {text: 'Praxis ID', dataIndex: 'IDCONT', width: 200},  
            {
                text: 'Status<br>SAP',
                dataIndex: 'STATUS_SAP',
                width: 150,
                renderer: function (value, metaData) {
                    // Normalizamos el valor para evitar errores
                    const val = (value || '').toUpperCase().trim();

                    // Configuramos los colores y etiquetas por estado
                    const opts = {
                        'SUCCESS': {
                            color: '#ffffff',
                            background: '#43bf68', // Verde
                            text: 'SUCCESS'
                        },
                        'DUPLICATED': {
                            color: '#ffffff',
                            background: '#2d8cf0', // Azul
                            text: 'DUPLICATED'
                        },
                        'REJECTED': {
                            color: '#ffffff',
                            background: '#de5959', // Rojo
                            text: 'REJECTED'
                        },
                        'RESOLVED': {
                            color: '#ffffff',
                            background: '#fcda2d', // Amarillo
                            text: 'RESOLVED'
                        },
                        'PENDING': {
                            color: '#000000',
                            background: '#cccccc', // Gris
                            text: 'PENDING'
                        }
                    };

                    // Elegir estilo según valor o usar PENDING por defecto
                    const status = opts[val] || opts['PENDING'];

                    // Aplicar estilos CSS
                    metaData.style = `background-color:${status.background};color:${status.color};font-weight:bold;text-align:center;`;

                    return status.text;
                }
            },
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
            { text: 'Rej.<br>Sequence', dataIndex: 'REJ_SECUENCIAS', width: 100 },
            { text: 'Pay.<br>Currency', dataIndex: 'PAY_CURRENCY', width: 80 },
            { text: 'Pay.<br>Amount', dataIndex: 'PAY_AMOUNT', width: 100 },
            { text: 'Rev.<br>Currency', dataIndex: 'REV_CURRENCY', width: 80 },
            { text: 'Rev.<br>Amount', dataIndex: 'REV_AMOUNT', width: 100 },
            { text: 'User<br>Created', dataIndex: 'USCR', width: 120 },
            { text: 'Date<br>Created', dataIndex: 'TSCR', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return global.formatTimeStamp(value);
                    }
            },
            { text: 'User<br>Updated', dataIndex: 'USUP', width: 120 },
            { text: 'Date<br>Updated', dataIndex: 'TSUP', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return global.formatTimeStamp(value);
                    }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
