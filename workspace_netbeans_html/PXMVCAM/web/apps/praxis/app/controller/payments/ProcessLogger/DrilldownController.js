/**
 * DrilldownController
 * -------------------
 * Maneja la navegación por niveles dentro de DrilldownWindow.
 *
 *   Nivel 2 → NivelDetalleProceso  (SPMDP00019) — detalle del proceso F2/DB/FO
 *   Nivel 3 → NivelLineasDetalle   (SPMDP00020) — líneas de error por depósito
 *
 * Mantiene un navStack para soportar breadcrumbs y navegación hacia atrás.
 */
Ext.define('Ext.Praxis.controller.payments.ProcessLogger.DrilldownController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DrilldownController',

    navStack: null,

    onWindowAfterRender: function () {
        var me  = this;
        var win = me.getView();
        me.navStack = [{ nivel: 2, record: win.parentRecord }];
        me._renderContent();
        me._updateBreadcrumb();
    },

    navigateToNivel3: function (record) {
        var me = this;
        me.navStack.push({ nivel: 3, record: record });
        me._renderContent();
        me._updateBreadcrumb();
    },

    // ──────────────────────────────────────────────────────────────────────────

    _renderContent: function () {
        var me          = this;
        var win         = me.getView();
        var contentArea = win.down('[itemId=contentArea]');
        var current     = me.navStack[me.navStack.length - 1];

        contentArea.removeAll(true);

        if (current.nivel === 2) {
            contentArea.add(Ext.create(
                'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.NivelDetalleProceso',
                { parentRecord: current.record }
            ));
        } else if (current.nivel === 3) {
            contentArea.add(Ext.create(
                'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.NivelLineasDetalle',
                { parentRecord: current.record }
            ));
        }
    },

    _updateBreadcrumb: function () {
        var me    = this;
        var win   = me.getView();
        var bar   = win.down('[itemId=breadcrumbBar]');
        var root  = win.parentRecord;
        var cuuid = root && root.get ? root.get('CUUID') : (root ? root['CUUID'] : '');

        bar.removeAll();

        if (me.navStack.length <= 1) {
            bar.add({ xtype: 'tbtext', text: '<b>Detalle ' + (cuuid || '') + '</b>' });
        } else {
            bar.add({
                xtype: 'button',
                text:  'Detalle ' + (cuuid || ''),
                ui:    'default-toolbar',
                handler: function () {
                    me.navStack = [me.navStack[0]];
                    me._renderContent();
                    me._updateBreadcrumb();
                }
            });

            var last   = me.navStack[me.navStack.length - 1];
            var bandoc = last.record && last.record.get
                ? last.record.get('BANDOC')
                : (last.record ? last.record['BANDOC'] : '');

            bar.add({ xtype: 'tbtext', text: ' › ' });
            bar.add({ xtype: 'tbtext', text: '<b>Líneas ' + (bandoc || '') + '</b>' });
        }

        win.setTitle('Detalle ' + (cuuid || ''));
    }
});
