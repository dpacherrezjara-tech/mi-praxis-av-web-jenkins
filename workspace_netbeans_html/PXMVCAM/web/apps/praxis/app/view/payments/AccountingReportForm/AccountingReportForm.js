prototype.id = 'AccountingReportForm';
prototype.url = CONTEXTPATH + '/AccountingReport';
prototype.width = 1900;
prototype.height = 630;
fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.AccountingReportForm.AccountingReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AccountingReportForm',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.AccountingReportController',
        'Ext.Praxis.view.payments.AccountingReportForm.Options',
        'Ext.Praxis.view.payments.AccountingReportForm.FiltersDetail',
        'Ext.Praxis.view.payments.AccountingReportForm.FiltersSummary',
        'Ext.Praxis.view.payments.AccountingReportForm.Grids.BandocsGrid',
        'Ext.Praxis.view.payments.AccountingReportForm.Grids.SettlementsGrid',
        'Ext.Praxis.view.payments.AccountingReportForm.Grids.TaxesGrid'
    ],
    controller: 'AccountingReportController',
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
                                                    xtype: 'combobox',
                                                    labelStyle: 'font-weight:bold;',
                                                    fieldLabel: 'Search By',
                                                    id: prototype.id + '-cmbType',
                                                    store: Ext.create('Ext.data.SimpleStore', {
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ['S', 'Summary'],
                                                            ['D', 'Detail']
                                                        ]
                                                    }),
                                                    fieldStyle:'text-align:center;',
                                                    labelWidth: 80,
                                                    width: 190,
                                                    padding: 5,
                                                    margin:'12 0 0 12',
                                                    displayField: 'name',
                                                    valueField: 'code',
                                                    queryMode: 'local',
                                                    editable: false,
                                                    value: 'S',
                                                    listeners:{
                                                        change:'onChangeReport'
                                                    }
                                                },
                                                {
                                                    xtype: prototype.id + '-filtersDetail',
                                                    id: prototype.id + '-fdetail',
                                                    hidden:true
                                                },
                                                {
                                                    xtype: prototype.id + '-filtersSummary',
                                                    id: prototype.id + '-fsummary'
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




