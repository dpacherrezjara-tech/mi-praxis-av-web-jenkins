Ext.define('Ext.Praxis.store.sales.AirlineMasterFile.A005INDCOM', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["", "Select"],
        ["S", "Yes"],
        ["N", "Not"]
    ],
    fields: ['code', 'name']
});