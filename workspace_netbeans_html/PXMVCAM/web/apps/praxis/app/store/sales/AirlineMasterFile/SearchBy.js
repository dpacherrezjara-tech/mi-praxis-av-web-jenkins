
/*
 * @deprecated Colocado en la misma vista (26/03/2018)
 */
Ext.define('Ext.Praxis.store.sales.AirlineMasterFile.SearchBy', {
    extend: 'Ext.data.ArrayStore',
    autoLoad: false,
    data: [
        ["", "Select"],
        ["C", "Numeric Code"],
        ["A", "Code Alpha"],
        ["N", "Legal Name"]
    ],
    fields: ['code', 'name']
});