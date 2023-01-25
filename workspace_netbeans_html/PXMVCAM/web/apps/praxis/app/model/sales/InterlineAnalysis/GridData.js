Ext.define('Ext.Praxis.model.sales.InterlineAnalysis.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'MES', type: 'string'},
        {name: 'QTY_ON', type: 'int'},
        {name: 'FARE_ON', type: 'float'},
        {name: 'QTY_OFF', type: 'int'},
        {name: 'FARE_OFF', type: 'float'},
        {name: 'VAL_EST_OFF', type: 'float'},
        {name: 'DIFF', type: 'float'},
        {name: 'QTY_ON_ALL', type: 'int'},
        {name: 'KM_ON_ALL', type: 'int'},
        {name: 'FARE_ON_ALL', type: 'float'},
        {name: 'QTY_OFF_ALL', type: 'int'},
        {name: 'KM_OFF_ALL', type: 'int'},
        {name: 'FARE_OFF_ALL', type: 'float'},
        {name: 'KM_ON', type: 'int'},
        {name: 'KM_OFF', type: 'int'}
    ]
});