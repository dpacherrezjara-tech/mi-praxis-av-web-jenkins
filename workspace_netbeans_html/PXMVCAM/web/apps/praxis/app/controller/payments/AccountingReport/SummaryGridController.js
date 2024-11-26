Ext.define('Ext.Praxis.controller.payments.AccountingReport.SummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SummaryGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    notifier:new AWN(),
    init: function (view) {
        if (view.backButton) {
            Ext.getCmp(prototype.id + '-summ-btnBack').show();
            Ext.getCmp(prototype.id + '-summ-btnBack').on('click', view.backButton);
        }
    },
    afterRender: function (obj, e) {
        this.getData();
    },
    getData: async function () {
        const me = this;
        try {
            me.view.setLoading(true);
            const res = await me.request.get('loadSummaryAccounting', {
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
    onLoadTotal: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const {CCUST,PROCESSOR,VALDATE} = record.data;
        let params = {
            IN_CCUST: CCUST || '',
            IN_VALDATEF: VALDATE+'01',
            IN_VALDATET: VALDATE+'31',
            IN_CODPRO:PROCESSOR,
            IN_TIPO:'D'
        };
        console.log('Days Params: ',params);
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const panelSummary = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.SummaryMonthGrid', {
            id: prototype.id + '-SummaryGrid-2',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(panelSummary);
    }
});