 prototype.id = 'NumberingRangesADM';
        prototype.url = CONTEXTPATH+'/NumberingRangesADM';
        prototype.widthContenedor = 1200; 
Ext.define('Ext.Praxis.view.salesaudit.NumberingRangesADMForm.NumberingRangesADMForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.NumberingRangesADMForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.NumberingRangesADM.NumberingRangesADMController',
        'Ext.Praxis.view.salesaudit.NumberingRangesADMForm.Options',
        'Ext.Praxis.view.salesaudit.NumberingRangesADMForm.Filters',
        'Ext.Praxis.view.salesaudit.NumberingRangesADMForm.Info'
    ],
    controller: 'NumberingRangesADMController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    listeners: {
        beforeShow: 'OnBeforeShow'
    },
    items: [
        {
            id: prototype.id+'-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id+'-form',
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
                                    id: prototype.id+'-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1200,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id+'-options'
                                        },
                                        {
                                            xtype: prototype.id+'-filters',
                                            id: prototype.id+'-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 710,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-centerC-panel01',
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
                                                            xtype: prototype.id+'-info',
                                                            id: prototype.id+'-contentInfo'
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



