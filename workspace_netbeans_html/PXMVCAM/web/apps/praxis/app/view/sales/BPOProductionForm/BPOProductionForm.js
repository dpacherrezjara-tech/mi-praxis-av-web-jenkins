// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'BPOProductionForm';
prototype.url = CONTEXTPATH+'/BPOProduction';
prototype.widthContenedor = 1514;
prototype.widthGrid = 1277;
// </editor-fold>

Ext.define('Ext.Praxis.view.sales.BPOProductionForm.BPOProductionForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BPOProductionForm',
    requires: [
        'Ext.Praxis.controller.sales.BPOProduction.BPOProductionController',
        'Ext.Praxis.view.sales.BPOProductionForm.Options',
        'Ext.Praxis.view.sales.BPOProductionForm.Filters',
        'Ext.Praxis.view.sales.BPOProductionForm.Info'
    ],
    controller: 'BPOProductionController',
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
                                        { xtype: 'tbspacer', height: 10},
                                        {
                                            xtype: 'panel',
                                            height: 700,
                                            layout: 'fit',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo',
                                                            border: false
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