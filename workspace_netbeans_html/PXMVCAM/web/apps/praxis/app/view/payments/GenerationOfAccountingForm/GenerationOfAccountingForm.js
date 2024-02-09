prototype.widthContenedor = 800;
prototype.widthGrid = '100%';
prototype.id = 'GenerationOfAccountingForm';
prototype.id01 = 'DataEntryDownload';
prototype.url = CONTEXTPATH + '/Accounting';

Ext.define('Ext.Praxis.view.payments.GenerationOfAccountingForm.GenerationOfAccountingForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.GenerationOfAccountingForm',
    requires: [
        'Ext.Praxis.view.payments.GenerationOfAccountingForm.Options',
        'Ext.Praxis.view.payments.GenerationOfAccountingForm.Filters',
        'Ext.Praxis.view.payments.GenerationOfAccountingForm.Info',
        'Ext.Praxis.controller.payments.GenerationOfAccounting.GenerationOfAccountingController'
    ],
    controller: 'GenerationOfAccountingController',
    id: prototype.id + '-ContenedorMain',
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
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panel-contenedor-grid',
                                            height: 520,
                                            layout: 'fit',
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="setGridData">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-contenedor-grid',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background: transparent'
                                                }
                                                // </editor-fold>                                                 
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




