Ext.define('Ext.Praxis.store.gerencial.GdsAnalysis.GridData4', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.gerencial.GdsAnalysis.GridData4',   
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
