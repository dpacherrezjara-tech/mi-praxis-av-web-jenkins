Ext.define('Ext.Praxis.model.flown.MultilegReport.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'strFormatDate' , type: 'string'},
        {name :'NFLIGHT' , type: 'string'},
        {name :'strDescripcion' , type: 'string'},
        {name :'PAX' , type: 'string'},
        {name :'AMTMXN' , type: 'string'},
        {name :'AMTUSD' , type: 'string'}
    ]
});