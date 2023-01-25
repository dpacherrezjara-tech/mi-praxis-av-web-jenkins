// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'InvoicingDashboardForm';
prototype.url = CONTEXTPATH+'/InvoicingDashboard';
prototype.widthContenedor = 1350;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.InvoicingDashboardForm.InvoicingDashboardForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.InvoicingDashboardForm',
    requires: [
        'Ext.Praxis.controller.interline.InvoicingDashboard.InvoicingDashboardController',
        'Ext.Praxis.view.interline.InvoicingDashboardForm.Options',
        'Ext.Praxis.view.interline.InvoicingDashboardForm.Filters',
        'Ext.Praxis.view.interline.InvoicingDashboardForm.Info'
    ],
    controller: 'InvoicingDashboardController',
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
                                        width: prototype.widthContenedor,
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
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
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