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
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 160},
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
                            metaData.style = "font-weight:bold";
                            const opts = {
                                'DEB': 'Debits',
                                'REG': 'Regular',
                                'ADJ': 'Adjustment'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'Sub-Type', dataIndex: 'STCON', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "background-color:#838187";
                            const opts = {
                                'P': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Tickets CO';
                                },
                                'A': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Cargo CO';
                                },
                                'C': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Mails CO';
                                },
                                'E': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Tickets EXT';
                                },
                                'G': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Cargo EXT';
                                },
                                'T': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Taxes EXT';
                                },
                                'D': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Debits CO';
                                },
                                'B': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Debits EXT';
                                },
                                'J': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Adjustments CO';
                                },
                                'K': () => {
                                    metaData.style = "font-weight:bold";
                                    return 'Adjustments EXT';
                                }
                            };
                            return opts[value]? opts[value]() : '';
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
                columns: [
                    {text: 'Corrl', dataIndex: 'HEADER', width: 200},
                    {text: 'Date', dataIndex: 'FECSAP', width: 100},
                    {text: 'Status', dataIndex: 'STSAP', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "background-color:#838187";
                            const opts = {
                                'P': () => {
                                    metaData.style = "background-color:#fffc33;font-weight:bold";
                                    return 'Pending';
                                },
                                'S': () => {
                                    metaData.style = "background-color:#7cf925;font-weight:bold";
                                    return 'Sended';
                                },
                                'L': () => {
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
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Rev.',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-trash',
                        tooltip: 'Reverse',
                        handler: 'reverseSingleBandoc',
                        isDisabled: 'disableReverse'
                    }
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
                    click: 'onDownloadExcel'
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


