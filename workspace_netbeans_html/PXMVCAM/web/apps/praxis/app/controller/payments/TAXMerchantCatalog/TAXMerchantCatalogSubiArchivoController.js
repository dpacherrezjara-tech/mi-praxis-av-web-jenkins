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
            Ext.MessageBox.alert('PRAXIS', 'Seleccione el modo (Crear/Actualizar).');
            return;
        }
        if (!file) {
            Ext.MessageBox.alert('PRAXIS', 'Seleccione el archivo Excel.');
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
                Ext.MessageBox.alert('PRAXIS', 'No se pudo validar el archivo.');
            }
        });
    },
    onProcess: function (btn) {
        var me = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Se van a crear/actualizar todas las filas validadas. Desea continuar?',
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
        var form = Ext.getCmp(prototype.idSA + '-form-file').getForm();
        me.view.setLoading(true);
        form.submit({
            url: me.urlSA + '/processExcel',
            params: {
                mode: mode
            },
            success: function (fp, o) {
                me.view.setLoading(false);
                var res = Ext.decode(o.response.responseText);
                if (res.processed) {
                    global.Msg({
                        msg: 'Carga masiva procesada correctamente (' + res.rows.length + ' fila(s)).',
                        fn: function () {
                            if (me.view.reloadGrid) {
                                me.view.reloadGrid();
                            }
                            me.view.close();
                        }
                    });
                } else {
                    me.showResults(res, true);
                    Ext.MessageBox.alert('PRAXIS', 'No se proceso el archivo: hay filas con error. Corrija y vuelva a validar.');
                }
            },
            failure: function () {
                me.view.setLoading(false);
                Ext.MessageBox.alert('PRAXIS', 'No se pudo procesar el archivo.');
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

        summaryLbl.setText(rows.length + ' fila(s) leidas — ' + validCount + ' valida(s), ' + errorCount + ' con error.', false);
        summaryLbl.show();

        me.lastValidatedOk = (rows.length > 0 && errorCount === 0);
        processBtn.setDisabled(!me.lastValidatedOk || isFromProcess);
    },
    onDownloadResultsExcel: function () {
        var grid = Ext.getCmp(prototype.idSA + '-resultsGrid');
        var records = grid.getStore().getData().items;
        if (!records || records.length === 0) {
            Ext.MessageBox.alert('PRAXIS', 'No hay resultados para exportar. Valide un archivo primero.');
            return;
        }
        var data = records.map(function (rec) {
            var r = rec.data;
            return {
                Fila: r.ROW_NUM,
                Proceso: r.PROCESO,
                Merchant: r.MERCHANT,
                Agente: r.SALE_AGENT,
                Procesador: r.PROCESSOR,
                Codigo: r.CODE,
                Accion: r.ACTION === 'C' ? 'Crear' : (r.ACTION === 'U' ? 'Actualizar' : ''),
                Estado: r.VALID ? 'Valida' : 'Con error',
                Mensaje: (r.ERRORS || []).join(' | ')
            };
        });
        var date = new Date();
        var formattedDate = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
        global.writeExcelFromJson(data, 'Tax_Merchant_Catalog_Carga_Masiva_Resultados_' + formattedDate);
    },
    onCloseClick: function () {
        this.view.close();
    }
});
