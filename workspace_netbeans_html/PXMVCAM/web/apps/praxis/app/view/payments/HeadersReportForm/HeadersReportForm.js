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
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid',
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.DayPilotPanel',
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.SequencesGrid'
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
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-panelFilters'
                                        },
                                        //<editor-fold defaultstate="collapsed" desc="Header">
                                        //xtype: prototype.id + '-HeadersGrid',                                   
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-viewHeaders',
                                            height: prototype.height,
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
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
                                        //xtype: prototype.id + '-SequencesGrid',
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
                                        //<editor-fold defaultstate="collapsed" desc="DayPilot">
                                        //id: prototype.id + '-dayPilotCmp',
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-viewDayPilot',
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
                                                    xtype: 'daypilotpanel',
                                                    id: prototype.id + '-dayPilotCmp',
                                                    height: prototype.height,
                                                }
                                            ]
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



