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
    },
    loadFilters: async function () {
        const me = this;
        me.view.mask('Loading...');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS503', {});

            me.procesadores = res.lstRs.at(0);
            me.paises       = res.lstRs.at(2);
            me.monedas      = res.lstRs.at(3);
            me.adjTypes     = res.lstRs.at(4);
            me.bpoComments  = res.lstRs.at(5);

            // ── Deposits ──────────────────────────────────────────────────
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbCODPRO'),  me.procesadores, 'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbCODPRO2'), me.procesadores, 'CODE', 'NAME', '');

            // ── Adjustments ───────────────────────────────────────────────
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbProcAdj'),       me.procesadores, 'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbPaisAdj'),        me.paises,       'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbCurrAdj'),        me.monedas,      'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbAdjTypeAdju'),    me.adjTypes,     'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbBpoCommentAdju'), me.bpoComments,  'CODE', 'NAME', '');

            // ── ADMs ──────────────────────────────────────────────────────
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbPaisAdm'),    me.paises,   'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbCurrAdm'),    me.monedas,  'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbAdjTypeAdm'), me.adjTypes, 'CODE', 'NAME', '');

            // ── Reverse ───────────────────────────────────────────────────
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbProcReve'), me.procesadores, 'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbPaisReve'), me.paises,       'CODE', 'NAME', '');
            global.setComboStore(Ext.getCmp(prototype.id + '-cmbCurrReve'), me.monedas,      'CODE', 'NAME', '');

        } catch (e) {
            console.error(e);
            me.notifier.alert('Filters not loaded');
        } finally {
            me.view.unmask();
            me.loadBandocs();
        }
    },
    onChangeReport: function (cmb) {
        const detFilter  = Ext.getCmp(prototype.id + '-fdetail');
        const admFilter  = Ext.getCmp(prototype.id + '-fadm');
        const adjuFilter = Ext.getCmp(prototype.id + '-fadju');
        const reveFilter = Ext.getCmp(prototype.id + '-frever');

        detFilter.hide();
        admFilter.hide();
        adjuFilter.hide();
        reveFilter.hide();

        if      (cmb.value === 'S') { admFilter.show();  this.loadAdms();    }
        else if (cmb.value === 'A') { adjuFilter.show(); this.loadAdjus();   }
        else if (cmb.value === 'R') { reveFilter.show(); this.loadReverse(); }
        else                        { detFilter.show();  this.loadBandocs(); }
    },
    loadSummary: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        mainPanel.add(Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.SummaryGrid', {
            id: prototype.id + '-SummaryGrid-1',
            searchParams: this.formatSummaryParams()
        }));
    },
    loadBandocs: async function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        mainPanel.add(Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.DetailGrid', {
            id: prototype.id + '-DetailGrid-1',
            searchParams: this.formatParams()
        }));
    },
    loadAdms: async function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        mainPanel.add(Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.AdmsGrid', {
            id: prototype.id + '-AdmsGrid-1'
        }));
    },
    loadAdjus: async function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        mainPanel.add(Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.AdjusGrid', {
            id: prototype.id + '-AdjusGrid-1'
        }));
    },
    loadReverse: async function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        mainPanel.add(Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.ReverseGrid', {
            id: prototype.id + '-ReverseGrid-1'
        }));
    },
    formatParams: function () {
        const form = Ext.getCmp(prototype.id + '-formFilters').getForm();
        console.log('Search Params:', form.getValues());
        return form.getValues();
    },
    formatSummaryParams: function () {
        const form = Ext.getCmp(prototype.id + '-formFilters-2').getForm();
        let params = form.getValues();
        params.IN_TIPO = 'M';
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        const cmbType = Ext.getCmp(prototype.id + '-cmbType').value;
        if      (cmbType === 'S') { this.loadAdms();    }
        else if (cmbType === 'A') { this.loadAdjus();   }
        else if (cmbType === 'R') { this.loadReverse(); }
        else                      { this.loadBandocs(); }
    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.isVisible() ? filters.hide() : filters.show();
    },
    // Limpia el form del panel activo según el tipo seleccionado
    onClearOptionsBtn: function () {
        const cmbType = Ext.getCmp(prototype.id + '-cmbType').value;
        const formMap = {
            'D': prototype.id + '-formFilters',
            'A': prototype.id + '-formFiltersAdju',
            'S': prototype.id + '-formFiltersAdm',
            'R': prototype.id + '-formFiltersReve'
        };
        const formId = formMap[cmbType];
        if (formId) { Ext.getCmp(formId).getForm().reset(); }
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) { this.onClickSearchBtn(); }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ({id}) {
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ({cmp, data, valueField, displayField, value}) {
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data, valueField, displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ({data, valueField, displayField}) {
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField]   = '';
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') obj[attr] = obj[attr].trimEnd();
            }
        });
        let store = this.createStore({data});
        store.insert(0, allRecord);
        return store;
    },
    createArrayStore: function ({data}) {
        return new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => [x.code, x.name])
        });
    },
    createStore: function ({data}) {
        return Ext.create('Ext.data.Store', { autoLoad: true, data, pageSize: 20 });
    },
    parseInt: function (number) {
        return (number && number !== '') ? parseInt(number) : number;
    },
    getDistinct: function (lst, key) {
        let seen = {};
        return lst.filter(item => {
            if (seen[item[key]]) return false;
            seen[item[key]] = true;
            return true;
        });
    }
    //</editor-fold>
});