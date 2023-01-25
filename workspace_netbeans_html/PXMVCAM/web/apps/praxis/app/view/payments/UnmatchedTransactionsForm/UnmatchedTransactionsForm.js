
prototype.id = 'UnmatchedTransactionsForm';
prototype.url = CONTEXTPATH + '/UnmatchedTransactions';

Ext.define('Ext.Praxis.view.payments.UnmatchedTransactionsForm.UnmatchedTransactionsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.UnmatchedTransactionsForm',
    requires: [
        'Ext.Praxis.view.payments.UnmatchedTransactionsForm.Options',
        'Ext.Praxis.view.payments.UnmatchedTransactionsForm.Filters',
        'Ext.Praxis.view.payments.UnmatchedTransactionsForm.Info',
        'Ext.Praxis.controller.payments.UnmatchedTransactions.UnmatchedTransactionsController'
    ],
    controller: 'UnmatchedTransactionsController',
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
                                        width: 1400,
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
                                            height: 600,
                                            width: 1400,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1400,
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




