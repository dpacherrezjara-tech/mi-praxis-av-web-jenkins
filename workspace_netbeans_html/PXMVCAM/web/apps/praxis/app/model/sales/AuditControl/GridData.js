    Ext.define('Ext.Praxis.model.sales.AuditControl.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'MODULE', type: 'string'},
        {name: 'SUB_MODULE', type: 'string'},
        {name: 'SEQ', type: 'string'},
        {name: 'PROC_DATE', type: 'string'},
        {name: 'DATE_CREATE', type: 'string'},
        {name: 'SATUS', type: 'string'},
        {name: 'STATUS_LABEL', type: 'string'},
        {name: 'TOTAL', type: 'string'},
        {name: 'USRIN', type: 'string'},
        {name: 'FECIN', type: 'string'},
        {name: 'USRAC', type: 'string'},
        {name: 'FECAC', type: 'string'},
    ]
});