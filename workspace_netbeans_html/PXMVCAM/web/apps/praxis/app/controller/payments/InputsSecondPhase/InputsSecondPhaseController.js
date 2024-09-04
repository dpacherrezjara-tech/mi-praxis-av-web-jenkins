Ext.define('Ext.Praxis.controller.payments.InputsSecondPhase.InputsSecondPhaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InputsSecondPhaseController',
    url: CONTEXTPATH + '/InputsPhase2',
    procesadores: [],
    init: function (view) {
    },
    afterRender: async function () {
        this.loadFilters();
    },
    loadFilters: async function () {
        const me = this;
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.mask('Loading...');
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            const cmbProcesadores = Ext.getCmp(prototype.id + '-cmbCODPRO');
            me.procesadores = data.procesadores;
            me.setComboStore({cmp: cmbProcesadores, data: me.procesadores,
                valueField: 'A4451KEY2', displayField: 'A4451DESC1', value: ''});
            cmbProcesadores.on('select', function (cmb, record) {
                Ext.getCmp(prototype.id + '-txtSEQPRO').setValue(record.data.A4451SEQ || '');
            });
            console.log(data);
        }
        filters.unmask();

    },
    loadGrid: async function () {
        const me = this;
        let params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.DetailGrid', {
            id: prototype.id + '-DetailGrid-1',
            searchParams: params
        });
        mainPanel.add(panelDetail);
    },
    loadCalendar: async function () {
        const me = this;
        let panel = Ext.getCmp(prototype.id + '-mainContent');
        panel.mask('Loading...');
        let params = me.formatParams();
        if (params.IN_CODPRO === '') {
            global.Msg({msg: 'Choose your Processor'});
            return;
        }
        let component = Ext.getCmp(prototype.id + '-calendarForm-01'); //obtener el componente por su ID
        if (component) {
            component.destroy(); //destruir el componente
        }
        const res = await fetch(prototype.url + '/searchCalendar?' + new URLSearchParams(params));
        if (res.ok) {
            const data = await res.json();
                let calendario = Ext.create('Ext.Praxis.view.widgets.CalendarTmz', {
                id: prototype.id + '-calendarForm-01',
                ccust: params.IN_CCUST,
                anio: params.IN_PRDAY,
                dataFechas: data,
                clickCallback: me.onClickFecha
            });
            panel.add(calendario);
        }
        panel.unmask();
    },
    onClickFecha: function (obj) {
        const {ccust,procesador,fecha} = obj;
        let codpro = procesador.length === 5 ? procesador.slice(0,3) : procesador.slice(0,2);
        let seqpro = procesador.length === 5 ? procesador.slice(3,5) : procesador.slice(2,4);
        let params = {
            IN_CCUST: ccust,
            IN_CODPRO: codpro,
            IN_SEQPRO: seqpro,
            IN_PRDA: fecha
        };
        console.log(params);
        let dataEntry = Ext.create('Ext.Praxis.view.payments.InputsSecondPhaseForm.DataEntrys.CalendarDataEntry', {
            id: prototype.id + '-CalendarDataEntry-1',
            searchParams: params
        });
        dataEntry.show();
    },
    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        console.log('Search Params: ', formFilters.getValues());
        return formFilters.getValues();
    },
    onChangeGroup: function (btn) {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const from = Ext.getCmp(prototype.id + '-dfPRDAF');
        const to = Ext.getCmp(prototype.id + '-dfPRDAT');
        const year = Ext.getCmp(prototype.id + '-cmbPRDAY');
        if (btn.value === 'C') {
            from.hide();
            to.hide();
            year.show();
        } else {
            from.show();
            to.show();
            year.hide();
        }
        mainPanel.removeAll();
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        let group = Ext.getCmp(prototype.id + '-cmbGroupBy').value;
        if (group === 'D') {
            this.loadGrid();
        } else {
            this.loadCalendar();
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