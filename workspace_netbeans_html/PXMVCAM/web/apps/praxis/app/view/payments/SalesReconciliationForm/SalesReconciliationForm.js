Ext.define('Ext.Praxis.view.payments.SalesReconciliationForm.SalesReconciliationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SalesReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliation.SalesReconciliationController',
        'Ext.Praxis.view.payments.SalesReconciliationForm.Options',
        'Ext.Praxis.view.payments.SalesReconciliationForm.Filters',
        'Ext.Praxis.view.payments.SalesReconciliationForm.Filters_IBT',
        'Ext.Praxis.view.payments.SalesReconciliationForm.Info'
    ],
    controller: 'SalesReconciliationController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id+'-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id+'-form',
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
                                    id: prototype.id+'-centerC',
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
                                            xtype: prototype.id+'-options'
                                        },
                                        {
                                            xtype: prototype.id+'-filters',
                                            id: prototype.id+'-contentFilter'
                                        },
                                        {
                                            xtype: prototype.id+'-filters_IBT',
                                            id: prototype.id+'-contentFilter_IBT',
                                            hidden: true
                                            
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 720,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-centerC-panel01',
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
                                                            xtype: prototype.id+'-info',
                                                            id: prototype.id+'-contentInfo'
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



