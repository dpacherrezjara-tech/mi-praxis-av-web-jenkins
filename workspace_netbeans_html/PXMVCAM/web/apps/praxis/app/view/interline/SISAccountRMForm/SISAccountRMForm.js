// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'SISAccountRMForm';
prototype.url = CONTEXTPATH+'/SISAccountRM';
prototype.widthContenedor = 1380;
prototype.widthGrid = 1292;
prototype.widthGrid2 = 790;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.SISAccountRMForm.SISAccountRMForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SISAccountRMForm',
    requires: [
        'Ext.Praxis.controller.interline.SISAccountRM.SISAccountRMController',
        'Ext.Praxis.view.interline.SISAccountRMForm.Options',
        'Ext.Praxis.view.interline.SISAccountRMForm.Filters',
        'Ext.Praxis.view.interline.SISAccountRMForm.Info'
    ],
    controller: 'SISAccountRMController',
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
                                            height: 652,
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