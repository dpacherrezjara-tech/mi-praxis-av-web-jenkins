prototype.id = 'CostCenterCatalogForm';
prototype.width = 1900;
prototype.height = 630;
fechaActual = new Date(),mesActual = fechaActual.getMonth(),anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.CostCenterCatalogForm.CostCenterCatalogForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CostCenterCatalogForm',
    requires: [
        'Ext.Praxis.controller.payments.CostCenterCatalog.CostCenterCatalogController',
        'Ext.Praxis.view.payments.CostCenterCatalogForm.Options',
        'Ext.Praxis.view.payments.CostCenterCatalogForm.Filters',
        'Ext.Praxis.view.payments.CostCenterCatalogForm.Info'
    ],
    controller: 'CostCenterCatalogController',
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
                                            border: false,
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
                                            },
                                            items:[
                                                {
                                                    xtype: prototype.id + '-Info',
                                                    id: prototype.id + '-dataGrid'
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




