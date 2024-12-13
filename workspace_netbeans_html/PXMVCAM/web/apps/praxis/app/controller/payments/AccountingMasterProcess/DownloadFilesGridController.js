Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.DownloadFilesGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DownloadFilesGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    notifier:new AWN(),
    init: function (view) {
        if (view.backButton) {
            Ext.getCmp(prototype.id + '-dfamp-btnBack').show();
            Ext.getCmp(prototype.id + '-dfamp-btnBack').on('click', view.backButton);
        }
    },
    afterRender: function (obj, e) {
        this.getData();
    },
     getData: async function () {
        const me = this;
        try {
            me.view.setLoading(true);
            const res = await me.request.get('loadDownloadFiles', {
                params: me.view.searchParams
            });
            const {response} = res.data;
            if (response.length > 0) {
                let store = new Ext.data.Store({
                    data: response
                });
                me.view.setStore(store);
            } else {
                global.Msg({msg: 'No data'});
            }
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
        //me.view.unmask();
    },
    onDownloadExcel: function () {
        const me = this;
        let params = me.view.searchParams;
        console.log('Download Params: ', params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.downloadFile(me.request,'downloadExcelDownloadFilesInfo',params,'xlsx');
                        }
                    }
                });
    }

    //</editor-fold>
});