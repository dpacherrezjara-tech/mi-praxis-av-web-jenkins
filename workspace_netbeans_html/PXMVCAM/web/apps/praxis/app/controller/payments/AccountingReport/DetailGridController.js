Ext.define('Ext.Praxis.controller.payments.AccountingReport.DetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailGridController',
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
        let store = global.callStorePaggin('PRAXISMP', 'SPACR014', view.searchParams);
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
    onLoadRejections:function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            return;
        }
        const {BANDOC,DATECI,TRANCI,TIPOCON} = record.data;
        let params = {
            IN_TIPOCON: TIPOCON || '',
            IN_BANDOC: BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.RejectionsGrid',{
            id: prototype.id + '-RejectionsGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    onLoadAccountingReg: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '') {
            return;
        }
        const {BANDOC,DATECI,TRANCI,IDCONT} = record.data;
        let params = {
            IN_IDCONT: IDCONT,
            IN_BANDOC: BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.AccountingGrid',{
            id: prototype.id + '-AccountingGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    onLoadAccountingDeb: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '') {
            return;
        }
        const {BANDOC,DATECI,TRANCI,IDCDEB} = record.data;
        let params = {
            IN_IDCONT: IDCDEB,
            IN_BANDOC: BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.AccountingGrid',{
            id: prototype.id + '-AccountingGrid-1',
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
                            //global.downloadFile(me.request,'downloadExcelBandocsBrowser',params,'zip');
                            this.getXlsx(params);
                        }
                    }
                });
    },
    getXlsx: async function(params){
        const me = this;
        me.view.setLoading(true);
        let lst = await global.callStorePagginExcel('PRAXISMP', 'SPACR014', params);
        let lstJson = lst.map(x => {
            global.cleanPXobj(x);
            let obj = {
                'Client Code': x.CCUST,
                'Value Date': x.VALDATE,
                'Doc Type': x.TDOC,
                'Bank Doc': x.BANDOC,
                'Status Phase 1': x.STVAL,
                'Processor': x.DESC_PRO,
                'Payment Date': x.ADATE,
                'Account': x.ACCOUNT,
                'Profit Center': x.BENCENC,
                'Society': x.SOCIETY,
                'Reference': x.REFER,
                'Key 1': x.CLAVE1,
                'Key 3': x.CLAVE3,
                'Text': x.TEXTO,
                'Curr': x.SCURRENCY,
                'Amount': x.NETO,
                'Rev Curr.': x.LOCRENCY2,
                'Rev Amount': x.LOCAMOUNT2,
                'Qty Settl F1':x.QTYLIQ1,
                'Qty Settl F2':x.QTYLIQ2,
                'Qty Tax': x.QTYGAS,
                'Header REG': x.HEADER,
                'Header DEB': x.HEADER2
            };
            return obj;
        });
        await global.writeExcelFromJson(lstJson,'Accounting Report');
        me.view.setLoading(false);
    },
    openBandocDetail: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const {BANDOC,DATECI,TRANCI} =record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.DataEntrys.BandocDetailDataEntry',{
            id:prototype.id + '-BandocDetailDataEntry-1',
            searchParams: {
                IN_BANDOC: BANDOC,
                IN_DATECI: DATECI,
                IN_TRANCI: TRANCI
            }
        });
        dataEntry.show();
    }
});

