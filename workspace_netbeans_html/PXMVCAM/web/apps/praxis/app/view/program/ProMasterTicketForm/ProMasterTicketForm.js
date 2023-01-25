prototype.widthContenedor = 1770;
Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.ProMasterTicketForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ProMasterTicketForm',
    requires: [
        'Ext.Praxis.controller.program.ProMasterTicket.ProMasterTicketController',        
        'Ext.Praxis.view.program.ProMasterTicketForm.Options',
        'Ext.Praxis.view.program.ProMasterTicketForm.Filters',
        'Ext.Praxis.view.program.ProMasterTicketForm.Info'
    ],
    controller: 'ProMasterTicketController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id+'-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id+'-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id+'-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id+'-options'
                                        },
                                        {
                                            xtype: prototype.id+'-filters',
                                            id: prototype.id+'-contentFilter'
                                        },
                                        {
                                            xtype: prototype.id+'-info'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});