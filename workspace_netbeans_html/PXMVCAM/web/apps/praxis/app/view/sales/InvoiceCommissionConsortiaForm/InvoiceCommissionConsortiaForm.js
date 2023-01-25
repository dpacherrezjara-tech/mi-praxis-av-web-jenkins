

prototype.id = 'InvoiceCommissionConsortiaForm';
prototype.idLoadFileConsortia = 'LoadFileSubiArchivoConsortia';
prototype.idLoadErrorFileConsortia = 'LoadErrorFileSubiArchivoConsortia';
prototype.url = CONTEXTPATH + '/InvoiceCommissionConsortia';

Ext.define('Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.InvoiceCommissionConsortiaForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.InvoiceCommissionConsortiaForm',
    requires: [
        'Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.Options',
        'Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.Filters',
        'Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.Info',
        'Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.LoadFile',
        'Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.LoadErrorFile',
        'Ext.Praxis.controller.sales.InvoiceCommissionConsortia.InvoiceCommissionConsortiaController'
    ],
    controller: 'InvoiceCommissionConsortiaController',
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
                                        //width: 1850,
                                        width: 1300,
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
                                            height: 570,
                                            // width: 1950,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: false
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



