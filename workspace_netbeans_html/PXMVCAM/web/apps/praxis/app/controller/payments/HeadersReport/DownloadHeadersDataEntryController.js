Ext.define('Ext.Praxis.controller.payments.HeadersReport.DownloadHeadersDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DownloadHeadersDataEntryController',
    url: CONTEXTPATH + '/HeadersReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    init: function (view) {
    },
    afterRender: async function () {
    },
    onProcessClick: function () {
        const me = this;
        const form = Ext.getCmp(prototype.idDE2 + '-mainForm').getForm();
        const params = form.getValues();
        const reportType = params.REPORT_TYPE;

        if (reportType === 'CREDIT') {
            // Flujo original: descarga desde el servidor
            const { REPORT_TYPE, ...serverParams } = params;
            global.downloadFile2(me.request, 'downloadHeadersReport', serverParams);

        } else if (reportType === 'CASH') {
            // Flujo nuevo: llamada al stored procedure desde el cliente
            me.processCashDownload(params);
        }
    },

    processCashDownload: function (params) {
        const me = this;

        new AWN().async(
            (async () => {
                const res = await global.callStorePost('PRAXISMP', 'MPS142', {
                    'IN_PRDAF': params.IN_PRDAF,
                    'IN_PRDAT': params.IN_PRDAT
                });

                if (!res || !res.data) {
                    throw new Error('No data returned from server.');
                }

                const rows = res.data.lstRs?.[0] ?? [];

                if (!rows.length) {
                    throw new Error('No records found for the selected period.');
                }

                me.downloadCashAsExcel(rows, params.IN_PRDAF, params.IN_PRDAT);
            })(),
            'Successfully Downloaded',
            'Error on Download'
        );
    },

    downloadCashAsExcel: function (rows, fromPeriod, toPeriod) {
            const columnHeaders = {
            IDCONT:       'Accounting ID',
            TIPOCON:      'Accounting Type',
            PERIODO:      'Period',
            POSTING_DATE: 'Posting Date',
            HEADER:       'Header',
            FECHA:        'Date',
            PROCESADOR:   'Processor',
            N_ARCHIVO:    'File Name',
            MONEDA:       'Currency',
            VALOR:        'Amount',
            VALOR_USD:    'Amount USD',
            CANTIDAD:     'Quantity',
            RECHAZOS:     'Rejections',
            STATUS:       'Status'
        };

            const keys = Object.keys(columnHeaders);
            const headers = Object.values(columnHeaders);

            // Construir array de arrays: primera fila = cabeceras, resto = datos
            const sheetData = [
                headers,
                ...rows.map(row => keys.map(key =>
                    row[key] !== undefined && row[key] !== null ? String(row[key]).trim() : ''
                ))
            ];

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(sheetData);

            // Ancho de columnas automático
            ws['!cols'] = keys.map((key, i) => ({
                wch: Math.max(headers[i].length, 15)
            }));

            // Estilo de cabeceras: fondo rojo, letras blancas en negrita
            keys.forEach((key, colIdx) => {
                const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIdx });
                if (!ws[cellRef]) return;
                ws[cellRef].s = {
                    fill: {
                        patternType: 'solid',
                        fgColor: { rgb: 'C0392B' }
                    },
                    font: {
                        bold: true,
                        color: { rgb: 'FFFFFF' }
                    },
                    alignment: {
                        horizontal: 'center'
                    }
                };
            });

            XLSX.utils.book_append_sheet(wb, ws, 'Headers CASH');

            XLSX.writeFile(wb, `HeadersReport_CASH_${fromPeriod}_${toPeriod}.xlsx`);
        },

    onCancelClick: function () {
        this.view.close();
    }
});