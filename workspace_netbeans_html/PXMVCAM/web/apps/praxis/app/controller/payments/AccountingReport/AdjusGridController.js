Ext.define('Ext.Praxis.controller.payments.AccountingReport.AdjusGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AdjusGridController',
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
        const filters = Ext.getCmp(prototype.id + '-fadju').getForm().getValues();
        me.searchParams = filters;
        let store = global.callStorePaggin('PRAXISMP', 'MPS501', filters);
        view.setStore(store);
    },
    onLoadDetail: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let newWin = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.DataEntrys.AdjuDetailDataEntry', {
            id: prototype.id + '-AdjuDetailDataEntry-1',
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

        const optsStatus = {
            '1': 'Auto',
            '5': 'Manual'
        };

        const optsDocType = {
            'S': 'Sale',
            'R': 'Refund'
        };

        const optsBusiness = {
            '1': 'PAX',
            '2': 'CGO',
            '3': 'COR',
            '4': 'TUR'
        };

        let lst = await global.callStorePagginExcel('PRAXISMP', 'MPS501', params);
        console.log('Excel', lst);

        let lstJson = lst.map(x => {
            global.cleanPXobj(x);
            let obj = {
                'Client': x.CCUST,
                'Trans. Date': x.DATEC,
                'Trans. Nbr.': x.TRANC,
                'Processor': x.DESC_PRO,
                'Status': optsStatus[x.STVAL],
                'Doc. Type': optsDocType[x.TDOC],
                'Sale Date': x.SDATE,
                'Agent': x.SAGENT,
                'Merchant': x.MERCHNC,
                'PRAXIS ID Adjustment': x.IDCADJ,
                'Header': x.CORRLAV,
                'Qty. TKT': x.QTYTKT,
                'Card Code': x.SCARCOD,
                'Card Number': x.SCARDN,
                'Auth Code': x.SAUTHOC,
                'Curr.': x.SCURRENCY,
                'Amount': x.SVFOP,
                'Curr. Rev.': x.MONEDAPAGO,
                'Amount Rev.': x.IMPORTEPAG,
                'Error Code': x.CERROR,
                'PNR': x.SPNR,
                'Ticket Nbr.': x.TICKET,
                'Terminal': x.TERMI,
                'Bussiness': optsBusiness[x.NEGOC],
                'Bank Doc.': x.BANDOC,
                'Reference': x.REFER,
                'PRAXIS ID': x.IDCONT
            };
            return obj;
        });

        await global.writeExcelFromJson(lstJson, 'Adjustment Report');
        me.view.setLoading(false);
    },
});

