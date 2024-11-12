Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.AccountingGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-AccountingGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingGridController'
    ],
    controller: 'AccountingGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
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
            {
                text: 'RN',
                locked: true,
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {text: 'Client<br>Code', dataIndex: 'A4545CCUST', width: 50},
            {text: 'Society', dataIndex: 'A4545COMPC', width: 80},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 180},
            {text: 'Bank Doc.', dataIndex: 'A4545DOCBA', width: 100},
            {text: 'Value<br>Date', dataIndex: 'A4545DOCD', width: 100},
            {text: 'Record<br>Type', dataIndex: 'A4545HREGI', width: 80},
            {text: 'Profit', dataIndex: 'A4545PROFI', width: 120},
            {text: 'Primary<br>Key', dataIndex: 'A4545PKEY', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        '15':()=>{
                            metaData.style = "color:#2fc611;font-weight:bold;";
                        },
                        '50':()=>{
                            metaData.style = "color:#2fc611;font-weight:bold;";
                        },
                        '40':()=>{
                            metaData.style = "color:#c61111;font-weight:bold;";
                        },
                        '01':()=>{
                            metaData.style = "color:#c61111;font-weight:bold;";
                        }
                    };
                    opts[value]();
                    return value;
                }
            },
            {text: 'Account', dataIndex: 'A4545CUENT', width: 100},
            {text: 'Currency', dataIndex: 'A4545CUR', width: 80},
            {text: 'Active', dataIndex: 'A4545ACTIV', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Pasive', dataIndex: 'A4545PASIV', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Item', dataIndex: 'A4545ITEM', width: 60},
            {text: 'Large Text', dataIndex: 'A4545TEXTD', width: 400},
            {text: 'Reference', dataIndex: 'A4545REPAG', width: 160},
            {text: 'Bank<br>Code', dataIndex: 'A4545BANCO', width: 70},
            {text: 'Bank Name', dataIndex: 'A4545REFB', width: 180},
            {text: 'Country', dataIndex: 'A4545PAIS', width: 70},
            {text: 'Place', dataIndex: 'A4545PLACE', width: 80},
            {text: 'Agent', dataIndex: 'A4545AGENT', width: 90},
            {text: 'Cost Center', dataIndex: 'A4545CCOST', width: 100},
            {text: 'Key 1', dataIndex: 'A4545REFK', width: 120},
            {text: 'Key 2', dataIndex: 'A4545REFK2', width: 120},
            {text: 'Payment', dataIndex: 'A4545MPAGO', width: 70},
            {text: 'Acc. Number', dataIndex: 'A4545ANUMB', width: 160},
            {text: 'Accounting<br>Date', dataIndex: 'A4545PSTGD', width: 100},
            {text: 'Accounting<br>ID', dataIndex: 'A4545USER', width: 200}
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
                id: prototype.id + '-acco-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    }
});


