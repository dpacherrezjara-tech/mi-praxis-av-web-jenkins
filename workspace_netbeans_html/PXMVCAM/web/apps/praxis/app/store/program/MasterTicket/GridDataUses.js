Ext.define('Ext.Praxis.store.program.MasterTicket.GridDataUses', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.program.MasterTicket.GridDataUses',
    autoDestroy: true,
    data: [],
    config: {
        sorters: [
            {
                property: 'TKTIND',
                direction: 'ASC'
            },
            {
                property: 'CPN',
                direction: 'ASC'
            },
            {
                property: 'STAT',
                direction: 'DESC'
            }
        ]
    },
    proxy: {
        type: 'memory'
    }
});