Ext.define('Ext.Praxis.store.program.QueryFlight.GridDataDetQtySummary', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.program.QueryFlight.GridDataDetQtySummary',
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
