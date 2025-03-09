Ext.define('Ext.Praxis.controller.payments.AccountsCatalog.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainGridController',
    store: [],
    init: function (view) {
    },
    afterRender: async function () {
        this.getData();
    },
    onUpdateRec: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        global.cleanPXobj(record.data);
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountsCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            searchParams: global.maintenanceObj(record.data),
            option:'U',
            reloadGrid: ()=>{
                me.store.load();
            }
        });
        dataEntry.show();
    },
    getData: async function(){
        const me = this;
        let store = global.callStorePaggin('PRAXISMP','SPNAC001',me.view.searchParams);
        me.view.setStore(store);
        me.store = store;
    },
    downloadExcel: async function(){
        const me = this;
        console.log(XLSX);
        let data = await global.callStorePagginExcel('PRAXISMP','SPNAC001',me.view.searchParams);
        console.log(data);
        //const worksheet = XLSX.utils.json_to_sheet(rows);
    }
    
});