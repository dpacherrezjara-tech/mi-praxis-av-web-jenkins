// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'DeliveryFileBSPForm';
prototype.url = CONTEXTPATH+'/DeliveryFileBSP';
prototype.widthContenedor = 1000;
// </editor-fold>

Ext.define('Ext.Praxis.view.sales.DeliveryFileBSPForm.DeliveryFileBSPForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.DeliveryFileBSPForm',
    requires: [
        'Ext.Praxis.controller.sales.DeliveryFileBSP.DeliveryFileBSPController',
        'Ext.Praxis.view.sales.DeliveryFileBSPForm.Options',
        'Ext.Praxis.view.sales.DeliveryFileBSPForm.Filters',
        'Ext.Praxis.view.sales.DeliveryFileBSPForm.Info'
    ],
    controller: 'DeliveryFileBSPController',
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
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 610,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
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