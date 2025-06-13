Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeadersGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HeadersGridController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.getData();
    },
    getData: function () {
        const me = this;
        const view = me.view;
        let store = global.callStorePaggin('PRAXISMP','SPHRP001',view.searchParams);
        view.setStore(store);
    },
    onUpdateRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        global.cleanPXobj(record.data);
        console.log(record.data);
        const dataEntry = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.HeaderDataEntry', {
            id: prototype.id + '-HeaderDataEntry-1',
            praxisId: record.data.IDCONT,
            filters: me.view.filters
        });
        dataEntry.show();
    },
    downloadExcel: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.downloadFile2(me.request, 'downloadHeaders', me.view.searchParams);
                        }
                    }
                });
    }
});