Ext.define('Ext.Praxis.store.gerencial.GdsAudit.GridData63', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.gerencial.GdsAudit.GridData63',   
    autoLoad: true,
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
