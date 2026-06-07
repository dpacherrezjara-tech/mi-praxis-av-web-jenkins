/**
 * ProcessLoggerRowController
 * --------------------------
 * customController para el StoreProcGrid principal (SPMDP00018).
 * Maneja la acción 'drilldown' abriendo DrilldownWindow para registros F2/DB/FO.
 */
Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessLoggerRowController', {
    extend: 'Ext.Base',

    baseCtrl:   null,
    widgetView: null,

    onRowAction: function (action, record, rowIndex, grid) {
        if (action !== 'drilldown') return;

        var tipo = (record.get('TIPO') || '').trim();
        if (tipo !== 'F2' && tipo !== 'DB' && tipo !== 'FO') return;

        var winId    = 'DrilldownWindow-' + (record.get('CUUID') || rowIndex);
        var existing = Ext.getCmp(winId);
        if (existing) {
            existing.toFront();
            return;
        }

        Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.DrilldownWindow', {
            id:           winId,
            parentRecord: record
        }).show();
    },

    onWidgetReady: function (widgetView) {}
});
