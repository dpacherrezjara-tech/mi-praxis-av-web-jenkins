prototype.idDE = prototype.id + '-BankReconDataEntry';

Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.DataEntrys.BankReconDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.BankReconDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ExteriorBankReconciliation.BankReconDataEntryController'
    ],
    controller: 'BankReconDataEntryController',
    title: 'Bank Reconciliation - Form',
    header: true,
    width: 1700,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-mainForm',
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
                        fieldStyle: 'text-align:center;',
                        editable: false
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="General Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">General Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Client Code',
                                    name: 'CCUST',
                                    labelWidth: 120,
                                    width: 250
                                },
                                {
                                    fieldLabel: 'Value Date',
                                    name: 'VALDATE',
                                    labelWidth: 80,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Processing Date',
                                    name: 'ADATE',
                                    labelWidth: 120,
                                    width: 210
                                },
                                {
                                    fieldLabel: 'Sugg. Processor',
                                    name: 'DESC_SPRO',
                                    labelWidth: 120,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Country',
                                    name: 'SCOUNTRY',
                                    labelWidth: 60,
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Doc. Type',
                                    name: 'TDOC',
                                    labelWidth: 80,
                                    width: 180,
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
                                    fieldLabel: 'Bandoc',
                                    name: 'BANDOC',
                                    labelWidth: 70,
                                    width: 190
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Bank Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Bank Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Bank Code',
                                    name: 'CODEBANK',
                                    labelWidth: 120,
                                    width: 250
                                },
                                {
                                    name: 'DESC_BANK',
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Acc. Number',
                                    name: 'ACCOUNT',
                                    labelWidth: 90,
                                    width: 180
                                },
                                {
                                    fieldLabel: 'Profit Center',
                                    name: 'BENCENC',
                                    labelWidth: 90,
                                    width: 180
                                },
                                {
                                    fieldLabel: 'Bank Account',
                                    name: 'ACCCOMP',
                                    labelWidth: 100,
                                    width: 200
                                },
                                {
                                    fieldLabel: 'Society',
                                    name: 'SOCIETY',
                                    labelWidth: 60,
                                    width: 160
                                },
                                {
                                    fieldLabel: 'Reference',
                                    name: 'REFER',
                                    labelWidth: 90,
                                    width: 230
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Text',
                                    name: 'TEXTO',
                                    fieldStyle: 'text-align:left;',
                                    labelWidth: 120,
                                    width: '95%'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'textarea',
                                    fieldStyle: 'text-align:left;',
                                    fieldLabel: 'Large Text',
                                    name: 'TEXTOLAR',
                                    labelWidth: 120,
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
                //<editor-fold defaultstate="collapsed" desc="Reconciliation Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Reconciliation Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    name: 'STVAL',
                                    labelWidth: 120,
                                    width: 250,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '1': 'Match',
                                                '3': 'Statement w/o Settl.',
                                                '4': 'Match Diff.',
                                                '5': 'Match Manual'
                                            };
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
                                },
                                {
                                    fieldLabel: 'Recon. Proc.',
                                    name: 'DESC_PRO',
                                    labelWidth: 90,
                                    width: 250
                                },
                                {
                                    fieldLabel: 'Qty Settl.',
                                    name: 'QTYTRAN1',
                                    labelWidth: 70,
                                    width: 140
                                },
                                {
                                    fieldLabel: 'Currency',
                                    name: 'SCURRENCY',
                                    labelWidth: 80,
                                    width: 150
                                },
                                {
                                    fieldLabel: 'NET Amount',
                                    name: 'NETO',
                                    labelWidth: 90,
                                    width: 200,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Recon. Amount',
                                    name: 'NETOC',
                                    labelWidth: 110,
                                    width: 220,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Grillas">
                {
                    xtype: 'panel',
                    border: false,
                    width: '100%',
                    defaults: {
                        xtype: 'panel',
                        width: '100%',
                        margin: '3 3 3 3',
                        border: false
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Match">
                        {
                            id: prototype.idDE + '-panelMatch',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Header">
                                {
                                    xtype: 'grid',
                                    titleAlign: 'center',
                                    minHeight: 100,
                                    maxHeight: 140,
                                    viewConfig: {
                                        stripeRows: true,
                                        enableTextSelection: true,
                                        markDirty: false
                                    },
                                    columnLines: true,
                                    title: 'Headers',
                                    id: prototype.idDE + '-gridHeadersMatch',
                                    hidden: true,
                                    width: '100%',
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {
                                                text: 'RN',
                                                locked: true,
                                                xtype: 'rownumberer', // Columna de número de fila
                                                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                            },
                                            {text: 'Client', dataIndex: 'CCUST', width: 50},
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                            {text: 'Settlement<br>Date', dataIndex: 'FLIQUIDACI', width: 80},
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 110},
                                            {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 130},
                                            {text: 'Bandoc', dataIndex: 'BANDOC', width: 130},
                                            {text: 'Account', dataIndex: 'ACCOUNT', width: 100},
                                            {
                                                text: 'Payment Amounts',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:right;background-color:#F0D094";
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return value;
                                                    }
                                                },
                                                columns: [
                                                    {text: 'Curr.', dataIndex: 'MONEDAPAGO', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#F0D094";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'IMPORTEPAG', width: 120}
                                                ]
                                            },
                                            {
                                                text: 'Header Amounts',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:right;background-color:#85beff";
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return value;
                                                    }
                                                },
                                                columns: [
                                                    {text: 'Curr.', dataIndex: 'MONEDA', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#85beff";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'TOTAL', width: 120},
                                                    {text: 'Comm.', dataIndex: 'COMISION', width: 120},
                                                    {text: 'Fee Tax', dataIndex: 'FEESTAXS', width: 120},
                                                    {text: 'NET', dataIndex: 'NETO', width: 120}
                                                ]
                                            },
                                            {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1}
                                        ]
                                    }
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Liquidaciones">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Settlements">
                                        {
                                            xtype: 'grid',
                                            titleAlign: 'center',
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            title: 'Settlements',
                                            id: prototype.idDE + '-gridSettlementsMatch',
                                            hidden: true,
                                            width: '65%',
                                            minHeight: 130,
                                            maxHeight: 220,
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer', // Columna de número de fila
                                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                                    },
                                                    {text: 'Client', dataIndex: 'CCUST', width: 50},
                                                    {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                                    {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 130},
                                                    {
                                                        text: 'Payment Amounts',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "text-align:right;background-color:#F0D094";
                                                                value = Ext.util.Format.number(value, '0,000.00');
                                                                return value;
                                                            }
                                                        },
                                                        columns: [
                                                            {text: 'Curr.', dataIndex: 'MONEDAPAGO', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#F0D094";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'IMPORTEPAG', width: 120}
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement Information',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "background-color:#85beff;";
                                                                return value;
                                                            }
                                                        },
                                                        columns: [
                                                            {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 80},
                                                            {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                                                            {text: 'Doc. Type', dataIndex: 'TDOC', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#85beff;";
                                                                    const opts = {
                                                                        'S': 'Sale',
                                                                        'D': 'Debit',
                                                                        'V': 'Void'
                                                                    };
                                                                    return opts[value];
                                                                }
                                                            },
                                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 150},
                                                            {text: 'Auth <br>Code', dataIndex: 'SAUTHOC', width: 80},
                                                            {text: 'Curr', dataIndex: 'SCURRENCY', width: 60},
                                                            {text: 'Amount', dataIndex: 'TOTAL', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#85beff;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Comm.', dataIndex: 'COMISION', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#85beff;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'NET', dataIndex: 'NETO', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#85beff;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Merchant', dataIndex: 'MERCHAND', width: 100},
                                                    {text: 'Bank<br>Code', dataIndex: 'CODEBANK', width: 70},
                                                    {text: 'Bandoc', dataIndex: 'BANDOC', width: 130},
                                                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 150}
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                displayInfo: true // Muestra información como "Page X of Y"
                                            }
                                        },
                                        //</editor-fold>
                                        //<editor-fold defaultstate="collapsed" desc="Taxes">
                                        {
                                            xtype: 'grid',
                                            titleAlign: 'center',
                                            minHeight: 130,
                                            maxHeight: 220,
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            title: 'Taxes',
                                            id: prototype.idDE + '-gridTaxesMatch',
                                            hidden: true,
                                            width: '35%',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer', // Columna de número de fila
                                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                                    },
                                                    {text: 'Client', dataIndex: 'CCUST', width: 50},
                                                    {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                                    {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 80},
                                                    {text: 'Tax<br>Code', dataIndex: 'CODIGO', width: 100},
                                                    {
                                                        text: 'Amount Information',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "background-color:#85beff;";
                                                                return value;
                                                            }
                                                        },
                                                        columns: [
                                                            {text: 'Curr.<br>Pay', dataIndex: 'MONEDAPAGO', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#F0D094";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Amount<br>Pay', dataIndex: 'IMPORTEPAG', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#F0D094;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Curr.', dataIndex: 'MONEDA', width: 100},
                                                            {text: 'Amount', dataIndex: 'IMPORTE', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#85beff;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Merchant', dataIndex: 'MERCHAND', width: 100},
                                                    {text: 'Bandoc', dataIndex: 'BANDOC', width: 120},
                                                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 150}

                                                ]
                                            }

                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Contadores">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        labelStyle: 'font-weight:bold;text-align:right;',
                                        fieldStyle: 'text-align:right;',
                                        readOnly: true,
                                        value: '0',
                                        labelWidth: 100,
                                        width: 200,
                                        margin: '3 3 3 3'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Qty Headers',
                                            id: prototype.idDE + '-txtQtyHeaders'
                                        },
                                        {
                                            fieldLabel: 'Qty Sales',
                                            id: prototype.idDE + '-txtQtySettlSales'
                                        },
                                        {
                                            fieldLabel: 'Qty Debits',
                                            id: prototype.idDE + '-txtQtySettlDebits'
                                        },
                                        {
                                            fieldLabel: 'Qty Void',
                                            id: prototype.idDE + '-txtQtySettlVoid'
                                        },
                                        {
                                            fieldLabel: 'Qty Taxes',
                                            id: prototype.idDE + '-txtQtySettlTaxes'
                                        },
                                        {
                                            fieldLabel: 'Qty Settl.',
                                            id: prototype.idDE + '-txtQtySettl'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Totales">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        labelStyle: 'font-weight:bold;text-align:right;',
                                        fieldStyle: 'text-align:right;',
                                        readOnly: true,
                                        value: '0.00',
                                        labelWidth: 100,
                                        width: 200,
                                        margin: '3 3 3 3',
                                        listeners: {
                                            change: function (field, newValue) {
                                                field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                            }
                                        }
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Total Headers',
                                            id: prototype.idDE + '-txtTotalHeaders'
                                        },
                                        {
                                            fieldLabel: 'Total Sales',
                                            id: prototype.idDE + '-txtTotalSettlSales'
                                        },
                                        {
                                            fieldLabel: 'Total Debits',
                                            id: prototype.idDE + '-txtTotalSettlDebits'
                                        },
                                        {
                                            fieldLabel: 'Total Void',
                                            id: prototype.idDE + '-txtTotalSettlVoid'
                                        },
                                        {
                                            fieldLabel: 'Total Taxes',
                                            id: prototype.idDE + '-txtTotalSettlTaxes'
                                        },
                                        {
                                            fieldLabel: 'Total',
                                            id: prototype.idDE + '-txtTotalSettl'
                                        }
                                    ]
                                }
                                //</editor-fold>

                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Pending">
                        {
                            id: prototype.idDE + '-panelPending',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Filtros">
                                {
                                    xtype: 'form',
                                    id: prototype.idDE + '-pendingFilters',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    margin: '5 5 5 5',
                                    border: true,
                                    width: '100%',
                                    defaults: {
                                        xtype: 'panel',
                                        border: false,
                                        width: '100%',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'center'
                                        },
                                        defaults: {
                                            xtype: 'textfield',
                                            margin: '3 3 3 3',
                                            labelStyle: 'text-align:right;font-weight:bold'
                                        }
                                    },
                                    items: [
                                        {
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    labelStyle: 'font-weight:bold;',
                                                    fieldLabel: 'Client',
                                                    name: 'IN_CCUST',
                                                    store: Ext.create('Ext.data.SimpleStore', {
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ['134', 'AV - AVIANCA'],
                                                            ['202', 'TA - TACA'],
                                                            ['547', '2K - AEROGAL'],
                                                            ['133', 'LR - LATSA']
                                                        ]
                                                    }),
                                                    labelWidth: 60,
                                                    width: 190,
                                                    displayField: 'name',
                                                    valueField: 'code',
                                                    queryMode: 'local',
                                                    editable: false,
                                                    value: '134'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    name: 'IN_ADATEF',
                                                    fieldLabel: 'From',
                                                    format: 'Ymd',
                                                    editable: true,
                                                    labelWidth: 50,
                                                    width: 150,
                                                    value: new Date(anioActual, mesActual, 1)
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    name: 'IN_ADATET',
                                                    fieldLabel: 'To',
                                                    format: 'Ymd',
                                                    editable: true,
                                                    labelWidth: 30,
                                                    width: 130,
                                                    value: fechaActual
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.idDE + '-cmbFilterCODPRO',
                                                    name: 'IN_CODPRO',
                                                    labelWidth: 80,
                                                    width: 250,
                                                    valueField: 'A4451KEY2',
                                                    displayField: 'A4451DESC1',
                                                    fieldLabel: 'Processor',
                                                    queryMode: 'local',
                                                    editable: false,
                                                    allowBlank: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    labelAlign: 'right',
                                                    typeAhead: true,
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    value: '', // Valor inicial (vacío)
                                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'IN_SEQPRO',
                                                    id: prototype.idDE + '-txtFilterSEQPRO',
                                                    value: '',
                                                    hidden: true,
                                                    readOnly: true
                                                },
                                                {
                                                    fieldLabel: 'Settlement',
                                                    labelWidth: 80,
                                                    width: 200,
                                                    name: 'IN_LIQUIDACIO',
                                                    maxLength: 50,
                                                    enforceMaxLength: true
                                                },
                                                {
                                                    fieldLabel: 'Merchant ID',
                                                    labelWidth: 80,
                                                    width: 200,
                                                    name: 'IN_MERCHANT',
                                                    maxLength: 15,
                                                    maskRe: /[0-9]/,
                                                    enforceMaxLength: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    iconCls: 'prx-icon-add',
                                                    tooltip: 'Add',
                                                    listeners: {
                                                        click: 'onAddSettlements'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    iconCls: 'prx-icon-delete',
                                                    tooltip: 'Clean Grid',
                                                    listeners: {
                                                        click: 'onCleanSettlGrid'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    id: prototype.idDE + '-downloadConciliation',
                                                    iconCls: 'prx-icon-excel',
                                                    tooltip: 'Download Conciliation',
                                                    disabled: true,
                                                    listeners: {
                                                        click: 'onDownloadConciliation'
                                                    }
                                                }
                                            ]
                                        },
//                                        {
//                                            items: [
//                                                {
//                                                    fieldLabel: 'Card Code',
//                                                    labelWidth: 80,
//                                                    width: 120,
//                                                    name: 'IN_SCARCOD',
//                                                    maxLength: 2,
//                                                    maskRe: /[a-zA-Z]/,
//                                                    enforceMaxLength: true,
//                                                    listeners: {
//                                                        change: function (field, newValue) {
//                                                            field.setValue(newValue.toUpperCase());  // Convierte a mayúsculas
//                                                        }
//                                                    }
//                                                },
//                                                {
//                                                    fieldLabel: 'Card Number',
//                                                    labelWidth: 90,
//                                                    width: 220,
//                                                    name: 'IN_SCARDN',
//                                                    maxLength: 19,
//                                                    maskRe: /[0-9%\*X]/,
//                                                    enforceMaxLength: true
//                                                },
//                                                {
//                                                    fieldLabel: 'Auth',
//                                                    labelWidth: 50,
//                                                    width: 110,
//                                                    name: 'IN_SAUTHOC',
//                                                    maxLength: 6,
//                                                    maskRe: /[0-9]/,
//                                                    enforceMaxLength: true
//                                                },
//                                                {
//                                                    fieldLabel: 'NET',
//                                                    labelWidth: 60,
//                                                    width: 160,
//                                                    name: 'IN_NETO',
//                                                    maxLength: 15,
//                                                    enforceMaxLength: true,
//                                                    maskRe: /[0-9\.\-]/, // Máscara para números y punto decimal
//                                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
//                                                    regexText: 'Invalid Amount'
//                                                },
//                                                {
//                                                    fieldLabel: 'Pay Amt',
//                                                    labelWidth: 80,
//                                                    width: 180,
//                                                    name: 'IN_IMPORTEPAG',
//                                                    maxLength: 15,
//                                                    enforceMaxLength: true,
//                                                    maskRe: /[0-9\.\-]/, // Máscara para números y punto decimal
//                                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
//                                                    regexText: 'Invalid Amount'
//                                                },
//                                            ]
//                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Header">
                                {
                                    xtype: 'grid',
                                    titleAlign: 'center',
                                    minHeight: 100,
                                    maxHeight: 160,
                                    viewConfig: {
                                        stripeRows: true,
                                        enableTextSelection: true,
                                        markDirty: false
                                    },
                                    columnLines: true,
                                    title: 'Headers',
                                    id: prototype.idDE + '-gridHeadersPending',
                                    hidden: true,
                                    width: '100%',
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {
                                                text: 'RN',
                                                locked: true,
                                                xtype: 'rownumberer', // Columna de número de fila
                                                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                            },
                                            {text: 'Client', dataIndex: 'CCUST', width: 50},
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                            {text: 'Settlement<br>Date', dataIndex: 'FLIQUIDACI', width: 80},
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 110},
                                            {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 130},
                                            {text: 'Bandoc', dataIndex: 'BANDOC', width: 130},
                                            {text: 'Account', dataIndex: 'ACCOUNT', width: 100},
                                            {
                                                text: 'Payment Amounts',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:right;background-color:#F0D094";
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return value;
                                                    }
                                                },
                                                columns: [
                                                    {text: 'Curr.', dataIndex: 'MONEDAPAGO', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#F0D094";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'IMPORTEPAG', width: 120}
                                                ]
                                            },
                                            {
                                                text: 'Header Amounts',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:right;background-color:#85beff";
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return value;
                                                    }
                                                },
                                                columns: [
                                                    {text: 'Curr.', dataIndex: 'MONEDA', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#85beff";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'TOTAL', width: 120},
                                                    {text: 'Comm.', dataIndex: 'COMISION', width: 120},
                                                    {text: 'Fee Tax', dataIndex: 'FEESTAXS', width: 120},
                                                    {text: 'NET', dataIndex: 'NETO', width: 120}
                                                ]
                                            },
                                            {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Del.',
                                                //id: prototype.id + '-gridColumnDelete',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-image-trash',
                                                        tooltip: 'Delete',
                                                        handler: 'onDeleteHeaderPending'
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Liquidaciones">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Settlements">
                                        {
                                            xtype: 'grid',
                                            titleAlign: 'center',
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            title: 'Settlements',
                                            id: prototype.idDE + '-gridSettlementsPending',
                                            hidden: false,
                                            width: '65%',
                                            minHeight: 130,
                                            maxHeight: 220,
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer', // Columna de número de fila
                                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                                    },
                                                    {text: 'Client', dataIndex: 'CCUST', width: 50},
                                                    {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                                    {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 80},
                                                    {
                                                        text: 'Payment Amounts',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "text-align:right;background-color:#F0D094";
                                                                value = Ext.util.Format.number(value, '0,000.00');
                                                                return value;
                                                            }
                                                        },
                                                        columns: [
                                                            {text: 'Curr.', dataIndex: 'MONEDAPAGO', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#F0D094";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'IMPORTEPAG', width: 120}
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement Information',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "background-color:#85beff;";
                                                                return value;
                                                            }
                                                        },
                                                        columns: [

                                                            {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                                                            {text: 'Doc. Type', dataIndex: 'TDOC', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#85beff;";
                                                                    const opts = {
                                                                        'S': 'Sale',
                                                                        'D': 'Debit',
                                                                        'V': 'Void'
                                                                    };
                                                                    return opts[value];
                                                                }
                                                            },
                                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 150},
                                                            {text: 'Auth <br>Code', dataIndex: 'SAUTHOC', width: 80},
                                                            {text: 'Curr', dataIndex: 'SCURRENCY', width: 60},
                                                            {text: 'Amount', dataIndex: 'TOTAL', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#85beff;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Comm.', dataIndex: 'COMISION', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#85beff;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'NET', dataIndex: 'NETO', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#85beff;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Merchant', dataIndex: 'MERCHAND', width: 100},
                                                    {text: 'Bank<br>Code', dataIndex: 'CODEBANK', width: 70},
                                                    {text: 'Bandoc', dataIndex: 'BANDOC', width: 130},
                                                    {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 130},
                                                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 150},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Del.',
                                                        //id: prototype.id + '-gridColumnDelete',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-image-trash',
                                                                tooltip: 'Delete',
                                                                handler: 'onDeleteSettlPending'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                id: prototype.idDE + '-gridSettlementsPendingPag',
                                                displayInfo: true // Muestra información como "Page X of Y"
                                            }
                                        },
                                        //</editor-fold>
                                        //<editor-fold defaultstate="collapsed" desc="Taxes">
                                        {
                                            xtype: 'grid',
                                            titleAlign: 'center',
                                            minHeight: 130,
                                            maxHeight: 220,
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            title: 'Taxes',
                                            id: prototype.idDE + '-gridTaxesPending',
                                            hidden: false,
                                            width: '35%',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer', // Columna de número de fila
                                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                                    },
                                                    {text: 'Client', dataIndex: 'CCUST', width: 50},
                                                    {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                                    {text: 'Payment<br>Date', dataIndex: 'FLIQUIDACI', width: 80},
                                                    {text: 'Tax<br>Code', dataIndex: 'CODIGO', width: 100},
                                                    {
                                                        text: 'Amount Information',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "background-color:#85beff;";
                                                                return value;
                                                            }
                                                        },
                                                        columns: [
                                                            {text: 'Curr.<br>Pay', dataIndex: 'MONEDAPAGO', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#F0D094";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Amount<br>Pay', dataIndex: 'IMPORTEPAG', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#F0D094;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Curr.', dataIndex: 'MONEDA', width: 100},
                                                            {text: 'Amount', dataIndex: 'IMPORTE', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#85beff;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Merchant', dataIndex: 'MERCHAND', width: 100},
                                                    {text: 'Bandoc', dataIndex: 'BANDOC', width: 120},
                                                    {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 120},
                                                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 150},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Del.',
                                                        //id: prototype.id + '-gridColumnDelete',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-image-trash',
                                                                tooltip: 'Delete',
                                                                handler: 'onDeleteTaxPending'
                                                            }
                                                        ]
                                                    }

                                                ]
                                            }

                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Contadores">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        labelStyle: 'font-weight:bold;text-align:right;',
                                        fieldStyle: 'text-align:right;',
                                        readOnly: true,
                                        value: '0',
                                        labelWidth: 100,
                                        width: 200,
                                        margin: '3 3 3 3'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Qty Headers',
                                            id: prototype.idDE + '-txtQtyHeaders2'
                                        },
                                        {
                                            fieldLabel: 'Qty Sales',
                                            id: prototype.idDE + '-txtQtySettlSales2'
                                        },
                                        {
                                            fieldLabel: 'Qty Debits',
                                            id: prototype.idDE + '-txtQtySettlDebits2'
                                        },
                                        {
                                            fieldLabel: 'Qty Void',
                                            id: prototype.idDE + '-txtQtySettlVoid2'
                                        },
                                        {
                                            fieldLabel: 'Qty Taxes',
                                            id: prototype.idDE + '-txtQtySettlTaxes2'
                                        },
                                        {
                                            fieldLabel: 'Qty Settl.',
                                            id: prototype.idDE + '-txtQtySettl2'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Totales">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        labelStyle: 'font-weight:bold;text-align:right;',
                                        fieldStyle: 'text-align:right;',
                                        readOnly: true,
                                        value: '0.00',
                                        labelWidth: 100,
                                        width: 200,
                                        margin: '3 3 3 3',
                                        listeners: {
                                            change: function (field, newValue) {
                                                field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                            }
                                        }
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Total Headers',
                                            id: prototype.idDE + '-txtTotalHeaders2'
                                        },
                                        {
                                            fieldLabel: 'Total Sales',
                                            id: prototype.idDE + '-txtTotalSettlSales2'
                                        },
                                        {
                                            fieldLabel: 'Total Debits',
                                            id: prototype.idDE + '-txtTotalSettlDebits2'
                                        },
                                        {
                                            fieldLabel: 'Total Void',
                                            id: prototype.idDE + '-txtTotalSettlVoid2'
                                        },
                                        {
                                            fieldLabel: 'Total Taxes',
                                            id: prototype.idDE + '-txtTotalSettlTaxes2'
                                        },
                                        {
                                            fieldLabel: 'Total',
                                            id: prototype.idDE + '-txtTotalSettl2'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                        //</editor-fold>
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Control Data">
                {
                    xtype: 'fieldset',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: true,
                    margin: '5 5 5 5',
                    width: '100%',
                    style: {
                        backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 8 5 8',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Crt.',
                                    name: 'USCR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Crt.',
                                    name: 'FECR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Crt.',
                                    name: 'HOCR'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Upd.',
                                    name: 'USUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Upd.',
                                    name: 'FEUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Upd.',
                                    name: 'HOUP'
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 0 7 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});