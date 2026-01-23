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
    validateDates: function () {
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        const values = form.getValues();

        if (values.FINICI && values.FVENCE) {
            const initialDate = Ext.Date.parse(values.FINICI, 'Ymd');
            const expirationDate = Ext.Date.parse(values.FVENCE, 'Ymd');

            if (initialDate > expirationDate) {
                Ext.Msg.alert(
                    '.:PRAXIS:.',
                    'The Initial Date cannot be greater than the Expiration Date.'
                );
                return false;
            }
        }
        return true;
    },
    onSaveRecord: function (btn) {
        
         const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();

            if (!form.isValid()) {
                Ext.Msg.alert(
                    '.:PRAXIS:.',
                    'It is not possible to create the record due to missing mandatory information.'
                );
                return;
            }
            
            if (!this.validateDates()) {
                return;
            }
            
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
            await global.callStorePostWithError(
                'PRAXISMP',
                'SPNAC002',
                me.formatParams(option)
            );

            me.notifier.success('Updated Successfully');
            me.view.reloadGrid();
            me.view.close();

        } catch (e) {
            console.error('Error on maintenance', e);

            const backendMsg = e.response?.data;
            let msg = 'Error on load';

            if (typeof backendMsg === 'string' && backendMsg.includes('Duplicate')) {
                msg = 'A record with the same combination of data already exists.';
            }

            global.Msg({ msg });

        } finally {
            me.view.setLoading(false);
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