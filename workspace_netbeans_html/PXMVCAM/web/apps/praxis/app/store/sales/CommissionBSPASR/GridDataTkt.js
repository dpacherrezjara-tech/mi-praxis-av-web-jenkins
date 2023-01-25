Ext.define('Ext.Praxis.store.sales.CommissionBSPASR.GridDataTkt', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.sales.CommissionBSPASR.GridDataTkt',
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
