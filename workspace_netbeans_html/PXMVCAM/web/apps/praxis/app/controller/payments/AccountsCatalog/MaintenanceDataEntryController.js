Ext.define('Ext.Praxis.controller.payments.AccountsCatalog.MaintenanceDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MaintenanceDataEntryController',
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
            const res = await global.callStoreGet('PRAXISMP', 'SPNAC003', me.view.searchParams);
            console.log(res);
            me.bindInfo(res.lstRs.at(0).at(0));
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
            Ext.getCmp(prototype.idDE + '-btn-delete').show();
            this.loadInfo();
        } else {
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
    maintenance: async function (option) {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await global.callStorePost('PRAXISMP','SPNAC002',me.formatParams(option));
            if (res.status === 201) {
                me.notifier.success('Updated Succesfully');
            } else {
                me.notifier.alert('Error on Update');
            }
        } catch (e) {
            global.Msg({msg: 'Error on load'});
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
    onDeleteRecord: function (btn) {
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
    onCancelClick: function () {
        this.view.close();
    }
});