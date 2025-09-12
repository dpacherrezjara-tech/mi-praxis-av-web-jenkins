
prototype.id = 'UserMaintenanceForm';
prototype.url = CONTEXTPATH + '/UserMaintenance';
//Ext.Praxis.controller.payments.UserMaintenance.UserMaintenanceController
Ext.define('Ext.Praxis.view.payments.UserMaintenanceForm.UserMaintenanceForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.UserMaintenanceForm',
    requires: [
        'Ext.Praxis.view.payments.UserMaintenanceForm.Options',
        'Ext.Praxis.view.payments.UserMaintenanceForm.Filters',
        'Ext.Praxis.view.payments.UserMaintenanceForm.Info',
        'Ext.Praxis.controller.payments.UserMaintenance.UserMaintenanceController'
    ],
     controller: 'UserMaintenanceController',
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
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 1300,
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
                                        width: 1250,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 600,
                                            width: 1250,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1250,
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




