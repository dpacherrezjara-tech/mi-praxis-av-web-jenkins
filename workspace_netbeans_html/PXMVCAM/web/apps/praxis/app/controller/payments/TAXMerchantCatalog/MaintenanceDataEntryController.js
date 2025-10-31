Ext.define('Ext.Praxis.controller.payments.TAXMerchantCatalog.MaintenanceDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MaintenanceDataEntryController',
    url: CONTEXTPATH + '/TAXMerchantCatalog',
    request: axios.create({
        baseURL: CONTEXTPATH + '/TAXMerchantCatalog',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.changeView(this.view.option);
    },
    loadInfo: async function () {
        const me = this;
        me.view.setLoading(true);
        try {  
             me.bindInfo(me.view.searchParams);
        } catch (e) {
            global.Msg({msg: 'Error on load information'});
        } finally {
            me.view.setLoading(false);
        }

    },
    bindInfo: function (obj) {
        
        global.cleanPXobj(obj);
//        console.log("obj: ", obj)
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        form.setValues(obj);
    },
    changeView: async function (option) {
        if (option === 'U') {
            Ext.getCmp(prototype.idDE + '-proceso').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-code').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-merchant').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-iatavta').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-cmbDataEntryProcessor').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-controlData').show();
            Ext.getCmp(prototype.idDE + '-btn-delete').show();
            this.loadInfo();
        } else {
            Ext.getCmp(prototype.idDE + '-proceso').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-code').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-merchant').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-iatavta').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-cmbDataEntryProcessor').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-controlData').hide();
            Ext.getCmp(prototype.idDE + '-btn-delete').hide();
        }
        Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();
        
            const combos = await global.callStoreGet('PRAXISMP', 'SPMC001');
            Ext.getCmp(prototype.idDE + '-cmbDataEntryCurrency').getStore().loadData(combos.lstRs.at(3));
            Ext.getCmp(prototype.idDE + '-cmbDataEntryCurrencyBank').getStore().loadData(combos.lstRs.at(3));
            Ext.getCmp(prototype.idDE + '-cmbDataEntryCountry').getStore().loadData(combos.lstRs.at(2));
            Ext.getCmp(prototype.idDE + '-cmbDataEntryProcessor').getStore().loadData(combos.lstRs.at(0));
            
    },
    onSaveRecord: function (btn) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to save?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.maintenance(this.view.option);
                        }
                    }
                });
    },
    maintenance: async function (option) {
        const me = this;
        me.view.setLoading(true);
        try {
            me.view.setLoading(true);
            const params = me.formatParams(option)
            const res = await global.callStoreGet('PRAXISMP', 'MPS276', params);
//            console.log("res", res)
//            if (res.status === 201) {
//                me.notifier.success('Succesfully Save');
//            } else {
//                me.notifier.alert('Error on Save');
//            }
        } catch (e) {
            global.Msg({msg: 'Error on load information'});
        } finally {
            me.view.setLoading(false);
            me.view.reloadGrid();
            me.view.close();
        }
    },
    formatParams: function (option) {
    const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
    const values = form.getValues();
    const me = this;
    
    const params = {
        IN_TYPE: option,
        IN_PROCESO: values.IN_PROCESO || '',
        IN_MERCHANT: values.IN_MERCHANT || '',
        IN_IATAVTA: values.IN_SALE_AGENT || '',
        IN_CODE: values.IN_CODE || '',
        IN_CODPRO: values.IN_PROCESSOR || '',
        IN_SOCIETY: values.IN_SOCIETY || '',
        IN_MDAVTA: values.IN_CURRENCY || '',
        IN_CEBEVTA: values.IN_SALE_PROFIT || '',
        IN_PAIS: values.IN_COUNTRY || '',
        IN_CEBEDEPO: values.IN_STATEMENT_PROFIT || '',
        IN_CECO: values.IN_COST_CENTER || '',
        IN_ADQUIRI: values.IN_ACQUIRER || '',
        IN_CANAL: values.IN_CHANNEL || '',
        IN_CIABANK: values.IN_COMPANY || '',
        IN_MDABANK: values.IN_BANK_CURRENCY || '',
        IN_CEBEBANK: values.IN_BANK_PROFIT || '',
        IN_CLAVE1: values.IN_NIT_CODE || '',
        IN_CLAVE3: values.IN_NIT_DESCRIPTION || '',
        IN_CUENTA: values.IN_ACCOUNT || '',
        IN_TIPOCB: values.IN_TYPE_CB || '',
        IN_TIPOML: values.IN_TYPE_MEMOLINE || '',
        IN_TEXTML: values.IN_MEMOLINE || ''
    };
//    console.log("📤 Params enviados al backend:", params);
    return params;
    },
    onDeleteRecord: function(btn){
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to delete?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.maintenance('D');
                        }
                    }
                });
    },
    onCancelClick: function(){
        this.view.close();
    }
});