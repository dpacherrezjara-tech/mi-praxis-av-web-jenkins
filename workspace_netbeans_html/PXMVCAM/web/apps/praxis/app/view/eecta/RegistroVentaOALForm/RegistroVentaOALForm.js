prototype.widthContenedor = 1200;
prototype.widthGrid = '100%';
prototype.id01 = 'RegistroVentaOALCrud';

Ext.define('Ext.Praxis.view.eecta.RegistroVentaOALForm.RegistroVentaOALForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.RegistroVentaOALForm',
    requires: [
        'Ext.Praxis.controller.eecta.RegistroVentaOAL.RegistroVentaOALController',
        'Ext.Praxis.view.eecta.RegistroVentaOALForm.Options',
        'Ext.Praxis.view.eecta.RegistroVentaOALForm.Filters',
        'Ext.Praxis.view.eecta.RegistroVentaOALForm.Info00'
    ],
    controller: 'RegistroVentaOALController',
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
                                            height: 550,
                                            //border:true,
                                            layout: 'fit',
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="setGridData">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-contenedor-grid',
                                                    align: 'center',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'background: transparent',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            border: true,
                                                            width: '100%',
                                                            padding: '1 1 1 1',
                                                            layout: 'vbox',
                                                            items: [
                                                                {
                                                                    xtype: prototype.id + '-info00'
                                                                }
                                                            ]
                                                        }
                                                    ]
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