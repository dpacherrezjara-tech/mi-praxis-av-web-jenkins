Ext.define('Ext.Praxis.controller.payments.ReverseAccounting.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainGridController',
    url: CONTEXTPATH + '/ReverseAccounting',
    request: axios.create({
        baseURL: CONTEXTPATH + '/ReverseAccounting',
        timeout: 20000
    }),
    notifier: new AWN(),
    init: function (view) {
        if(view.backButton){
            Ext.getCmp(prototype.id + '-main-btnBack').show();
            Ext.getCmp(prototype.id + '-main-btnBack').on('click',view.backButton);
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
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${me.url}/loadMain`,
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
    disableReverse:function(view, rowIndex, colIndex, item, record){
        if(record.data.STREV !== '0'){
            return true;
        }
        if(record.data.TIPOERR === 'PRE'){
            return true;
        }
        return false;
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
    },
    
    onViewDetailReverseAccounting: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        console.log("record --> ");
        console.table(record);
        
//        IN_A4545USER=134
//        REGSK20241209225215
//        IN_A4545DOCBA=1700308135
//        IN_A4545DATCI=20240808
//        IN_A4545TRACI=000000158
     
//        IDCONT = '134REGSK20241209225215' AND  BANDOC = '1700308135' AND  DATECI = '20240808' AND  TRANCI = '000000158';

        const {IDCONT, BANDOC, DATECI, TRANCI} = record.data;
        
        let params = {
            IN_A4545USER: IDCONT,
            IN_A4545DOCBA: BANDOC,
            IN_A4545DATCI: DATECI,
            IN_A4545TRACI : TRANCI
        };
        console.log("params --> ", params);
        
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        
        const newPanel = Ext.create('Ext.Praxis.view.payments.ReverseAccountingForm.Grids.DetailGrid',{
            id: prototype.id + '-DetailGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    
    onDownloadExcel: function () {
        const me = this;
        let params = me.view.searchParams;
        console.log('Download Params: ', params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.downloadFile(me.request,'downloadExcelReverseMainInfo',params,'xlsx');
                        }
                    }
                });
    }
    
    //</editor-fold>
});