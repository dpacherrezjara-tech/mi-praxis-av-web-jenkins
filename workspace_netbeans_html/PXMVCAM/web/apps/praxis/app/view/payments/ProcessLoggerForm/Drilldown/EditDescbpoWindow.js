/**
 * EditDescbpoWindow
 * -----------------
 * Ventana para editar el mensaje BPO (DESCBPO) de una línea individual.
 * Llama al SP SPMDP00021.
 * Dispara el evento 'success' al guardar correctamente.
 *
 * Config:
 *   parentRow      {Ext.data.Model}  Fila del Nivel 2 (SPMDP00019)
 *   codval         {String}          Código de error de la línea
 *   descbpoInicial {String}          Valor actual de DESCBPO
 */
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.EditDescbpoWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.EditDescbpoWindow',

    width:     460,
    modal:     true,
    resizable: false,
    closable:  true,
    draggable: true,
    layout:    'fit',

    parentRow:      null,
    codval:         '',
    descbpoInicial: '',

    initComponent: function () {
        var me = this;
        me.title = 'Editar Mensaje BPO — ' + (me.codval || '');

        me.items = [{
            xtype:       'form',
            itemId:      'editForm',
            border:      false,
            bodyPadding: 14,
            defaults:    { labelAlign: 'top', width: '100%', margin: '0 0 10 0' },
            items: [
                {
                    xtype:            'textarea',
                    name:             'IN_DESCBPO',
                    fieldLabel:       'Mensaje BPO (DESCBPO)',
                    value:            me.descbpoInicial,
                    maxLength:        150,
                    enforceMaxLength: true,
                    allowBlank:       false,
                    rows:             4
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
            var row = me.parentRow;

            var params = {
                IN_PROCESO: String(row.get ? row.get('PROCESO') : (row['PROCESO'] || '')).trim(),
                IN_BANDOC:  String(row.get ? row.get('BANDOC')  : (row['BANDOC']  || '')).trim(),
                IN_DATECI:  String(row.get ? row.get('DATECI')  : (row['DATECI']  || '')).trim(),
                IN_TRANCI:  String(row.get ? row.get('TRANCI')  : (row['TRANCI']  || '')).trim(),
                IN_TIPOVAL: String(row.get ? row.get('TIPOVAL') : (row['TIPOVAL'] || '')).trim(),
                IN_MESSAGE: vals.IN_DESCBPO.trim(),
                IN_CODVAL:  me.codval || ''
            };

            await global.callStoreGet('PRAXISMP', 'MPS198', params);

            notif.success('DESCBPO actualizado correctamente');
            me.fireEvent('success');
            me.close();

        } catch (e) {
            notif.alert('Error al guardar: ' + (e.message || 'Error desconocido'));
            if (!saveBtn.isDestroyed) saveBtn.setDisabled(false);
        } finally {
            if (!me.isDestroyed) me.setLoading(false);
        }
    }
});
