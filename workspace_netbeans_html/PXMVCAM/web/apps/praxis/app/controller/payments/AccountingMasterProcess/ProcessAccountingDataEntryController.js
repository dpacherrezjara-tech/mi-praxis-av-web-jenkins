Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.ProcessAccountingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessAccountingDataEntryController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
      }),
    notifier: new AWN(),
    afterRender: function () {
        this.loadFilters();
    },
    loadFilters: function(){
        const me = this;
        me.procesadores = Object.assign([],me.view.procesadores) ;
        const ccust = Ext.getCmp(prototype.idDE + '-cmbCcust');
        ccust.fireEvent('change', {});
    },
    onChangeTipocon: function () {
        const ccust = Ext.getCmp(prototype.idDE + '-cmbCcust');
        ccust.fireEvent('change', {});
    },
    onChangeCcust: function () {
        const me = this;
        const cmbCccust = Ext.getCmp(prototype.idDE + '-cmbCcust');
        const tipocon = Ext.getCmp(prototype.idDE + '-cmbTIPOCON');
        const cmbProc = Ext.getCmp(prototype.idDE + '-cmbCODPRO');
        let data = me.procesadores.filter(x =>
                x.A4451CCUST === cmbCccust.value && x.A4451CORRL === tipocon.value);
        let store = new Ext.data.Store({
            data: data
        });
        cmbProc.setStore(store);
        if(cmbCccust.value==='134'){
            cmbProc.setValue('CO');
        }else{
            cmbProc.setValue(data.at(0).A4451KEY2);
        }
        //global.setComboStore(cmbProc, data, 'A4451KEY2', 'A4451DESC1', '');
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
