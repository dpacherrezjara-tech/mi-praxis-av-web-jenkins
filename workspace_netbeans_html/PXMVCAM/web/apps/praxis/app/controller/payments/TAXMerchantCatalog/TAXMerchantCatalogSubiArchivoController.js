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
    doProcess: function () {
        var me = this;
        var mode = Ext.getCmp(prototype.idSA + '-cmbMode').getValue();
        var grid = Ext.getCmp(prototype.idSA + '-resultsGrid');
        // No se vuelve a subir el Excel: el filefield de Ext JS no siempre
        // conserva el archivo seleccionado en un segundo form.submit(), lo que
        // hacia llegar un archivo vacio/corrupto al servidor. Como ya tenemos
        // las filas validadas en el grid, se reenvian como JSON.
        var rows = grid.getStore().getData().items.map(function (rec) {
            return rec.data;
        });
        me.view.setLoading(true);
        Ext.Ajax.request({
            url: me.urlSA + '/processRows',
            method: 'POST',
            params: {
                mode: mode,
                rowsJson: Ext.encode(rows)
            },
            success: function (response) {
                me.view.setLoading(false);
                var res = Ext.decode(response.responseText);
                if (res.processed) {
                    global.Msg({
                        msg: 'Bulk upload processed successfully (' + res.rows.length + ' row(s)).',
                        fn: function () {
                            if (me.view.reloadGrid) {
                                me.view.reloadGrid();
                            }
                            me.view.close();
                        }
                    });
                } else {
                    me.showResults(res, true);
                    Ext.MessageBox.alert('PRAXIS', 'The file was not processed: some rows have errors. Fix them and validate again.');
                }
            },
            failure: function () {
                me.view.setLoading(false);
                Ext.MessageBox.alert('PRAXIS', 'Could not process the file.');
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
