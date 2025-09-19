Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessDataEntryController',
    url: CONTEXTPATH + '/ProcessLog',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
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
        const poFilters = Ext.getCmp(prototype.idProcess + '-formPO');
        f2Filters.hide();
        dbFilters.hide();
        proFilters.hide();
        poFilters.hide();

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
            case 'OP':
                poFilters.show();
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
                case 'OP':
                    me.processPO();
                    break;
            }
        };
        notifier.confirm('Are you sure to Process', onOk, null);
    },
    processF2: async function () {
        const me = this;
        let notifier = new AWN();
        let usuario = document.getElementById("menuUser").innerText;
        let filters = Object.assign({}, Ext.getCmp(prototype.idProcess + '-formF2').getForm().getValues());

        let permission = true;

        if (!me.view.admins.some(x => x.USERNAME === usuario)) {

            if (filters.IN_CCUST === 'ALL') {
                permission = false;
            }

            if (filters.IN_CODPRO === '') {
                permission = false;
            }
        }

        if (!permission) {
            notifier.alert('User not allowed');
            return;
        }

        filters.IN_CODPRO = filters.IN_CODPRO === '' ? 'ALL' : filters.IN_CODPRO;

        if (filters.IN_TIPO === '1') {
            filters.IN_FECR = Ext.Date.format(new Date(), 'Ymd');
        } else {
            filters.IN_FECR = '';
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
        let filters = Ext.getCmp(prototype.idProcess + '-formDB').getForm().getValues();
        let params = {
            IN_USER: usuario,
            ...filters
        };
        await global.callAPIPostAsync('ProcessLog', 'processDebits', params);
        new AWN().info('Process Running');
    },
    processPRO: async function () {
        const me = this;
        let notifier = new AWN();
        const form = Ext.getCmp(prototype.idProcess + '-formPRO');
        if (form.isValid()) {
            form.setLoading(true);
            const file = Ext.getCmp(prototype.idProcess + '-fileProvision').fileInputEl.dom.files[0];
            let nameFile = file.name;
            global.readExcelFile(file, async (json) => {
                try {
                    json = json.map(x => ({
                            FILENAM: nameFile,
                            ...x
                        }));
                    const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', json);

                    const res = await me.request.post('/executeProvision', {
                        IN_CUUID: tmp.cuuid,
                        IN_FUUID: tmp.fuuid
                    });
                    console.log("res: ", res);

                    const data = res.data;
                    console.log("data: ", data);

                    if (data && data.STATUS === true) {
                        notifier.success('Provision Started');
                    } else {
                        notifier.alert('Provision Failed');
                    }
                } catch (e) {
                    console.error(e);
                    notifier.alert('Error on process');
                } finally {
                    form.setLoading(false);
                }

            });
        } else {
            notifier.alert('Select file');
        }
    },
    processPO: async function () {
        console.log('processPO');
        let usuario = document.getElementById("menuUser").innerText;
        let filters = Ext.getCmp(prototype.idProcess + '-formPO').getForm().getValues();
        let params = {
            IN_USER: usuario,
            ...filters
        };
        console.log('Parameters',params);
        await global.callAPIPostAsync('ProcessLog', 'processPhaseOpe', params);
        new AWN().info('Process Running');
    },
    onChangeTypeProcessF2: function (btn) {
        const valueDates = Ext.getCmp(prototype.idProcess + '-valueDatesF2');
        valueDates.hide();
        if (btn.value === '2') {
            valueDates.show();
        }
    },
    onClose: function () {
        this.view.close();
    }
});