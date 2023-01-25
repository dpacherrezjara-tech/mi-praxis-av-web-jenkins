Ext.define('Ext.Praxis.store.sales.RegionsMasterFile.SearchBy', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["1", "Type"],
        ["2", "Country"]
    ],
    fields: ['code', 'name']
});