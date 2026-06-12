prototype.id = 'HeadersReportForm';
prototype.url = CONTEXTPATH + '/HeadersReport';
prototype.width = 1900;
prototype.height = 630;
fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.HeadersReportForm.HeadersReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.HeadersReportForm',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.HeadersReportController',
        'Ext.Praxis.view.payments.HeadersReportForm.Options',
        'Ext.Praxis.view.payments.HeadersReportForm.Filters',
        'Ext.Praxis.view.payments.HeadersReportForm.FiltersIntegrator',
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.DayPilotPanel',
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid',
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.SequencesGrid',
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.HeaderIntegratorGrid',
        'Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.IntegratorDetailModal'
    ],
    controller: 'HeadersReportController',
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
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: prototype.width,
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
                                        width: prototype.width,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filtersReport',
                                            id: prototype.id + '-panelFilters'
                                        },
                                        {
                                        xtype: prototype.id + '-filtersIntegrator',
                                        id: prototype.id + '-filterIntegrator',
                                        hidden: true,
                                        },
                                        
                                        //<editor-fold defaultstate="collapsed" desc="Header">                                   
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-viewHeaders',
                                            height: prototype.height,
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
//                                              type: 'hbox',
//                                              pack: 'left'
//                                              },
//                                          border: true,
//                                          defaults: {
//                                              width: prototype.width,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-HeadersGrid',
                                                    height: prototype.height,
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAF9;',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    }
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        
                                        //<editor-fold defaultstate="collapsed" desc="Secuence">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-viewSecuence',
                                            hidden: true,
                                            border: false,
                                            height: prototype.height,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-SequencesGrid',
                                                    height: prototype.height,
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAF9;',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    }
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        
                                        //<editor-fold defaultstate="collapsed" desc="contentIntegrator">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-contentIntegrator',
                                            height: prototype.height,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            hidden: true
                                        },
                                        //</editor-fold>
                                        
                                        //<editor-fold defaultstate="collapsed" desc="DayPilot">
                                        {
                                            xtype: 'daypilotpanel',
                                            id: prototype.id + '-dayPilotCmp',
                                            height: prototype.height,
                                            hidden: true
                                        }
                                        //</editor-fold>
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



