
prototype.widthContenedor = 1350;   
prototype.widthGrid = '100%';       
//Para usar el mismo Java Packages
prototype.url = '/AEROMEXICO/SalesAnalysisByAgent';  
//console.log( '__' + prototype.id );

Ext.define('Ext.Praxis.view.sales.InterlineAnalysisForm.InterlineAnalysisForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.InterlineAnalysisForm',
    requires: [
        'Ext.Praxis.controller.sales.InterlineAnalysis.InterlineAnalysisController',
        'Ext.Praxis.view.sales.InterlineAnalysisForm.Options',
        'Ext.Praxis.view.sales.InterlineAnalysisForm.Filters'
    ],
    controller: 'InterlineAnalysisController',
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
                                            xtype: prototype.id + '-options',                                            
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
                                                    bodyStyle: 'background: transparent',
                                                    listeners: {
                                                        afterrender: 'onGridLoad'
                                                    }
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