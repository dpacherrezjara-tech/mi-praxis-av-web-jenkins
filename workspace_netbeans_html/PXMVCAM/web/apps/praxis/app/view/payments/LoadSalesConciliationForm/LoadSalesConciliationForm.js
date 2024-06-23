
prototype.id = 'LoadSalesConciliationForm';
prototype.url = CONTEXTPATH + '/LoadSalesConciliation';

Ext.define('Ext.Praxis.view.payments.LoadSalesConciliationForm.LoadSalesConciliationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.LoadSalesConciliationForm',
    requires: [
        'Ext.Praxis.view.payments.LoadSalesConciliationForm.Options',
        'Ext.Praxis.view.payments.LoadSalesConciliationForm.Filters',
        'Ext.Praxis.view.payments.LoadSalesConciliationForm.Info',
        'Ext.Praxis.controller.payments.LoadSalesConciliation.LoadSalesConciliationController'
    ],
    controller: 'LoadSalesConciliationController',
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
//                    defaults: {
//                        border: false,
//                        autoScroll: true
//                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 750,
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
                                        width: 750,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter',
                                            hidden: true
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 340,
                                            width: 750,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 750,
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




