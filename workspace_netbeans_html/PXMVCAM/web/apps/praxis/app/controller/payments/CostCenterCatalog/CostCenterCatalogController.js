Ext.define('Ext.Praxis.controller.payments.CostCenterCatalog.CostCenterCatalogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CostCenterCatalogController',
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        await this.loadFilters();
        this.loadGrid();
    },
    loadFilters:async function(){
        try {
            const res = await global.callStoreGet('PRAXISMP','SPMC001',{});
            let paises = res.lstRs.at(2);
            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaises');
            global.setComboStore(cmbPaises,paises,'CODE','NAME','');
        } catch (e) {
            
        }
    },
    loadGrid: async function(){
        const me = this;
        const filter = Ext.getCmp(prototype.id + '-formFilters').getValues();
        const grid = Ext.getCmp(prototype.id + '-dataGrid');
        try {
            let store = global.callStorePaggin('PRAXISMP','MPS248',filter);
            grid.setStore(store);
        } catch (e) {
            console.error(e);
        } 
    },
    onClickSearchBtn: function(){
        this.loadGrid();
    },
    onCreate: function(){
        let dataEntry = Ext.create('Ext.Praxis.view.payments.CostCenterCatalogForm.CostCenterDataEntry',{
           id: prototype.id + '-CostCenterDataEntry-1',
           option:'C'
        });
        dataEntry.show();
    },
    onUpdate: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        let dataEntry = Ext.create('Ext.Praxis.view.payments.CostCenterCatalogForm.CostCenterDataEntry',{
           id: prototype.id + '-CostCenterDataEntry-1',
           obj: record.data,
           option:'U'
        });
        dataEntry.show();
    },
    onDelete: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        Ext.Msg.confirm('Confirm', '¿Are you sure to delete?', function(btn) {
            if (btn === 'yes') {
                me.deleteRecord(record.data);
            } 
        });
    },
    deleteRecord:async function(obj){
        this.view.setLoading(true);
        let params = global.maintenanceObj(obj);
        params.IN_OPTION = 'D';
        try {
                const res = await global.callStorePost('PRAXISMP','MPS249',params);
                const data = res.data;
                let msg = data.lstVals.OU_RESP || '';
                this.notifier.info(msg);
            } catch (e) {
                this.notifier.alert('Error on load');
            }finally {
                this.view.setLoading(false);
                Ext.getCmp(prototype.id + '-dataGrid').getStore().load();
            }
    },
    downloadGrid: async function(){
        this.view.setLoading(true);
        const filter = Ext.getCmp(prototype.id + '-formFilters').getValues();
        let data = await global.callStorePagginExcel('PRAXISMP','MPS248',filter);
        let excel = data.map(x=>({
            'Cod.':x.CODREC,
            'Society':x.SOCIETY,
            'Country':x.PAIS,
            'Profit Center':x.CEBE,
            'Cost Center':x.CECO,
            'Account':x.CUENTA
        }));
        global.writeExcelFromJson(excel,'Cost Center Catalog');
        this.view.setLoading(false);
    }
});
