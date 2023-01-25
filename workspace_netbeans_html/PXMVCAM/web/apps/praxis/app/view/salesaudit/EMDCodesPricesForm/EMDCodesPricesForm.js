Ext.define('Ext.Praxis.view.salesaudit.EMDCodesPricesForm.EMDCodesPricesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EMDCodesPricesForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.EMDCodesPrices.EMDCodesPricesController',
        'Ext.Praxis.view.salesaudit.EMDCodesPricesForm.Options',
        'Ext.Praxis.view.salesaudit.EMDCodesPricesForm.Filters',
        'Ext.Praxis.view.salesaudit.EMDCodesPricesForm.Info'
    ],
    controller: 'EMDCodesPricesController',
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
                                        width: 1200,
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
                                            xtype: 'panel',
                                            height: 710,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id+'-info',
                                                            id: prototype.id+'-contentInfo'
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
                }
            ]
        }
    ]
});



