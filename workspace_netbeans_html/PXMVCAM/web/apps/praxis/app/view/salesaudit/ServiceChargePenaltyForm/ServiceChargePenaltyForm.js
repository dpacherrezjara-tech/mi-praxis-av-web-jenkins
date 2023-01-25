
prototype.id = 'ServiceChargePenaltyForm';
prototype.url = CONTEXTPATH + '/ServiceChargePenalty';

Ext.define('Ext.Praxis.view.salesaudit.ServiceChargePenaltyForm.ServiceChargePenaltyForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ServiceChargePenaltyForm',
    requires: [
        'Ext.Praxis.view.salesaudit.ServiceChargePenaltyForm.Options',
        'Ext.Praxis.view.salesaudit.ServiceChargePenaltyForm.Filters',
        'Ext.Praxis.view.salesaudit.ServiceChargePenaltyForm.Info',
        'Ext.Praxis.controller.salesaudit.ServiceChargePenalty.ServiceChargePenaltyController'
    ],
    controller: 'ServiceChargePenaltyController',
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
                                        width: 1100,
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
                                            height: 680,
                                            //width: 1400,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1100,
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



