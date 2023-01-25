
prototype.widthContenedor = 1350;
prototype.id = 'ConciliationDifferencesForm';
prototype.id01 = 'ConciliationDifferencesDetail';
prototype.id02 = 'ConciliationDifferencesGridASR';
prototype.url = CONTEXTPATH + '/ConciliationDifferences';

Ext.define('Ext.Praxis.view.sales.ConciliationDifferencesForm.ConciliationDifferencesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ConciliationDifferencesForm',
    requires: [
        'Ext.Praxis.view.sales.ConciliationDifferencesForm.Options',
        'Ext.Praxis.view.sales.ConciliationDifferencesForm.Filters',
        'Ext.Praxis.view.sales.ConciliationDifferencesForm.Info',
        'Ext.Praxis.view.sales.ConciliationDifferencesForm.Info01',        
        'Ext.Praxis.controller.sales.ConciliationDifferences.ConciliationDifferencesController'
    ],
    controller: 'ConciliationDifferencesController',
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
                                            height: 200,
                                            //height: 560,
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
                                        },
                                        {
                                            region: 'south',
                                            layout: 'border',
                                            height: 350,
                                            padding: '2 0 0 2',
                                            defaults: {
                                                bodyStyle: 'background: transparent;',
                                                border: false,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id01 + '-info',
                                                    id: prototype.id01 + '-contentInfo'
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