
prototype.id = 'BankReconciliationForm';
prototype.url = CONTEXTPATH + '/BankReconciliation';

Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.BankReconciliationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BankReconciliationForm',
    requires: [
        'Ext.Praxis.view.payments.BankReconciliationForm.Options',
        'Ext.Praxis.view.payments.BankReconciliationForm.Filters',
        'Ext.Praxis.view.payments.BankReconciliationForm.FiltersBT',
        'Ext.Praxis.view.payments.BankReconciliationForm.Info',
        'Ext.Praxis.controller.payments.BankReconciliation.BankReconciliationController'
    ],
    controller: 'BankReconciliationController',
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
                                        width: 1900,
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
                                        },
                                        {
                                            xtype:prototype.id+ '-filtersBT',
                                            region: 'center',
                                            id: prototype.id+'-contentFilterBT',
                                            hidden: true
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 630,
                                            width: 1900,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1900,
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




