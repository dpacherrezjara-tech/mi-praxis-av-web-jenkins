
prototype.id = 'BalanceAnalysisByAgeForm';
prototype.url = CONTEXTPATH + '/BalanceAnalysisByAge';

Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.BalanceAnalysisByAgeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BalanceAnalysisByAgeForm',
    requires: [
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Options',
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters',
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters_1',
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters_2',
        'Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Info',
        'Ext.Praxis.controller.payments.BalanceAnalysisByAge.BalanceAnalysisByAgeController'
    ],
    controller: 'BalanceAnalysisByAgeController',
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
                            width: 1000,
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
                                        width: 1880,
                                        align: 'center'
                                    },
                                    items: [
                                        {xtype: prototype.id + '-options',
                                        style:'margin-top:20px'
                                    },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: prototype.id + '-filters2',
                                            id: prototype.id + '-contentFilter2',hidden: true
                                        },
                                        {
                                            xtype: prototype.id + '-filters3',
                                            id: prototype.id + '-contentFilter3',hidden: true
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 1100,
                                            layout: 'fit', 
                                            id: prototype.id + '-panelHeight',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        border: false
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




