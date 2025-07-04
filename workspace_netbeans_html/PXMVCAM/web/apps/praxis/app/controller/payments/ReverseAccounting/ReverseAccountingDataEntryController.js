Ext.define('Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReverseAccountingDataEntryController',
    url: CONTEXTPATH + '/ReverseAccounting',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/ReverseAccounting',
        timeout: 0
    }),
    miscRequest: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
        timeout: 0
    }),
    notifier:new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.loadFilters();
    },
    loadFilters:async function(){
        try {
            const res = await this.miscRequest.get('loadMdpFilters');
            console.log(res.data);
        } catch (e) {
            
        }
  
    },
    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        console.log('Search Params: ', formFilters.getValues());
        return formFilters.getValues();
    },
    onSearchBandoc: async function () {
        let params = this.formatParams();
        if(params.IN_BANDOC === '' && params.IN_REFER===''){
            this.notifier.alert('Bandoc o Reference Vacios');
            return;
        }
        const grid = Ext.getCmp(prototype.idDE + '-scanBandoc');
        grid.setLoading(true);
        try {
            
            const res = await this.request.get('loadBandocs',{
                params:params
            });
            if(res.status ===200){
                console.log(res.data);
                grid.show();
                const {response} = res.data;
                let store = new Ext.data.Store({
                    data: response
                });
                grid.setStore(store);
            }
        } catch (e) {
            console.error(e);
        } finally {
            grid.setLoading(false);
        }

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