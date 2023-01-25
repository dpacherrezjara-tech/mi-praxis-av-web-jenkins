// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'SPAProfitabilityForm';
prototype.url = CONTEXTPATH+'/SPAProfitability';
prototype.widthContenedor = 1500;
prototype.widthContenedor2 = 1096;
prototype.widthGrid = 1470;
prototype.widthGrid2 = 1440;
prototype.widthGrid3 = 1430;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.SPAProfitabilityForm.SPAProfitabilityForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SPAProfitabilityForm',
    requires: [
        'Ext.Praxis.controller.interline.SPAProfitability.SPAProfitabilityController',
        'Ext.Praxis.view.interline.SPAProfitabilityForm.Options',
        'Ext.Praxis.view.interline.SPAProfitabilityForm.Filters',
        'Ext.Praxis.view.interline.SPAProfitabilityForm.Info',
        'Ext.Praxis.view.interline.SPAProfitabilityForm.Prorrateo'
    ],
    controller: 'SPAProfitabilityController',
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
//                                    hidden: true,
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
                                },
                                {
                                    region: 'center',
                                    hidden: true,
                                    id: prototype.id + '-centerC2',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor2,
                                        height: 980,
                                        border: false
                                    },
                                    items: [
                                        {
                                            region: 'center',
                                            xtype: prototype.id + '-prorrateo'
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