prototype.id = 'ValidationInterfacesForm';
prototype.url = CONTEXTPATH + '/ValidationInterfaces';

Ext.define('Ext.Praxis.view.interline.ValidationInterfacesForm.ValidationInterfacesForm', {
    id: prototype.id,
    url: prototype.url,
    extend: 'Ext.panel.Panel',
    alias: 'widget.ValidationInterfacesForm',
    requires: [
        'Ext.Praxis.view.interline.ValidationInterfacesForm.Filters',
        'Ext.Praxis.view.interline.ValidationInterfacesForm.Options',
        'Ext.Praxis.view.interline.ValidationInterfacesForm.Info',
        'Ext.Praxis.controller.interline.ValidationInterfaces.ValidationInterfacesController'
    ],
    controller: 'ValidationInterfacesController',
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