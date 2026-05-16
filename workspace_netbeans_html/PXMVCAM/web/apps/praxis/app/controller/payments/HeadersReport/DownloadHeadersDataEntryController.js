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
            CANTIDAD:     'Quantity'
        };

        // Construir filas con cabeceras formateadas
        const formattedHeaders = Object.values(columnHeaders);
        const keys = Object.keys(columnHeaders);

        const csvLines = [];

        // Cabecera
        csvLines.push(formattedHeaders.map(h => `"${h}"`).join(','));

        // Datos
        rows.forEach(row => {
            const line = keys.map(key => {
                const val = row[key] !== undefined && row[key] !== null ? row[key] : '';
                // Escapar comillas dobles dentro del valor
                return `"${String(val).replace(/"/g, '""')}"`;
            });
            csvLines.push(line.join(','));
        });

        const csvContent = csvLines.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `HeadersReport_CASH_${fromPeriod}_${toPeriod}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    },

    onCancelClick: function () {
        this.view.close();
    }
});