Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeaderDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HeaderDataEntryController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.loadData();
    },
    maintenance: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            let params = me.formatParams();
            const res = await me.request.post('loadHeaderInfo', params);
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
            me.view.close();
            Ext.getCmp(prototype.id + '-MainGrid-1').getController().loadMain();
        }

    },
    loadData: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.get('loadHeaderInfo', {
                params: {
                    IN_IDCONT: me.view.praxisId
                }
            });
            console.log(res.data);
            const {header, files, bandocs, rejections} = res.data;
            global.cleanPXobj(header.at(0));
            const mainForm = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
            mainForm.setValues(header.at(0));
            const filesGrid = Ext.getCmp(prototype.idDE + '-gridFiles');
            const accountedGrid = Ext.getCmp(prototype.idDE + '-gridAccounted');
            const rejectionsGrid = Ext.getCmp(prototype.idDE + '-gridRejected');
            let fileStore = new Ext.data.Store({
                data: files
            });
            let accountedStore = new Ext.data.Store({
                pageSize: 50,
                data: bandocs,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            let rejectedStore = new Ext.data.Store({
                pageSize: 50,
                data: rejections,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            filesGrid.setStore(fileStore);
            accountedGrid.setStore(accountedStore);
            rejectionsGrid.setStore(rejectedStore);
        } catch (e) {
            console.error(e);
            me.view.close();
        } finally {
            me.view.setLoading(false);
        }
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
                            //this.maintenance();
                        }
                    }
                });
    },
    onCancelClick: function () {
        this.view.close();
    }
});