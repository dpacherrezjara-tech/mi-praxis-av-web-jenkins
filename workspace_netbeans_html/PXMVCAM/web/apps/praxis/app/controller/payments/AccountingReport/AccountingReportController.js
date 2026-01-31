Ext.define('Ext.Praxis.controller.payments.AccountingReport.AccountingReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingReportController',
    url: CONTEXTPATH + '/AccountingReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    miscRequest: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
        timeout: 0
    }),
    init: function (view) {
        prototype.id = 'AccountingReportForm';
        prototype.url = CONTEXTPATH + '/AccountingReport';
        prototype.width = 1900;
        prototype.height = 630;
        fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();
    },
    afterRender: async function () {
        await this.loadFilters();
        //this.loadBandocs();
    },
    loadFilters: async function () {
        const me = this;
        me.view.mask('Loading...');
        try {
            //const res = await me.miscRequest.get('/loadPhase2Filter');
            const res = await global.callStoreGet('PRAXISMP', 'MPS503', {});

            me.procesadores = res.lstRs.at(0);
            me.paises = res.lstRs.at(2);
            me.monedas = res.lstRs.at(3);

            const cmbCODPRO = Ext.getCmp(prototype.id + '-cmbCODPRO');
            global.setComboStore(cmbCODPRO, me.procesadores, 'CODE', 'NAME', '');
            const cmbCODPRO2 = Ext.getCmp(prototype.id + '-cmbCODPRO2');
            global.setComboStore(cmbCODPRO2, me.procesadores, 'CODE', 'NAME', '');
            const cmbCODPROadj = Ext.getCmp(prototype.id + '-cmbProcAdj');
            global.setComboStore(cmbCODPROadj, me.procesadores, 'CODE', 'NAME', '');

            const cmbPaisAdj = Ext.getCmp(prototype.id + '-cmbPaisAdj');
            global.setComboStore(cmbPaisAdj, me.paises, 'CODE', 'NAME', '');
            const cmbCurrAdj = Ext.getCmp(prototype.id + '-cmbCurrAdj');
            global.setComboStore(cmbCurrAdj, me.monedas, 'CODE', 'NAME', '');

            const cmbPaisAdm = Ext.getCmp(prototype.id + '-cmbPaisAdm');
            global.setComboStore(cmbPaisAdm, me.paises, 'CODE', 'NAME', '');
            const cmbCurrAdm = Ext.getCmp(prototype.id + '-cmbCurrAdm');
            global.setComboStore(cmbCurrAdm, me.monedas, 'CODE', 'NAME', '');
            
            const cmbCODPROrev = Ext.getCmp(prototype.id + '-cmbProcReve');
            global.setComboStore(cmbCODPROrev, me.procesadores, 'CODE', 'NAME', '');
            const cmbPaisRev = Ext.getCmp(prototype.id + '-cmbPaisReve');
            global.setComboStore(cmbPaisRev, me.paises, 'CODE', 'NAME', '');
            const cmbCurrRev = Ext.getCmp(prototype.id + '-cmbCurrReve');
            global.setComboStore(cmbCurrRev, me.monedas, 'CODE', 'NAME', '');
        } catch (e) {
            console.error(e);
            me.notifier.alert('Filters not loaded');
        } finally {
            me.view.unmask();
            me.loadBandocs();
        }
    },
    onChangeReport: function (cmb) {
        const summFilter = Ext.getCmp(prototype.id + '-fsummary');
        const detFilter = Ext.getCmp(prototype.id + '-fdetail');
        const admFilter = Ext.getCmp(prototype.id + '-fadm');
        const adjuFilter = Ext.getCmp(prototype.id + '-fadju');
        const reveFilter = Ext.getCmp(prototype.id + '-frever');

        detFilter.hide();
        admFilter.hide();
        adjuFilter.hide();
        reveFilter.hide();
        if (cmb.value === 'S') {
            admFilter.show();
            this.loadAdms();
        } else if (cmb.value === 'A') {
            adjuFilter.show();
            this.loadAdjus();
        } else if (cmb.value === 'R') {
            reveFilter.show();
            this.loadReverse();
        } else {
            detFilter.show();
            this.loadBandocs();
        }
    },
    loadSummary: function () {
        const me = this;
        let params = me.formatSummaryParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelSummary = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.SummaryGrid', {
            id: prototype.id + '-SummaryGrid-1',
            searchParams: params
        });
        mainPanel.add(panelSummary);
    },
    loadBandocs: async function () {
        const me = this;
        let params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.DetailGrid', {
            id: prototype.id + '-DetailGrid-1',
            searchParams: params
        });
        mainPanel.add(panelDetail);
    },
    loadAdms: async function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.AdmsGrid', {
            id: prototype.id + '-AdmsGrid-1'
        });
        mainPanel.add(panelDetail);
    },
    loadAdjus: async function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.AdjusGrid', {
            id: prototype.id + '-AdjusGrid-1'
        });
        mainPanel.add(panelDetail);
    },
    loadReverse: async function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.ReverseGrid', {
            id: prototype.id + '-ReverseGrid-1'
        });
        mainPanel.add(panelDetail);
    },
    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        console.log('Search Params: ', formFilters.getValues());
        return formFilters.getValues();
    },
    formatSummaryParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters-2').getForm();
        let params = formFilters.getValues();
        params.IN_TIPO = 'M';
        console.log('Search Params: ', params);
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        const cmbType = Ext.getCmp(prototype.id + '-cmbType').value;
        if (cmbType === 'S') {
            this.loadAdms();
        } else if (cmbType === 'A') {
            this.loadAdjus();
        } else if (cmbType === 'R') {
            this.loadReverse();
        } else {
            this.loadBandocs();
        }
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