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

    onClose: function () {
        this.view.close();
    }
});