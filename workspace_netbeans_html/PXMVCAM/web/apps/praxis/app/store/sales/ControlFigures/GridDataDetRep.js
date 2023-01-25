Ext.define('Ext.Praxis.store.sales.ControlFigures.GridDataDetRep', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.sales.ControlFigures.GridDataDetRep',
    autoLoad: true,
    pageSize: 20,
//    config: {
////        proxy and domain properties
//        model: 'Ext.Praxis.model.sales.ControlFigures.GridDataDetRep',
//        autoLoad: true,
//        pageSize: 20,
//        groupField: 'A1720NATUR_00',
//        proxy: {
//            type: 'ajax',
//            actionMethods: {
//                read: 'POST'
//            },
//            timeout: 60000000,
//            reader: {
//                keepRawData: true,
//                type: 'json',
//                rootProperty: 'data',
//                totalProperty: 'total'
//            }
//        }
//    },
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
