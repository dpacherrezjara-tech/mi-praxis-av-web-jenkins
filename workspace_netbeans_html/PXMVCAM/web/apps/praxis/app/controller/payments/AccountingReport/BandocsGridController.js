Ext.define('Ext.Praxis.controller.payments.AccountingReport.BandocsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BandocsGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
        if(view.backButton){
            Ext.getCmp(prototype.id + '-bandoc-btnBack').show();
            Ext.getCmp(prototype.id + '-bandoc-btnBack').on('click',view.backButton);
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: function (view) {
        const me = this;
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true, 
                url: `${me.url}/loadBandocsBrowser`,
                extraParams: view.searchParams,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        view.setStore(store);
    },
    onLoadSettlements: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const {BANDOC,DATECI,TRANCI} = record.data;
        let params = {
            IN_BANDOC: BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.SettlementsGrid',{
            id: prototype.id + '-SettlementsGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    onLoadTaxes: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const {BANDOC,DATECI,TRANCI} = record.data;
        let params = {
            IN_BANDOC: BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.TaxesGrid',{
            id: prototype.id + '-TaxesGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    downloadExcel: function () {
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
                            global.downloadFile(me.request,'downloadBandocsBrowser',params,'zip');
                        }
                    }
                });
    }
});

