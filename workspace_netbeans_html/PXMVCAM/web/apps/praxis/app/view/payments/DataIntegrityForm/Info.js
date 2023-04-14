valor = '0';
Ext.define('Ext.Praxis.view.payments.DataIntegrityForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1840,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainSummary',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1439,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainSummary',
                                    width: 1439,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Processing',
                                                id: prototype.id + '-msDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFecFiltro', width: 90,
                                                        listeners: {
                                                            click: 'onGridDetDaySummary'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-data-integrity-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 60},
                                            //Montos
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'COMPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'TCONAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_TCONAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'COMMAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMMAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'IVAAMOU', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_IVAAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'PROPAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_PROPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion IVA', dataIndex: 'RIVAAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RIVAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'RICAAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RICAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion Fte', dataIndex: 'RFTEAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RFTEAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'NETOAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_NETOAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Audit Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'COMPAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMPAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'TCONAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_TCONAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'COMMAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMMAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'IVAAMOUC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_IVAAMOUC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'PROPAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_PROPAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion IVA', dataIndex: 'RIVAAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RIVAAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'RICAAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RICAAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion Fte', dataIndex: 'RFTEAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RFTEAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'NETOAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_NETOAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'DIFF_COMPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                             if (record.data.DIFF_COMPAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_COMPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'DIFF_TCONAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_TCONAMO <= -1) {
                                                            if (record.data.DIFF_TCONAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_TCONAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'DIFF_COMMAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_COMMAMO <= -1) {
                                                            if (record.data.DIFF_COMMAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_COMMAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'DIFF_IVAAMOU', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_IVAAMOU <= -1) {
                                                            if (record.data.DIFF_IVAAMOU === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_IVAAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'DIFF_PROPAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_PROPAMO <= -1) {
                                                            if (record.data.DIFF_PROPAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_PROPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion IVA', dataIndex: 'DIFF_RIVAAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RIVAAMO <= -1) {
                                                            if (record.data.DIFF_RIVAAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RIVAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'DIFF_RICAAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RICAAMO <= -1) {
                                                            if (record.data.DIFF_RICAAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RICAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion Fte', dataIndex: 'DIFF_RFTEAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RFTEAMO <= -1) {
                                                            if (record.data.DIFF_RFTEAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RFTEAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'DIFF_NETOAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_NETOAMO <= -1) {
                                                            if (record.data.DIFF_NETOAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_NETOAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDaySummary',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1439,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDaySummary',
                                    width: 1439,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Processing',
                                                id: prototype.id + '-msDateDay',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFecFiltro', width: 90,
                                                        listeners: {
                                                            click: 'onGridDetSummaryMPF101'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-data-integrity-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 60},
                                            //Montos
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'COMPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'TCONAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_TCONAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'COMMAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMMAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'IVAAMOU', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_IVAAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'PROPAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_PROPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion IVA', dataIndex: 'RIVAAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RIVAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'RICAAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RICAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion Fte', dataIndex: 'RFTEAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RFTEAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'NETOAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_NETOAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Audit Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'COMPAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMPAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'TCONAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_TCONAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'COMMAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMMAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'IVAAMOUC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_IVAAMOUC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'PROPAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_PROPAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion IVA', dataIndex: 'RIVAAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RIVAAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'RICAAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RICAAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion Fte', dataIndex: 'RFTEAMOC', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RFTEAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'NETOAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_NETOAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'DIFF_COMPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                             if (record.data.DIFF_COMPAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_COMPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'DIFF_TCONAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_TCONAMO <= -1) {
                                                            if (record.data.DIFF_TCONAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_TCONAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'DIFF_COMMAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_COMMAMO <= -1) {
                                                            if (record.data.DIFF_COMMAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_COMMAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'DIFF_IVAAMOU', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_IVAAMOU <= -1) {
                                                            if (record.data.DIFF_IVAAMOU === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_IVAAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'DIFF_PROPAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_PROPAMO <= -1) {
                                                            if (record.data.DIFF_PROPAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_PROPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion IVA', dataIndex: 'DIFF_RIVAAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RIVAAMO <= -1) {
                                                            if (record.data.DIFF_RIVAAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RIVAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'DIFF_RICAAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RICAAMO <= -1) {
                                                            if (record.data.DIFF_RICAAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RICAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion Fte', dataIndex: 'DIFF_RFTEAMO', width: 135, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RFTEAMO <= -1) {
                                                            if (record.data.DIFF_RFTEAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RFTEAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'DIFF_NETOAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_NETOAMO <= -1) {
                                                            if (record.data.DIFF_NETOAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_NETOAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDaySummaryMPF101',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDaySummaryMPF101',
                                    width: 1800,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Processing',
                                                id: prototype.id + '-msDateDayMPF101',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFecFiltro', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 60},
                                            {text: 'Merchant', dataIndex: 'MERCHNC', width: 100,
                                                listeners: {
                                                    click: 'onGridDetSummaryMerchant'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-data-integrity-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            //Montos
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'COMPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'TCONAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_TCONAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'COMMAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMMAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'IVAAMOU', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_IVAAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'PROPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_PROPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion IVA', dataIndex: 'RIVAAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RIVAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'RICAAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RICAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion Fte', dataIndex: 'RFTEAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RFTEAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'NETOAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_NETOAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Audit Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'COMPAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMPAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'TCONAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_TCONAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'COMMAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMMAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'IVAAMOUC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_IVAAMOUC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'PROPAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_PROPAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion IVA', dataIndex: 'RIVAAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RIVAAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'RICAAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RICAAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion Fte', dataIndex: 'RFTEAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RFTEAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'NETOAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_NETOAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'DIFF_COMPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                             if (record.data.DIFF_COMPAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_COMPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'DIFF_TCONAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_TCONAMO <= -1) {
                                                            if (record.data.DIFF_TCONAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_TCONAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'DIFF_COMMAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_COMMAMO <= -1) {
                                                            if (record.data.DIFF_COMMAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_COMMAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'DIFF_IVAAMOU', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_IVAAMOU <= -1) {
                                                            if (record.data.DIFF_IVAAMOU === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_IVAAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'DIFF_PROPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_PROPAMO <= -1) {
                                                            if (record.data.DIFF_PROPAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_PROPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion IVA', dataIndex: 'DIFF_RIVAAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RIVAAMO <= -1) {
                                                            if (record.data.DIFF_RIVAAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RIVAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'DIFF_RICAAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RICAAMO <= -1) {
                                                            if (record.data.DIFF_RICAAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RICAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion Fte', dataIndex: 'DIFF_RFTEAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RFTEAMO <= -1) {
                                                            if (record.data.DIFF_RFTEAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RFTEAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'DIFF_NETOAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_NETOAMO <= -1) {
                                                            if (record.data.DIFF_NETOAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_NETOAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDaySummaryMerchant',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDaySummaryMerchant',
                                    width: 1800,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Processing',
                                                id: prototype.id + '-msDateDayMerchant',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFecFiltro', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 60},
//                                            {text: 'Merchant', dataIndex: 'MERCHNC', width: 100,                                                
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                                            //Montos
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'COMPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'TCONAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_TCONAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'COMMAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMMAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'IVAAMOU', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_IVAAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'PROPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_PROPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion IVA', dataIndex: 'RIVAAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RIVAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'RICAAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RICAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion Fte', dataIndex: 'RFTEAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RFTEAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'NETOAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_NETOAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Audit Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'COMPAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMPAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'TCONAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_TCONAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'COMMAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_COMMAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'IVAAMOUC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_IVAAMOUC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'PROPAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_PROPAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion IVA', dataIndex: 'RIVAAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RIVAAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'RICAAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RICAAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Retencion Fte', dataIndex: 'RFTEAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_RFTEAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'NETOAMOC', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_NETOAMOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valor Compras', dataIndex: 'DIFF_COMPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                             if (record.data.DIFF_COMPAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_COMPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Tot.Liquidacion', dataIndex: 'DIFF_TCONAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_TCONAMO <= -1) {
                                                            if (record.data.DIFF_TCONAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_TCONAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Com.Estaleci', dataIndex: 'DIFF_COMMAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_COMMAMO <= -1) {
                                                            if (record.data.DIFF_COMMAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_COMMAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor IVA', dataIndex: 'DIFF_IVAAMOU', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_IVAAMOU <= -1) {
                                                            if (record.data.DIFF_IVAAMOU === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_IVAAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Propina', dataIndex: 'DIFF_PROPAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_PROPAMO <= -1) {
                                                            if (record.data.DIFF_PROPAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_PROPAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion IVA', dataIndex: 'DIFF_RIVAAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RIVAAMO <= -1) {
                                                            if (record.data.DIFF_RIVAAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RIVAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion ICA', dataIndex: 'DIFF_RICAAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RICAAMO <= -1) {
                                                            if (record.data.DIFF_RICAAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RICAAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor retencion Fte', dataIndex: 'DIFF_RFTEAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_RFTEAMO <= -1) {
                                                            if (record.data.DIFF_RFTEAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_RFTEAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Valor Neto Consigna', dataIndex: 'DIFF_NETOAMO', width: 135,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_NETOAMO <= -1) {
                                                            if (record.data.DIFF_NETOAMO === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_DIFF_NETOAMO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1132,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


