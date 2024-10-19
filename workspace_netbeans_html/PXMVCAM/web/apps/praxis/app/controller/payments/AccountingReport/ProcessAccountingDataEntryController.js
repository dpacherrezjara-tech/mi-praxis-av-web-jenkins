Ext.define('Ext.Praxis.controller.payments.AccountingReport.ProcessAccountingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessAccountingDataEntryController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 20000
      }),
    notifier: new AWN(),
    afterRender: function () {
        this.loadFilters();
    },
    loadFilters: function(){
        const me = this;
        let procesadores = Object.assign([],me.view.procesadores) ;
        procesadores.unshift({CODE:'EXT',NAME:'ALL EXTERIOR'});
        //console.log(procesadores);
        let store = new Ext.data.Store({
            data: procesadores
        });
        Ext.getCmp(prototype.idDE + '-cmbCODPRO').setStore(store);
        Ext.getCmp(prototype.idDE + '-cmbCODPRO').setValue('EXT');
    },
    onProcessClick: function(btn){
        let params  = this.formatParameters();
        console.log('Execute Params: ',params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to process?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.loadAccounting(params);
                        }
                    }
                });
    },
    loadAccounting: async function(params){
        const me = this;
        try {
            const res = await me.request.post('processAccounting',params);
            if(res.status === 201){
                me.notifier.success('Execution was Successfully');
            }else{
                me.notifier.alert('Error on Process');
            }
        } catch (e) {
            console.error(e);
        } finally {
            me.view.unmask();
        }
        
    },
    formatParameters: function(){
      let params = Ext.getCmp(prototype.idDE + '-mainForm')
              .getForm()
              .getValues();
      return params;
    },
    onCancelClick: function () {
        this.view.close();
    }
});
