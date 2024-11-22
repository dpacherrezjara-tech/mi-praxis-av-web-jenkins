
prototype.id = 'BalanceAnalysisByAgeForm';
prototype.url = CONTEXTPATH + '/BalanceAnalysisByAge';

Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.BalanceAnalysisByAgeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BalanceAnalysisByAgeForm',
    requires: [
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Options',
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters',
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters_1',
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Info',
        'Ext.Praxis.controller.payments.BalanceAnalysisByAge.BalanceAnalysisByAgeController'
    ],
    controller: 'BalanceAnalysisByAgeController',
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
                                        width: 1800,
                                        align: 'center'
                                    },
                                    items: [
                                        {xtype: prototype.id + '-options'},
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: prototype.id + '-filters2',
                                            id: prototype.id + '-contentFilter2',hidden: true
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 1100,
                                            width: 1800,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1800,
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




