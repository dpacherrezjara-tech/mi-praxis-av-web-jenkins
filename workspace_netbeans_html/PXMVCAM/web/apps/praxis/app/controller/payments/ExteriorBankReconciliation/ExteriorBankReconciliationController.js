Ext.define('Ext.Praxis.controller.payments.ExteriorBankReconciliation.ExteriorBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ExteriorBankReconciliationController',
    url: CONTEXTPATH + '/BankReconciliationExt',
    miscUrl: CONTEXTPATH + '/MiscellaneousCatalog',
    procesadores: [],
    init: function (view) {
    },
    afterRender: async function () {
        this.loadFilters();
    },
    loadFilters: async function () {
        const me = this;
        const filters = Ext.getCmp(prototype.id + '-centerC');
        filters.mask('Loading...');
        const res = await fetch(`${me.miscUrl}/loadMdpFilters`);
        if (res.ok) {
            const data = await res.json();
            //console.log(data);
            me.corepro = data.PROCESADORES;
            me.codebank = data.CODEBANK;
            me.codpro = data.CODPRO;
            me.paises = data.PAISES;
            me.monedas = data.MONEDAS;

            //<editor-fold defaultstate="collapsed" desc="Bank Browser">
            const cmbBankCtry2 = Ext.getCmp(prototype.id + '-cmbBankCtry2');
            const cmbBankCurr2 = Ext.getCmp(prototype.id + '-cmbBankCurr2');
            const cmbBankLocCurr2 = Ext.getCmp(prototype.id + '-cmbBankLocCurr2');
            const cmbBankCODPRO2 = Ext.getCmp(prototype.id + '-cmbBankCODPRO2');
            const cmbBankCodebank2 = Ext.getCmp(prototype.id + '-cmbBankCodebank2');

            me.setComboStore({cmp: cmbBankCtry2, data: me.paises,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbBankCurr2, data: me.monedas,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbBankLocCurr2, data: me.monedas,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbBankCODPRO2, data: me.corepro,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbBankCodebank2, data: me.codebank,
                valueField: 'CODBANKN', displayField: 'NAMEBANK', value: ''});
            //</editor-fold>

            //<editor-fold defaultstate="collapsed" desc="Settlement Browser">
            const cmbSettlCtry2 = Ext.getCmp(prototype.id + '-cmbSettlCtry2');
            const cmbSettlCurr2 = Ext.getCmp(prototype.id + '-cmbSettlCurr2');
            const cmbSettlCODPRO2 = Ext.getCmp(prototype.id + '-cmbSettlCODPRO2');
            const cmbSettlCodebank2 = Ext.getCmp(prototype.id + '-cmbSettlCodebank2');

            me.setComboStore({cmp: cmbSettlCtry2, data: me.paises,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbSettlCurr2, data: me.monedas,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbSettlCODPRO2, data: me.corepro,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbSettlCodebank2, data: me.codebank,
                valueField: 'CODBANKN', displayField: 'NAMEBANK', value: ''});
            //</editor-fold>
            
            //<editor-fold defaultstate="collapsed" desc="Tax Browser">
            const cmbSettlCurr3 = Ext.getCmp(prototype.id + '-cmbSettlCurr3');
            const cmbSettlCODPRO3 = Ext.getCmp(prototype.id + '-cmbSettlCODPRO3');
            const cmbSettlPCurr3 = Ext.getCmp(prototype.id + '-cmbSettlPCurr3');

            me.setComboStore({cmp: cmbSettlCurr3, data: me.monedas,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbSettlCODPRO3, data: me.corepro,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbSettlPCurr3, data: me.monedas,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            //</editor-fold>

            //<editor-fold defaultstate="collapsed" desc="Header Browser">
            const cmbSettlCurr4 = Ext.getCmp(prototype.id + '-cmbSettlCurr4');
            const cmbSettlCODPRO4 = Ext.getCmp(prototype.id + '-cmbSettlCODPRO4');
            const cmbSettlPCurr4 = Ext.getCmp(prototype.id + '-cmbSettlPCurr4');

            me.setComboStore({cmp: cmbSettlCurr4, data: me.monedas,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbSettlCODPRO4, data: me.corepro,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            me.setComboStore({cmp: cmbSettlPCurr4, data: me.monedas,
                valueField: 'CODE', displayField: 'NAME', value: ''});
            //</editor-fold>
        }
        filters.unmask();
    },
    loadByBank: async function () {
        const type = Ext.getCmp(prototype.id + '-cmbBankFilters').value;
        const mainPanel = Ext.getCmp(prototype.id + '-bankContent');
        mainPanel.removeAll();
        let params = this.formatBankParams();
        if (type === 'F') {
            const panelDetail = Ext.create('Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.BankDetailGrid', {
                id: prototype.id + '-BankDetailGrid-1',
                searchParams: params
            });
            mainPanel.add(panelDetail);
        }
    },
    loadBySettlement: async function () {
        const type = Ext.getCmp(prototype.id + '-cmbSettlFilters').value;
        const mainPanel = Ext.getCmp(prototype.id + '-settlContent');
        mainPanel.removeAll();
        let params = this.formatSettlementParams();
        if (type === 'F') {
            const panelDetail = Ext.create('Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.SettlementDetailGrid', {
                id: prototype.id + '-SettlementDetailGrid-1',
                searchParams: params
            });
            mainPanel.add(panelDetail);
        }else if (type === 'T'){
            const taxDetail = Ext.create('Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.TaxDetailGrid', {
                id: prototype.id + '-TaxDetailGrid-1',
                searchParams: params
            });
            mainPanel.add(taxDetail);
        } else if (type === 'H'){
            const headerDetail = Ext.create('Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.HeaderDetailGrid', {
                id: prototype.id + '-HeaderDetailGrid-1',
                searchParams: params
            });
            mainPanel.add(headerDetail);
        }
    },
    onChangeModule: function (radiogroup, newValue, oldValue) {
        const opt = newValue.opcion;
        if (opt === 'B') {
            Ext.getCmp(prototype.id + '-viewBank').show();
            Ext.getCmp(prototype.id + '-viewSettlement').hide();
        } else {
            Ext.getCmp(prototype.id + '-viewBank').hide();
            Ext.getCmp(prototype.id + '-viewSettlement').show();
        }
    },
    onChangeFiltersBB: function (btn) {
        const mainPanel = Ext.getCmp(prototype.id + '-bankContent');
        mainPanel.removeAll();
        if (btn.value === 'F') {
            Ext.getCmp(prototype.id + '-formFiltersBB-1').hide();
            Ext.getCmp(prototype.id + '-formFiltersBB-2').show();
        } else {
            Ext.getCmp(prototype.id + '-formFiltersBB-1').show();
            Ext.getCmp(prototype.id + '-formFiltersBB-2').hide();
        }
    },
    onChangeFiltersBS: function(btn) {
        const mainPanel = Ext.getCmp(prototype.id + '-settlContent');
        mainPanel.removeAll();
        if (btn.value === 'F') {
            Ext.getCmp(prototype.id + '-formFiltersBS-1').hide();
            Ext.getCmp(prototype.id + '-formFiltersBS-2').show();
            Ext.getCmp(prototype.id + '-formFiltersBS-3').hide();
            Ext.getCmp(prototype.id + '-formFiltersBS-4').hide();
        } else if (btn.value === 'T') {
            Ext.getCmp(prototype.id + '-formFiltersBS-1').hide();
            Ext.getCmp(prototype.id + '-formFiltersBS-2').hide();
            Ext.getCmp(prototype.id + '-formFiltersBS-3').show();
            Ext.getCmp(prototype.id + '-formFiltersBS-4').hide();
        } else if (btn.value === 'H') {
            Ext.getCmp(prototype.id + '-formFiltersBS-1').hide();
            Ext.getCmp(prototype.id + '-formFiltersBS-2').hide();
            Ext.getCmp(prototype.id + '-formFiltersBS-3').hide();
            Ext.getCmp(prototype.id + '-formFiltersBS-4').show();
        }
    },
    onProcessClick: function () {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.ExtBankReconciliationForm.DataEntrys.ProcessBankReconciliationDataEntry', {
            id: prototype.id + '-ProcessAccountingDataEntry-1',
            procesadores: me.procesadores
        });
        dataEntry.show();
    },
    //<editor-fold defaultstate="collapsed" desc="Format Parameters">
    formatBankParams: function () {
        const type = Ext.getCmp(prototype.id + '-cmbBankFilters').value;
        let filters = {};
        if (type === 'S') {
            //Bank Browser
            filters = Ext.getCmp(prototype.id + '-formFiltersBB-1').getForm().getValues();
        } else {
            //Bank Summary
            filters = Ext.getCmp(prototype.id + '-formFiltersBB-2').getForm().getValues();
        }
        console.log('Search Params: ', filters);
        return filters;

    },
    formatSettlementParams: function () {
        const type = Ext.getCmp(prototype.id + '-cmbSettlFilters').value;
        let filters = {};
        if (type === 'S') {
            //Settlement Browser
            filters = Ext.getCmp(prototype.id + '-formFiltersBS-1').getForm().getValues();
        } else if (type === 'F') {
            //Settlement Summary
            filters = Ext.getCmp(prototype.id + '-formFiltersBS-2').getForm().getValues();
        } else if (type === 'T'){
            filters = Ext.getCmp(prototype.id + '-formFiltersBS-3').getForm().getValues();
        } else if (type === 'H'){
            filters = Ext.getCmp(prototype.id + '-formFiltersBS-4').getForm().getValues();
        }
        console.log('Search Params: ', filters);
        return filters;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        const rb = Ext.getCmp(prototype.id + '-viewOption').getValue().opcion;
        if (rb === 'B') {
            this.loadByBank();
        } else {
            this.loadBySettlement();
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