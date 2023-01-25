

prototype.id = 'PaymentNotificationReportForm';
prototype.url = CONTEXTPATH + '/PaymentNotificationReport';

Ext.define('Ext.Praxis.view.sales.PaymentNotificationReportForm.PaymentNotificationReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PaymentNotificationReportForm',
    requires: [
        'Ext.Praxis.view.sales.PaymentNotificationReportForm.Options',
        'Ext.Praxis.view.sales.PaymentNotificationReportForm.Filters',
        'Ext.Praxis.view.sales.PaymentNotificationReportForm.Info',
        'Ext.Praxis.controller.sales.PaymentNotificationReport.PaymentNotificationReportController'
    ],
    controller: 'PaymentNotificationReportController',
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
                                        width: 1500,
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
                                            //height: 590,
                                            height: 560,
                                            //width: 1400,
                                            //width: '100%',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    //width: 1400,
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
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



