
Ext.define('Ext.Praxis.store.eecta.AplPayment.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.eecta.AplPayment.GridData',   
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET'
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


