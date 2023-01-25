// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'OracleAccountingReportForm';
prototype.url = CONTEXTPATH+'/OracleAccountingReport';
prototype.widthContenedor = 1020;
prototype.widthGrid = 1010;
prototype.widthGridDetail = 823;
// </editor-fold>

Ext.define('Ext.Praxis.view.sales.OracleAccountingReportForm.OracleAccountingReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.OracleAccountingReportForm',
    requires: [
        'Ext.Praxis.controller.sales.OracleAccountingReport.OracleAccountingReportController',
        'Ext.Praxis.view.sales.OracleAccountingReportForm.Options',
        'Ext.Praxis.view.sales.OracleAccountingReportForm.Filters',
        'Ext.Praxis.view.sales.OracleAccountingReportForm.Info'
    ],
    controller: 'OracleAccountingReportController',
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