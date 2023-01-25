

prototype.id = 'InvoiceCommissionFOBForm';
prototype.idLoadFileFOB = 'LoadFileSubiArchivoFOB';
prototype.idLoadErrorFileFOB = 'LoadErrorFileSubiArchivoFOB';
prototype.url = CONTEXTPATH + '/InvoiceCommissionFOB';

Ext.define('Ext.Praxis.view.sales.InvoiceCommissionFOBForm.InvoiceCommissionFOBForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.InvoiceCommissionFOBForm',
    requires: [
        'Ext.Praxis.view.sales.InvoiceCommissionFOBForm.Options',
        'Ext.Praxis.view.sales.InvoiceCommissionFOBForm.Filters',
        'Ext.Praxis.view.sales.InvoiceCommissionFOBForm.Info',
        'Ext.Praxis.view.sales.InvoiceCommissionFOBForm.LoadFile',
        'Ext.Praxis.view.sales.InvoiceCommissionFOBForm.LoadErrorFile',
        'Ext.Praxis.controller.sales.InvoiceCommissionFOB.InvoiceCommissionFOBController'
    ],
    controller: 'InvoiceCommissionFOBController',
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
                                        width: 1290,
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
                                            //height: 590,
                                            height: 560,
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



