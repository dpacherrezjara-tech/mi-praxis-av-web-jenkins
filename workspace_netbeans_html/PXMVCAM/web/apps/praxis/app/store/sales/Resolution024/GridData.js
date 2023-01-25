

Ext.define('Ext.Praxis.store.sales.Resolution024.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.sales.Resolution024.GridData',
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
