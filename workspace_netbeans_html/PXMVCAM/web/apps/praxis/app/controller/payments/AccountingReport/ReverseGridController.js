Ext.define('Ext.Praxis.controller.payments.AccountingReport.ReverseGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReverseGridController',
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
        const filters = Ext.getCmp(prototype.id + '-frever').getForm().getValues();
        me.searchParams = filters;
        let store = global.callStorePaggin('PRAXISMP', 'MPS502', filters);
        view.setStore(store);
    },
    onLoadDetail: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let newWin = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.DataEntrys.ReveDetailDataEntry', {
            id: prototype.id + '-ReveDetailDataEntry-1',
            obj: record.data
        });
        newWin.show();
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

        const optsDocType = {
            'S': 'Sale',
            'R': 'Refund'
        };

        let lst = await global.callStorePagginExcel('PRAXISMP', 'MPS502', params);
        console.log('Excel', lst);

        let lstJson = lst.map(x => {
            global.cleanPXobj(x);
            let obj = {
                'Client': x.CCUST,
                'Reverse Nbr.': x.NREV,
                'Trans. Date': x.DATEC,
                'Trans. Nbr.': x.TRANC,
                'Processor': x.DESC_PRO,
                'Doc. Type': optsDocType[x.TDOC],
                'Sale Date': x.SDATE,
                'Agent': x.SAGENT,
                'Merchant': x.MERCHNC,
                'PRAXIS ID Adjustment': x.IDCADJ,
                'Header': x.CORRLAV,
                'Qty. TKT': x.QTYTKT,
                'Card Number': x.SCARDN,
                'Auth Code': x.SAUTHOC,
                'Curr.': x.SCURRENCY,
                'Amount': x.SVFOP,
                'Curr. Rev.': x.MONEDAPAGO,
                'Amount Rev.': x.IMPORTEPAG,
                'Error Code': x.CERROR,
                'Bank Doc.': x.BANDOC,
                'Reference': x.REFER
            };
            return obj;
        });

        await global.writeExcelFromJson(lstJson, 'Reverse Report');
        me.view.setLoading(false);
    }
});

