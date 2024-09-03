Ext.define('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.LoadedGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-LoadedGrid',
    requires: [
        'Ext.Praxis.controller.payments.InputsSecondPhase.LoadedGridController'
    ],
    controller: 'LoadedGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: '100%',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                });
            }
        }
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 70},
            //{text: 'Client<br>Name', dataIndex: 'AIRLINE_NAME', width: 120},
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
            {text: 'Load<br>Date', dataIndex: 'FECR', width: 80},
            {text: 'Source', dataIndex: 'DESC_PRO', width: 200},
            {text: 'Fecha<br>Venta', dataIndex: 'FECVTA', width: 80},
            {text: 'Liquidacion', dataIndex: 'LIQUIDACIO', width: 100},
            {text: 'Merchant', dataIndex: 'MERCHAND', width: 120},
            {text: 'Nombre Merchant', dataIndex: 'NMERCHAND', width: 200},
            {text: 'Transaction', dataIndex: 'TRANSTYPE', width: 80},
            {text: 'Card<br>Code', dataIndex: 'SCARCOD', width: 80},
            {text: 'Terminal', dataIndex: 'TERMINAL', width: 120},
            {text: 'Tarjeta', dataIndex: 'SCARDN', width: 160},
            {text: 'Cod.<br>Autorizacion', dataIndex: 'SAUTHOC', width: 80},
            {text: 'Pais', dataIndex: 'PAIS', width: 60},
            {text: 'Moneda', dataIndex: 'MONEDA', width: 60},
            {text: 'Importe', dataIndex: 'IMPORTE', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Comision', dataIndex: 'COMISION', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'PNR', dataIndex: 'PNR', width: 80},
            {text: 'Iata', dataIndex: 'IATA', width: 80},
            {text: 'Ticket', dataIndex: 'TICKET', width: 130},
            {text: 'Nombre Archivo', dataIndex: 'NARCHIVO', width: 300}
            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            },
            {
                xtype: 'button',
                scale: 'small',
                id: prototype.id + '-loaded-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


