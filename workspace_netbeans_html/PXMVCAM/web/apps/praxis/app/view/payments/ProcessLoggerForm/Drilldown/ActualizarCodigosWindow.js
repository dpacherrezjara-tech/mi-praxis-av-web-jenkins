/**
 * ActualizarCodigosWindow
 * -----------------------
 * Ventana para actualizar masivamente el CODVAL y MENSAJE de las filas
 * seleccionadas en el Nivel 2 (NivelDetalleProceso).
 *
 * Llama al SP SPMDP00022 con un payload JSON de las filas seleccionadas.
 * Dispara el evento 'success' al guardar correctamente.
 *
 * Config:
 *   parentRecord    {Ext.data.Model}    Fila del log principal (SPMDP00018)
 *   selectedRecords {Ext.data.Model[]}  Filas seleccionadas en Nivel 2
 */
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.ActualizarCodigosWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.ActualizarCodigosWindow',

    width:     440,
    modal:     true,
    resizable: false,
    closable:  true,
    draggable: true,
    layout:    'fit',

    parentRecord:    null,
    selectedRecords: null,

    initComponent: function () {
        var me  = this;
        var qty = me.selectedRecords ? me.selectedRecords.length : 0;
        me.title = 'Actualizar Códigos — '
            + qty + ' fila' + (qty !== 1 ? 's' : '')
            + ' seleccionada' + (qty !== 1 ? 's' : '');

        me.items = [{
            xtype:     'form',
            itemId:    'actualizarForm',
            border:    false,
            bodyPadding: 14,
            defaults:  { labelAlign: 'top', width: '100%', margin: '0 0 10 0' },
            items: [
                {
                    xtype:            'textfield',
                    name:             'IN_CODVAL',
                    fieldLabel:       'Código (CODVAL)',
                    maxLength:        3,
                    enforceMaxLength: true,
                    regex:            /^\d+$/,
                    regexText:        'Debe ser un número entero',
                    allowBlank:       false
                },
                {
                    xtype:            'textarea',
                    name:             'IN_MENSAJE',
                    fieldLabel:       'Mensaje',
                    maxLength:        150,
                    enforceMaxLength: true,
                    allowBlank:       false,
                    rows:             3
                }
            ],
            buttons: [
                {
                    text:     'Guardar',
                    iconCls:  'prx-icon-save',
                    formBind: true,
                    handler:  function (btn) {
                        var win  = btn.up('window');
                        var form = btn.up('form');
                        if (!form.isValid()) return;
                        win._doSave(btn, form.getValues());
                    }
                },
                {
                    text:    'Cancelar',
                    handler: function (btn) { btn.up('window').close(); }
                }
            ]
        }];

        me.callParent(arguments);
    },

    _doSave: async function (saveBtn, vals) {
        var me    = this;
        var notif = new AWN();

        saveBtn.setDisabled(true);
        me.setLoading(true);

        try {
            var selected = me.selectedRecords || [];
            var parent   = me.parentRecord;

            var payload = JSON.stringify(selected.map(function (r) {
                return {
                    PROCESO: String(r.get('PROCESO') || '').trim(),
                    BANDOC:  String(r.get('BANDOC')  || '').trim(),
                    DATECI:  String(r.get('DATECI')  || '').trim(),
                    TRANCI:  String(r.get('TRANCI')  || '').trim(),
                    CODVAL:  vals.IN_CODVAL.trim(),
                    MENSAJE: vals.IN_MENSAJE.trim()
                };
            }));

            var params = {
                IN_CUUID:   String(parent.get ? parent.get('CUUID') : parent['CUUID'] || '').trim(),
                IN_FUUID:   String(parent.get ? parent.get('FUUID') : parent['FUUID'] || '').trim(),
                IN_PAYLOAD: payload
            };

            await global.callStoreGet('PRAXISMP', 'MPS199', params);

            notif.success(
                selected.length + ' registro' + (selected.length !== 1 ? 's' : '')
                + ' actualizado' + (selected.length !== 1 ? 's' : '') + ' correctamente'
            );
            me.fireEvent('success');
            me.close();

        } catch (e) {
            notif.alert('Error al actualizar: ' + (e.message || 'Error desconocido'));
            if (!saveBtn.isDestroyed) saveBtn.setDisabled(false);
        } finally {
            if (!me.isDestroyed) me.setLoading(false);
        }
    }
});
