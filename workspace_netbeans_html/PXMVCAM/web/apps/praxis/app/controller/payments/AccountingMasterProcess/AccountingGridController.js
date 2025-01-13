Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
      }),
    init: function (view) {
        if(view.backButton){
            Ext.getCmp(prototype.id + '-acco-btnBack').show();
            Ext.getCmp(prototype.id + '-acco-btnBack').on('click',view.backButton);
        }
    },
    afterRender: function () {
        this.loadGrid();
    },
    loadGrid: async function(){
        const me = this;
        const grid = me.view;
        try {
            grid.setLoading(true);
            const res = await me.request.get('loadAccountingInfo',{
                params: me.view.searchParams
            });
            const {response} = res.data;
            me.setTotalFields(response);
            let store = new Ext.data.Store({
               data:response 
            });
            grid.setStore(store);
        } catch (e) {
            console.error(e);
        } finally {
            grid.setLoading(false);
        }
    },
    setTotalFields: function(data){
        const txtActiv = Ext.getCmp(prototype.id + '-totPkey50');
        const txtPasiv = Ext.getCmp(prototype.id + '-totPkey40');
        let pkey50 = global.sumByFilter(data,'A4545ACTIV','A4545PKEY','50');
        let pkey15 = global.sumByFilter(data,'A4545ACTIV','A4545PKEY','15');
        let pkey40 = global.sumByFilter(data,'A4545ACTIV','A4545PKEY','40');
        let pkey01 = global.sumByFilter(data,'A4545ACTIV','A4545PKEY','01');
        
        let activ = pkey50 + pkey15;
        let pasiv = pkey40 + pkey01;
        txtActiv.setValue(Ext.util.Format.number(activ, '0,000.00'));
        txtPasiv.setValue(Ext.util.Format.number(pasiv, '0,000.00'));
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
                            global.downloadFile(me.request,'downloadExcelAccountingInfo',params,'xlsx');
                        }
                    }
                });
    }
});
