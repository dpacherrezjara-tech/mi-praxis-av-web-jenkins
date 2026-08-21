Ext.define('Ext.Praxis.controller.payments.TAXMerchantCatalog.TAXMerchantCatalogGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TAXMerchantCatalogGridController',
    url: CONTEXTPATH + '/TAXMerchantCatalog',
    request: axios.create({
        baseURL: CONTEXTPATH + '/TAXMerchantCatalog',
        timeout: 0
    }),
    init: function (view) {
    },
    afterRender: async function () {
        this.getData();
    },
    onUpdateRec: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        global.cleanPXobj(record.data);
        const dataEntry = Ext.create('Ext.Praxis.view.payments.TAXMerchantCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            searchParams: global.maintenanceObj(record.data),
            option:'U',
            reloadGrid: ()=>{
                me.getData();
            }
        });
        dataEntry.show();
    },
    getData: async function(){
        const me = this;
        me.view.setLoading(true);
        try {
            const params = { 
            IN_TYPE: 'G',
            IN_PROCESO: me.view.searchParams.IN_PROCESO,
            IN_MERCHANT: me.view.searchParams.IN_MERCHANT,
            IN_IATAVTA: me.view.searchParams.IN_IATAVTA,
            IN_CODE: me.view.searchParams.IN_CODE,
            IN_CODPRO: me.view.searchParams.IN_CODPRO,
            IN_SOCIETY: '',
            IN_MDAVTA: '',
            IN_CEBEVTA: '',
            IN_PAIS: '',
            IN_CEBEDEPO: '',
            IN_CECO: '',
            IN_ADQUIRI: '',
            IN_CANAL: '',
            IN_CIABANK: '',
            IN_MDABANK: '',
            IN_CEBEBANK: '',
            IN_CLAVE1: '',
            IN_CLAVE3: '',
            IN_CUENTA: '',
            IN_TIPOCB: '',
            IN_TIPOML: '',
            IN_TEXTML: '',
            IN_REFKEY1: '',
            IN_REFKEY3: '',
            IN_IATAVTA_OLD: '',
            IN_MERCHANT_OLD: ''
                }

            const res = await global.callStoreGet('PRAXISMP', 'MPS276', params);

  

               
            if (res && res.lstRs && res.lstRs.length > 0 && res.lstRs.at(0).length > 0) {
                me.fullDataStore = Ext.create('Ext.data.Store', {
                        data: res.lstRs.at(0),
                        fields: me.view.store.getFields()
                    });
                    
                let storeSettl = new Ext.data.Store({
                    pageSize: 20, // Número de registros por página
                    data: res.lstRs.at(0),
                    proxy: {
                        type: 'memory', // Los datos están cargados en memoria
                        enablePaging: true // Habilitar la paginación en memoria
                    }
                });
            
                    me.view.setStore(storeSettl);
                    
                } else {
                    me.view.getStore().removeAll();
                    global.Msg({ msg: 'No Data' });
                }
                
                const combos = await global.callStoreGet('PRAXISMP', 'SPMC001');
                const cmbProcessor = Ext.getCmp(prototype.idDE + '-cmbProcessor');
                if (cmbProcessor) cmbProcessor.getStore().loadData(combos.lstRs.at(0));
            
        } catch (e) {
            console.error(e)  
        } finally {
            me.view.setLoading(false);
        }
    },
    downloadExcel: function () {
        const me = this;
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth()+1).padStart(2, '0')}${date.getFullYear()}`;
        if (!me.fullDataStore) return;
        let params = me.fullDataStore.getData().items.map(rec => rec.data);
        //console.log("downloadExcel :", params)
        //console.log("formattedDate :", formattedDate)
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
                            global.writeExcelFromJson(params, `Tax_Merchant_Catalog_From_${formattedDate}`);
                        }
                    }
                });
        //global.getFile(`${this.url}/download?${new URLSearchParams(params)}`);
    }
});

