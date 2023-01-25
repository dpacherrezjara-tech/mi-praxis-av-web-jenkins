// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'WorkProgressOALForm';
prototype.url = CONTEXTPATH+'/WorkProgressOAL';
prototype.widthContenedor = 1380;
prototype.widthGrid = 1292;
prototype.widthGrid2 = 790;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.WorkProgressOALForm.WorkProgressOALForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.WorkProgressOALForm',
    requires: [
        'Ext.Praxis.controller.interline.WorkProgressOAL.WorkProgressOALController',
        'Ext.Praxis.view.interline.WorkProgressOALForm.Options',
        'Ext.Praxis.view.interline.WorkProgressOALForm.Filters',
        'Ext.Praxis.view.interline.WorkProgressOALForm.Info'
    ],
    controller: 'WorkProgressOALController',
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