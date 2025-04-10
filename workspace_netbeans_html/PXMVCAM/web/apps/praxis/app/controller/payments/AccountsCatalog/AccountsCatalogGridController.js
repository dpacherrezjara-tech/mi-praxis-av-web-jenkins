Ext.define('Ext.Praxis.controller.payments.AccountsCatalog.AccountsCatalogGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountsCatalogGridController',
    store: [],
    init: function (view) {
    },
    afterRender: async function () {
        this.getData();
    },
    onUpdateRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        global.cleanPXobj(record.data);
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountsCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            searchParams: global.maintenanceObj(record.data),
            option: 'U',
            reloadGrid: () => {
                me.store.load();
            }
        });
        dataEntry.show();
    },
    getData: async function () {
        const me = this;
        let store = global.callStorePaggin('PRAXISMP', 'SPNAC001', me.view.searchParams);
        me.view.setStore(store);
        me.store = store;
    },
    downloadExcel: async function () {
        const me = this;
        me.view.setLoading(true);
        let lst = await global.callStorePagginExcel('PRAXISMP', 'SPNAC001', me.view.searchParams);
        let lstJson = lst.map(x => {
            global.cleanPXobj(x);
            let obj = {
                'Key': x.CODCTB,
                'Code': x.CODIGO,
                'Memo Line': x.MEMOLINE,
                'Description': x.DESCR,
                'Type': x.TIPO,
                'Process': x.BANCO,
                'Initial Date': x.FINICI,
                'Expiration Date': x.FVENCE
            };
            return obj;
        });
        await global.writeExcelFromJson(lstJson,'Accounts Catalog');
        me.view.setLoading(false);

    }

});