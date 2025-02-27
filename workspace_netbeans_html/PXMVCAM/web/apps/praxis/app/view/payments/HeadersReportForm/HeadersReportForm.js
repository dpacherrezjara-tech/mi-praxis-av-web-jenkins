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
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.DayPilotPanel'
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
                                            id: prototype.id + '-contentFilter',
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout:{
                                                type:'hbox',
                                                pack:'left'
                                            },
                                            border: true,
                                            defaults: {
                                                width: prototype.width,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-filters'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-mainContent',
                                            height: prototype.height,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            }
                                        },
                                        {
                                            xtype: 'daypilotpanel',
                                            id: prototype.id + '-dayPilotCmp',
                                            height: prototype.height,
                                            hidden:true
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




