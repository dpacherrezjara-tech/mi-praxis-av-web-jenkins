// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'RevenueByOperationForm';
prototype.url = CONTEXTPATH+'/RevenueByOperation';
prototype.widthContenedor = 1630;
prototype.widthGrid = 1620;
prototype.widthGridByZone = 900;
prototype.widthGridByCityPair = 900;
prototype.widthGridByNPlane = 900;
// </editor-fold>

Ext.define('Ext.Praxis.view.flown.RevenueByOperationForm.RevenueByOperationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.RevenueByOperationForm',
    requires: [
        'Ext.Praxis.controller.flown.RevenueByOperation.RevenueByOperationController',
        'Ext.Praxis.view.flown.RevenueByOperationForm.Options',
        'Ext.Praxis.view.flown.RevenueByOperationForm.Filters',
        'Ext.Praxis.view.flown.RevenueByOperationForm.Info'
    ],
    controller: 'RevenueByOperationController',
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
                                            height: 600,
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