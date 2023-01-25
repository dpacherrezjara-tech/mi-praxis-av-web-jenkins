// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'ConsortiumCommissionsForm';
prototype.url = CONTEXTPATH+'/ConsortiumCommissions';
prototype.widthContenedor = 1300;
prototype.widthGrid = 863;
// </editor-fold>

Ext.define('Ext.Praxis.view.sales.ConsortiumCommissionsForm.ConsortiumCommissionsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ConsortiumCommissionsForm',
    requires: [
        'Ext.Praxis.controller.sales.ConsortiumCommissions.ConsortiumCommissionsController',
//        'Ext.Praxis.view.sales.ConsortiumCommissionsForm.Options',
        'Ext.Praxis.view.sales.ConsortiumCommissionsForm.Filters',
//        'Ext.Praxis.view.sales.ConsortiumCommissionsForm.Info'
    ],
    controller: 'ConsortiumCommissionsController',
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
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
//                                        {
//                                            xtype: prototype.id + '-options'
//                                        }
//                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter',
                                            margin: '27 0 0 0'
                                        }
//                                        ,
//                                        {
//                                            xtype: 'panel',
//                                            height: 610,
//                                            layout: 'fit',
//                                            items: [
//                                                {
//                                                    xtype: 'panel',
//                                                    id: prototype.id + '-centerC-panel01',
//                                                    layout: 'border',
//                                                    align: 'center',
//                                                    border: true,
//                                                    defaults: {
//                                                        border: true
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