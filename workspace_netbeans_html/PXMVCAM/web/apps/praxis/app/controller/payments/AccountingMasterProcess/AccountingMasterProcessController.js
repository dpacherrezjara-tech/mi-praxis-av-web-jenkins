Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingMasterProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterProcessController',
    url: CONTEXTPATH + '/AccountingReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 20000
    }),
    miscRequest: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
        timeout: 20000
    }),
    init: function (view) {
        //window.location.reload();
        prototype.id = 'AccountingMasterProcessForm';
        prototype.url = CONTEXTPATH + '/AccountingReport';
        prototype.width = 1900;
        prototype.height = 630;
        fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();
    },
    afterRender: async function () {
        await this.loadFilters();
    },
    loadFilters: async function () {
        const me = this;
        me.view.mask('Loading...');
        try {
            const res = await me.miscRequest.get('/loadAccountingProcs');

            const data = res.data;
            me.procesadores = data.response;
            const ccust = Ext.getCmp(prototype.id + '-cmbCcust');
            ccust.fireEvent('change', {});
        } catch (e) {
            console.error(e);
            me.notifier.alert('Filters not loaded');
        } finally {
            me.view.unmask();
            me.loadGrid();
        }

    },
    onChangeTipocon: function () {
        const ccust = Ext.getCmp(prototype.id + '-cmbCcust');
        ccust.fireEvent('change', {});
    },
    onChangeCcust: function () {
        const me = this;
        const cmbCccust = Ext.getCmp(prototype.id + '-cmbCcust');
        const tipocon = Ext.getCmp(prototype.id + '-cmbTIPOCON');
        const cmbProc = Ext.getCmp(prototype.id + '-cmbCODPRO');
        let data = me.procesadores.filter(x =>
            x.A4451CCUST === cmbCccust.value && x.A4451CORRL === tipocon.value);
        global.setComboStore(cmbProc, data, 'A4451KEY2', 'A4451DESC1', '');
    },
    loadGrid: async function () {
        const me = this;
        let params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.MainGrid', {
            id: prototype.id + '-MainGrid-1',
            searchParams: params
        });
        mainPanel.add(panelDetail);
    },
    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        console.log('Search Params: ', formFilters.getValues());
        return formFilters.getValues();
    },
    onProcessClick: function () {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.ProcessAccountingDataEntry', {
            id: prototype.id + '-ProcessAccountingDataEntry-1',
            procesadores: me.procesadores
        });
        dataEntry.show();
    },
    onSapClick: function () {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.SapLoadDataEntry', {
            id: prototype.id + '-SapLoadDataEntry-1',
            procesadores: me.procesadores
        });
        dataEntry.show();
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        this.loadGrid();
    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onClearOptionsBtn: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        formFilters.reset();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickLoadProvision: async function () {
        const me = this;
        const winProvis = Ext.create('Ext.window.Window', {
            title: 'Provision - Form',
            width: 400,
            id: prototype.id + '-provisionForm',
            layout: 'fit',
            modal: true,
            items: [{
                    xtype: 'form',
                    bodyPadding: 10,
                    defaults: {
                        anchor: '100%',
                        labelWidth: 100
                    },
                    items: [{
                            xtype: 'filefield',
                            id: prototype.id + '-fileProvision',
                            name: 'file',
                            labelWidth: 50,
                            fieldLabel: 'File',
                            buttonText: 'Select File...',
                            allowBlank: false
                        },
                        {
                            xtype: 'label',
                            width: '100%',
                            html: '<b style="color:#c82d2d;font-size:9px;text-align:right;display:block">Required Layout (*): REFER-VALDATE</b>'
                        }
                    ]
                }],
            buttonAlign: 'center',
            buttons: [{
                    text: 'Process Provision',
                    iconCls: 'prx-icon-reload',
                    scale: 'medium',
                    handler: function (btn) {
                        var form = btn.up('window').down('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.show(
                                    {
                                        title: '.:PRAXIS:.',
                                        msg: 'Are you sure to process Provision?',
                                        buttons: Ext.MessageBox.YESNO,
                                        scope: this,
                                        icon: Ext.MessageBox.QUESTION,
                                        modal: true,
                                        fn: function (btn) {
                                            if (btn === 'yes') {
                                                me.loadProvision();
                                                /*
                                                 form.submit({
                                                 url: CONTEXTPATH + '/AccountingReport/processProvision', // <-- cambiá esto
                                                 waitMsg: 'Loading File...',
                                                 success: function (fp, o) {
                                                 new AWN().success('File Uploaded Successfully');
                                                 me.downloadResultProvis(o.result);
                                                 },
                                                 failure: function (fp, o) {
                                                 new AWN().alert('Error on load File');
                                                 }
                                                 });*/
                                            }
                                        }
                                    });

                        }
                    }
                }]
        });
        winProvis.show();
    },
    loadProvision: async function () {
        const me = this;
        const form = Ext.getCmp(prototype.id + '-provisionForm');
        form.setLoading(true);
        const file = Ext.getCmp(prototype.id + '-fileProvision').fileInputEl.dom.files[0];
        if (file) {
            let nameFile = file.name;
            global.readExcelFile(file, async (json) => {
                try {
                    json = json.map(x => ({
                            FILENAM: nameFile,
                            ...x
                        }));
                    const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', json);
                    const res = await global.callStorePost('PRAXISMP', 'SPGCON009', {
                        IN_CUUID: tmp.cuuid,
                        IN_FUUID: tmp.fuuid
                    });
                    me.downloadResultProvis(res.data.lstRs.at(0));
                } catch (e) {
                    console.error(e);
                } finally {
                    form.setLoading(false);
                }

            });
        } else {
            this.notifier.alert('Select file to process');
            form.setLoading(true);
        }
    },
    downloadResultProvis: function (result) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Result?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            console.log(result);
                            //let data = JSON.parse(result);
                            me.createExcelProvis(result);
                        }
                    }
                });
    },
    createExcelProvis: async function (data) {

        let excelData = data.map(x => {
            let layout = {
                'Bank Doc.': x.BANDOC,
                'Value Date': x.VALDATE,
                'Reference': x.REFER,
                'Status Prov': x.STPROV === 'Y' ? 'YES' : 'NO',
                'Account Prov.': x.ACCPROV,
                'Date Prov.': x.FECPROV,
                'Corrl AV': x.CORRLAV
            };
            return layout;
        });
        global.writeExcelFromJson(excelData, 'Provision Success');

    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ( {data}){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    }
    //</editor-fold>
});