// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'PaxRejectionsForm';
prototype.url = CONTEXTPATH+'/PaxRejections';
prototype.widthContenedor = 1500;
prototype.widthGrid = 1457;
prototype.widthGrid2 = 1290;
prototype.widthGrid3 = 1410;
prototype.widthGrid4 = 970;
prototype.widthGrid5 = 1200;
prototype.widthGrid6 = 900;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.PaxRejectionsForm.PaxRejectionsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PaxRejectionsForm',
    requires: [
        'Ext.Praxis.controller.interline.PaxRejections.PaxRejectionsController',
        'Ext.Praxis.view.interline.PaxRejectionsForm.Options',
        'Ext.Praxis.view.interline.PaxRejectionsForm.Filters',
        'Ext.Praxis.view.interline.PaxRejectionsForm.Info'
    ],
    controller: 'PaxRejectionsController',
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
                                            height: 740,
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