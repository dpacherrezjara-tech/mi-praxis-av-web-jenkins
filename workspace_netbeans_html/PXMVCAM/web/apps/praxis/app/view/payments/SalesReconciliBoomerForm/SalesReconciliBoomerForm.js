
prototype.id = 'SalesReconciliBoomerForm';
prototype.url = CONTEXTPATH + '/SalesReconciliBoomer';

Ext.define('Ext.Praxis.view.payments.SalesReconciliBoomerForm.SalesReconciliBoomerForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SalesReconciliBoomerForm',
    requires: [
        'Ext.Praxis.view.payments.SalesReconciliBoomerForm.Options',
        'Ext.Praxis.view.payments.SalesReconciliBoomerForm.Filters',
        'Ext.Praxis.view.payments.SalesReconciliBoomerForm.Info',
        'Ext.Praxis.controller.payments.SalesReconciliBoomer.SalesReconciliBoomerController'
    ],
    controller: 'SalesReconciliBoomerController',
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
//                    defaults: {
//                        border: false,
//                        autoScroll: true
//                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 980,
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
                                        width: 1550,
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
                                            height: 700,
                                            width: 1550,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1550,
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: false
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




