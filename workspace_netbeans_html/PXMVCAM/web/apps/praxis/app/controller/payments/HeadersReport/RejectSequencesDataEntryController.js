Ext.define('Ext.Praxis.controller.payments.HeadersReport.RejectSequencesDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RejectSequencesDataEntryController',
    notifier: new AWN(),
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    init: function (view) {
    },
    afterRender: async function () {
    },
    onRejectClick: async function () {
        const me = this;
        const {idCont, corrl} = me.view.obj;
        me.view.setLoading(true);
        const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', me.view.rejected);
        let username = document.getElementById('menuUser').textContent;
        let params = {
            IN_PROCESO: me.view.option,
            IN_IDCONT: idCont,
            IN_FILESQ: corrl,
            IN_USER: username,
            IN_CUUID: tmp.cuuid,
            IN_FUUID: tmp.fuuid
        };
        const formData = new FormData();
        formData.append('params', JSON.stringify(params));
        const res = await global.callStoreGet('PRAXISMP', 'MPS292', params);
        console.log(res);
        me.notifier.info('Sequences Updated');
        me.view.setLoading(true);
        me.view.reloadForm();
        me.view.close();
    },
    onCancelClick: function () {
        this.view.close();
    }
});