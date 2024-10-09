prototype.id = 'ExtBankReconciliationForm';
prototype.url = CONTEXTPATH + '/BankReconciliationExt';
prototype.width = 1850;
prototype.height = 730;
fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.ExtBankReconciliationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ExtBankReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.ExteriorBankReconciliation.ExteriorBankReconciliationController',
        'Ext.Praxis.view.payments.ExtBankReconciliationForm.Options',
        'Ext.Praxis.view.payments.ExtBankReconciliationForm.FiltersByBank',
        'Ext.Praxis.view.payments.ExtBankReconciliationForm.FiltersBySettlement',
        'Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.BankDetailGrid',
        'Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.SettlementDetailGrid',
        'Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.TaxDetailGrid',
        'Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.HeaderDetailGrid'
    ],
    controller: 'ExteriorBankReconciliationController',
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
                                        //<editor-fold defaultstate="collapsed" desc="Bank">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-viewBank',
                                            height: prototype.height,
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-bankFilters',
                                                    id: prototype.id + '-panelBankFilters'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-bankContent',
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
                                        //<editor-fold defaultstate="collapsed" desc="Settlement">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-viewSettlement',
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
                                                    xtype: prototype.id + '-settlFilters'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-settlContent',
                                                    height: prototype.height,
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAF9;',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    }
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




