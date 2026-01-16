Ext.define('Ext.Praxis.controller.payments.CostCenterCatalog.CostCenterDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CostCenterDataEntryController',
    obj: {},
    notifier: new AWN(),
    afterRender: function () {
        if (this.view.option === 'U') {
            this.renderData();
            Ext.getCmp(prototype.idDE1 + '-btn-update').show();
        } else {
            Ext.getCmp(prototype.idDE1 + '-btn-save').show();
        }
    },

    renderData: async function () {
        global.cleanPXobj(this.view.obj);
        this.obj = this.view.obj;
        let form = Ext.getCmp(prototype.idDE1 + '-mainForm').getForm();
        form.setValues(this.view.obj);
    },
    onCancelClick: function () {
        this.view.close();
    },
    onSaveClick: function () {
        const me = this;
        Ext.Msg.confirm('Confirm', '¿Are you sure to save?', function (btn) {
            if (btn === 'yes') {
                me.maintenance();
            }
        });
    },
    onUpdate: async function () {
        const me = this;
        Ext.Msg.confirm('Confirm', '¿Are you sure to update?', function (btn) {
            if (btn === 'yes') {
                me.maintenance();
            }
        });
    },
    maintenance: async function () {
        this.view.setLoading(true);
        let form = Ext.getCmp(prototype.idDE1 + '-mainForm').getForm();
        let data = form.getValues();
        let params = global.maintenanceObj(data);
        params.IN_OPTION = 'M'; //M=Merge (insert/update)
        params.IN_PROCESO = 'CA'
        try {
            const res = await global.callStorePost('PRAXISMP', 'MPS249', params);
            const data = res.data;
            let msg = data.lstVals.OU_RESP || '';
            this.notifier.info(msg);
        } catch (e) {
            this.notifier.alert('Error on load');
        } finally {
            this.view.setLoading(false);
            Ext.getCmp(prototype.id + '-dataGrid').getStore().load();
            this.view.close();
        }
    },
    
});
