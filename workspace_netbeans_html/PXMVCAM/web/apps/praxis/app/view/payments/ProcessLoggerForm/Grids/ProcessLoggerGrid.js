Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Grids.ProcessLoggerGrid', {
    extend: 'Ext.Praxis.view.widgets.StoreProcGrid',
    alias: 'widget.' + prototype.id + '-ProcessLoggerGrid',

    requires: [
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.controller.payments.ProcessLogger.ProcessLoggerRowController',
        'Ext.Praxis.view.payments.ProcessLoggerForm.Drilldown.DrilldownWindow'
    ],

    library:        'PRAXISMP',
    storeProcedure: 'MPS195',
    pageSize:       15,
    height:         prototype.height,
    gridTitle:      '',
    showExcelButton: true,

    customController: 'Ext.Praxis.controller.payments.ProcessLogger.ProcessLoggerRowController',

    rowActions: [
        {
            action: 'drilldown',
            tooltip: 'Ver detalle',
            getClass: function (v, meta, record) {
                var tipo = (record.get('TIPO') || '').trim();
                return (tipo === 'F2' || tipo === 'DB' || tipo === 'FO')
                    ? 'x-fa fa-search-plus'
                    : Ext.baseCSSPrefix + 'hidden-display';
            }
        }
    ],

    gridColumns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            { xtype: 'rownumberer', width: 40 },
            { text: 'ID',               dataIndex: 'CUUID',     width: 230, align: 'left' },
            { text: 'Fecha<br>Proceso', dataIndex: 'FUUID',     width: 85 },
            { text: 'Proceso',          dataIndex: 'PROCESO',   flex: 1, align: 'left', minWidth: 150 },
            {
                text: 'Tipo', dataIndex: 'TIPO', width: 80,
                renderer: function (val) {
                    var tipo  = (val || '').trim();
                    var color = { F2: '#0ca678', DB: '#7048e8', FO: '#e8590c' }[tipo] || '#868e96';
                    return '<span style="background:' + color + ';color:#fff;padding:1px 7px;border-radius:3px;font-size:11px;">' + (tipo || val) + '</span>';
                }
            },
            {
                text: 'Errores', dataIndex: 'QTY_ERRORS', width: 80,
                renderer: function (val) {
                    var qty   = parseInt(val || 0);
                    var color = qty > 0 ? '#e03131' : '#37b24d';
                    return '<span style="background:' + color + ';color:#fff;padding:1px 7px;border-radius:3px;font-size:11px;">' + qty + '</span>';
                }
            },
            {
                text: 'Estado', dataIndex: 'STPRO', width: 105,
                renderer: function (val) {
                    var s = (val || '').trim();
                    var m = {
                        P: { l: 'Pendiente',  c: '#1971c2' },
                        C: { l: 'Completado', c: '#37b24d' },
                        X: { l: 'Error',      c: '#e03131' }
                    };
                    var o = m[s] || { l: s, c: '#868e96' };
                    return '<span style="background:' + o.c + ';color:#fff;padding:1px 7px;border-radius:3px;font-size:11px;">' + o.l + '</span>';
                }
            },
            { text: 'Mensaje',        dataIndex: 'MSGPRO', width: 300, align: 'left' },
            { text: 'Usu.<br>Crea',   dataIndex: 'USCR',   width: 90 },
            { text: 'Fec.<br>Creac',  dataIndex: 'FECR',   width: 80 },
            { text: 'Hora<br>Creac',  dataIndex: 'HOCR',   width: 60 },
            { text: 'Usu.<br>Fin',    dataIndex: 'USTR',   width: 90 },
            { text: 'Fec.<br>Fin',    dataIndex: 'FETR',   width: 80 },
            { text: 'Hora<br>Fin',    dataIndex: 'HOTR',   width: 60 }
        ]
    }
});
