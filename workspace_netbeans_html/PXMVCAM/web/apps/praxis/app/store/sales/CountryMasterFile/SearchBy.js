/*
 * @deprecated Colocado en la misma vista (26/03/2018)
 */
Ext.define('Ext.Praxis.store.sales.CountryMasterFile.SearchBy', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["CU", "Currency"],
        ["CO", "Country"],
        ["NAME", "Country Name"]
    ],
    fields: ['code', 'name']
});