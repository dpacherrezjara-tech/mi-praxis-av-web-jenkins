prototype.id = 'TAXMerchantCatalogForm';
prototype.url = CONTEXTPATH + '/TAXMerchantCatalog';
prototype.width = 1900;
prototype.height = 630;
fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.TAXMerchantCatalogForm.TAXMerchantCatalogForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.TAXMerchantCatalogForm',
    requires: [
        'Ext.Praxis.controller.payments.TAXMerchantCatalog.TAXMerchantCatalogController',
        'Ext.Praxis.view.payments.TAXMerchantCatalogForm.Options',
        'Ext.Praxis.view.payments.TAXMerchantCatalogForm.Filters',
        'Ext.Praxis.view.payments.TAXMerchantCatalogForm.Grids.TAXMerchantCatalogGrid'
    ],
    controller: 'TAXMerchantCatalogController',
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




