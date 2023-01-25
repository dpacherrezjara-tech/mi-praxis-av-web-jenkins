// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'DeterminationOfCommissionForm';
prototype.url = CONTEXTPATH+'/DeterminationOfCommission';
prototype.widthContenedor = 1825;
prototype.widthGrid = 1790;
prototype.widthGrid2 = 1420;
prototype.widthGrid3 = 1800;
// </editor-fold>

Ext.define('Ext.Praxis.view.sales.DeterminationOfCommissionForm.DeterminationOfCommissionForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.DeterminationOfCommissionForm',
    requires: [
        'Ext.Praxis.controller.sales.DeterminationOfCommission.DeterminationOfCommissionController',
        'Ext.Praxis.view.sales.DeterminationOfCommissionForm.Options',
        'Ext.Praxis.view.sales.DeterminationOfCommissionForm.Filters',
        'Ext.Praxis.view.sales.DeterminationOfCommissionForm.Info'
    ],
    controller: 'DeterminationOfCommissionController',
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
                                            height: 620,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
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