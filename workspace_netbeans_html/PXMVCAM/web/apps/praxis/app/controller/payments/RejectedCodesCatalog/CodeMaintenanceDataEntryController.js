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
    },
    maintenance: async function () {
        const me = this;
        try {
            let params = me.formatParams();
            const res = await me.request.post('maintenance',params);
            if(res.status === 201){
                me.notifier.success('Updated Successfully');
            }else{
                me.notifier.alert('Error on Update');
            }
        } catch (e) {
            console.error(e);
            me.view.close();
        }

    },
    formatParams:function(){
        const me = this;
        const params = Ext.getCmp(prototype.idDE + '-mainForm').getForm().getValues();
        let jsonParams = global.maintenanceObj(params);
        jsonParams.IN_OPTION = me.option;
        return jsonParams;
    }
});