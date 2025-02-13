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
        const params = Ext.getCmp(prototype.idDE2 + '-mainForm').getForm().getValues();
        global.downloadFile2(me.request,'downloadHeadersReport',params);
    },
    onCancelClick: function () {
        this.view.close();
    }
});