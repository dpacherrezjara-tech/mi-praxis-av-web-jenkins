prototype.id = 'DisputeManagementForm';
prototype.url = CONTEXTPATH+'/DisputeManagement';
prototype.widthContenedor = 1200;

Ext.define('Ext.Praxis.view.salesaudit.DisputeManagementForm.DisputeManagementForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.DisputeManagementForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.DisputeManagement.DisputeManagementController',
        'Ext.Praxis.view.salesaudit.DisputeManagementForm.Options',
//        'Ext.Praxis.view.salesaudit.DisputeManagementForm.Filters',
//        'Ext.Praxis.view.salesaudit.DisputeManagementForm.Info'
    ],
    controller: 'DisputeManagementController',
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
//                                        ,
//                                        {
//                                            xtype: 'panel',
//                                            height: 580,
//                                            layout: 'fit',
//                                            items: [
//                                                {
//                                                    xtype: 'panel',
//                                                    layout: 'border',
//                                                    align: 'center',
//                                                    border: true,
//                                                    defaults: {
//                                                        border: true
//                                                    },
//                                                    items: [
//                                                        {
//                                                            region: 'center',
//                                                            xtype: prototype.id + '-info',
//                                                            id: prototype.id + '-contentInfo'
//                                                        }
//                                                    ]
//                                                }
//                                            ]
//                                        }
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