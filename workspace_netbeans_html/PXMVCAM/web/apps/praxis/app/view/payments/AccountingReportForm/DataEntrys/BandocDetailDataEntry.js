prototype.idBandoc = prototype.id + '-BandocDetailDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingReportForm.DataEntrys.BandocDetailDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.BandocDetailDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.BandocDetailDataEntryController'
    ],
    controller: 'BandocDetailDataEntryController',
    title: 'Bandoc Information - Form',
    header: true,
    width: 1250,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idBandoc + '-sapForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                        editable: false
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="SAP">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">SAP Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Client',
                                    name: 'CCUST',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Doc. Type',
                                    name: 'TDOC',
                                    labelWidth: 70,
                                    width: 170,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'S': 'Sale',
                                                'D': 'Debit'
                                            };
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
                                },
                                {
                                    fieldLabel: 'Processor',
                                    name: 'DESC_PRO',
                                    labelWidth: 70,
                                    width: 210
                                },
                                {
                                    fieldLabel: 'Country',
                                    name: 'SCOUNTRY',
                                    labelWidth: 70,
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Status',
                                    name: 'STS',
                                    labelWidth: 60,
                                    width: 190
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Society',
                                    name: 'SOCIETY',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Bank Doc.',
                                    name: 'BANDOC',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Value Date',
                                    name: 'VALDATE',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Pay Date',
                                    name: 'ADATE',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Date Bank',
                                    name: 'DATECI',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Trans. Bank',
                                    name: 'TRANCI',
                                    labelWidth: 80,
                                    width: 180
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Account',
                                    name: 'ACCOUNT',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Profit',
                                    name: 'BENCENC',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Key 1',
                                    name: 'CLAVE1',
                                    labelWidth: 70,
                                    width: 190
                                },
                                {
                                    fieldLabel: 'Key 3',
                                    name: 'CLAVE3',
                                    labelWidth: 70,
                                    width: 260
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Reference',
                                    name: 'REFER',
                                    labelWidth: 70,
                                    width: 200
                                },
                                {
                                    fieldLabel: 'Currency',
                                    name: 'SCURRENCY',
                                    labelWidth: 60,
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Amount',
                                    name: 'NETO',
                                    labelWidth: 50,
                                    width: 190
                                },
                                {
                                    fieldLabel: 'Rev. Curr.',
                                    name: 'LOCRENCY2',
                                    labelWidth: 70,
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Rev. Amt',
                                    name: 'LOCAMOUNT2',
                                    labelWidth: 70,
                                    width: 190
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Text',
                                    name: 'TEXTO',
                                    fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                    labelWidth: 70,
                                    width: '95%'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'textarea',
                                    fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                    fieldLabel: 'Large Text',
                                    name: 'TEXTOLAR',
                                    labelWidth: 70,
                                    grow: true, // Permitir que crezca según el contenido
                                    growMax: 50, // Altura máxima
                                    height: 50,
                                    width: '95%'
                                }
                            ]
                        }
                    ]
                },
                        //</editor-fold>
            ]
        },
        {
            xtype: 'form',
            id: prototype.idBandoc + '-tacaflowForm',
            hidden: true,
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                        editable: false
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="TACAFLOW">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">TACAFLOW Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Client',
                                    name: 'CCUST',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Doc. Type',
                                    name: 'CTIPO',
                                    labelWidth: 70,
                                    width: 170,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'D': 'Sale',
                                                'S': 'Debit'
                                            };
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
                                },
                                {
                                    fieldLabel: 'Processor',
                                    labelWidth: 70,
                                    width: 250,
                                    value: 'CREDOMATIC TACAFLOW'
                                },
                                {
                                    fieldLabel: 'Bank Doc.',
                                    name: 'BANDOC',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Status',
                                    name: 'STS',
                                    labelWidth: 60,
                                    width: 160
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'CID Code',
                                    name: 'CID',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Date Entry',
                                    name: 'FINGRESO',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Value Date',
                                    name: 'FVALOR',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Processing Date',
                                    name: 'PRDA',
                                    labelWidth: 100,
                                    width: 200
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Text',
                                    name: 'DESCRIPC',
                                    fieldStyle: 'text-align:left;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                                    labelWidth: 70,
                                    width: '95%'
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        },
        {
            xtype: 'panel',
            width: '100%',
            margin: '2 2 2 2',
            border: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    id: prototype.idBandoc + '-tabMain',
                    width: '100%',
                    height: 'auto',
                    border: false,
                    margin: '0 1 0 1',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        height: 'auto',
                        autoScroll: false,
                        layout: 'fit',
                        defaults: {
                            width: '100%',
                            minHeight: 100,
                            maxHeight: 300,
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columnLines: true,
                            autoScroll: true,
                            height: 'auto'
                        }
                    },
                    listeners: {
                        tabchange: 'onChangeTabMain'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Fase 1">
                        {
                            title: 'PHASE 1',
                            itemId: '1',
                            id: prototype.idBandoc + '-tabF1',
                            items: [
                                {
                                    xtype: 'grid',
                                    border: false,
                                    id: prototype.idBandoc + '-gridFase1',
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {text: 'Client', dataIndex: 'CCUST', width: 60},
                                            {text: 'Processor', dataIndex: 'DESC_PRO', width: 150},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 80},
                                            {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
                                            {text: 'Card Code', dataIndex: 'SCARDN', width: 160},
                                            {text: 'Auth Code', dataIndex: 'SAUTHOC', width: 100},
                                            {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 100},
                                            {text: 'Net', dataIndex: 'NETO', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Comm.', dataIndex: 'COMISION', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Total', dataIndex: 'TOTAL', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Payment<br>Currency', dataIndex: 'MONEDAPAGO', width: 100},
                                            {text: 'Payment<br>Amount', dataIndex: 'IMPORTEPAG', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 90},
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 120},
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                            {text: 'Trans.', dataIndex: 'TRAN', width: 60}
                                        ]
                                    },
                                    bbar: {
                                        xtype: 'pagingtoolbar',
                                        displayInfo: true
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fase 2">
                        {
                            title: 'PHASE 2',
                            itemId: '2',
                            id: prototype.idBandoc + '-tabF2',
                            items: [
                                {
                                    xtype: 'grid',
                                    border: false,
                                    id: prototype.idBandoc + '-gridFase2',
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {text: 'Client', dataIndex: 'CCUST', width: 60},
                                            {text: 'Processor', dataIndex: 'DESC_PRO', width: 150},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {text: 'Status', dataIndex: 'STVAL', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;";
                                                    const opts = {
                                                        '1': 'Match',
                                                        '3': 'Pending',
                                                        '5': 'Manual'
                                                    };
                                                    return opts[value] || '';
                                                }
                                            },

                                            {text: 'Bussiness', dataIndex: 'NEGOC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;";
                                                    const opts = {
                                                        '1': 'Tickets',
                                                        '2': 'Cargo',
                                                        '3': 'Mail'
                                                    };
                                                    return opts[value] || '';
                                                }
                                            },
                                            {text: 'Document', dataIndex: 'TDOC', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;";
                                                    const opts = {
                                                        'S': 'SALE',
                                                        'R': 'RFND',
                                                        'D': 'DEBIT'
                                                    };
                                                    return opts[value] || 'DEBIT';
                                                }
                                            },
                                            {text: 'Origin', dataIndex: 'TDOCORG', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;";
                                                    const opts = {
                                                        'D': 'DEBIT'
                                                    };
                                                    return opts[value] || '';
                                                }
                                            },
                                            {text: 'Type', dataIndex: 'DEBTYPE', width: 80},
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 180},
                                            {text: 'Auth Code', dataIndex: 'SAUTHOC', width: 100},
                                            {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 100},
                                            {text: 'Value', dataIndex: 'SVFOP', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Comm.', dataIndex: 'COMISION', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Comm.<br>Total', dataIndex: 'COMISTOTA', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Rte. FUE.', dataIndex: 'RTEFUE', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Rte. IVA.', dataIndex: 'RTEIVA', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Rte. ICA.', dataIndex: 'RTEICA', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Payment<br>Currency', dataIndex: 'MONEDAPAGO', width: 100},
                                            {text: 'Payment<br>Amount', dataIndex: 'IMPORTEPAG', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'NET', dataIndex: 'NETO', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 100},
                                            {text: 'Merchant', dataIndex: 'MERCHNC', width: 150},
                                            {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 250},
                                            {text: 'Settlement<br>Date', dataIndex: 'FLIQUIDACI', width: 100},
                                            {text: 'ADJ<br>Type', dataIndex: 'GENCON', width: 60},
                                            {text: 'Trans.', dataIndex: 'TRAN', width: 60},
                                            {text: 'Date<br>Settl.', dataIndex: 'DATEC', width: 100},
                                            {text: 'Trans.<br>Settl.', dataIndex: 'TRANC', width: 100},
                                            {text: 'Regular ID', dataIndex: 'IDCONT', width: 150},
                                            {text: 'Debit ID', dataIndex: 'IDCDEB', width: 150},
                                            {text: 'Adjusment ID', dataIndex: 'IDCADJ', width: 150},
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100}
                                        ]
                                    },
                                    bbar: {
                                        xtype: 'pagingtoolbar',
                                        displayInfo: true
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Gastos">
                        {
                            title: 'BILLS',
                            itemId: 'G',
                            id: prototype.idBandoc + '-tabGT',
                            items: [
                                {
                                    xtype: 'grid',
                                    border: false,
                                    id: prototype.idBandoc + '-gridGT',
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {text: 'Client', dataIndex: 'CCUST', width: 60},
                                            {text: 'Processor', dataIndex: 'DESC_PRO', width: 130},
                                            {text: 'Code', dataIndex: 'CODIGO', width: 100},
                                            {text: 'Currency', dataIndex: 'MONEDA', width: 100},
                                            {text: 'Value', dataIndex: 'IMPORTE', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Payment<br>Currency', dataIndex: 'MONEDAPAGO', width: 100},
                                            {text: 'Payment<br>Amount', dataIndex: 'IMPORTEPAG', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 150},
                                            {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 250},
                                            {text: 'Settlement<br>Date', dataIndex: 'FLIQUIDACI', width: 100}
                                        ]
                                    },
                                    bbar: {
                                        xtype: 'pagingtoolbar',
                                        displayInfo: true
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Interfaces">
                        {
                            title: 'INTERFACES',
                            itemId: 'I',
                            id: prototype.idBandoc + '-tabIdcont',
                            items: [
                                {
                                    xtype: 'grid',
                                    border: false,
                                    id: prototype.idBandoc + '-gridIdcont',
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {text: 'Client', dataIndex: 'CCUST', width: 60},
                                            {text: 'Processor', dataIndex: 'CODPRO', width: 70},
                                            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
                                            {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
                                            {text: 'Reference', dataIndex: 'REFER', width: 130},
                                            {text: 'Accounting ID', dataIndex: 'IDCONT', width: 180},
                                            {text: 'Accounting<br>Date', dataIndex: 'FCONT', width: 80},
                                            {text: 'Header Text', dataIndex: 'HEADER', width: 160},
                                            {text: 'SAP Load<br>Date', dataIndex: 'FECSAP', width: 100},
                                            {text: 'File Name', dataIndex: 'FILENAM', width: 260},
                                            {text: 'Status', dataIndex: 'STSAP', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#7ec7d5;font-weight:bold;";
                                                    const opts = {
                                                        'N': () => {
                                                            metaData.style = "background-color:#ef6f59;font-weight:bold";
                                                            return 'Pending Accounting';
                                                        },
                                                        'P': () => {
                                                            metaData.style = "background-color:#fffc33;font-weight:bold";
                                                            return 'Pending to Send';
                                                        },
                                                        'L': () => {
                                                            metaData.style = "background-color:#deace3;font-weight:bold";
                                                            return 'Loaded to SAP';
                                                        },
                                                        'S': () => {
                                                            metaData.style = "background-color:#7cf925;font-weight:bold";
                                                            return 'Sended to AV';
                                                        }
                                                    };
                                                    return opts[value]() || '';
                                                }
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Totales">
                        {
                            title: 'TOTALS',
                            itemId: 'T',
                            id: prototype.idBandoc + '-tabTotals',
                            defaults: {},
                            items: [
                                {
                                    xtype: 'treepanel',
                                    id: prototype.idBandoc + '-treeTotals',
                                    minHeight: 250,
                                    maxHeight: 500,
                                    rootVisible: false,
                                    viewConfig: {
                                        stripeRows: true,
                                        enableTextSelection: true,
                                        markDirty: false
                                    },
                                    columnLines: true,
                                    autoScroll: true,
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {
                                                xtype: 'treecolumn',
                                                text: 'Concept',
                                                dataIndex: 'CONCEPTO',
                                                flex: 1,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.COLOR === 'H') {
                                                        metaData.style = "color:#226fec;text-align:center;font-weight:bold;";
                                                    } else {
                                                        metaData.style = "color:#29b8af;text-align:center;font-weight:bold;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Primary<br>Key',
                                                dataIndex: 'PKEY',
                                                width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    const opts = {
                                                        '15': () => {
                                                            metaData.style = "color:#2fc611;font-weight:bold;";
                                                        },
                                                        '50': () => {
                                                            metaData.style = "color:#2fc611;font-weight:bold;";
                                                        },
                                                        '40': () => {
                                                            metaData.style = "color:#c61111;font-weight:bold;";
                                                        },
                                                        '01': () => {
                                                            metaData.style = "color:#c61111;font-weight:bold;";
                                                        }
                                                    };
                                                    if (opts[value]) {
                                                        opts[value]();
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount',
                                                dataIndex: 'MONTO',
                                                width: 200,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.COLOR === 'D') {
                                                        metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency',
                                                dataIndex: 'MONEDA',
                                                width: 80
                                            },
                                            {
                                                text: 'Payment Amount',
                                                dataIndex: 'MONTOR',
                                                width: 200,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.COLOR === 'D') {
                                                        metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Payment<br>Currency',
                                                dataIndex: 'MONEDAR',
                                                width: 80
                                            },
                                            {
                                                text: 'Adjustment',
                                                dataIndex: 'ADJ',
                                                width: 80
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 5 7 5',
            padding: '3 0 3 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Reload',
                    iconCls: 'prx-icon-reload',
                    listeners: {
                        click: 'onReloadInfo'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idBandoc4 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});