
prototype.id = 'ReportsForm';
prototype.url = CONTEXTPATH + '/Reports';

Ext.define('Ext.Praxis.view.payments.ReportsForm.ReportsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ReportsForm',
    requires: [
        'Ext.Praxis.view.payments.ReportsForm.Options',
        'Ext.Praxis.view.payments.ReportsForm.Filters',
        'Ext.Praxis.view.payments.ReportsForm.Info',
        'Ext.Praxis.controller.payments.Reports.ReportsController'
    ],
    controller: 'ReportsController',
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
                                        width: 2630,
                                        align: 'center'
                                    },
                                    items: [
                                       {
                                            xtype:prototype.id + '-options',
                                            style:'margin-top:20px'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 620,
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




