/**
 * NivelLineasDetalleController
 * ----------------------------
 * Controller de NivelLineasDetalle (Nivel 3 — SPMDP00020).
 *
 * Responsabilidades:
 *  - Carga de líneas de error (sin paginación, dataset pequeño)
 *  - Aplicar un mensaje a TODOS los registros del grupo (SPMDP00021, CODVAL vacío)
 *  - Abrir EditDescbpoWindow para editar el DESCBPO de una línea individual
 */
Ext.define('Ext.Praxis.controller.payments.ProcessLogger.NivelLineasDetalleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.NivelLineasDetalleController',

    onAfterRender: function () {
        this.loadData();
    },

    loadData: function () {
        var me   = this;
        var view = me.getView();
        var grid = view.down('[itemId=lineasGrid]');
        if (!grid) return;

        var row    = view.parentRecord;
        var params = {
            IN_PROCESO: String(row.get ? row.get('PROCESO') : (row['PROCESO'] || '')).trim(),
            IN_BANDOC:  String(row.get ? row.get('BANDOC')  : (row['BANDOC']  || '')).trim(),
            IN_DATECI:  String(row.get ? row.get('DATECI')  : (row['DATECI']  || '')).trim(),
            IN_TRANCI:  String(row.get ? row.get('TRANCI')  : (row['TRANCI']  || '')).trim(),
            IN_TIPOVAL: String(row.get ? row.get('TIPOVAL') : (row['TIPOVAL'] || '')).trim()
        };

        grid.setLoading(true);

        global.callStoreGet('PRAXISMP', 'MPS197', params)
            .then(function (res) {
                if (grid.isDestroyed) return;
                var lst   = ((res.lstRs || []).at ? res.lstRs.at(0) : res.lstRs[0]) || [];
                var store = new Ext.data.Store({ data: lst });
                grid.setStore(store);
                grid.updateLayout();
            })
            .catch(function () {
                new AWN().alert('Error al cargar líneas de detalle');
            })
            .finally(function () {
                if (!grid.isDestroyed) grid.setLoading(false);
            });
    },

    onAplicarTodosClick: function () {
        var me    = this;
        var view  = me.getView();
        var field = view.down('[itemId=bulkMsgField]');
        var msg   = field ? field.getValue().trim() : '';

        if (!msg) {
            new AWN().alert('Ingrese un mensaje para aplicar a todos los registros');
            return;
        }

        var notif = new AWN();
        notif.confirm(
            '¿Aplicar este mensaje a <strong>todos</strong> los registros del grupo?',
            function () { me._doBulkApply(msg, field); },
            null
        );
    },

    _doBulkApply: async function (msg, field) {
        var me   = this;
        var view = me.getView();
        var row  = view.parentRecord;
        var btn  = view.down('[itemId=btnAplicarTodos]');

        var params = {
            IN_PROCESO: String(row.get ? row.get('PROCESO') : (row['PROCESO'] || '')).trim(),
            IN_BANDOC:  String(row.get ? row.get('BANDOC')  : (row['BANDOC']  || '')).trim(),
            IN_DATECI:  String(row.get ? row.get('DATECI')  : (row['DATECI']  || '')).trim(),
            IN_TRANCI:  String(row.get ? row.get('TRANCI')  : (row['TRANCI']  || '')).trim(),
            IN_TIPOVAL: String(row.get ? row.get('TIPOVAL') : (row['TIPOVAL'] || '')).trim(),
            IN_MESSAGE: msg,
            IN_CODVAL:  ''
        };

        if (btn) btn.setDisabled(true);

        try {
            await global.callStoreGet('PRAXISMP', 'MPS198', params);
            new AWN().success('Mensaje aplicado a todos los registros');
            if (field && !field.isDestroyed) field.setValue('');
            me.loadData();
        } catch (e) {
            new AWN().alert('Error al aplicar: ' + (e.message || 'Error desconocido'));
        } finally {
            if (btn && !btn.isDestroyed) btn.setDisabled(false);
        }
    },

    onEditDescbpo: function (record) {
        var me   = this;
        var view = me.getView();

        var win = Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.EditDescbpoWindow', {
            parentRow:      record,
            codval:         String(record.get ? record.get('CODVAL') : (record['CODVAL'] || '')).trim(),
            descbpoInicial: String(record.get ? record.get('DESCBPO') : (record['DESCBPO'] || '')).trim()
        });
        win.on('success', function () { me.loadData(); });
        win.show();
    }
});
