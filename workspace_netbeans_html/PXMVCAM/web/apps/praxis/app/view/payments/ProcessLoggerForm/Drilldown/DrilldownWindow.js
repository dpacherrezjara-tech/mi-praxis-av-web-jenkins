/**
 * DrilldownWindow
 * ---------------
 * Ventana modal de navegación por niveles para un registro del Log de Procesos.
 *
 *   Nivel 2 → NivelDetalleProceso  (SPMDP00019)
 *   Nivel 3 → NivelLineasDetalle   (SPMDP00020)
 *
 * Uso:
 *   Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.DrilldownWindow', {
 *       parentRecord: record   // Ext.data.Model de SPMDP00018
 *   }).show();
 *
 * Config:
 *   parentRecord {Ext.data.Model}  Fila del grid principal (SPMDP00018)
 */
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.DrilldownWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.DrilldownWindow',

    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.DrilldownController',
        'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.NivelDetalleProceso',
        'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.NivelLineasDetalle',
        'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.ActualizarCodigosWindow',
        'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.EditDescbpoWindow'
    ],

    controller: 'DrilldownController',

    width: 1200,
    height: 650,
    modal: true,
    draggable: true,
    layout: 'border',
    border: false,

    /** @cfg {Ext.data.Model} parentRecord Registro del Log principal (SPMDP00018) */
    parentRecord: null,

    items: [
        {
            region: 'north',
            xtype: 'toolbar',
            itemId: 'breadcrumbBar',
            border: false,
            height: 30,
            style: 'background-color:#E3EAF9;border-bottom:1px solid #c0cef5;',
            items: []
        },
        {
            region: 'center',
            xtype: 'panel',
            itemId: 'contentArea',
            layout: 'fit',
            border: false
        }
    ],

    listeners: {
        afterrender: 'onWindowAfterRender'
    }
});
