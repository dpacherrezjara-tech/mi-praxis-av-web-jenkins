Ext.define('Ext.Praxis.store.program.MasterTicket.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.program.MasterTicket.GridData',
    autoLoad:true,
    pageSize: 3,
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
