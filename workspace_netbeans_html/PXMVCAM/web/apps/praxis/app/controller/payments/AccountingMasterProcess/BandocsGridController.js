Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.BandocsGridController', {
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
        this.getData();
    },
    getData: function () {
        const me = this;
        const view = me.view;
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${me.url}/loadBandocsSap`,
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
    onLoadAccountingInfo: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {CCUST,IDCONT,FCONT,BANDOC,REFER,CODPRO,VALDATE} = record.data;
        let params = {
            IN_CCUST: CCUST,
            IN_IDCONT: IDCONT,
            IN_FCONT: FCONT,
            IN_CODPRO : CODPRO,
            IN_BANDOC: BANDOC,
            IN_VALDATE: VALDATE,
            IN_REFER: REFER
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
    disableReverse: function(view, rowIndex, colIndex, item, record){
        const {STCON,STSAP} = record.data;
        if(STSAP === 'L'){
            return true;
        }
//        if(STCON === '2'){
//            return true;
//        }
        return false;
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
                            global.downloadFile(me.request,'downloadExcelBandocsSAP',params,'xlsx');
                        }
                    }
                });
    },
    reverseSingleBandoc: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const {IDCONT,BANDOC,DATECI,TRANCI} = record.data;
        let params = {
            IN_IDCONT: IDCONT,
            IN_BANDOC: BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI,
            IN_REVORI: 'B',
            IN_BPOMSG: 'Reversado Manual Contable'
        };
        console.log('Reverse Params: ',params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reverse?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.reverseSingleAccounting(params);
                        }
                    }
                });
        
    },
    reverseSingleAccounting: async function(params){
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.post('reverseSingleBandoc',params);
            if(res.status === 201){
                me.notifier.success('Bandoc Reversed');
            }else{
                me.notifier.alert('Error on Reverse');
            }
        } catch (e) {
            console.error(e);
            me.notifier.alert('System Error');
        }finally {
            me.getData();
        }

    },
});