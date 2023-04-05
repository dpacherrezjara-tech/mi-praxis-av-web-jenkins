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
                            width: 1800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainSummary',
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
                                                text: 'TCONAMO', dataIndex: 'TCONAMO', width: 110,
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
                                                text: 'COMMAMO', dataIndex: 'COMMAMO', width: 110,
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
                                                text: 'IVAAMOU', dataIndex: 'IVAAMOU', width: 110,
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
                                                text: 'PROPAMO', dataIndex: 'PROPAMO', width: 110,
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
                                                text: 'RIVAAMO', dataIndex: 'RIVAAMO', width: 110,
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
                                                text: 'RICAAMO', dataIndex: 'RICAAMO', width: 110,
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
                                                text: 'RFTEAMO', dataIndex: 'RFTEAMO', width: 110,
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
                                                text: 'NETOAMO', dataIndex: 'NETOAMO', width: 110,
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
                                            {
                                                text: 'TCONAMOC', dataIndex: 'TCONAMOC', width: 110,
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
                                                text: 'COMMAMOC', dataIndex: 'COMMAMOC', width: 110,
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
                                                text: 'IVAAMOUC', dataIndex: 'IVAAMOUC', width: 110,
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
                                                text: 'PROPAMOC', dataIndex: 'PROPAMOC', width: 110,
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
                                                text: 'RIVAAMOC', dataIndex: 'RIVAAMOC', width: 110,
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
                                                text: 'RICAAMOC', dataIndex: 'RICAAMOC', width: 110,
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
                                                text: 'RFTEAMOC', dataIndex: 'RFTEAMOC', width: 110,
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
                                                text: 'NETOAMOC', dataIndex: 'NETOAMOC', width: 110,
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
                                            {
                                                text: 'DIFF_TCONAMO', dataIndex: 'DIFF_TCONAMO', width: 110,
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
                                                text: 'DIFF_COMMAMO', dataIndex: 'DIFF_COMMAMO', width: 110,
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
                                                text: 'DIFF_IVAAMOU', dataIndex: 'DIFF_IVAAMOU', width: 110,
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
                                                text: 'DIFF_PROPAMO', dataIndex: 'DIFF_PROPAMO', width: 110,
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
                                                text: 'DIFF_RIVAAMO', dataIndex: 'DIFF_RIVAAMO', width: 110,
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
                                                text: 'DIFF_RICAAMO', dataIndex: 'DIFF_RICAAMO', width: 110,
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
                                                text: 'DIFF_RFTEAMO', dataIndex: 'DIFF_RFTEAMO', width: 110,
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
                                                text: 'DIFF_NETOAMO', dataIndex: 'DIFF_NETOAMO', width: 110,
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
                            width: 1800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDaySummary',
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
                                                text: 'TCONAMO', dataIndex: 'TCONAMO', width: 110,
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
                                                text: 'COMMAMO', dataIndex: 'COMMAMO', width: 110,
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
                                                text: 'IVAAMOU', dataIndex: 'IVAAMOU', width: 110,
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
                                                text: 'PROPAMO', dataIndex: 'PROPAMO', width: 110,
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
                                                text: 'RIVAAMO', dataIndex: 'RIVAAMO', width: 110,
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
                                                text: 'RICAAMO', dataIndex: 'RICAAMO', width: 110,
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
                                                text: 'RFTEAMO', dataIndex: 'RFTEAMO', width: 110,
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
                                                text: 'NETOAMO', dataIndex: 'NETOAMO', width: 110,
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
                                            {
                                                text: 'TCONAMOC', dataIndex: 'TCONAMOC', width: 110,
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
                                                text: 'COMMAMOC', dataIndex: 'COMMAMOC', width: 110,
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
                                                text: 'IVAAMOUC', dataIndex: 'IVAAMOUC', width: 110,
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
                                                text: 'PROPAMOC', dataIndex: 'PROPAMOC', width: 110,
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
                                                text: 'RIVAAMOC', dataIndex: 'RIVAAMOC', width: 110,
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
                                                text: 'RICAAMOC', dataIndex: 'RICAAMOC', width: 110,
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
                                                text: 'RFTEAMOC', dataIndex: 'RFTEAMOC', width: 110,
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
                                                text: 'NETOAMOC', dataIndex: 'NETOAMOC', width: 110,
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
                                            {
                                                text: 'DIFF_TCONAMO', dataIndex: 'DIFF_TCONAMO', width: 110,
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
                                                text: 'DIFF_COMMAMO', dataIndex: 'DIFF_COMMAMO', width: 110,
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
                                                text: 'DIFF_IVAAMOU', dataIndex: 'DIFF_IVAAMOU', width: 110,
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
                                                text: 'DIFF_PROPAMO', dataIndex: 'DIFF_PROPAMO', width: 110,
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
                                                text: 'DIFF_RIVAAMO', dataIndex: 'DIFF_RIVAAMO', width: 110,
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
                                                text: 'DIFF_RICAAMO', dataIndex: 'DIFF_RICAAMO', width: 110,
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
                                                text: 'DIFF_RFTEAMO', dataIndex: 'DIFF_RFTEAMO', width: 110,
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
                                                text: 'DIFF_NETOAMO', dataIndex: 'DIFF_NETOAMO', width: 110,
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
                                                text: 'TCONAMO', dataIndex: 'TCONAMO', width: 110,
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
                                                text: 'COMMAMO', dataIndex: 'COMMAMO', width: 110,
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
                                                text: 'IVAAMOU', dataIndex: 'IVAAMOU', width: 110,
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
                                                text: 'PROPAMO', dataIndex: 'PROPAMO', width: 110,
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
                                                text: 'RIVAAMO', dataIndex: 'RIVAAMO', width: 110,
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
                                                text: 'RICAAMO', dataIndex: 'RICAAMO', width: 110,
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
                                                text: 'RFTEAMO', dataIndex: 'RFTEAMO', width: 110,
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
                                                text: 'NETOAMO', dataIndex: 'NETOAMO', width: 110,
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
                                            {
                                                text: 'TCONAMOC', dataIndex: 'TCONAMOC', width: 110,
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
                                                text: 'COMMAMOC', dataIndex: 'COMMAMOC', width: 110,
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
                                                text: 'IVAAMOUC', dataIndex: 'IVAAMOUC', width: 110,
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
                                                text: 'PROPAMOC', dataIndex: 'PROPAMOC', width: 110,
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
                                                text: 'RIVAAMOC', dataIndex: 'RIVAAMOC', width: 110,
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
                                                text: 'RICAAMOC', dataIndex: 'RICAAMOC', width: 110,
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
                                                text: 'RFTEAMOC', dataIndex: 'RFTEAMOC', width: 110,
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
                                                text: 'NETOAMOC', dataIndex: 'NETOAMOC', width: 110,
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
                                            {
                                                text: 'DIFF_TCONAMO', dataIndex: 'DIFF_TCONAMO', width: 110,
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
                                                text: 'DIFF_COMMAMO', dataIndex: 'DIFF_COMMAMO', width: 110,
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
                                                text: 'DIFF_IVAAMOU', dataIndex: 'DIFF_IVAAMOU', width: 110,
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
                                                text: 'DIFF_PROPAMO', dataIndex: 'DIFF_PROPAMO', width: 110,
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
                                                text: 'DIFF_RIVAAMO', dataIndex: 'DIFF_RIVAAMO', width: 110,
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
                                                text: 'DIFF_RICAAMO', dataIndex: 'DIFF_RICAAMO', width: 110,
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
                                                text: 'DIFF_RFTEAMO', dataIndex: 'DIFF_RFTEAMO', width: 110,
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
                                                text: 'DIFF_NETOAMO', dataIndex: 'DIFF_NETOAMO', width: 110,
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
                                                text: 'TCONAMO', dataIndex: 'TCONAMO', width: 110,
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
                                                text: 'COMMAMO', dataIndex: 'COMMAMO', width: 110,
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
                                                text: 'IVAAMOU', dataIndex: 'IVAAMOU', width: 110,
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
                                                text: 'PROPAMO', dataIndex: 'PROPAMO', width: 110,
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
                                                text: 'RIVAAMO', dataIndex: 'RIVAAMO', width: 110,
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
                                                text: 'RICAAMO', dataIndex: 'RICAAMO', width: 110,
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
                                                text: 'RFTEAMO', dataIndex: 'RFTEAMO', width: 110,
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
                                                text: 'NETOAMO', dataIndex: 'NETOAMO', width: 110,
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
                                            {
                                                text: 'TCONAMOC', dataIndex: 'TCONAMOC', width: 110,
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
                                                text: 'COMMAMOC', dataIndex: 'COMMAMOC', width: 110,
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
                                                text: 'IVAAMOUC', dataIndex: 'IVAAMOUC', width: 110,
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
                                                text: 'PROPAMOC', dataIndex: 'PROPAMOC', width: 110,
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
                                                text: 'RIVAAMOC', dataIndex: 'RIVAAMOC', width: 110,
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
                                                text: 'RICAAMOC', dataIndex: 'RICAAMOC', width: 110,
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
                                                text: 'RFTEAMOC', dataIndex: 'RFTEAMOC', width: 110,
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
                                                text: 'NETOAMOC', dataIndex: 'NETOAMOC', width: 110,
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
                                            {
                                                text: 'DIFF_TCONAMO', dataIndex: 'DIFF_TCONAMO', width: 110,
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
                                                text: 'DIFF_COMMAMO', dataIndex: 'DIFF_COMMAMO', width: 110,
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
                                                text: 'DIFF_IVAAMOU', dataIndex: 'DIFF_IVAAMOU', width: 110,
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
                                                text: 'DIFF_PROPAMO', dataIndex: 'DIFF_PROPAMO', width: 110,
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
                                                text: 'DIFF_RIVAAMO', dataIndex: 'DIFF_RIVAAMO', width: 110,
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
                                                text: 'DIFF_RICAAMO', dataIndex: 'DIFF_RICAAMO', width: 110,
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
                                                text: 'DIFF_RFTEAMO', dataIndex: 'DIFF_RFTEAMO', width: 110,
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
                                                text: 'DIFF_NETOAMO', dataIndex: 'DIFF_NETOAMO', width: 110,
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


