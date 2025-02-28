Ext.define('Ext.Praxis.controller.payments.RejectedCodesCatalog.CodeMaintenanceDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CodeMaintenanceDataEntryController',
    url: CONTEXTPATH + '/RejectedCodesCatalog',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/RejectedCodesCatalog',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
        const me = this;
    },
    afterRender: async function () {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        if (me.view.option === 'U') {
            me.loadData();
        }
        form.isValid();
    },
    maintenance: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            let params = me.formatParams();
            const res = await me.request.post('maintenance', params);
            if (res.status === 201) {
                me.notifier.success('Updated Successfully');
            } else {
                me.notifier.alert('Error on Update');
            }
        } catch (e) {
            console.error(e);
            me.view.close();
        } finally {
            me.view.setLoading(false);
            me.view.reloadGrid();
            me.view.close();
            //Ext.getCmp(prototype.id + '-MainGrid-1').getController().loadMain();
        }

    },
    loadData: function () {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        form.setValues(me.view.obj);
    },
    formatParams: function () {
        const me = this;
        const params = Ext.getCmp(prototype.idDE + '-mainForm').getForm().getValues();
        let jsonParams = global.maintenanceObj(params);
        jsonParams.IN_OPTION = me.view.option;
        return jsonParams;
    },
    onSaveRecord: function (btn) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Save?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.maintenance();
                        }
                    }
                });
    },
    onCancelClick: function () {
        this.view.close();
    }
});