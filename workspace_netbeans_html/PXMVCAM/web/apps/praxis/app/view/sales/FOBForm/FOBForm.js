

prototype.id = 'FOBForm';
prototype.url = CONTEXTPATH + '/FOB';

Ext.define('Ext.Praxis.view.sales.FOBForm.FOBForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FOBForm',
    requires: [
        'Ext.Praxis.view.sales.FOBForm.Options',
        'Ext.Praxis.view.sales.FOBForm.Filters',
        'Ext.Praxis.view.sales.FOBForm.Info',
        'Ext.Praxis.controller.sales.FOB.FOBController'
    ],
    controller: 'FOBController',
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
                                        //width: 1700,
                                        width: 1500,
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
                                            //height: 590,                                            
                                            height: 560,                                            
                                            layout: 'fit',
                                            items: [
                                                {
                                                    region: 'center',
                                                    xtype: prototype.id + '-info',
                                                    id: prototype.id + '-contentInfo'
                                                }
//                                                {
//                                                    xtype: 'panel',
//                                                    id: prototype.id + '-centerC-panel01',
//                                                    layout: 'border',
//                                                    align: 'center',
//                                                    border: true,
//                                                    defaults: {
//                                                        border: false
//                                                    },
//                                                    bodyStyle: 'background-color: white;',
//                                                    items: [
//                                                        {
//                                                            region: 'center',
//                                                            xtype: prototype.id + '-info',
//                                                            id: prototype.id + '-contentInfo'
//                                                        }
//                                                    ]
//                                                }
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



