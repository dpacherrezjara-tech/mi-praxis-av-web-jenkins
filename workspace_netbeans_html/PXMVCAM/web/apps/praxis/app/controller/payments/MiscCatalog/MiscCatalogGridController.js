Ext.define('Ext.Praxis.controller.payments.MiscCatalog.MiscCatalogGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MiscCatalogGridController',
    url: CONTEXTPATH + '/MiscellaneousCatalog',
    request: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
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
        const dataEntry = Ext.create('Ext.Praxis.view.payments.MiscCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            searchParams: global.maintenanceObj(record.data),
            option:'U',
            reloadGrid: ()=>{
                me.getData();
            }
        });
        dataEntry.show();
    },
    onCloneRec: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        global.cleanPXobj(record.data);
        const dataEntry = Ext.create('Ext.Praxis.view.payments.MiscCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            cloneObj: record.data,
            option:'C',
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
            const res = await me.request.get('loadMiscCatalog',{params:me.view.searchParams});
            me.view.setStore(new Ext.data.Store({
                data: res.data.response
            }));
        } catch (e) {
            global.Msg({msg:'No Data'});
        } finally {
            me.view.setLoading(false);
        }
    }
    
});