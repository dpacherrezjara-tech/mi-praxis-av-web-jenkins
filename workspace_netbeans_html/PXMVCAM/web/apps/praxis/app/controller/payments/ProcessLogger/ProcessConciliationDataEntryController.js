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
        global.setComboStore(cmbProcesadores, view.procesadores, 'CODE', 'NAME', '');
    },
    afterRender: async function () {
    },
    onProcessClick: async function (btn) {
        const me = this;
        let params = Ext.getCmp(prototype.idDE2 + '-mainForm')
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

        if (params.VP_BANDOC.length < 10 && params.VP_BANDOC.length > 0) {
            global.Msg({msg: 'Invalid Bandoc'});
            return;
        }
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Process?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.processConciliation(params);
                        }
                    }
                });

    },
    processConciliation: async function (params) {
        const me = this;
        try {
            const res = global.callStorePostAsync('PRAXISMP', 'MPS200W', params);
            if(res === 201){
                me.notifier.success('Process Loading');
            }else{
                me.notifier.alert('Error on process');
            }
        } catch (e) {
            me.notifier.alert('Error on process');
        }
        me.view.close();
    },
    onClose: function () {
        this.view.close();
    }
});