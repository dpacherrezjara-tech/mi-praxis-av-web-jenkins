Ext.define('Ext.Praxis.store.program.QueryFlight.GridDataDetTktSummVal', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.program.QueryFlight.GridDataDetTktSummVal',
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
