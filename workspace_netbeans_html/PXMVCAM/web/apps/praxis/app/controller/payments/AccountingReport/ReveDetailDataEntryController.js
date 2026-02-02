Ext.define('Ext.Praxis.controller.payments.AccountingReport.ReveDetailDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReveDetailDataEntryController',
    init: function (view) {

    },
    afterRender: function () {
        this.loadData();
    },
    loadData: async function () {
        const me = this;
        const mainForm = Ext.getCmp(prototype.idAdju2 + '-mainInfo').getForm();
        const gridSettl = Ext.getCmp(prototype.idAdju2 + '-gridSettl');
        const gridSale = Ext.getCmp(prototype.idAdju2 + '-gridSale');
        const totalsSettl = Ext.getCmp(prototype.idAdju2 + '-totalsSettl').getForm();
        const totalsInvoi = Ext.getCmp(prototype.idAdju2 + '-totalsInvoi').getForm();

        let obj = me.view.obj;

        let searchParams = {
            'IN_NREV': obj.NREV,
            'IN_DATEC': obj.DATEC,
            'IN_TRANC': obj.TRANC,
            'IN_CODPRO': obj.CODPRO
        };

        try {

            global.cleanPXobj(obj);
            mainForm.setValues(obj);
            me.view.setLoading(true);

            const res = await global.callStoreGet('PRAXISMP', 'MPS505', searchParams);
            
            const invoices = res.lstRs.at(0);

            gridSale.setStore(new Ext.data.Store({
                data: invoices
            }));
            
            let totalAmount = Ext.util.Format.number(global.sumBy(invoices,'SVFOP'), '0,000.00');
            
            totalsInvoi.setValues({
                'totalRecords': invoices.length,
                'totalAmount': totalAmount
            });
            
            const settlements = res.lstRs.at(1);
            
            if (settlements.length > 0) {
                gridSettl.show();
                gridSettl.setStore(new Ext.data.Store({
                    data: settlements
                }));
                
                let totalLoc = Ext.util.Format.number(global.sumBy(settlements,'SVFOP'), '0,000.00');
                let totalRev = Ext.util.Format.number(global.sumBy(settlements,'IMPORTEPAG'), '0,000.00');
                
                totalsSettl.setValues({
                    'totalRecords': settlements.length,
                    'totalLoc': totalLoc,
                    'totalRev': totalRev
                });
                
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