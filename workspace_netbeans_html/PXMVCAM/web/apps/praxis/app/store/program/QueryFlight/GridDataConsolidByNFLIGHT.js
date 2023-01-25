Ext.define('Ext.Praxis.store.program.QueryFlight.GridDataConsolidByNFLIGHT', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.program.QueryFlight.GridDataConsolidByNFLIGHT',
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
