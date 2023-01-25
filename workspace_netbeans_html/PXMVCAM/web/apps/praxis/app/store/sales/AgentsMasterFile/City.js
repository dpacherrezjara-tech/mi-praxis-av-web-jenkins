
Ext.define('Ext.Praxis.store.sales.AgentsMasterFile.City', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: true,
    fields: [
        {name: 'A1007CTATO', type: 'string'},
        {name: 'A1007NOMBR', type: 'string'},
        {name: 'A1007CIUD', type: 'string'},
        {name: 'A1007NOMCD', type: 'string'},
        {name: 'A1007PAIS', type: 'string'}
    ],
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        timeout: 60000000,
//        reader: {
//            keepRawData: true,
//            type: 'json',
//            root: 'data'
//        }
    }
});
