// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'ISIDECControlForm';
prototype.url = CONTEXTPATH+'/ISIDECControl';
prototype.widthContenedor = 1800;
prototype.widthGrid = 1772;
prototype.widthGrid2 = 560;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.ISIDECControlForm.ISIDECControlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ISIDECControlForm',
    requires: [
        'Ext.Praxis.controller.interline.ISIDECControl.ISIDECControlController',
        'Ext.Praxis.view.interline.ISIDECControlForm.Options',
        'Ext.Praxis.view.interline.ISIDECControlForm.Filters',
        'Ext.Praxis.view.interline.ISIDECControlForm.Info'
    ],
    controller: 'ISIDECControlController',
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
                                            height: 605,
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