
/*
 * @deprecated Colocado en la misma vista (27/03/2018)
 */
Ext.define('Ext.Praxis.store.sales.CityMasterFile.SearchBy', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["CODECIU", "City Code"],
        ["NAME", "City Name"],
        ["CODEAERO", "Airport Code"],
        ["CODEPAIS", "Country Code"]
    ],
    fields: ['code', 'name']
});