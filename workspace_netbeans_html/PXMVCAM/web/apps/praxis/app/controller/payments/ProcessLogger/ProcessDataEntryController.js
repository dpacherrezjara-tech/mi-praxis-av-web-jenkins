Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessDataEntryController',
    url: CONTEXTPATH + '/ProcessLog',
    request: axios.create({
        baseURL: CONTEXTPATH + '/ProcessLog',
        timeout: 0
      }),
    notifier: new AWN(),
    init: function (view) {
        const me = this;
        const cmbProcesadores = Ext.getCmp(prototype.idDE + '-cmbCODPRO');
        me.setComboStore({cmp: cmbProcesadores, data: view.procesadores,
            valueField: 'CODE', displayField: 'NAME', value: ''});
    },
    afterRender: async function () {
    },
    onProcessClick: async function () {
        const me = this;
        let params = Ext.getCmp(prototype.idDE + '-formFilters')
                .getForm()
                .getValues();

        if (params.VP_PRDA.length !== 0 && params.VP_PRDA.length !== 8) {
            global.Msg({msg: 'Invalid Date'});
            return;
        }
        if (params.VP_CODPRO === '') {
            global.Msg({msg: 'Select Processor before Run'});
            return;
        }
        
        try {
            const res = await me.request.post('process',params);
            const {code,msg} = res.data;
            if(code===0){
                me.notifier.success(msg);
            }else{
                me.notifier.alert(msg);
            }
        } catch (e) {
            me.notifier.alert('Process Failed...');
        }
        me.view.close();
    },
    onClose: function () {
        this.view.close();
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