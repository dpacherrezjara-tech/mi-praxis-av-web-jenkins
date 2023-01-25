Ext.define('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataGROUPIATA', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.sales.InputSchemeUpfront.GridDataGROUPIATA',
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
