Ext.define('Ext.Praxis.controller.payments.AccountingReport.AdjuDetailDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AdjuDetailDataEntryController',
    init: function (view) {

    },
    afterRender: function () {
        this.loadData();
    },
    loadData: async function () {
        const me = this;
        const mainForm = Ext.getCmp(prototype.idAdju + '-mainInfo').getForm();
        const gridSettl = Ext.getCmp(prototype.idAdju + '-gridSettl');
        const gridSale = Ext.getCmp(prototype.idAdju + '-gridSale');

        let obj = me.view.obj;

        let searchParams = {
            'IN_DATEC': obj.DATEC,
            'IN_TRANC': obj.TRANC,
            'IN_CODPRO': obj.CODPRO
        };

        try {

            global.cleanPXobj(obj);
            mainForm.setValues(obj);
            me.view.setLoading(true);

            const res = await global.callStoreGet('PRAXISMP', 'MPS504', searchParams);

            gridSale.setStore(new Ext.data.Store({
                data: res.lstRs.at(0)
            }));

            if (res.lstRs.at(1).length > 0) {
                gridSettl.show();
                gridSettl.setStore(new Ext.data.Store({
                    data: res.lstRs.at(1)
                }));
            }else{
                gridSettl.hide();
            }


        } catch (e) {
            console.error(e);
            global.Msg({msg: 'Error on Load'});
            me.view.close();
        } finally {
            me.view.center();
            me.view.setLoading(false);
        }

    },
    onReloadInfo: function(){
        this.loadData();
    },
    onCancelClick: function(){
        this.view.close();
    }
});