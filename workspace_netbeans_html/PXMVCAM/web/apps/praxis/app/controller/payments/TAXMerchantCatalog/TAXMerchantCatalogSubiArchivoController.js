Ext.define('Ext.Praxis.controller.payments.TAXMerchantCatalog.TAXMerchantCatalogSubiArchivoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TAXMerchantCatalogSubiArchivoController',
    urlSA: CONTEXTPATH + '/TAXMerchantCatalogForm',
    lastValidatedOk: false,
    init: function (view) {
    },
    onDownloadLayout: function () {
        global.getFile(this.urlSA + '/downloadLayout');
    },
    onModeOrFileChange: function () {
        var mode = Ext.getCmp(prototype.idSA + '-cmbMode').getValue();
        var file = Ext.getCmp(prototype.idSA + '-File').getValue();
        Ext.getCmp(prototype.idSA + '-btn-validate').setDisabled(!mode || !file);
        // Cualquier cambio de modo o archivo invalida la previsualizacion ya mostrada.
        this.resetResults();
    },
    resetResults: function () {
        Ext.getCmp(prototype.idSA + '-headerError').hide();
        Ext.getCmp(prototype.idSA + '-resultsGrid').hide();
        Ext.getCmp(prototype.idSA + '-summary').hide();
        Ext.getCmp(prototype.idSA + '-progressBar').hide();
        Ext.getCmp(prototype.idSA + '-btn-process').setDisabled(true);
        this.lastValidatedOk = false;
    },
    onValidate: function (btn) {
        var me = this;
        var mode = Ext.getCmp(prototype.idSA + '-cmbMode').getValue();
        var file = Ext.getCmp(prototype.idSA + '-File').getValue();
        if (!mode) {
            Ext.MessageBox.alert('PRAXIS', 'Select the mode (Create/Update).');
            return;
        }
        if (!file) {
            Ext.MessageBox.alert('PRAXIS', 'Select the Excel file.');
            return;
        }
        var form = Ext.getCmp(prototype.idSA + '-form-file').getForm();
        me.view.setLoading(true);
        form.submit({
            url: me.urlSA + '/validateExcel',
            params: {
                mode: mode
            },
            success: function (fp, o) {
                me.view.setLoading(false);
                var res = Ext.decode(o.response.responseText);
                me.showResults(res, false);
            },
            failure: function () {
                me.view.setLoading(false);
                Ext.MessageBox.alert('PRAXIS', 'Could not validate the file.');
            }
        });
    },
    onProcess: function (btn) {
        var me = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'All validated rows will be created/updated. Do you want to continue?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btnId) {
                if (btnId === 'yes') {
                    me.doProcess();
                }
            }
        });
    },
    // Filas por lote al mandar a processRowsChunk. En pruebas, ~104 filas en
    // una sola peticion (sin lotes) generaban un body de ~130 KB codificado,
    // suficiente para chocar con limites de tamano de proxies/WAF en
    // produccion (ausentes en local/testing). 25 filas por lote deja margen
    // holgado incluso contra limites bastante estrictos.
    CHUNK_SIZE: 25,
    doProcess: function () {
        var me = this;
        var mode = Ext.getCmp(prototype.idSA + '-cmbMode').getValue();
        var grid = Ext.getCmp(prototype.idSA + '-resultsGrid');
        var rows = grid.getStore().getData().items.map(function (rec) {
            return rec.data;
        });
        var chunks = [];
        for (var i = 0; i < rows.length; i += me.CHUNK_SIZE) {
            chunks.push(rows.slice(i, i + me.CHUNK_SIZE));
        }

        var progressBar = Ext.getCmp(prototype.idSA + '-progressBar');
        progressBar.show();
        progressBar.updateProgress(0, 'Uploading batch 1 of ' + chunks.length + '...');
        me.view.setLoading(true);

        me.uploadChunk(chunks, 0, mode);
    },
    // Manda las filas ya validadas en lotes chicos (no se vuelve a subir el
    // Excel: el filefield de Ext JS no siempre conserva el archivo
    // seleccionado en un segundo form.submit()). Cada lote solo se acumula
    // en la sesion del servidor; nada se escribe en la base hasta el commit
    // final, que aplica todo en una sola transaccion (todo o nada).
    uploadChunk: function (chunks, index, mode) {
        var me = this;
        var progressBar = Ext.getCmp(prototype.idSA + '-progressBar');

        if (index >= chunks.length) {
            progressBar.updateProgress(chunks.length / (chunks.length + 1), 'Committing...');
            me.commitUpload(chunks.length, mode);
            return;
        }

        Ext.Ajax.request({
            url: me.urlSA + '/processRowsChunk',
            method: 'POST',
            params: {
                chunkIndex: index,
                chunkRowsJson: Ext.encode(chunks[index])
            },
            success: function (response) {
                var res = Ext.decode(response.responseText);
                if (res.error) {
                    me.view.setLoading(false);
                    progressBar.hide();
                    Ext.MessageBox.alert('PRAXIS', res.error);
                    return;
                }
                progressBar.updateProgress((index + 1) / (chunks.length + 1),
                        'Uploaded batch ' + (index + 1) + ' of ' + chunks.length + '...');
                me.uploadChunk(chunks, index + 1, mode);
            },
            failure: function () {
                me.view.setLoading(false);
                progressBar.hide();
                Ext.MessageBox.alert('PRAXIS', 'Could not upload batch ' + (index + 1) + ' of ' + chunks.length + '. Nothing was saved yet.');
            }
        });
    },
    commitUpload: function (totalChunks, mode) {
        var me = this;
        var progressBar = Ext.getCmp(prototype.idSA + '-progressBar');
        Ext.Ajax.request({
            url: me.urlSA + '/processRowsCommit',
            method: 'POST',
            // processRowsCommit calls MPS262 once per row within a single
            // HTTP request/transaction, so it can take a while for a large
            // file. The Ext.Ajax default is 30s; give it more room here.
            timeout: 120000,
            params: {
                mode: mode
            },
            success: function (response) {
                me.view.setLoading(false);
                var res = Ext.decode(response.responseText);
                if (res.processed) {
                    progressBar.updateProgress(1, 'Done');
                    global.Msg({
                        msg: 'Bulk upload processed successfully (' + res.rows.length + ' row(s)).',
                        fn: function () {
                            progressBar.hide();
                            if (me.view.reloadGrid) {
                                me.view.reloadGrid();
                            }
                            me.view.close();
                        }
                    });
                } else {
                    progressBar.hide();
                    me.showResults(res, true);
                    Ext.MessageBox.alert('PRAXIS', 'The file was not processed: some rows have errors. Fix them and validate again.');
                }
            },
            failure: function () {
                me.view.setLoading(false);
                progressBar.hide();
                // No response reached the browser in time -- this can be a
                // client-side timeout or a network/proxy issue in between.
                // Either way, the server may still be finishing the commit
                // in the background, so this is not necessarily a real
                // failure: tell the user to check before retrying.
                Ext.MessageBox.alert('PRAXIS', 'No response was received in time. The server may still be finishing the process in the background. Wait a moment, then check the catalog before trying again to avoid processing the same rows twice.');
            }
        });
    },
    showResults: function (res, isFromProcess) {
        var me = this;
        var headerErrorLbl = Ext.getCmp(prototype.idSA + '-headerError');
        var grid = Ext.getCmp(prototype.idSA + '-resultsGrid');
        var summaryLbl = Ext.getCmp(prototype.idSA + '-summary');
        var processBtn = Ext.getCmp(prototype.idSA + '-btn-process');

        if (res.headerError) {
            headerErrorLbl.setText(res.headerError, false);
            headerErrorLbl.show();
            grid.hide();
            summaryLbl.hide();
            processBtn.setDisabled(true);
            me.lastValidatedOk = false;
            return;
        }

        headerErrorLbl.hide();

        var rows = res.rows || [];
        grid.getStore().loadData(rows);
        grid.show();

        var validCount = 0, errorCount = 0;
        rows.forEach(function (r) {
            if (r.VALID) {
                validCount++;
            } else {
                errorCount++;
            }
        });

        summaryLbl.setText(rows.length + ' row(s) read — ' + validCount + ' valid, ' + errorCount + ' with error(s).', false);
        summaryLbl.show();

        me.lastValidatedOk = (rows.length > 0 && errorCount === 0);
        processBtn.setDisabled(!me.lastValidatedOk || isFromProcess);
    },
    onDownloadResultsExcel: function () {
        var grid = Ext.getCmp(prototype.idSA + '-resultsGrid');
        var records = grid.getStore().getData().items;
        if (!records || records.length === 0) {
            Ext.MessageBox.alert('PRAXIS', 'There are no results to export. Validate a file first.');
            return;
        }
        var data = records.map(function (rec) {
            var r = rec.data;
            var action = '';
            if (r.ACTION === 'C') {
                action = 'Create';
            } else if (r.ACTION === 'U') {
                action = 'Update';
            }
            return {
                Row: r.ROW_NUM,
                Process: r.PROCESO,
                Merchant: r.MERCHANT,
                Agent: r.SALE_AGENT,
                Processor: r.PROCESSOR,
                Code: r.CODE,
                Action: action,
                Status: r.VALID ? 'Valid' : 'With error',
                Message: (r.ERRORS || []).join(' | ')
            };
        });
        var date = new Date();
        var formattedDate = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
        global.writeExcelFromJson(data, 'Tax_Merchant_Catalog_Bulk_Upload_Results_' + formattedDate);
    },
    onCloseClick: function () {
        this.view.close();
    }
});
