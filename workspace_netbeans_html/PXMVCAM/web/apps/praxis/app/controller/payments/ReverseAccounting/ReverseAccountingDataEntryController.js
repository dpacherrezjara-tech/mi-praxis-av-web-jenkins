Ext.define('Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReverseAccountingDataEntryController',
    url: CONTEXTPATH + '/ReverseAccounting',
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.loadInfo();
    },
    loadInfo: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS118', me.view.searchParams);

            me.obj = res.lstRs.at(0).at(0);
            global.cleanPXobj(me.obj);
            me.bindInformation();
        } catch (e) {
            me.view.close();
        } finally {
            me.view.setLoading(false);
        }
    },
    bindInformation: function () {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        form.reset();
        form.setValues(me.obj);
        if (me.obj.STREVI === 'Y') {
            Ext.getCmp(prototype.idDE + '-txtBpoComment').setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-btn-save').hide();
        } else {
            Ext.getCmp(prototype.idDE + '-txtBpoComment').setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-btn-save').show();
        }
        me.view.center();
    },
    onUpdateRejection: function () {
        const me = this;
        let params = {
            ...me.view.searchParams,
            IN_BPOCOMM: Ext.getCmp(prototype.idDE + '-txtBpoComment').getValue()
        };
        if (params.IN_BPOCOMM.trimEnd() === '') {
            me.notifier.alert('Invalid comment');
            return;
        }
        let onOk = async () => {
            me.view.setLoading(true);
            await global.callStorePost('PRAXISMP', 'MPS119', params);
            me.view.setLoading(false);
            me.notifier.success('Updated Successfully');
            me.loadInfo();
        };
        me.notifier.confirm(
            'Are you sure to Save?',
            onOk,
            null,
            { labels: { confirm: '.:PRAXIS:.' } }
        );
    },
    onCancelClick: function () {
        this.view.close();
    }
});
