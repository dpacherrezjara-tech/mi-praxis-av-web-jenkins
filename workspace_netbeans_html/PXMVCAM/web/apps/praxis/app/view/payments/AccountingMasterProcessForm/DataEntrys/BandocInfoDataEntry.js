prototype.idDE4 = prototype.id + '-BandocInfoDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.BandocInfoDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.BandocInfoDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.BandocInfoDataEntryController'
    ],
    controller: 'BandocInfoDataEntryController',
    title: 'Bandoc Information - Form',
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
            xtype: 'grid',
            titleAlign: 'center',
            minHeight: 100,
            viewConfig: {
                stripeRows: false,
                enableTextSelection: true,
                markDirty: true
            },
            columnLines: true,
            title: 'Bank Doc. Log',
            id: prototype.idDE4 + '-gridBandoc',
            width: '100%',
            maxHeight: 450,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {text: 'Corrl', dataIndex: 'CORRL', width: 50,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;";
                            return value;
                        }
                    },
                    {text: 'Table', dataIndex: 'TABLA', width: 130,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                            switch (value.trim()) {
                                case 'MPF102':
                                    metaData.style = "background-color:#d18d6d;";
                                    value = 'Extracto Bancario';
                                    break;
                                case 'MPF081':
                                    metaData.style = "background-color:#bb8fce;";
                                    value = 'Extracto TacaFlown';
                                    break;
                                case 'MPF060':
                                    metaData.style = "background-color:#7ed16d;";
                                    value = 'Liquidacion F1';
                                    break;
                                case 'MPF091':
                                    metaData.style = "background-color:#d1c96d;";
                                    value = 'Taxes/Gastos';
                                    break;
                                case 'MPF101':
                                    metaData.style = "background-color:#7b6dd1;";
                                    value = 'Liquidacion F2';
                                    break;
                                case 'MPF100':
                                    metaData.style = "background-color:#e6ee4e;";
                                    value = 'Tickets';
                                    break;
                                case 'MPF075':
                                    metaData.style = "background-color:#6dd199;";
                                    value = 'Reembolsos';
                                    break;
                                case 'MPF076':
                                    metaData.style = "background-color:#6dd199;";
                                    value = 'Chargeback';
                                    break;
                                case 'MPF077':
                                    metaData.style = "background-color:#6dd199;";
                                    value = 'Acreditaciones';
                                    break;
                            }
                            return value;
                        }
                    },
                    {text: 'Client', dataIndex: 'CCUST', width: 60},
                    {text: 'Core', dataIndex: 'CODPRO', width: 60},
                    {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 100},
                    {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
                    {text: 'Reference', dataIndex: 'REFER', width: 125},
                    {text: 'Status', dataIndex: 'STVAL', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;";
                            let opts = {
                                '1': 'Match',
                                '3': 'Pending',
                                '5': 'Manual'
                            };
                            return opts[value] || '';
                        }
                    },
                    {text: 'Qty.<br>Docs', dataIndex: 'QTY', width: 80},
                    {text: 'Qty.<br>Total', dataIndex: 'QTYTOT', width: 80},
                    {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 60},
                    {text: 'Doc.<br>Origin', dataIndex: 'TDOCORG', width: 60},
                    {text: 'Adj.', dataIndex: 'GENCON', width: 50},
                    {text: 'Code', dataIndex: 'CODIGO', width: 100},
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
                    {text: 'Comm. Tot.', dataIndex: 'COMISTOTA', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Rte. Fue.', dataIndex: 'RTEFUE', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Rte. Iva', dataIndex: 'RTEIVA', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Rte. Ica', dataIndex: 'RTEICA', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Net', dataIndex: 'NETO', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Date<br>Origin', dataIndex: 'DATECI', width: 80},
                    {text: 'Trans.<br>Origin', dataIndex: 'TRANCI', width: 90}
                ]
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 0 7 0',
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
                        click: 'onReloadGrid'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE4 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});