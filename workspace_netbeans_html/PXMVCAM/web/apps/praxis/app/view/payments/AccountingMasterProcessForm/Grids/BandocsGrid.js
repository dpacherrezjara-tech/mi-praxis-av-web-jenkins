Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.BandocsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-BandocsGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.BandocsGridController'
    ],
    controller: 'BandocsGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1750,
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
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Info',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'onLoadAccountingInfo'
                    }
                ]
            },
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 50},
            {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1},
            {
                text: 'Accounting Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                }, 
                columns: [
                    {text: 'Date', dataIndex: 'FCONT', width: 90},
                    {text: 'Type', dataIndex: 'TIPOCON', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#B2DAFA";
                            const opts = {
                                'DEB': 'Debits',
                                'REG': 'Regular',
                                'ADJ': 'Adjustment'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'ID', dataIndex: 'IDCONT', width: 210},
                    {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 100},
                    {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 100},
                    {text: 'Reference', dataIndex: 'REFER', width: 160}
                ]
            },
            {
                text: 'SAP Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns:[
                    {text: 'Date', dataIndex: 'FECSAP', width: 100},
                    {text: 'Status', dataIndex: 'STSAP', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "background-color:#838187";
                            const opts = {
                                'P': ()=>{
                                    metaData.style = "background-color:#fffc33;font-weight:bold";
                                    return 'Pending';
                                }, 
                                'L': ()=>{
                                    metaData.style = "background-color:#7cf925;font-weight:bold";
                                    return 'Loaded';
                                }
                            };
                            return opts[value]();
                        }
                    }
                ]
            },
            {
                text: 'Maintenance Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return value;
                    }
                }, columns: [
                    {text: 'User<br>Create', dataIndex: 'USCR', width: 100},
                    {text: 'Datetime<br>Create', dataIndex: 'TSCR', width: 130},
                    {text: 'User<br>Update', dataIndex: 'USUP', width: 100},
                    {text: 'Datetime<br>Update', dataIndex: 'TSUP', width: 130}
                ]
            }
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
                id: prototype.id + '-bandoc-btnBack',
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


