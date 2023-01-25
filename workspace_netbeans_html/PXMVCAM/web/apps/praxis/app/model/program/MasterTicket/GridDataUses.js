Ext.define('Ext.Praxis.model.program.MasterTicket.GridDataUses', {
    extend: 'Ext.data.Model',
    fields: [
        { name :'TKTIND', type: 'string' },
        { name :'CPN'   , type: 'string' },
        { name :'ORI'   , type: 'string' },
        { name :'DES'   , type: 'string' },
        { name :'AL'    , type: 'string' },
        { name :'FLIGHT', type: 'string' },
        { name :'DATE'  , type: 'string' },
        { name :'STAT'  , type: 'string' },
        { name :'AMOUNT', type: 'string'},
        { name :'CRCY'  , type: 'string' },
        { name :'FARE'  , type: 'string' }
    ]
});