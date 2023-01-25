
prototype.id = 'FrequentFlyerForm';
prototype.url = CONTEXTPATH + '/FrequentFlyer';

Ext.define('Ext.Praxis.view.interline.FrequentFlyerForm.FrequentFlyerForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FrequentFlyerForm',
    requires: [
        'Ext.Praxis.view.interline.FrequentFlyerForm.Options',
        'Ext.Praxis.view.interline.FrequentFlyerForm.Filters',
        'Ext.Praxis.view.interline.FrequentFlyerForm.Info',
        'Ext.Praxis.controller.interline.FrequentFlyer.FrequentFlyerController'
    ],
    controller: 'FrequentFlyerController',
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
                                        width: 1680,
                                        align: 'center',
                                        margin: ' 0 0 0 10px'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options',
                                            width: 1450
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 900,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 900,
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



