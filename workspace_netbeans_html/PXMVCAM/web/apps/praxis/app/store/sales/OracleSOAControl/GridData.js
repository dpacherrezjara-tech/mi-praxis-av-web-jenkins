Ext.define('Ext.Praxis.store.sales.OracleSOAControl.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.sales.OracleSOAControl.GridData',
    autoLoad:true,
    pageSize: 999999,
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
