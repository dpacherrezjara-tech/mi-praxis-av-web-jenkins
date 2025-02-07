Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.ErrorsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ErrorsGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    notifier:new AWN(),
    init: function (view) {
        if (view.backButton) {
            Ext.getCmp(prototype.id + '-errors-btnBack').show();
            Ext.getCmp(prototype.id + '-errors-btnBack').on('click', view.backButton);
        }
    },
    afterRender: function (obj, e) {
        this.getData();
    },
    getData: async function () {
        const me = this;
        try {
            me.view.setLoading(true);
            const res = await me.request.get('loadErrors', {
                params: me.view.searchParams
            });
            const {response} = res.data;
            console.log(res);
            if (response.length > 0) {
                let store = new Ext.data.Store({
                    data: response
                });
                me.view.setStore(store);
            } else {
                global.Msg({msg: 'No data'});
            }
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
        //me.view.unmask();
    },
    disableReverse: function(view, rowIndex, colIndex, item, record){
        console.log(record);
        if(record.data.STREV !== '0'){
            return true;
        }
        if(record.data.TIPOERR === 'PRE'){
            return true;
        }
        return false;
    },
    validateReversed:function(selModel, record, index) {
        if(record.data.STREV !== '0'){
            return false;
        }
        if(record.data.TIPOERR === 'PRE'){
            return true;
        }
        return true;
    },
    disableAccountingInfo: function(view, rowIndex, colIndex, item, record){
        let reverseAction = ['0'];
        return !reverseAction.includes(record.get('STREV'));
    },
    onLoadAccountingInfo: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {IDCONT,BANDOC,DATECI,TRANCI} = record.data;
        let params = {
            IN_IDCONT: IDCONT,
            IN_BANDOC: BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.AccountingGrid',{
            id: prototype.id + '-AccountingGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    reverseSingleBandoc: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const {IDCONT,BANDOC,DATECI,TRANCI} = record.data;
        let params = {
            IN_IDCONT: IDCONT,
            IN_BANDOC:BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI,
            IN_REVORI: 'B',
            IN_BPOMSG: 'Reversado manual Error Contable'
        };
        console.log('Reverse Params: ',params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reverse?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.reverseSingleAccounting(params);
                        }
                    }
                });
        
    },
    onEvaluateBandoc: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const {BANDOC} = record.data;
        let params = {
            IN_BANDOC:BANDOC,
            IN_REFER:''
        };
        const newWin = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.BandocInfoDataEntry',{
            id: prototype.id + '-BandocInfoDataEntry-1',
            searchParams: params
        });
        newWin.show(newWin);
    },
    reverseMassiveBandoc: function (){
        let selectionModel = this.view.getSelectionModel();
        let selectedRecords = selectionModel.getSelection();
        if (selectedRecords.length === 0) {
            this.notifier.warning('No data Selected');
            return;
        }
        let params = selectedRecords.map(obj=>({
                IN_IDCONT:obj.data.IDCONT,
                IN_BANDOC:obj.data.BANDOC,
                IN_DATECI: obj.data.DATECI,
                IN_TRANCI:obj.data.TRANCI,
                IN_REVORI: 'B',
                IN_BPOMSG: 'Reversado Masivo Errores Contables'
            }));
        console.log('Reverse Params: ',params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reverse?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.reverseMultiAccounting(params);
                        }
                    }
                });
    },
    reverseSingleAccounting: async function(params){
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.post('reverseSingleBandoc',params);
            if(res.status === 201){
                me.notifier.success('Bandoc Reversed');
            }else{
                me.notifier.alert('Error on Reverse');
            }
        } catch (e) {
            console.error(e);
            me.notifier.alert('System Error');
        }finally {
            me.getData();
        }

    },
    reverseMultiAccounting: async function(params){
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.post('reverseMassiveBandoc',params);
            if(res.status === 201){
                me.notifier.success('Bandocs Reversed');
            }else{
                me.notifier.alert('Error on Reverse');
            }
        } catch (e) {
            console.error(e);
            me.notifier.alert('System Error');
        }finally {
            me.getData();
        }

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
                        global.downloadFile(me.request,'downloadExcelErrors',params,'xlsx');
                    }
                }
            });
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