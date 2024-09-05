Ext.define('Ext.Praxis.controller.payments.InputsSecondPhase.DetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailGridController',
    url: CONTEXTPATH + '/InputsPhase2',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: function (view) {
        const me = this;
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${me.url}/search`,
                extraParams: view.searchParams,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        view.setStore(store);
    },
    onClickReceived: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {CCUST, CODPRO, SEQPRO, PRDA} = record.data;
        let params = {IN_CCUST: CCUST, IN_PRDA: PRDA, IN_CODPRO: CODPRO, IN_SEQPRO: SEQPRO};
        console.log('Parameters: ', params);
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const loadedPanel = Ext.create('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.FilesGrid', {
            id: prototype.id + '-FilesGrid-1',
            searchParams: params,
            backButton: me.backDrilldown
        });
        mainPanel.add(loadedPanel);
    },
    onClickLoaded: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {CCUST, CODPRO, SEQPRO, PRDA} = record.data;
        let params = {IN_CCUST: CCUST, IN_PRDA: PRDA, IN_CODPRO: CODPRO, IN_SEQPRO: SEQPRO};
        console.log('Parameters: ', params);
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const loadedPanel = Ext.create('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.LoadedGrid', {
            id: prototype.id + '-LoadedGrid-1',
            searchParams: params,
            backButton: me.backDrilldown
        });
        mainPanel.add(loadedPanel);
    },
    onClickExonerated: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {CCUST, CODPRO, SEQPRO, PRDA} = record.data;
        let params = {IN_CCUST: CCUST, IN_PRDA: PRDA, IN_CODPRO: CODPRO, IN_SEQPRO: SEQPRO};
        console.log('Parameters: ', params);
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const exoneratedPanel = Ext.create('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.ExoneratedGrid', {
            id: prototype.id + '-ExoneratedGrid-1',
            searchParams: params,
            backButton: me.backDrilldown
        });
        mainPanel.add(exoneratedPanel);
    },
    backDrilldown: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        let panelItems = mainPanel.items.items;
        if (panelItems.length > 0) {
            // Destruye el último child
            panelItems.at(-1).destroy();
            if (panelItems.length > 0) {
                // Muestra el penúltimo child
                panelItems.at(-1).show();
            }
        }
    },
    downloadExcel: function () {
        let params = this.view.searchParams;
        global.getFile(`${this.url}/downloadSearch?${new URLSearchParams(params)}`);
    },
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