// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'HardBlockReportForm';
prototype.url = CONTEXTPATH+'/HardBlockReport';
prototype.widthContenedor = 1400;
prototype.widthGrid = 800;
prototype.widthGridDetail = 1160;
prototype.widthGridDetailNflight = 1120;
prototype.widthGridDetailTKT = 1370;
// </editor-fold>

Ext.define('Ext.Praxis.view.flown.HardBlockReportForm.HardBlockReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.HardBlockReportForm',
    requires: [
        'Ext.Praxis.controller.flown.HardBlockReport.HardBlockReportController',
        'Ext.Praxis.view.flown.HardBlockReportForm.Options',
        'Ext.Praxis.view.flown.HardBlockReportForm.Filters',
        'Ext.Praxis.view.flown.HardBlockReportForm.Info'
    ],
    controller: 'HardBlockReportController',
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
                                            height: 660,
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