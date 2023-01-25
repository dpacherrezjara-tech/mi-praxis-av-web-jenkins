Ext.define('Ext.Praxis.store.program.MasterTicket.GridDataTkt', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.program.MasterTicket.GridDataTkt',
    autoDestroy: true,
    autoLoad:true,
//    pageSize: 20,
    data: [],
    proxy: {
        type: 'memory'
//        actionMethods: {
//            read: 'POST'
//        },
//        timeout: 60000000,
//        reader: {
//            keepRawData: true,
//            type: 'json',
//            rootProperty: 'data',
//            totalProperty: 'total'
//        }
    }
});
