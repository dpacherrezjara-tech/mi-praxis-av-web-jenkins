Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessConciliationDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessConciliationDataEntryController',
    url: CONTEXTPATH + '/ProcessLog',
    request: axios.create({
        baseURL: CONTEXTPATH + '/ProcessLog',
        timeout: 0
      }),
    notifier: new AWN(),
    init: function (view) {
        const me = this;
        const cmbProcesadores = Ext.getCmp(prototype.idDE2 + '-cmbCODPRO');
        global.setComboStore(cmbProcesadores,view.procesadores,'CODE','NAME','');
    },
    afterRender: async function () {
    },
    onProcessClick: async function () {
        const me = this;
        let params = Ext.getCmp(prototype.idDE2 + '-formFilters')
                .getForm()
                .getValues();

        if (params.VP_SDATE_INI.length !== 0 && params.VP_SDATE_INI.length !== 8) {
            global.Msg({msg: 'Invalid Date'});
            return;
        }
        
        if (params.VP_SDATE_FIN.length !== 0 && params.VP_SDATE_FIN.length !== 8) {
            global.Msg({msg: 'Invalid Date'});
            return;
        }
        
        if (params.VP_CODPRO === '') {
            global.Msg({msg: 'Select Processor before Run'});
            return;
        }
        
        try {
            const res = await me.request.post('processConciliation',params);
            
            if(res.status===201){
                me.notifier.success('Process Running...');
            }else{
                me.notifier.alert('Error on Process');
            }
        } catch (e) {
            me.notifier.alert('Process Failed...');
        }
        me.view.close();
    },
    onClose: function () {
        this.view.close();
    }
});