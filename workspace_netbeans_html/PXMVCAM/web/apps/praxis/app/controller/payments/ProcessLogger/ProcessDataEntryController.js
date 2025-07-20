Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessDataEntryController',
    url: CONTEXTPATH + '/ProcessLog',
    request: axios.create({
        baseURL: CONTEXTPATH + '/ProcessLog',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {

//        me.setComboStore({cmp: cmbProcesadores, data: view.procesadores,
//            valueField: 'CODE', displayField: 'NAME', value: ''});
    },
    afterRender: async function () {
        const me = this;
        console.log(me.view);
        const cmbProcesadores = Ext.getCmp(prototype.idProcess + '-cmbCODPRO');
        global.setComboStore(cmbProcesadores, me.view.procesadores, 'CODE', 'NAME', '');
    },
    onChangeProcess: function (btn) {
        const f2Filters = Ext.getCmp(prototype.idProcess + '-formF2');
        const dbFilters = Ext.getCmp(prototype.idProcess + '-formDB');
        const proFilters = Ext.getCmp(prototype.idProcess + '-formPRO');
        f2Filters.hide();
        dbFilters.hide();
        proFilters.hide();

        switch (btn.value) {
            case 'F2':
                f2Filters.show();
                break;
            case 'DB':
                dbFilters.show();
                break;
            case 'PRO':
                proFilters.show();
                break;
        }
    },
    onProcessClick: async function () {
        const me = this;
        const filter = Ext.getCmp(prototype.idProcess + '-processType');
        let notifier = new AWN();

        const onOk = () => {
            switch (filter.value) {
                case 'F2':
                    me.processF2();
                    break;
                case 'DB':
                    me.processDB();
                    break;
                case 'PRO':
                    me.processPRO();
                    break;
            }
        };
        notifier.confirm('Are you sure to Process', onOk, null);
    },
    processF2: async function () {
        let usuario = document.getElementById("menuUser").innerText;
        let filters = Ext.getCmp(prototype.idProcess + '-formF2').getForm().getValues();

        if (filters.IN_CODPRO === '') {
            new AWN().alert('Select Processor before');
            return;
        }

        let params = {
            IN_USER: usuario,
            ...filters
        };

        await global.callAPIPostAsync('ProcessLog', 'processPhase2', params);
        new AWN().info('Process Running');
    },
    processDB: async function () {
        let usuario = document.getElementById("menuUser").innerText;
        let filters = Ext.getCmp(prototype.idProcess + '-formF2').getForm().getValues();
        let params = {
            IN_USER: usuario,
            ...filters
        };
        await global.callAPIPostAsync('ProcessLog', 'processDebits', params);
        new AWN().info('Process Running');
    },
    processPRO: async function () {
        alert('En construccion');
    },

    onClose: function () {
        this.view.close();
    }
});