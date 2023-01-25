
prototype.widthContenedor = 1350;
prototype.widthGrid = '100%';
prototype.widthGrid2 = '100%';
prototype.idInfInteract = 'DataEntryInfInteract';
//prototype.widthContenedor = 1860;
//prototype.widthGrid = 1819;
//prototype.widthGrid2 = 1828;

Ext.define('Ext.Praxis.view.sales.ConciliationASRForm.ConciliationASRForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ConciliationASRForm',
    requires: [
        'Ext.Praxis.controller.sales.ConciliationASR.ConciliationASRController',
        'Ext.Praxis.view.sales.ConciliationASRForm.Options',
        'Ext.Praxis.view.sales.ConciliationASRForm.Filters',
        'Ext.Praxis.view.sales.ConciliationASRForm.Info',
        'Ext.Praxis.view.sales.LoadReportForm.DataEntryInfInteract'
    ],
    controller: 'ConciliationASRController',
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
                                            //height: 757,
                                            height: 560,
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