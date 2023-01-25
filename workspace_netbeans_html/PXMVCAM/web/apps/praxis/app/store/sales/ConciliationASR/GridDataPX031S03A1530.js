Ext.define('Ext.Praxis.store.sales.ConciliationASR.GridDataPX031S03A1530', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.sales.ConciliationASR.GridDataPX031S03A1530',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        timeout: 60000000,
        reader: {
            keepRawData: true,
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
