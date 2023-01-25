


Ext.define('Ext.Praxis.view.flown.ZoneMasterFileForm.ZoneMasterFileForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ZoneMasterFileForm',
    requires: [
          'Ext.Praxis.controller.flown.ZoneMasterFile.ZoneMasterFileController',
          'Ext.Praxis.view.flown.ZoneMasterFileForm.Options',
          'Ext.Praxis.view.flown.ZoneMasterFileForm.Filters',
          'Ext.Praxis.view.flown.ZoneMasterFileForm.Info'
    ],
    controller: 'ZoneMasterFileController',
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
            id: 'vZoneMasterFile-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: 'vZoneMasterFile-form',
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
                                    id: 'vZoneMasterFile-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1300,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'flown-zone-master-file-options'
                                        },
                                        {
                                            xtype: 'flown-zone-master-file-filters',
                                            id: 'vZoneMasterFile-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 580,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: 'vZoneMasterFile-centerC-panel01',
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
                                                            xtype: 'flown-zone-master-file-info'
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


