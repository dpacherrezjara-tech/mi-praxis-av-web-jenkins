
prototype.id = 'AtlUsageNoSale';
prototype.url = CONTEXTPATH + '/AtlUsageNoSale';
prototype.widthContenedor = 1300; //Contendor principal
prototype.heightContenedor = 540; //Contenedor grid
prototype.heightGridData = 500;   //Alto grid

Ext.define('Ext.Praxis.view.tnu.AtlUsageNoSale.AtlUsageNoSale', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AtlUsageNoSale',
    requires: [
        'Ext.Praxis.view.tnu.AtlUsageNoSale.Options',
        'Ext.Praxis.view.tnu.AtlUsageNoSale.Filters',
        'Ext.Praxis.view.tnu.AtlUsageNoSale.GridData',
        'Ext.Praxis.controller.tnu.AtlUsageNoSale.AtlUsageNoSaleController'
    ],
    controller: 'AtlUsageNoSaleController',
    layout: {
        type: 'fit'
    },
    padding: '0 0 0 0',
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
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'left'
                                    },
                                    items: [
                                        {
                                            id: prototype.id + '-contenedor-options',
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            id: prototype.id + '-contenedor-filters',
                                            xtype: prototype.id + '-filters'
                                        },
                                        {
                                            id: prototype.id + '-contenedor-gridData',
                                            xtype: prototype.id + '-gridData',
                                            height: prototype.heightContenedor
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



