prototype.id = 'SalesAgentControlForm';
prototype.url = CONTEXTPATH + '/SalesAgentControl';

Ext.define('Ext.Praxis.view.payments.SalesAgentControlForm.SalesAgentControlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SalesAgentControlForm',
    requires: [
        'Ext.Praxis.view.payments.SalesAgentControlForm.Options',
        'Ext.Praxis.view.payments.SalesAgentControlForm.Filters',
        'Ext.Praxis.view.payments.SalesAgentControlForm.Info',
        'Ext.Praxis.controller.payments.SalesAgentControl.SalesAgentControlController'
    ],
    controller: 'SalesAgentControlController',
    layout: {type: 'fit'},
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
                                        width: 1800,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options',
                                            style:'margin-top:20px'
                                        }
                                        ,{
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter',
                                            hidden: false
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 600,
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