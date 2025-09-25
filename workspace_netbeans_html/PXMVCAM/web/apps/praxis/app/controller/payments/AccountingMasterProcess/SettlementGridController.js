Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.SettlementGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SettlementGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
        if (view.backButton) {
            Ext.getCmp(prototype.id + '-settl-btnBack').show();
            Ext.getCmp(prototype.id + '-settl-btnBack').on('click', view.backButton);
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
                url: `${me.url}/loadSettlements`,
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
                            global.downloadFile(me.request, 'downloadExcelSettlements', params, 'xlsx');
                        }
                    }
                });
    },

    onDownloadLiquidation: function () {
        console.log('liquidation');
        const me = this;
        let params = {
            'IN_IDCONT': me.view.searchParams.IN_IDCONT,
            'IN_BANDOC':'',
            'IN_DATECI':'',
            'IN_TRANCI':''
        };
        console.log('Download Params: ', params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download File?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
//                        global.downloadFile(me.request,'downloadExcelErrors',params,'xlsx');
                            this.downloadExcel(params);
                        }
                    }
                });
    },

    downloadExcel: async function (params) {
        console.log('txt');
        let me = this;
        me.view.setLoading(true);
        let lst = await global.callStoreGet('PRAXISMP', 'MPS295', params);
//        console.log('Excel',lst);
//        console.log("data.at(0).at(0)", lst.lstRs[0]);

        console.log('data inicial', lst);
        const lstVals = lst.lstRs[0];
        console.log('lstVals', lstVals);

        if (lstVals.lenght === 0) {
            global.Msg({
                msg: 'Data not found'
            });
            return;
        }
        
        
        /*1-MATCH , 5- MATCH MANUAL*/


        let lstJson = lstVals.map(x => {
            global.cleanPXobj(x);
            let obj = {
                'Bank Doc': x.BANDOC,
                'Card Number': x.SCARDN,
                'Auth Code': x.SAUTHOC,
                'Date': x.SDATE,
                'Settl. Amount':x.SVFOP,
                'Currency': x.SCURRENCY,
                'Pay Amount': x.IMPORTEPAG,
                'Pay Currency': x.MONEDAPAGO,
                'IATA': x.SAGENT,
                'Merchant': x.MERCHNC,
                'Status': this.formatStatus(x.STVAL),
                'Gencon': x.GENCON,
                'Sale Amount ': x.SUMA_VTA,
                'Sale Currency':x.MDA_VTA,
                'Qty Ticket':x.QTY_TKT,
                'Diff': x.SUM_DIFF,
                'Tickets':x.LST_TKT
                
            };
            return obj;
        });
        await global.writeExcelFromJson(lstJson, 'Liquidation Report');
        me.view.setLoading(false);

    },
    
    formatStatus: function(x){
        let opts = {
            '1': 'Match',
            '5': 'Match Manual'
        };
        return opts[x] || '';
    }
    
});