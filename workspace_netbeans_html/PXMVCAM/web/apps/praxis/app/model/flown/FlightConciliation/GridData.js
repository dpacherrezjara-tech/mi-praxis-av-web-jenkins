Ext.define('Ext.Praxis.model.flown.FlightConciliation.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'strFormatDate' , type: 'string'},
        {name :'lngQSSIM' , type: 'string'},
        {name :'lngQODS' , type: 'string'},
        {name :'lngQVCR' , type: 'string'},
        {name :'lngQPRO' , type: 'string'},
        {name :'lngQCLO' , type: 'string'},
        {name :'lngQACC' , type: 'string'},
        {name :'lngQSVOPRO' , type: 'string'},
        {name :'lngQSVOPEND' , type: 'string'},
        {name :'lngQSVVPRO' , type: 'string'},
        {name :'lngQSVVPEND' , type: 'string'},
        {name :'lngQFFLOW' , type: 'string'},
        {name :'lngQPHY' , type: 'string'}
    ]
});