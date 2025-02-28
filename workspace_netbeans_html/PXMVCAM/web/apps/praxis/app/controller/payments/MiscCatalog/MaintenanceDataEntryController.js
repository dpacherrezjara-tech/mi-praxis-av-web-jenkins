Ext.define('Ext.Praxis.controller.payments.MiscCatalog.MaintenanceDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MaintenanceDataEntryController',
    url: CONTEXTPATH + '/MiscellaneousCatalog',
    request: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.changeView(this.view.option);
        if(this.view.cloneObj){
            this.bindClonedObj(this.view.cloneObj);
        }
    },
    loadInfo: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.get('loadSingleInfo', {params: me.view.searchParams});
            me.bindInfo(res.data.result);
        } catch (e) {
            global.Msg({msg: 'Error on load information'});
        } finally {
            me.view.setLoading(false);
        }

    },
    bindInfo: function (obj) {
        global.cleanPXobj(obj);
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        form.setValues(obj);
    },
    changeView: function (option) {
        if (option === 'U') {
            Ext.getCmp(prototype.idDE + '-cmbCcust').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-txtKey1').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-txtKey2').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-txtKey3').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-btn-delete').show();
            this.loadInfo();
        } else {
            Ext.getCmp(prototype.idDE + '-cmbCcust').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-txtKey1').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-txtKey2').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-txtKey3').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-btn-delete').hide();
        }
        Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();
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
    bindClonedObj: function(obj){
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        let params= {
            A4451CCUST: obj.A4451CCUST,
            A4451KEY1: obj.A4451KEY1,
            A4451KEY2: obj.A4451KEY2,
            A4451KEY3: obj.A4451KEY3,
            A4451DESC1: obj.A4451DESC1,
            A4451DESC2: obj.A4451DESC2,
            A4451COMEN: obj.A4451COMEN,
            A4451SEQ: obj.A4451SEQ,
            A4451STS: '0'
        };
        form.setValues(params);
    },
    maintenance: async function (option) {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.post('saveMiscCatalog', me.formatParams(option));
            if (res.status === 201) {
                me.notifier.success('Succesfully Save');
            } else {
                me.notifier.alert('Error on Save');
            }
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
        let params = global.maintenanceObj(form.getValues());
        params.IN_OPTION = option;
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