
prototype.widthContenedor = 1000;   //1200;   
prototype.widthGrid = '100%';

Ext.define('Ext.Praxis.view.gerencial.GdsAnalysisForm.GdsAnalysisForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.GdsAnalysisForm',
    requires: [
        'Ext.Praxis.controller.gerencial.GdsAnalysis.GdsAnalysisController',
        'Ext.Praxis.view.gerencial.GdsAnalysisForm.Options',
        'Ext.Praxis.view.gerencial.GdsAnalysisForm.Filters'
    ],
    controller: 'GdsAnalysisController',
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
                                            //height: 530,
                                            height: 390,                                            
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