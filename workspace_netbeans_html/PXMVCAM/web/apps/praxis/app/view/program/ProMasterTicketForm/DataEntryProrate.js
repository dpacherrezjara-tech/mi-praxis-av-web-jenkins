Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryProrate', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryProrateProMasterTicketForm',
    controller: 'DataEntryProrateController',
    requires: [
        'Ext.Praxis.controller.program.ProMasterTicket.DataEntryProrateController'
    ],
    title: 'Prorate',
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: 1446,
            height: 740,
            items: [
                {
                    xtype: 'prorrate',
                    id: prototype.id + '-widget-prorrate'
                }
            ]
        }
    ]
});