Ext.define('Ext.Praxis.controller.payments.AccountingReport.AdmsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AdmsGridController',
    url: CONTEXTPATH + '/AccountingReport',
    notifier: new AWN(),
    init: function (view) {

    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: function (view) {
        const me = this;
        const filters = Ext.getCmp(prototype.id + '-fadm').getForm().getValues();
        me.searchParams = filters;
        let store = global.callStorePaggin('PRAXISMP', 'MPS500', filters);
        view.setStore(store);
    },
    downloadExcel: function () {
        const me = this;
        let params = me.searchParams;
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
                            //global.downloadFile(me.request,'downloadExcelBandocsBrowser',params,'zip');
                            this.getXlsx(params);
                        }
                    }
                });
    },
    getXlsx: async function (params) {
        const me = this;
        me.view.setLoading(true);

        let lst = await global.callStorePagginExcel('PRAXISMP', 'MPS500', params);
        console.log('Excel', lst);

        let lstJson = lst.map(x => {
            global.cleanPXobj(x);
            let obj = {
                'Client': x.CCUST,
                'Ticket Nbr': x.TICKET,
                'Seq': x.SEQ,
                'Invoice': x.INVOICE,
                'Reject Code': x.CREJEC,
                'Error Code': x.CERROR,
                'ADM Number': x.ADMNUM,
                'Sale Date': x.SDATE,
                'Agent': x.SAGENT,
                'Consolidator': x.SCONSOL,
                'Country': x.SCOUNTRY,
                'PNR': x.SPNR,
                'Card Code': x.SCARCOD,
                'Card Number': x.SCARDN,
                'Auth Code': x.SAUTHOC,
                'Curr.': x.SCURRENCY,
                'Amount': x.SVFOP,
                'Curr. Rev.': x.SCURREVEN,
                'Amount Rev.': x.SVFOPUSD,
                'PRAXIS ID': x.IDCONT,
                'Header': x.CORRLAV
            };
            return obj;
        });

        await global.writeExcelFromJson(lstJson, 'ADM Report');
        me.view.setLoading(false);
    }
});

