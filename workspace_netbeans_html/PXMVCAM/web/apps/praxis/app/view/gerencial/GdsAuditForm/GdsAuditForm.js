
prototype.widthContenedor = 1000;   //1200;   
prototype.widthGrid = '100%';
prototype.url = '/AEROMEXICO/GdsAnalysis';

Ext.define('Ext.Praxis.view.gerencial.GdsAuditForm.GdsAuditForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.GdsAuditForm',
    requires: [
        'Ext.Praxis.controller.gerencial.GdsAudit.GdsAuditController',
        'Ext.Praxis.view.gerencial.GdsAuditForm.Options',
        'Ext.Praxis.view.gerencial.GdsAuditForm.Filters'
    ],
    controller: 'GdsAuditController',
    id: prototype.id + '-ContenedorMain', //new
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
                                            height: 560,                                                                                     
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
//                                                    listeners: {
//                                                        afterrender: 'onGridLoad'
//                                                    }
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