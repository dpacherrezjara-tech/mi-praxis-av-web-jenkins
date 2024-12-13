valor = '0';
Ext.define('Ext.Praxis.view.payments.ReportsForm.Info', {
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
                width: 1800,
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
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1772,
                            margin: '10 0 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 1762,
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
                                            {text: 'Nbr.', dataIndex: 'RN', width: 40},
                                            {text: 'Society', dataIndex: 'CCUST', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Bank Name', dataIndex: 'NAME', width: 170,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Account Numb.', dataIndex: 'ACCNUMBER', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                            },
                                            {text: 'Doc.SAP Bank', dataIndex: 'BANDOC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                            },
                                            {text: 'Reference', dataIndex: 'REFERENCE', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '6.dig', dataIndex: 'CAR6', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                    },
                                                    {text: '4.dig', dataIndex: 'CAR4', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                    }

                                                ]
                                            },
                                            {text: 'Auth. Code', dataIndex: 'SAUTHOC', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                            },
                                            {text: 'Merchand', dataIndex: 'MERCHAND', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Total', dataIndex: 'TOTAL', width: 110, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTOTAL, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Neto', dataIndex: 'NETO', width: 110, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETO, '0,000') + '<b>';
                                                }
                                            },
                                            

                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'FTRAN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Status', dataIndex: 'DEBSTVAL', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Type', dataIndex: 'TYPE', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Settl.<br>Status', dataIndex: 'STVAL', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
//                                            {
//                                                sortable: false,
//                                                xtype: 'actioncolumn',
//                                                width: 40,
//                                                text: 'Edit',
//                                                align: 'center',
//                                                items: [
//                                                    {
//                                                        iconCls: 'prx-icon-edit',
//                                                        tooltip: 'Edit',
//                                                        handler: 'onEditClick'
//                                                    }
//                                                ]
//                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridSumaryMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
//                            width: 685,
                            hidden: true,
                            scrollable: true,
                            margin: '15 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
//                            margin: '20 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
//                                            margin: '0 0 0 25',
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'treepanel',
                                                    id: prototype.id + '-gridSumaryMain',
                                                    width: 1221,
                                                    height: 370,
//                                                    reserveScrollbar: true,
                                                    useArrows: true,
                                                    rootVisible: false,
                                                    multiSelect: true,
                                                    columnLines: true,
                                                    rowLines: true,
                                                    scrollable: true,
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
                                                                text: 'Sales<br>Date', dataIndex: 'strFormatDate', width: 117, align: 'center', xtype: 'treecolumn',
                                                                listeners: {
                                                                    click: 'onGridCountry'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    let strCCUST = {
                                                                        134: 'AVIANCA',
                                                                        133: 'LACSA',
                                                                        202: 'TACA',
                                                                        547: 'AEROGAL',

                                                                    }
                                                                    value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                    return  !record.data.children ? ' ' : value;
                                                                },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
                                                            },
                                                            {
                                                                text: 'Av Group', dataIndex: 'CCUST', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c9daf5;";
//                                                                        metaData.style = "text-align:right;color:#057ECB";
                                                                    console.log(record, 'record')
                                                                    let strCCUST = {
                                                                        134: 'AVIANCA',
                                                                        133: 'LACSA',
                                                                        202: 'TACA',
                                                                        547: 'AEROGAL',

                                                                    }
                                                                    let styleHref = '<u><a href="#payments-reports-form" style="color:#008FE3;text-decoration:underline;">';
                                                                    let styleHref2 = '</a></u>';


                                                                    return  strCCUST[value] ? styleHref + strCCUST[value] + styleHref2 : styleHref + 'AV GROUP' + styleHref2;

                                                                },

                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },

                                                            {
                                                                text: 'Match', menuDisabled: true,
                                                                columns: [
                                                                    {
                                                                        text: 'Debits', menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: 'Qty', dataIndex: 'QDMATCH', width: 90, align: 'center', menuDisabled: true, //flex: 1
                                                                                listeners: {
                                                                                    click: 'onGridDataDetail'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQDMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount<br>USD', dataIndex: 'ADMATCH', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totADMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                        ]
                                                                    },

//                                                            {
//                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true, //flex: 1
////                                                                listeners: {
////                                                                    click: 'onGridDetCardS'
////                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                                    return value;
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
//                                                                }
//                                                            },
                                                                    {
                                                                        text: 'Refund', menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: 'Qty', dataIndex: 'QRMATCH', width: 90, align: 'center', menuDisabled: true, //flex: 1
                                                                                listeners: {
                                                                                    click: 'onGridDataDetail'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount<br>USD', dataIndex: 'ARMATCH', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Chgbck', menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: 'Qty', dataIndex: 'QCMATCH', width: 90, align: 'center', menuDisabled: true, //flex: 1
                                                                                listeners: {
                                                                                    click: 'onGridDataDetail'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQCMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount<br>USD', dataIndex: 'ACMATCH', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Acredit', menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: 'Qty', dataIndex: 'QAMATCH', width: 90, align: 'center', menuDisabled: true, //flex: 1
                                                                                listeners: {
                                                                                    click: 'onGridDataDetail'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQAMATCH, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount<br>USD', dataIndex: 'AAMATCH', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totAAMATCH, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                ]
                                                            },

                                                            {
                                                                text: 'Pending', menuDisabled: true,
                                                                columns: [
                                                                    {
                                                                        text: 'Qty', dataIndex: 'QDPEND', width: 90, align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onGridDataDetail'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQDPEND, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount<br>USD', dataIndex: 'ADPEND', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totADPEND, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },

                                                            {
                                                                text: 'Total', dataIndex: 'QTYTOTAL', width: 100, align: 'center', menuDisabled: true,
//                                                        listeners: {
//                                                            click: 'onGridDataDetail'
//                                                        },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#aacbe7;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTOTAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-SummaryMainData',
//                                                    width: 1315,
                                                    align: 'left',
                                                    margin: '0 0 0 0 ',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'center'
                                                    },
                                                    defaults: {
                                                        xtype: 'label',
                                                        align: 'center',
                                                        html: '' + '&nbsp',
                                                        height: 25,
                                                        padding: '5 5 5 0',
                                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:11px'
                                                    },
                                                    items: [

                                                        {width: 297, id: prototype.id + '-totQDMATCH'},
                                                        {width: 90, id: prototype.id + '-totADMATCH'},
                                                        {width: 90, id: prototype.id + '-totQRMATCH'},
                                                        {width: 90, id: prototype.id + '-totARMATCH'},
                                                        {width: 90, id: prototype.id + '-totQCMATCH'},
                                                        {width: 90, id: prototype.id + '-totACMATCH'},
                                                        {width: 90, id: prototype.id + '-totQAMATCH'},
                                                        {width: 90, id: prototype.id + '-totAAMATCH'},
                                                        {width: 90, id: prototype.id + '-totQDPEND'},
                                                        {width: 90, id: prototype.id + '-totADPEND'},
                                                        {width: 100, id: prototype.id + '-totQTYTOTAL'},
                                                    ]
                                                },
                                            ]
                                        },

                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            margin: '20 0 0 20 ',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-lblTittlePaidSumaryMain',
                                                    labelAlign: 'center',
                                                    border: true,
                                                    hidden: false,
                                                    align: 'center',
                                                    margin: '5 0 5 100',
                                                    style: {
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        color: '#231223',
                                                        fontFamily: '"Open Sans", sans-serif',
                                                        textAlign: 'center',
                                                        border: '2px solid #000000', // Borde del marco
                                                        padding: '10px', // Espacio interno
                                                        borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                    }
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarSM',
                                                    width: 540,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    hidden: false,
                                                    innerPadding: 28,
                                                    height: 300,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
//                                                                    text: 'Total Amount USD',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            colors: ['#73e775', '#47d4da', '#003cea', '#20da23', '#ea0000'],
                                                            stacked: false,
                                                            label: {
                                                                field: 'VENDOR',
                                                                calloutLine: true,
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 1;
                                                                    return value;
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    label = record.get('VENDOR');
                                                                    if (label === 'Pending') {
                                                                        label = 'Pending';
                                                                    } else {
                                                                        label = 'Paid';
                                                                    }
                                                                    toolTip.setHtml('<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDataDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1772,
                            margin: '10 0 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetail',
                                    width: 1762,
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
                                            {text: 'Nbr.', dataIndex: 'RN', width: 40},
                                            {text: 'Society', dataIndex: 'CCUST', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Bank Name', dataIndex: 'NAME', width: 170,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Account Numb.', dataIndex: 'ACCNUMBER', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                            },
                                            {text: 'Doc.SAP Bank', dataIndex: 'BANDOC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                            },
                                            {text: 'Reference', dataIndex: 'REFERENCE', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '6.dig', dataIndex: 'CAR6', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                    },
                                                    {text: '4.dig', dataIndex: 'CAR4', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                    }

                                                ]
                                            },
                                            {text: 'Auth. Code', dataIndex: 'SAUTHOC', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                            },
                                            {text: 'Merchand', dataIndex: 'MERCHAND', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Total', dataIndex: 'TOTAL', width: 110, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTOTAL, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Neto', dataIndex: 'NETO', width: 110, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETO, '0,000') + '<b>';
                                                }
                                            },
                                            

                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'FTRAN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Status', dataIndex: 'DEBSTVAL', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Type', dataIndex: 'TYPE', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Settl.<br>Status', dataIndex: 'STVAL', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
//                                            {
//                                                sortable: false,
//                                                xtype: 'actioncolumn',
//                                                width: 40,
//                                                text: 'Edit',
//                                                align: 'center',
//                                                items: [
//                                                    {
//                                                        iconCls: 'prx-icon-edit',
//                                                        tooltip: 'Edit',
//                                                        handler: 'onEditClick'
//                                                    }
//                                                ]
//                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            margin: '20 0 0 0',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 1192,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                            padding: '10px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1192,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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
                        },
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


