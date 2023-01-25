Ext.define('Ext.Praxis.model.sales.BPOProduction.GridData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'FECHA_PROC', type: 'string'},
        {name: 'FUENTE', type: 'string'},
        {name: 'QTY_GROUP', type: 'string'},
        {name: 'QTY_DOCUM', type: 'string'},
        {name: 'QTY_SALE', type: 'string'},
        {name: 'QTY_EXCH', type: 'string'},
        {name: 'QTY_RFND', type: 'string'},
        {name: 'QTY_MEMO', type: 'string'},
        {name: 'QTY_ERR_IC', type: 'string'},
        {name: 'QTY_OK_IC', type: 'string'},
        
        {name: 'QTY_TOT_ER_SP', type: 'string'},
        {name: 'QTY_ERR_SP', type: 'string'},
        {name: 'QTY_OK_SP', type: 'string'},
        
        {name: 'QTY_GRUP_CER', type: 'string'},
        {name: 'QTY_GRUP_ABI', type: 'string'},
        {name: 'QTY_CONT', type: 'string'}
    ]
});