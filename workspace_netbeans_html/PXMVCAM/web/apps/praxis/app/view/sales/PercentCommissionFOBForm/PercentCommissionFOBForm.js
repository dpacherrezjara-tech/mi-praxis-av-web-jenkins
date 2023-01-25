prototype.id = 'PercentCommissionFOBForm';
prototype.url = CONTEXTPATH + '/PercentCommissionFOB';

Ext.define('Ext.Praxis.view.sales.PercentCommissionFOBForm.PercentCommissionFOBForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PercentCommissionFOBForm',
    requires: [
        'Ext.Praxis.view.sales.PercentCommissionFOBForm.Options',
        'Ext.Praxis.view.sales.PercentCommissionFOBForm.Options2',
        'Ext.Praxis.view.sales.PercentCommissionFOBForm.Filters',
        'Ext.Praxis.view.sales.PercentCommissionFOBForm.Filters2',
        'Ext.Praxis.view.sales.PercentCommissionFOBForm.Info',
        'Ext.Praxis.view.sales.PercentCommissionFOBForm.Info2',
        'Ext.Praxis.controller.sales.PercentCommissionFOB.PercentCommissionFOBController'
    ],
    controller: 'PercentCommissionFOBController',
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
                                        //width: 1850,
                                        width: 1500,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'tabpanel',
                                            id: prototype.id + '-tabPanel',
                                            width: '100%',
                                            //height: 700,
                                            height: 655,
                                            anchor: '100%',
                                            autoScroll: true,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E3EAF9',
                                                    id: prototype.id + 'panel1',
                                                    title: 'General Rules',
                                                    layout: 'vbox',
                                                    defaults: {
                                                        //width: 1840,
                                                        width: '100%',
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: prototype.id + '-options',                                                            
                                                            id: prototype.id + '-contentOptions'
                                                        },
                                                        {
                                                            xtype: prototype.id + '-filters',
                                                            id: prototype.id + '-contentFilter'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            //height: 650,
                                                            height: 630,
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-centerC-panel01',
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
                                                },
                                                
                                                /*tab 2
                                                 * */
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E3EAF9',
                                                    id: prototype.id + 'panel2',
                                                    title: 'Exception',
                                                    layout: 'vbox',
                                                    defaults: {
                                                        //width: 1840,
                                                        width:'100%',
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: prototype.id + '-options2',
                                                            id: prototype.id + '-contentOptions2'
                                                        },
                                                        {
                                                            xtype: prototype.id + '-filters2',
                                                            id: prototype.id + '-contentFilter2'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            height: 650,
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-centerC-panel02',
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
                                                                            xtype: prototype.id + '-info2',
                                                                            id: prototype.id + '-contentInfo2'
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
                }
            ]
        }
    ]
});



