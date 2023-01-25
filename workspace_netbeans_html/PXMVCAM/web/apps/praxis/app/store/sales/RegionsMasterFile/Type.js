Ext.define('Ext.Praxis.store.sales.RegionsMasterFile.Type', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["", "(All)"],
        ["A", "Area"],
        ["R", "Region"],
        ["W", "World"]
    ],
    fields: ['code', 'name']
});