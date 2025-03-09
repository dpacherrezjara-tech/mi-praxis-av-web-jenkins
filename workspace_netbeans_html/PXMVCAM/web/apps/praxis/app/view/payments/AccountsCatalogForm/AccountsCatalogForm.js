prototype.id = 'AccountsCatalogForm';
prototype.width = 1900;
prototype.height = 630;
fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.AccountsCatalogForm.AccountsCatalogForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AccountsCatalogForm',
    requires: [
        'Ext.Praxis.controller.payments.AccountsCatalog.AccountsCatalogController',
        'Ext.Praxis.view.payments.AccountsCatalogForm.Options',
        'Ext.Praxis.view.payments.AccountsCatalogForm.Filters',
        'Ext.Praxis.view.payments.AccountsCatalogForm.Grids.MainGrid'
    ],
    controller: 'AccountsCatalogController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: prototype.width,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.width,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            id: prototype.id + '-contentFilter',
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout:{
                                                type:'hbox',
                                                pack:'left'
                                            },
                                            border: true,
                                            defaults: {
                                                width: prototype.width,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-filters'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-mainContent',
                                            height: prototype.height,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            }
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




