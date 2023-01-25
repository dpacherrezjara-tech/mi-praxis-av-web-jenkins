Ext.define('Ext.Praxis.store.sales.DeterminationOfCommission.GridDataInc', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.sales.DeterminationOfCommission.GridDataInc',
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
