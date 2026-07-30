/**
 * NivelDetalleController
 * ----------------------
 * Controller de NivelDetalleProceso (Nivel 2 — SPMDP00019).
 *
 * Responsabilidades:
 *  - Carga paginada de registros de detalle del proceso
 *  - Habilita / deshabilita el botón "Actualizar Códigos" según selección
 *  - Abre ActualizarCodigosWindow con las filas seleccionadas
 *  - Delega a DrilldownController la navegación al Nivel 3
 */
Ext.define('Ext.Praxis.controller.payments.ProcessLogger.NivelDetalleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.NivelDetalleController',

    onAfterRender: function () {
        this.loadData();
    },

    loadData: function () {
        var me   = this;
        var view = me.getView();
        var grid = view.down('[itemId=detalleGrid]');
        if (!grid) return;

        var params = me._buildParams();
        var store  = global.callStorePaggin('PRAXISMP', 'MPS196', params);
        grid.setStore(store);

        var pager = view.down('[itemId=detalleGridPaging]');
        if (pager) pager.setStore(store);

        store.on('load', function () {
            if (!grid.isDestroyed) grid.updateLayout();
        });
    },

    _buildParams: function () {
        var view   = this.getView();
        var parent = view.parentRecord;
        var form   = view.down('[itemId=filterFormDetalle]');

        var cuuid = parent && parent.get ? parent.get('CUUID') : (parent ? parent['CUUID'] : '');
        var fuuid = parent && parent.get ? parent.get('FUUID') : (parent ? parent['FUUID'] : '');

        var params = {
            IN_CUUID: String(cuuid || '').trim(),
            IN_FUUID: String(fuuid || '').trim()
        };

        if (form) Ext.apply(params, form.getForm().getValues());

        return params;
    },

    onSearch: function () {
        this.loadData();
    },

    onFilterSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) this.onSearch();
    },

    onSelectionChange: function (sm, selected) {
        var view = this.getView();
        var btn  = view.down('[itemId=btnActualizarCodigos]');
        if (!btn) return;
        btn.setDisabled(selected.length === 0);
        btn.setText(selected.length > 0
            ? 'Actualizar Códigos (' + selected.length + ')'
            : 'Actualizar Códigos');
    },

    onActualizarCodigos: function () {
        var me       = this;
        var view     = me.getView();
        var grid     = view.down('[itemId=detalleGrid]');
        var selected = grid.getSelectionModel().getSelection();
        if (!selected || selected.length === 0) return;

        var win = Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.ActualizarCodigosWindow', {
            parentRecord:    view.parentRecord,
            selectedRecords: selected
        });
        win.on('success', function () {
            me.loadData();
            grid.getSelectionModel().deselectAll();
        });
        win.show();
    },

    onDrilldownRow: function (record) {
        var view     = this.getView();
        var drillWin = view.up('window');
        if (drillWin && Ext.isFunction(drillWin.getController)) {
            drillWin.getController().navigateToNivel3(record);
        }
    }
});
