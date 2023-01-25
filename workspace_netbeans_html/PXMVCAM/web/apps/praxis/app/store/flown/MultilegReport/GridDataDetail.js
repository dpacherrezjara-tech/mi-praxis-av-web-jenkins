Ext.define('Ext.Praxis.store.flown.MultilegReport.GridDataDetail', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.flown.MultilegReport.GridDataDetail',
    autoLoad:true,
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
