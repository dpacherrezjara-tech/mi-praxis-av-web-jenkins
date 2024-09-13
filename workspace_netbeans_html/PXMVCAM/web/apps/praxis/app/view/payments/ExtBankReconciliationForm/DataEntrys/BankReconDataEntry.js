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
    width: 1350,
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
                                    width: 800
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
                                    height: 80,
                                    width: '90%'
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
                        margin: '3 3 3 3'
                    },
                    items: [
                        {

                            id: prototype.idDE + '-panelMatch',
                            hidden: true,
                            defaults: {
                                xtype: 'grid',
                                titleAlign: 'center',
                                minHeight: 100,
                                maxHeight: 120,
                                width: '100%',
                                viewConfig: {
                                    stripeRows: true,
                                    enableTextSelection: true,
                                    markDirty: false
                                },
                                columnLines: true
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Header">
                                {
                                    title: 'Headers',
                                    id: prototype.idDE + '-gridHeadersMatch',
                                    hidden:true,
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
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                            {text: 'Settlement<br>Date', dataIndex: 'FLIQUIDACI', width: 80},
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 100},
                                            {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 100},
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
                                                    {text: 'Amount', dataIndex: 'IMPORTEPAG', width: 100},
                                                    {text: 'Curr.', dataIndex: 'MONEDAPAGO', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#F0D094";
                                                            return value;
                                                        }
                                                    }
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
                                                    {text: 'NET', dataIndex: 'NETO', width: 100},
                                                    {text: 'Curr.', dataIndex: 'MONEDA', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#85beff";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Comm.', dataIndex: 'COMISION', width: 100},
                                                    {text: 'Fee Tax', dataIndex: 'FEESTAXS', width: 100},
                                                    {text: 'Chargeback', dataIndex: 'CHARGEBK', width: 100},
                                                    {text: 'Misc.', dataIndex: 'MISCELNS', width: 100},
                                                    {text: 'Others', dataIndex: 'OTROS', width: 100}
                                                ]
                                            },
                                            {text: 'Total', dataIndex: 'TOTAL', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#85ff85;font-weight:bold";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            }

                                        ]
                                    }
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Settlements">
                                {
                                    title: 'Settlements',
                                    id: prototype.idDE + '-gridSettlementsMatch',
                                    hidden:true,
                                    minHeight: 100,
                                    maxHeight: 180,
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
                                            {text: 'Client', dataIndex: 'CCUST', width: 60},
                                            {text: 'Bank<br>Code', dataIndex: 'CODEBANK', width: 70},
                                            {text: 'Bankdoc', dataIndex: 'BANDOC', width: 130},
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                            {text: 'Settlement', dataIndex: 'LIQUIDACIO', width: 100},
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 100},
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
                                                    {text: 'Card Number', dataIndex: 'SCARDN', width: 150},
                                                    {text: 'Auth <br>Code', dataIndex: 'SAUTHOC', width: 80},
                                                    {text: 'NET', dataIndex: 'NETO', width: 100,
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
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Taxes">
                                {
                                    title: 'Taxes',
                                    id: prototype.idDE + '-gridTaxesMatch',
                                    hidden:true,
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
                                            {text: 'Client', dataIndex: 'CCUST', width: 60},
                                            {text: 'Bandoc', dataIndex: 'BANDOC', width: 120},
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
                                            {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 80},
                                            {text: 'Code', dataIndex: 'CODIGO', width: 100},
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 100},
                                            {
                                                text: 'Taxes Amounts',
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
                                                    {text: 'Amount', dataIndex: 'IMPORTE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#85beff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Curr.', dataIndex: 'MONEDA', width: 100}
                                                ]
                                            }

                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]

                        }
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