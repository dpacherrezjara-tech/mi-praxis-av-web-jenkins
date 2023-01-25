    Ext.define('Ext.Praxis.store.interline.PMI.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.interline.PMI.GridData',
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
