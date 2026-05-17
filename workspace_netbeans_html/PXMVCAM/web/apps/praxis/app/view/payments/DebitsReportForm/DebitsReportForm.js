prototype.id = 'DebitsReportForm';
prototype.url = CONTEXTPATH + '/DebitsReport';

Ext.define('Ext.Praxis.view.payments.DebitsReportForm.DebitsReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.DebitsReportForm',
    requires: [
        'Ext.Praxis.view.payments.DebitsReportForm.Options',
        'Ext.Praxis.view.payments.DebitsReportForm.Filters',
        'Ext.Praxis.view.payments.DebitsReportForm.Info',
        'Ext.Praxis.controller.payments.DebitsReport.DebitsReportController'
    ],
    controller: 'DebitsReportController',
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
                            width: 1500,
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
                                        width: 1500,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options',
                                            style:'margin-top:10px'
                                        }
                                        ,{
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter',
                                            hidden: false
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 630,
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