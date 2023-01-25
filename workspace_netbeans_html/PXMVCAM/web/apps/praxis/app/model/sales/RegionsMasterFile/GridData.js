Ext.define('Ext.Praxis.model.sales.RegionsMasterFile.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pos', type: 'string'},
        {name: 'A128TIPO', type: 'string'},
        {name: 'A128AREGIO', type: 'string'},
        {name: 'NOMREGION', type: 'string'},
        {name: 'A128PAIS', type: 'string'},
        {name: 'NOMPAIS', type: 'string'},
        {name: 'A128CIUDAD', type: 'string'},
        {name: 'NOMCIUDAD', type: 'string'}
    ]
});