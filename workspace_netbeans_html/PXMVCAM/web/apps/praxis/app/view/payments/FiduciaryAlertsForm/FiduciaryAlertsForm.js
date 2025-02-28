prototype.id = 'FiduciaryAlertsForm';
prototype.url = CONTEXTPATH + '/FiduciaryAlerts';

Ext.define('Ext.Praxis.view.payments.FiduciaryAlertsForm.FiduciaryAlertsForm', {
    id: prototype.id,
    url: prototype.url,
    extend: 'Ext.panel.Panel',
    alias: 'widget.FiduciaryAlertsForm',
    requires: [
        'Ext.Praxis.view.payments.FiduciaryAlertsForm.Filters',
        'Ext.Praxis.view.payments.FiduciaryAlertsForm.Options',
        'Ext.Praxis.view.payments.FiduciaryAlertsForm.Info',
        'Ext.Praxis.controller.payments.FiduciaryAlerts.FiduciaryAlertsController'
    ],
    controller: 'FiduciaryAlertsController',
    layout: {type: 'fit'},
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
                    id: prototype.id +'-form',
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
                            id: prototype.id + '-panelPrincipal',
                            hidden: false,
                            width: 1000,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id +'-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1800,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype:prototype.id + '-options'
                                        },
                                        {
                                            xtype:prototype.id+ '-filters',
                                            id: prototype.id+'-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 680,
                                            layout: 'fit',
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