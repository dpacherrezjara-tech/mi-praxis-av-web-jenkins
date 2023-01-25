Ext.define('Ext.Praxis.store.screens.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.screens.GridData',
    autoLoad:true,
    pageSize: 15,
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
