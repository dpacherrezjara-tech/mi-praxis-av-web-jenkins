Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.SapLoadDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SapLoadDataEntryController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    afterRender: function () {

    },
    onLoadSAP: function () {
        const me = this;
        const form = Ext.getCmp(prototype.idDE3 + '-mainForm');
        if (form.isValid()) {
            form.submit({
                url: me.url + '/uploadBandocsExcel',
                waitMsg: 'Subiendo archivo...',
                timeout: 9999, // Tiempo en segundos
                success: function (form, action) {
                    const responseBody = action.response.responseText;
                    console.log('Respuesta del servidor:', responseBody);
                    Ext.Msg.alert('Éxito', 'El archivo se ha subido correctamente.');
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Error', 'No se pudo subir el archivo.');
                }
            });
        }
    },
    onCancelClick: function () {
        this.view.close();
    }
});
