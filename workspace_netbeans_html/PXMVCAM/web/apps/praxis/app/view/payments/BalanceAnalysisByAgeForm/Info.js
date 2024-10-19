valor = '0';
Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Info', {
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
                            width: 1632,
                            margin: '10 0 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleGrid',
//                                    text: '2024 - All Countries',
                                    labelAlign: 'center',
                                    border: true,
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#231223',
                                        fontFamily: '"Open Sans", sans-serif',
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 1632,
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
//                                            {text: 'Nbr.', dataIndex: 'RN', width: 40},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    let data = record.data;
//                                                    let descScountry = data.descSCOUNTRY != undefined
                                                    metaData.tdAttr = 'data-qtip="' + data.descSCOUNTRY + '"';
                                                    return value;
                                                },
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Name', dataIndex: 'descSAGENT', width: 340,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    console.log('hola mundo');
                                                    return value;
                                                },
                                            },

                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },

                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'SCURREVEN', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },

                                            {
                                                text: '10 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT10', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS10', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '30 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT30', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS30', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '60 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT60', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS60', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '90 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT90', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS90', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '120 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT120', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS120', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '999 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT999', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS999', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
//                                            {
//                                                text: 'JUL-2024',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                    {
//                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'AUG-2024',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                    {
//                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'SEP-2024',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                    {
//                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'OCT-2024',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                    {
//                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'NOV-2024',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                    {
//                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'DEC-2024',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                    {
//                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                    },
//                                                ]
//                                            },

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
                            id: prototype.id + '-boxPendingData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1222,
                            hidden: true,
                            margin: '10 0 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleGrid2',
//                                    text: '2024 - All Countries',
                                    labelAlign: 'center',
                                    border: true,
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#231223',
                                        fontFamily: '"Open Sans", sans-serif',
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridPendingData',
                                    width: 1222,
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
//                                            {text: 'Nbr.', dataIndex: 'RN', width: 40},
                                            {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Days old', dataIndex: 'DIFFDAYS', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    let data = record.data;
//                                                    let descScountry = data.descSCOUNTRY != undefined
                                                    metaData.tdAttr = 'data-qtip="' + data.descSCOUNTRY + '"';
                                                    return value;
                                                },
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Canal', dataIndex: 'CANAL', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Name', dataIndex: 'descSAGENT', width: 340,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    console.log('hola mundo');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'QtyTkt', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'SCURREVEN', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },

                                            {
                                                text: 'Paid',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'QtyTkt', dataIndex: 'QTYTKTP', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKTP, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSDP', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSDP, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Percentage %',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '% Paid', dataIndex: 'PERCPAID', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            let data = record.data;
                                                            if (data.PERCPENDING >= 80) {
                                                                metaData.style = "text-align:right;background-color:#d78e8e;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#84ff7a;";
                                                            }
                                                            return Ext.util.Format.number(value, '0.00%');
                                                        },
                                                    },
                                                    {
                                                        text: '% Pending', dataIndex: 'PERCPENDING', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value >= 80) {
                                                                metaData.style = "text-align:right;background-color:#d78e8e;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#84ff7a;";
                                                            }
                                                            return Ext.util.Format.number(value, '0.00%');
                                                        },
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


