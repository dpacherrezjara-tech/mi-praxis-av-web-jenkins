// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'IvaForm';
prototype.url = CONTEXTPATH+'/Iva';
prototype.widthContenedor = 1200;
// </editor-fold>

Ext.define('Ext.Praxis.view.salesaudit.IvaForm.IvaForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.IvaForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.Iva.IvaController',
        'Ext.Praxis.view.salesaudit.IvaForm.Options',
        'Ext.Praxis.view.salesaudit.IvaForm.Filters',
        'Ext.Praxis.view.salesaudit.IvaForm.Info'
    ],
    controller: 'IvaController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
     listeners: {
        beforeShow: 'OnBeforeShow'
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
                                            height: 580,
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