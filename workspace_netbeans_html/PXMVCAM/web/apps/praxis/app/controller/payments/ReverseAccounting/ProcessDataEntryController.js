Ext.define('Ext.Praxis.controller.payments.ReverseAccounting.ProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessDataEntryController',
    url: CONTEXTPATH + '/ReverseAccounting',
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        console.log(me.view);
        const proFilters = Ext.getCmp(prototype.idProcess + '-formPRO');
        if (proFilters) {
            proFilters.show();
        }
    },

    onProcessClick: async function () {
        const me = this;
        const filter = Ext.getCmp(prototype.idProcess + '-processType');
        let notifier = new AWN();
        const onOk = () => {
            me.processJson();
        };
        notifier.confirm('Are you sure to Process', onOk, null);
    },

    processJson: async function () {
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
//                            FILENAM: nameFile,
                            ...x
                        }));
                    const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', json);
                    console.log('tmp', tmp);

                    let params = {
                        IN_CUUID: tmp.cuuid,
                        IN_FUUID: tmp.fuuid,

                    };
//
                    const res = await global.callStoreGet('PRAXISMP', 'MPS254', params);
//                    console.log('res',res);
//
                    const data = res.lstVals;
//                    console.log("data: ", data);
//
                    if (data && data.OUT_RES === 1) {
                        notifier.success('Processed successfully');
                    } else {
                        notifier.alert('Error on process');
                    }
                    
                    this.onClose();
                    
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