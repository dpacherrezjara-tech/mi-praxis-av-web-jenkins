Ext.define('Ext.Praxis.store.sales.AgentsMasterFile.Country', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: true,
    fields: [
        {name: 'A006NOMBRE', type: 'string'},
        {name: 'A006NOMBRE', type: 'string'}

    ],
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        timeout: 60000000
//        reader: {
//            keepRawData: true,
//            type: 'json',
//            root: 'data'
//        }
    }
});

