Ext.define('Ext.Praxis.controller.payments.InputsSecondPhase.FilesGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FilesGridController',
    url: CONTEXTPATH + '/InputsPhase2',
    init: function (view) {
        if(view.backButton){
            Ext.getCmp(prototype.id + '-files-btnBack').show();
            Ext.getCmp(prototype.id + '-files-btnBack').on('click',view.backButton);
        }
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
            //pageSize: 20,
            proxy: {
                type: 'ajax',
                //enablePaging: true,
                url: `${me.url}/searchFilesReceived`,
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
    onClickDelivery:function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {MF054CCUST, MF054TYPE, MF054TREGD, MF054PRDA,MF054NTAB} = record.data;
        let params = {IN_CCUST: MF054CCUST, IN_PRDA: MF054PRDA, 
            IN_TYPE: MF054TYPE, IN_REG: MF054TREGD,IN_NTAB: MF054NTAB};
        console.log('Parameters: ' , params);
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const deliveryPanel = Ext.create('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.DeliveryGrid', {
            id: prototype.id + '-DeliveryGrid-1',
            searchParams: params,
            backButton: me.view.backButton
        });
        mainPanel.add(deliveryPanel);
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