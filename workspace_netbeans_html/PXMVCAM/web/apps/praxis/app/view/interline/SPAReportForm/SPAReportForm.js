// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'SPAReportForm';
prototype.url = CONTEXTPATH+'/SPAReport';
prototype.widthContenedor = 1380;
prototype.widthGrid = 1292;
prototype.widthGrid2 = 970;
prototype.widthGrid3 = 1200;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.SPAReportForm.SPAReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SPAReportForm',
    requires: [
        'Ext.Praxis.controller.interline.SPAReport.SPAReportController',
        'Ext.Praxis.view.interline.SPAReportForm.Options',
        'Ext.Praxis.view.interline.SPAReportForm.Filters',
        'Ext.Praxis.view.interline.SPAReportForm.Info',
        'Ext.Praxis.view.interline.SPAReportForm.Prorrate'
    ],
    controller: 'SPAReportController',
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
                                            height: 600,
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
                                },
                                {
                                    xtype: prototype.id + '-prorrate',
                                    id: prototype.id + '-ScreenProrrate',
                                    hidden:true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});