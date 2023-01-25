// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'CouponsWithoutValueForm';
prototype.url = CONTEXTPATH+'/CouponsWithoutValue';
prototype.widthContenedor = 1200;
prototype.widthGrid = 1170;
// </editor-fold>

Ext.define('Ext.Praxis.view.flown.CouponsWithoutValueForm.CouponsWithoutValueForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CouponsWithoutValueForm',
    requires: [
        'Ext.Praxis.controller.flown.CouponsWithoutValue.CouponsWithoutValueController',
        'Ext.Praxis.view.flown.CouponsWithoutValueForm.Options',
        'Ext.Praxis.view.flown.CouponsWithoutValueForm.Filters',
        'Ext.Praxis.view.flown.CouponsWithoutValueForm.Info'
    ],
    controller: 'CouponsWithoutValueController',
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
//                          width: 900,
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
//                                        {
//                                            xtype: prototype.id + '-prorrateo',
//                                            hidden: true
//                                        }
//                                        ,
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
                                            height: 600,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background-color: white;',
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