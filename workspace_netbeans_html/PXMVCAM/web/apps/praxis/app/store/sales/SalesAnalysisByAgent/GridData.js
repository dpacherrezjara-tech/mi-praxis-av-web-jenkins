Ext.define('Ext.Praxis.store.sales.SalesAnalysisByAgent.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.sales.SalesAnalysisByAgent.GridData',
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