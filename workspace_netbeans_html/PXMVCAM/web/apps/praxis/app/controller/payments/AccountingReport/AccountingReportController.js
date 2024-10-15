Ext.define('Ext.Praxis.controller.payments.AccountingReport.AccountingReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingReportController',
    url: CONTEXTPATH + '/AccountingReport',
    procesadores: [],
    init: function (view) {
    },
    afterRender: async function () {
        
    },
//    loadFilters: async function () {
//        const me = this;
//        const filters = Ext.getCmp(prototype.id + '-contentFilter');
//        filters.mask('Loading...');
//        const res = await fetch(`${me.url}/loadFilters`);
//        if (res.ok) {
//            const data = await res.json();
//            const cmbProcesadores = Ext.getCmp(prototype.id + '-cmbCODPRO');
//            me.procesadores = data.procesadores;
//            me.setComboStore({cmp: cmbProcesadores, data: me.procesadores,
//                valueField: 'A4451KEY2', displayField: 'A4451DESC1', value: ''});
//            cmbProcesadores.on('select', function (cmb, record) {
//                Ext.getCmp(prototype.id + '-txtSEQPRO').setValue(record.data.A4451SEQ || '');
//                me.onClickSearchBtn();
//            });
//            console.log(data);
//        }
//        filters.unmask();
//
//    },
    loadGrid: async function () {
        const me = this;
        let params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.Grids.MainGrid', {
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