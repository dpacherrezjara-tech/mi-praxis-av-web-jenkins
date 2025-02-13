Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
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
        let username = document.getElementById('menuUser').innerText.trim();
        const btnUpload = Ext.getCmp(prototype.id + '-uploadAccountingBtn');
        if(username === 'MPACHECO' || username==='MPACHECOD'){
            btnUpload.show();
        }else{
            btnUpload.hide();
        }
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
    onViewPostErrors: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const {IDCONT} = record.data;
        let params = {
            IN_IDCONT: IDCONT,
            IN_TIPO : 'POS',
            IN_STREV: '',
            IN_CERROR: ''
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.ErrorsGrid',{
            id: prototype.id + '-ErrorsGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    onViewDownloadFiles: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const {IDCONT} = record.data;
        let params = {
            IN_IDCONT: IDCONT 
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.DownloadFilesGrid',{
            id: prototype.id + '-DownloadFilesGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    onViewPreErrors: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const {IDCONT} = record.data;
        let params = {
            IN_IDCONT: IDCONT,
            IN_TIPO : 'PRE',
            IN_STREV: '',
            IN_CERROR: ''
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.ErrorsGrid',{
            id: prototype.id + '-ErrorsGrid-2',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    onLoadSettlements : function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const {CCUST,TIPOCON,IDCONT,FCONT} = record.data;
        let params = {
            IN_CCUST: CCUST,
            IN_TIPOCON : TIPOCON,
            IN_IDCONT: IDCONT,
            IN_FCONT: FCONT
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.SettlementGrid',{
            id: prototype.id + '-SettlementGrid-2',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    onLoadBandocsSap: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const {CCUST,IDCONT,FCONT} = record.data;
        let params = {
            IN_CCUST: CCUST,
            IN_IDCONT: IDCONT,
            IN_FCONT: FCONT
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.BandocsGrid',{
            id: prototype.id + '-BandocsGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    onOpenLogger: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const { IDCONT } = record.data;
        let params = {
            IN_IDCONT: IDCONT
        };
        const newWin = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.LoggerDataEntry',{
            id: prototype.id + '-LoggerDataEntry-1',
            searchParams: params
        });
        newWin.show();
    },
    disableReverse: function(view, rowIndex, colIndex, item, record){
        let reverseAction = ['2','3', '5','7'];
        return !reverseAction.includes(record.get('STCONT'));
    },
    disableDownload: function(view, rowIndex, colIndex, item, record){
        let reverseAction = ['1','2', '3', '5','6'];
        return !reverseAction.includes(record.get('STCONT'));
    },
    disableUpload: function(view, rowIndex, colIndex, item, record){
        let reverseAction = ['2', '3', '5'];
        return !reverseAction.includes(record.get('STCONT'));
    },
    onReverseAccounting: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const {CCUST,CODPRO,TIPOCON,IDCONT} = record.data;
        let params = {
            IN_CCUST:CCUST,
            IN_CODPRO:CODPRO,
            IN_TIPOCON: TIPOCON,
            IN_IDCONT:IDCONT
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
                            this.reverseAccounting(params);
                        }
                    }
                });
        
    },
    reverseAccounting: async function(params){
        const me = this;
        me.view.setLoading(true);
        me.notifier.async(
            me.request.post('reverseAccounting',params)
            .then(res=>{
                //console.log(res);
                me.view.setLoading(false);
                if(res.status === 201){
                    me.view.getStore().load();
                }else{
                    throw new Error();
                }
            }),
        'Successfully Reversed',
        'Error on Reverse');
    },
    onDownloadAccounting: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const {CCUST, CODPRO, FCONT, TIPOCON, IDCONT } = record.data;
        const me = this;
        let params = {
            IN_CCUST: CCUST,
            IN_CODPRO: CODPRO,
            IN_FCONT: FCONT,
            IN_TIPOCON: TIPOCON,
            IN_IDCONT:IDCONT
        };
        console.log('Download Params: ',params);
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Download this Accounting?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        global.downloadFile(me.request, 'downloadAccounting',params,'zip') ;
                    }
                }
            });
        
    },
    onUploadAccounting: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const {CCUST, CODPRO, FCONT, TIPOCON, IDCONT } = record.data;
        const me = this;
        let params = {
            IN_CCUST: CCUST,
            IN_CODPRO: CODPRO,
            IN_FCONT: FCONT,
            IN_TIPOCON: TIPOCON,
            IN_IDCONT:IDCONT
        };
        console.log('Upload Params: ',params);
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Send this Accounting?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.sendAccountingToSFTP(params);
                    }
                }
            });
        
    },
    sendAccountingToSFTP: async function(params){
        const me = this;
        try {
            let req = me.request.post('uploadAccounting',params);
            me.notifier.async(
                req,
                'Successfully sended To SFTP',
                'Failed to send to SFTP'
            );
        } catch (e) {
            console.error(e);
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
                        global.downloadFile(me.request,'downloadExcelMain',params,'xlsx');
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