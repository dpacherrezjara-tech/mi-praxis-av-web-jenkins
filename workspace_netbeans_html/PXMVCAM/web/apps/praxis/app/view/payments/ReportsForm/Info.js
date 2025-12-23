valor = '0';
Ext.define('Ext.Praxis.view.payments.ReportsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F4F7FD;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '15px 0 0 0',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false
            },
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1875,
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 1875,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: '<span style="color:black;font-weight:bold;">Nbr.</span>', dataIndex: 'RN', width: 40, style: 'background:#AFC6EE;border-color:white',
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Society</span>', dataIndex: 'CCUST', width: 60, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Bank Name</span>', dataIndex: 'NAME', width: 170, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 60, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Account Numb.</span>', dataIndex: 'ACCNUMBER', width: 120, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Doc.SAP Bank</span>', dataIndex: 'BANDOC', width: 100, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 140, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Payment<br>Date</span>', dataIndex: 'PAYDATE', width: 80, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Card</span>', style: 'background:#AFC6EE;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">6.dig</span>', dataIndex: 'CAR6', width: 65, style: 'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                            return '';
                                                        }
                                                    },
                                                    {text: '<span style="color:black;font-weight:bold;">4.dig</span>', dataIndex: 'CAR4', width: 95, style: 'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                            return '';
                                                        }
                                                    }

                                                ]
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Auth. Code</span>', dataIndex: 'SAUTHOC', width: 80, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Merchand</span>', dataIndex: 'MERCHAND', width: 90, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Amount USD</span>', dataIndex: 'TOTAL', width: 110, align: 'center', menuDisabled: true, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, ',0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px;background:#AFC6EE;border-color: 1px solid white !important';
                                                    return '<b style="color:black;font-weight:bold;">' + Ext.util.Format.number(data.totTOTAL, ',0,000.00') + '<b>';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Curr.</span>', dataIndex: 'SCURRENCY', width: 60, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Amount Local</span>', dataIndex: 'SVFOP', width: 110, align: 'center', menuDisabled: true, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, ',0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px;background:#AFC6EE;border-color: 1px solid white !important';
                                                    return '<b style="color:black;font-weight:bold;">' + Ext.util.Format.number(data.totSVFOP, ',0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Neto</span>', dataIndex: 'NETO', width: 110, align: 'center', menuDisabled: true, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, ',0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px;background:#AFC6EE;border-color:1px solid white !important;color:white ';
                                                    return '<b style="color:black;font-weight:bold;">' + Ext.util.Format.number(data.totNETO, ',0,000.00') + '<b>';
                                                }
                                            },

                                            {
                                                text: '<span style="color:black;font-weight:bold;">Sales</span>', style: 'background:#AFC6EE;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">Date</span>', dataIndex: 'FTRAN', width: 80, style: 'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                            return '';
                                                        }
                                                    },
                                                    {text: '<span style="color:black;font-weight:bold;">Status</span>', dataIndex: 'DEBSTVAL', width: 60, style: 'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                            return '';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Type</span>', dataIndex: 'TYPE', width: 140, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Settl.<br>Status</span>', dataIndex: 'STVAL', width: 100, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
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
                            border: false,
                            width: 2182,
                            id: prototype.id + '-panelGridSumaryMain',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    id: prototype.id + '-gridSumaryMain',
                                    width: 2182,
//                                                    height: 370,
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
                                                text: '<span style="color:black;font-weight:bold;">Debits USD</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Month</span>', style: 'background:#AFC6EE;color:black !important',
                                                        dataIndex: 'strFormatDate', width: 100, align: 'center', xtype: 'treecolumn',
//                                                                listeners: {
//                                                                    click: 'onGridCountry'
//                                                                },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return  !record.data.children ? ' ' : value;
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Av Group</span>', style: 'background:#AFC6EE;color:black !important',
                                                        dataIndex: 'CCUST',
                                                        width: 85,
                                                        align: 'center', // centra a nivel de columna (por defecto)
                                                        renderer: function (value, metaData, record) {
                                                            metaData.style = "text-align:center; ";

                                                            const strCCUST = {
                                                                134: 'AVIANCA',
                                                                133: 'LACSA',
                                                                202: 'TACA',
                                                                547: 'AEROGAL'
                                                            };

                                                            const displayText = strCCUST[value] || 'AV GROUP';
                                                            const styleHref = '<a href="#payments-reports-form" ' +
                                                                    'style="color:#008FE3; text-decoration:underline; display:block; text-align:center;">';
                                                            const styleHref2 = '</a>';

                                                            return styleHref + displayText + styleHref2;
                                                        },
                                                        listeners: {
                                                            click: 'onGridDataDetail'
                                                        }
                                                    },
                                                ]
                                            },

                                            {
                                                text: '<span style="color:black;font-weight:bold;">Grant Total</span>', menuDisabled: true, style: 'background:#AFC6EE;color:white !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#AFC6EE;color:white !important',
                                                        dataIndex: 'QTY_GRANT', width: 65, align: 'center',
                                                        listeners: {
                                                            click: 'onGridDataDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#AFC6EE;color:white !important',
                                                        dataIndex: 'AMOUNT_GRANT', width: 100, align: 'center',

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Refund</span>', menuDisabled: true, style: 'background:#FBD2D1;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', dataIndex: 'QTY_REFUND', width: 60, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDataDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'AMOUNT_REFUND_USD', style: 'background:#FBD2D1;color:black !important', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totARMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#FBD2D1;color:black !important',
                                                        columns: [

                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', dataIndex: 'AMOUNT_REFUND_PENDING_SAP', width: 90, style: 'background:#FBD2D1;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQRMATCH, ',0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SENT</span>', dataIndex: 'AMOUNT_REFUND_SEND', style: 'background:#FBD2D1;color:black !important', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, ',0,000.00') + '<b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>',
                                                                dataIndex: 'AMOUNT_REFUND_SAP', width: 90, style: 'background:#FBD2D1;color:black !important', align: 'center ', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, ',0,000.00') + '<b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Chgbck</span>', menuDisabled: true, style: 'background:#CFE9F6;color:black !important',
                                                menuDisabled: true,
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#CFE9F6;color:black !important',
                                                        dataIndex: 'QTY_CHGBACK', width: 60, align: 'center', //flex: 1
                                                        listeners: {
                                                            click: 'onGridDataDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#CFE9F6;color:black !important',
                                                        dataIndex: 'AMOUNT_CHGBACK_USD', width: 90, align: 'center', //flex: 1

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;background-color:#f6f8fa;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#CFE9F6;color:black !important',
                                                        menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#CFE9F6;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_PENDING_SAP', width: 90, align: 'center', //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCMATCH, ',0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#CFE9F6;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_SEND', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#CFE9F6;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_SAP', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },
                                                        ]},
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Reverse Chgbck</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                        dataIndex: 'QTY_REVERSE_CHGBACK', width: 60, align: 'center',
                                                        listeners: {
                                                            click: 'onGridDataDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                        dataIndex: 'AMOUNT_REVERSE_CHGBACK_USD', width: 90, align: 'center',

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;background-color:#f6f8fa;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                dataIndex: 'AMOUNT_REVERSE_PENDING_CHGBACK_SAP', width: 90, align: 'center',
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCMATCH, ',0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                dataIndex: 'AMOUNT_REVERSE_CHGBACK_SEND', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                dataIndex: 'AMOUNT_REVERSE_CHGBACK_SAP', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Acredit</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        dataIndex: 'QTY_ACRED', width: 60, align: 'center',
                                                        listeners: {
                                                            click: 'onGridDataDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        dataIndex: 'AMOUNT_ACRED_USD', width: 90, align: 'center',

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                                dataIndex: 'AMOUNT_ACRED_PENDING_SAP', width: 90, align: 'center',
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQAMATCH, ',0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                                dataIndex: 'AMOUNT_ACRED_SEND', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',

                                                                dataIndex: 'AMOUNT_ACRED_SAP', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                            },
                                                        ]},
                                                ]
                                            },
                                            {
                                                text: '<span style="color:whitefont-weight:bold;">Pending</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:white;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                        dataIndex: 'QTY_PENDING', width: 60, align: 'center',
                                                        listeners: {
                                                            click: 'onGridDataDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:white;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                        dataIndex: 'AMOUNT_PENDING_USD', width: 90, align: 'center',

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-SummaryMainData',
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
                                        {
                                            width: 185,
                                            id: prototype.id + '-SPACE1',
                                            style: 'background:#AFC6EE; text-align:center; font-weight:bold; color:black;border-right:1px solid white',
                                            html: 'Totals'
                                        },
                                        {width: 65, id: prototype.id + '-QTY_TOTAL_GRANT', style: 'background: #AFC6EE;text-align:right;border-right:1px solid white'},
                                        {width: 100, id: prototype.id + '-AMOUNT_TOTAL_GRANT', style: 'background: #AFC6EE;text-align:right;border-right:1px solid white'},
                                        {width: 60, id: prototype.id + '-QTY_TOTAL_REFUND', style: 'background: #FBD2D1;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_REFUND_USD', style: 'background: #FBD2D1;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_REFUND_PENDING_USD', style: 'background: #FBD2D1;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_REFUND_SEND', style: 'background: #FBD2D1;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_REFUND_SAP', style: 'background: #FBD2D1;text-align:right;border-right:1px solid white'},

                                        {width: 60, id: prototype.id + '-QTY_TOTAL_CHGBACK', style: 'background: #CFE9F6;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_USD', style: 'background: #CFE9F6;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_PENDING_USD', style: 'background: #CFE9F6;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SEND', style: 'background: #CFE9F6;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SAP', style: 'background: #CFE9F6;text-align:right;border-right:1px solid white'},

                                        {width: 60, id: prototype.id + '-QTY_TOTAL_REVERSE_CHGBACK', style: 'background: #D6D6D6;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_USD', style: 'background: #D6D6D6;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD', style: 'background: #D6D6D6;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SEND', style: 'background: #D6D6D6;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SAP', style: 'background: #D6D6D6;text-align:right;border-right:1px solid white'},

                                        {width: 60, id: prototype.id + '-QTY_TOTAL_ACRED', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_ACRED_USD', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_ACRED_PENDING_USD', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_ACRED_SEND', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_ACRED_SAP', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},

                                        {width: 60, id: prototype.id + '-QTY_TOTAL_PENDING', style: 'background: #E64B3C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_PENDING_USD', style: 'color:white;background: #E64B3C;text-align:right;border-right:1px solid white'},
                                        {hidden: true, width: 80, id: prototype.id + '-AMOUNT_TOTAL_PENDING_SEND', style: 'background: #E64B3C;text-align:right'},
                                        {hidden: true, width: 80, id: prototype.id + '-AMOUNT_TOTAL_PENDING_SAP', style: 'background: #E64B3C;text-align:right'},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    margin: '30 0 0 20',
                                    layout: {
                                        type: 'hbox',
                                        align: 'top'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarSMTotal',
                                                    width: 520,
                                                    border: false,
                                                    bodyBorder: false,
                                                    bodyStyle: {
                                                        border: 'none',
                                                        background: '#FFFFFF'
                                                    },
                                                    hidden: false,
                                                    innerPadding: 28,
                                                    height: 280,
                                                    background: '#FFFFFF',
                                                    animation: {duration: 200},
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'right',
                                                        itemSpacing: 10,
                                                        marker: {size: 16},
                                                        label: {fontSize: 13},
                                                        style: {
                                                            background: '#FFFFFF'
                                                        }
                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2', // 👉 siempre monto REAL
                                                            legendField: 'LABEL', // 👉 Pending / Sent / SAP
                                                            distortion: 0.7,

                                                            // 🎨 Colores por STATUS (no por tipo)
                                                            colors: [
                                                                '#E64B3C', // 🔴 Pending to Send
                                                                '#CFE9F6', // 🔵 Sent (NO SAP)
                                                                '#D1FBD2'  // 🟢 SAP
                                                            ],

                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'outside',
                                                                font: '11px Arial',
                                                                calloutLine: {length: 25, width: 1},
                                                                renderer: function (value) {
                                                                    // solo muestra el porcentaje
                                                                    return value.split('\n')[1];
                                                                }
                                                            },

                                                            highlightCfg: {margin: 10},

                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(
                                                                            record.get('VENDOR').replace(/\n/g, '<br>')
                                                                            );
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        // === GRÁFICO PIE EXISTENTE ===
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarSM',
                                                    width: 520,
                                                    border: false, // 👈 quitar borde del panel
                                                    bodyBorder: false, // 👈 quitar borde del body
                                                    bodyStyle: {
                                                        border: 'none', // 👈 asegurarse que no haya borde
                                                        background: '#FFFFFF'
                                                    },
//                    margin: '0 0 0 5',
                                                    hidden: false,
                                                    innerPadding: 28,
                                                    height: 280,
                                                    background: '#FFFFFF',
                                                    animation: {duration: 200},
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'right',
                                                        itemSpacing: 10,
                                                        marker: {size: 16},
                                                        label: {fontSize: 13},
                                                        style: {
                                                            background: '#FFFFFF'
                                                        }
                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            legendField: 'LABEL',
                                                            distortion: 0.7,
                                                            colors: ['#FBD2D1', '#E64B3C', '#CFE9F6', '#D1FBD2', '#D6D6D6'],
                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'outside',
                                                                font: '11px Arial',
                                                                calloutLine: {length: 25, width: 1},
                                                                renderer: function (value) {
                                                                    return value.split('\n')[1];
                                                                }
                                                            },
                                                            highlightCfg: {margin: 10},
                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            margin: '0 0 0 40',
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayBarSM',
                                                    width: 800,
                                                    height: 280,
                                                    insetPadding: 20,
                                                    border: false, // 👈 quitar borde
                                                    background: '#FFFFFF', // color de fondo
                                                    legend: {docked: 'bottom'},
                                                    axes: [
                                                        {type: 'numeric', position: 'left', title: 'Amount (USD)', grid: true},
                                                        {type: 'category', position: 'bottom', title: 'Category'}
                                                    ],
                                                    series: [{
                                                            type: 'bar',
                                                            xField: 'category',
                                                            yField: ['USD', 'SEND', 'SAP'],
                                                            stacked: false,
                                                            style: {opacity: 0.95},
                                                            colors: ['#A7C7F2', '#E3D7FF', '#B39DDB'], // 🎨 tonos pastel 💙💚💛
                                                            highlightCfg: {fillStyle: '#FFF2A8'}, // ligero resaltado pastel
                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (tooltip, record, item) {
                                                                    tooltip.setHtml(
                                                                            item.series.getTitle()[item.series.getYFieldIndex(item.field)] +
                                                                            ': ' + Ext.util.Format.number(record.get(item.field), '0,0')
                                                                            );
                                                                }
                                                            }
                                                        }]


                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1800,
                            id: prototype.id + '-panelGridSumaryMainChgbck',
                            bodyStyle: 'background-color: #F4F7FD;',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    id: prototype.id + '-toggleDebit',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    padding: '0 10 5 10',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Chargeback ID',
                                            margin: '0 5 0 0',
                                            width: 80,
                                            id: prototype.id + '-COL'
                                        },
                                        {
                                            xtype: 'component',
                                            id: prototype.id + '-btnToggleSwitch',
                                            margin: '0 5 0 0',
                                            html: `<style>
                                        .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                        .toggle-input{opacity:0;width:0;height:0;}
                                        .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                        .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                        .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                        .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                    </style>
                                    <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`,
                                            tooltip: 'Export to Report',
                                            listeners: {
                                                change: 'chgBash',
                                                click: 'chgBash'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Chargeback IDM',
                                            margin: '0 0 0 5',
                                            width: 90,
                                            id: prototype.id + '-EXT'
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: 1600,
                                    id: prototype.id + '-panelGridChargueID',
                                    bodyStyle: 'background-color: #F4F7FD;margin-top:4px',
                                    hidden: false,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            id: prototype.id + '-gridSumaryMainChgbck',
                                            width: 1349,
                                            useArrows: true,
                                            rootVisible: false,
                                            multiSelect: true,
                                            columnLines: true,
                                            rowLines: true,
                                            scrollable: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Debits USD</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Month</span>', style: 'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'strFormatDate', width: 120, align: 'center', xtype: 'treecolumn',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return  !record.data.children ? ' ' : value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Av Group</span>', style: 'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'CCUST',
                                                                width: 85,
                                                                align: 'center',
                                                                renderer: function (value, metaData, record) {
                                                                    metaData.style = "text-align:center; ";

                                                                    const strCCUST = {
                                                                        134: 'AVIANCA',
                                                                        133: 'LACSA',
                                                                        202: 'TACA',
                                                                        547: 'AEROGAL'
                                                                    };

                                                                    const displayText = strCCUST[value] || 'AV GROUP';
                                                                    const styleHref = '<span  ' +
                                                                            'style="color:black; display:block; text-align:center;">';
                                                                    const styleHref2 = '</span>';

                                                                    return styleHref + displayText + styleHref2;
                                                                },
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        id: prototype.id + '-titleChgBackID',
                                                        text: '<span style="color:black;font-weight:bold;">Chargeback - ID</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', dataIndex: 'QTY_CHGBACK_ID', width: 60, style: 'background:#7AB8EB;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDataDetailGrid',
                                                                    args: ['CI', '']
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'AMOUNT_CHGBACK_USD_ID', style: 'background:#7AB8EB;color:black !important', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', dataIndex: 'AMOUNT_CHGBACK_PENDING_SAP_ID', width: 80, style: 'background:#7AB8EB;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                        listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['CI', 'TPEN']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SENT</span>', dataIndex: 'AMOUNT_CHGBACK_SEND_ID', style: 'background:#7AB8EB;color:black !important', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return  value;
                                                                        },
                                                                        listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['CI', 'TSEND']
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SAP</span>',
                                                                        dataIndex: 'AMOUNT_CHGBACK_SAP_ID', width: 80, style: 'background:#7AB8EB;color:black !important', align: 'center ', menuDisabled: true, //flex: 1

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return  value;
                                                                        },
                                                                        listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['CI', 'TSAP']
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: prototype.id + '-titleChgBackReversID',
                                                        text: '<span style="color:black;font-weight:bold;">Reverse Chargeback - ID</span>', menuDisabled: true, style: 'background: #D6D6D6;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background: #D6D6D6;color:black !important',
                                                                dataIndex: 'QTY_REVERSE_CHGBACK_ID', width: 60, align: 'center',
                                                                listeners: {
                                                                    click: 'onGridDataDetailReverse',
                                                                    args: ['CD', '']
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background: #D6D6D6;color:black !important',
                                                                dataIndex: 'AMOUNT_REVERSE_CHGBACK_USD_ID', width: 80, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background: #D6D6D6;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background: #D6D6D6;color:black !important',
                                                                        dataIndex: 'AMOUNT_REVERSE_PENDING_CHGBACK_SAP_ID', width: 82, align: 'center',
                                                                        listeners: {
                                                                            click: 'onGridDataDetailReverse',
                                                                            args: ['CD', 'TPEN']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background: #D6D6D6;color:black !important',
                                                                        dataIndex: 'AMOUNT_REVERSE_CHGBACK_SEND_ID', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return  value;
                                                                        }, listeners: {
                                                                            click: 'onGridDataDetailReverse',
                                                                            args: ['CD', 'TSEND']
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background: #D6D6D6;color:black !important',
                                                                        dataIndex: 'AMOUNT_REVERSE_CHGBACK_SAP_ID', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return  value;
                                                                        }, listeners: {
                                                                            click: 'onGridDataDetailReverse',
                                                                            args: ['CD', 'TSAP']
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Chargeback ID - Difference</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'QTY_CHGBACK_DIFF', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_USD_DIFF', width: 80, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                        dataIndex: 'AMOUNT_CHGBACK_PENDING_SAP_DIFF', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                        dataIndex: 'AMOUNT_CHGBACK_SEND_DIFF', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',

                                                                        dataIndex: 'AMOUNT_CHGBACK_SAP_DIFF', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    },
                                                                ]}
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-SummaryMainDataChgbck',
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
                                                {
                                                    width: 204,
                                                    id: prototype.id + '-SPACE2',
                                                    style: 'background:#AFC6EE; text-align:center; font-weight:bold; color:black;',
                                                    html: 'Totals'
                                                },

                                                {width: 60, id: prototype.id + '-QTY_TOTAL_CHGBACK_ID', style: 'background: #7AB8EB;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_USD_ID', style: 'background: #7AB8EB;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_PENDING_USD_ID', style: 'background: #7AB8EB;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SEND_ID', style: 'background: #7AB8EB;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SAP_ID', style: 'background:#7AB8EB;text-align:right'},

                                                {width: 60, id: prototype.id + '-QTY_TOTAL_REVERSE_CHGBACK_ID', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_USD_ID', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD_ID', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SEND_ID', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SAP_ID', style: 'background: #D6D6D6;text-align:right'},

                                                {width: 60, id: prototype.id + '-QTY_TOTAL_CHGBACK_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_USD_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_PENDING_USD_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SEND_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SAP_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            border: false,
                                            margin: '30 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'top'
                                            },
                                            items: [
                                                // === GRÁFICO PIE EXISTENTE ===
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'left'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarSMChgbck',
                                                            width: 520,
                                                            border: false, // 👈 quitar borde del panel
                                                            bodyBorder: false, // 👈 quitar borde del body
                                                            bodyStyle: {
                                                                border: 'none', // 👈 asegurarse que no haya borde
                                                                background: '#FFFFFF'
                                                            },
                                                            //                    margin: '0 0 0 5',
                                                            hidden: false,
                                                            innerPadding: 28,
                                                            height: 280,
                                                            background: '#FFFFFF',
                                                            animation: {duration: 200},
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            legend: {
                                                                docked: 'right',
                                                                itemSpacing: 10,
                                                                marker: {size: 16},
                                                                label: {fontSize: 13},
                                                                style: {
                                                                    background: '#FFFFFF'
                                                                }
                                                            },
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    legendField: 'LABEL',
                                                                    distortion: 0.7,
                                                                    colors: ['#7AB8EB', '#D6D6D6', '#CFE9F6', '#D1FBD2', '#D6D6D6'],
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        display: 'outside',
                                                                        font: '11px Arial',
                                                                        calloutLine: {length: 25, width: 1},
                                                                        renderer: function (value) {
                                                                            return value.split('\n')[1];
                                                                        }
                                                                    },
                                                                    highlightCfg: {margin: 10},
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        renderer: function (toolTip, record) {
                                                                            toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                        }
                                                                    }
                                                                }]
                                                        }
                                                    ]
                                                },

                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    margin: '0 0 0 40',
                                                    items: [
                                                        {
                                                            xtype: 'cartesian',
                                                            id: prototype.id + '-displayBarSM1',
                                                            width: 800,
                                                            height: 280,
                                                            insetPadding: 20,
                                                            border: false, // 👈 quitar borde
                                                            background: '#FFFFFF', // color de fondo
                                                            legend: {docked: 'bottom'},
                                                            axes: [
                                                                {type: 'numeric', position: 'left', title: 'Amount (USD)', grid: true},
                                                                {type: 'category', position: 'bottom', title: 'Category'}
                                                            ],
                                                            series: [{
                                                                    type: 'bar',
                                                                    xField: 'category',
                                                                    yField: ['USD', 'SEND', 'SAP'],
                                                                    stacked: false,
                                                                    style: {opacity: 0.95},
                                                                    colors: ['#A7C7F2', '#E3D7FF', '#B39DDB'], // 🎨 tonos pastel 💙💚💛
                                                                    highlightCfg: {fillStyle: '#FFF2A8'}, // ligero resaltado pastel
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        renderer: function (tooltip, record, item) {
                                                                            tooltip.setHtml(
                                                                                    item.series.getTitle()[item.series.getYFieldIndex(item.field)] +
                                                                                    ': ' + Ext.util.Format.number(record.get(item.field), '0,0')
                                                                                    );
                                                                        }
                                                                    }
                                                                }]


                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: 1600,
                                    id: prototype.id + '-panelGridChargueIDM',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    hidden: true,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            id: prototype.id + '-gridSumaryMainChgbckReverse',
                                            width: 1353,
                                            useArrows: true,
                                            rootVisible: false,
                                            multiSelect: true,
                                            columnLines: true,
                                            rowLines: true,
                                            scrollable: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Debits USD</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Month</span>', style: 'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'strFormatDate', width: 120, align: 'center', xtype: 'treecolumn',
//                                                                listeners: {
//                                                                    click: 'onGridCountry'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return  !record.data.children ? ' ' : value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Av Group</span>', style: 'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'CCUST',
                                                                width: 85,
                                                                align: 'center', // centra a nivel de columna (por defecto)
                                                                renderer: function (value, metaData, record) {
                                                                    metaData.style = "text-align:center; ";

                                                                    const strCCUST = {
                                                                        134: 'AVIANCA',
                                                                        133: 'LACSA',
                                                                        202: 'TACA',
                                                                        547: 'AEROGAL'
                                                                    };

                                                                    const displayText = strCCUST[value] || 'AV GROUP';
                                                                    const styleHref = '<span  ' +
                                                                            'style="color:black; display:block; text-align:center;">';
                                                                    const styleHref2 = '</span>';

                                                                    return styleHref + displayText + styleHref2;
                                                                },

                                                            },
                                                        ]
                                                    },

                                                    {
                                                        id: prototype.id + '-titleChgBackReversIDM',
                                                        text: '<span style="color:black;font-weight:bold;">Chargeback - IDM</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                dataIndex: 'QTY_CHGBACK_IDM', width: 60, align: 'center',
                                                                listeners: {
                                                                    click: 'onGridDataDetailGrid',
                                                                    args: ['CM', '']
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_USD_IDM', width: 80, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                        dataIndex: 'AMOUNT_CHGBACK_PENDING_SAP_IDM', width: 82, align: 'center',
                                                                        listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['CM', 'TPEN']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                        dataIndex: 'AMOUNT_CHGBACK_SEND_IDM', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return  value;
                                                                        }, listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['CM', 'TSEND']
                                                                        },
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                        dataIndex: 'AMOUNT_CHGBACK_SAP_IDM', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return  value;
                                                                        }, listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['CM', 'TSAP']
                                                                        },
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: prototype.id + '-titleChgBackIDM',
                                                        text: '<span style="color:black;font-weight:bold;">Reverse Chargeback - IDM</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                        menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                dataIndex: 'QTY_REVERSE_CHGBACK_IDM', width: 60, align: 'center', //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDataDetailGrid',
                                                                    args: ['RM', '']
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                dataIndex: 'AMOUNT_REVERSE_CHGBACK_USD_IDM', width: 80, align: 'center', //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                menuDisabled: true,
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                        dataIndex: 'AMOUNT_REVERSE_PENDING_CHGBACK_SAP_IDM', width: 81, align: 'center', //flex: 1
                                                                        listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['RM', 'TPEN']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                        dataIndex: 'AMOUNT_REVERSE_CHGBACK_SEND_IDM', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return  value;
                                                                        }, listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['RM', 'TSEND']
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#D6D6D6;color:black !important',
                                                                        dataIndex: 'AMOUNT_REVERSE_CHGBACK_SAP_IDM', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return  value;
                                                                        }, listeners: {
                                                                            click: 'onGridDataDetailGrid',
                                                                            args: ['RM', 'TSAP']
                                                                        }
                                                                    }
                                                                ]}
                                                        ]
                                                    },

                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Chargeback IDM - Difference</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'QTY_REVERSE_CHGBACK_DIFF', width: 60, align: 'center',
                                                                listeners: {
                                                                    click: 'onGridDataDetailGrid'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'AMOUNT_REVERSE_CHGBACK_USD_DIFF', width: 80, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                columns: [
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                        dataIndex: 'AMOUNT_REVERSE_PENDING_CHGBACK_SAP_DIFF', width: 80, align: 'center',
                                                                        listeners: {
                                                                            click: 'onGridDataDetailGrid'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                                        dataIndex: 'AMOUNT_REVERSE_CHGBACK_SEND_DIFF', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return value;
                                                                        }, listeners: {
                                                                            click: 'onGridDataDetailGrid'
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',

                                                                        dataIndex: 'AMOUNT_REVERSE_CHGBACK_SAP_DIFF', width: 80, align: 'center',

                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                            return value;
                                                                        }, listeners: {
                                                                            click: 'onGridDataDetailGrid'
                                                                        }
                                                                    }
                                                                ]}
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-SummaryMainDataReverseChgbck',
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
                                                {
                                                    width: 204,
                                                    id: prototype.id + '-SPACE20',
                                                    style: 'background:#AFC6EE; text-align:center; font-weight:bold; color:black;',
                                                    html: 'Totals'
                                                },
                                                {width: 60, id: prototype.id + '-QTY_TOTAL_CHGBACK_IDM', style: 'background: #F9D88C;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_USD_IDM', style: 'background: #F9D88C;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_PENDING_USD_IDM', style: 'background: #F9D88C;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SEND_IDM', style: 'background: #F9D88C;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SAP_IDM', style: 'background: #F9D88C;text-align:right'},

                                                {width: 60, id: prototype.id + '-QTY_TOTAL_REVERSE_CHGBACK_IDM', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_USD_IDM', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD_IDM', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SEND_IDM', style: 'background: #D6D6D6;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SAP_IDM', style: 'background: #D6D6D6;text-align:right'},

                                                {width: 60, id: prototype.id + '-QTY_TOTAL_REVERSE_CHGBACK_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_USD_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SEND_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                                {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SAP_TOTAL_DIFF', style: 'background: #AFC6EE;text-align:right'},
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            border: false,
                                            margin: '30 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'top'
                                            },
                                            items: [
                                                // === GRÁFICO PIE EXISTENTE ===
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'left'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarSMChgbckR',
                                                            width: 520,
                                                            border: false, // 👈 quitar borde del panel
                                                            bodyBorder: false, // 👈 quitar borde del body
                                                            bodyStyle: {
                                                                border: 'none', // 👈 asegurarse que no haya borde
                                                                background: '#FFFFFF'
                                                            },
                                                            //                    margin: '0 0 0 5',
                                                            hidden: false,
                                                            innerPadding: 28,
                                                            height: 280,
                                                            background: '#FFFFFF',
                                                            animation: {duration: 200},
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            legend: {
                                                                docked: 'right',
                                                                itemSpacing: 10,
                                                                marker: {size: 16},
                                                                label: {fontSize: 13},
                                                                style: {
                                                                    background: '#FFFFFF'
                                                                }
                                                            },
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    legendField: 'LABEL',
                                                                    distortion: 0.7,
                                                                    colors: ['#F9D88C', '#D6D6D6', '#CFE9F6', '#D1FBD2', '#D6D6D6'],
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        display: 'outside',
                                                                        font: '11px Arial',
                                                                        calloutLine: {length: 25, width: 1},
                                                                        renderer: function (value) {
                                                                            return value.split('\n')[1];
                                                                        }
                                                                    },
                                                                    highlightCfg: {margin: 10},
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        renderer: function (toolTip, record) {
                                                                            toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                        }
                                                                    }
                                                                }]
                                                        }
                                                    ]
                                                },

                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    margin: '0 0 0 40',
                                                    items: [
                                                        {
                                                            xtype: 'cartesian',
                                                            id: prototype.id + '-displayBaerSMChgbckR',
                                                            width: 800,
                                                            height: 280,
                                                            insetPadding: 20,
                                                            border: false, // 👈 quitar borde
                                                            background: '#FFFFFF', // color de fondo
                                                            legend: {docked: 'bottom'},
                                                            axes: [
                                                                {type: 'numeric', position: 'left', title: 'Amount (USD)', grid: true},
                                                                {type: 'category', position: 'bottom', title: 'Category'}
                                                            ],
                                                            series: [{
                                                                    type: 'bar',
                                                                    xField: 'category',
                                                                    yField: ['USD', 'SEND', 'SAP'],
                                                                    stacked: false,
                                                                    style: {opacity: 0.95},
                                                                    colors: ['#A7C7F2', '#E3D7FF', '#B39DDB'], // 🎨 tonos pastel 💙💚💛
                                                                    highlightCfg: {fillStyle: '#FFF2A8'}, // ligero resaltado pastel
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        renderer: function (tooltip, record, item) {
                                                                            tooltip.setHtml(
                                                                                    item.series.getTitle()[item.series.getYFieldIndex(item.field)] +
                                                                                    ': ' + Ext.util.Format.number(record.get(item.field), '0,0')
                                                                                    );
                                                                        }
                                                                    }
                                                                }]


                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },

                        {
                            xtype: 'panel',
                            border: false,
                            width: 2036,
                            id: prototype.id + '-panelGridSumaryMainPending',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    id: prototype.id + '-gridSumaryMainPending',
                                    width: 2036,
//                                                    height: 370,
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
                                                text: '<span style="color:black;font-weight:bold;">Debits USD</span>', menuDisabled: true, style: 'background:#AFC6EE;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Month</span>', style: 'background:#AFC6EE;color:black !important',
                                                        dataIndex: 'strFormatDate', width: 100, align: 'center', xtype: 'treecolumn',
//                                                                listeners: {
//                                                                    click: 'onGridCountry'
//                                                                },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return  !record.data.children ? ' ' : value;
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Av Group</span>', style: 'background:#AFC6EE;color:black !important',
                                                        dataIndex: 'CCUST',
                                                        width: 87,
                                                        align: 'center', // centra a nivel de columna (por defecto)
                                                        renderer: function (value, metaData, record) {
                                                            metaData.style = "text-align:center; ";

                                                            const strCCUST = {
                                                                134: 'AVIANCA',
                                                                133: 'LACSA',
                                                                202: 'TACA',
                                                                547: 'AEROGAL'
                                                            };

                                                            const displayText = strCCUST[value] || 'AV GROUP';
                                                            const styleHref = '<a href="#payments-reports-form" ' +
                                                                    'style="color:#008FE3; text-decoration:underline; display:block; text-align:center;">';
                                                            const styleHref2 = '</a>';

                                                            return styleHref + displayText + styleHref2;
                                                        },
                                                        listeners: {
                                                            click: 'onGridDataDetailGridPending'
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Grant Total Pending</span>', menuDisabled: true, style: 'background:#AFC6EE;color:white !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#AFC6EE;color:white !important',
                                                        dataIndex: 'QTY_PENDING', width: 65, align: 'center',
                                                        listeners: {
                                                            click: 'onGridDataDetailGridPending'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#AFC6EE;color:white !important',
                                                        dataIndex: 'AMOUNT_PENDING_USD', width: 100, align: 'center',

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Chargeback  Confirmed - ID</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                menuDisabled: true,
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                        dataIndex: 'QTY_CHGBACK_ID', width: 60, align: 'center', //flex: 1
                                                        listeners: {
                                                            click: 'onGridDataDetailGridPending'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                        dataIndex: 'AMOUNT_CHGBACK_USD_ID', width: 90, align: 'center', //flex: 1

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;background-color:#f6f8fa;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                        menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_PENDING_SAP_ID', width: 90, align: 'center', //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCMATCH, ',0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_SEND_ID', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#7AB8EB;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_SAP_ID', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                }
                                                            },
                                                        ]},
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Chargeback Confirmed - IDM </span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                        dataIndex: 'QTY_CHGBACK_IDM', width: 60, align: 'center',
                                                        listeners: {
                                                            click: 'onGridDataDetailGridPending'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                        dataIndex: 'AMOUNT_CHGBACK_USD_IDM', width: 90, align: 'center',

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;background-color:#f6f8fa;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_PENDING_SAP_IDM', width: 90, align: 'center',
                                                                listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#f6f8fa;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCMATCH, ',0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_SEND_IDM', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#F9D88C;color:black !important',
                                                                dataIndex: 'AMOUNT_CHGBACK_SAP_IDM', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },

                                            {
                                                text: '<span style="color:black;font-weight:bold;">Accreditations Confirmed</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Qty</span>', dataIndex: 'QTY_ACRED_UN', width: 60, style: 'background:#D1FBD2;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDataDetailGridPending'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQRMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'AMOUNT_ACRED_UN_USD', style: 'background:#D1FBD2;color:black !important', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totARMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        columns: [

                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', dataIndex: 'AMOUNT_ACRED_UN_PENDING_SAP', width: 90, style: 'background:#D1FBD2;color:black !important', align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQRMATCH, ',0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SENT</span>', dataIndex: 'AMOUNT_ACRED_UN_SEND', style: 'background:#D1FBD2;color:black !important', width: 90, align: 'center', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, ',0,000.00') + '<b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>',
                                                                dataIndex: 'AMOUNT_ACRED_UN_SAP', width: 90, style: 'background:#D1FBD2;color:black !important', align: 'center ', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, ',0,000.00') + '<b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Pending Not Confirmed</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:white;font-weight:bold;">Qty</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                        dataIndex: 'QTY_PENDING_REAL', width: 60, align: 'center',
                                                        listeners: {
                                                            click: 'onGridDataDetailGridPending'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000') + '</b>';
                                                            return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:white;font-weight:bold;">Amount</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                        dataIndex: 'AMOUNT_PENDING_REAL_USD', width: 90, align: 'center',

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:white;font-weight:bold;">Accounting Amount</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:white;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                                dataIndex: 'AMOUNT_PENDING_REAL_PENDING_SAP', width: 90, align: 'center',
                                                                listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return '<a href="#payments-reports-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQAMATCH, ',0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:white;font-weight:bold;">SENT</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',
                                                                dataIndex: 'AMOUNT_PENDING_REAL_SEND', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:white;font-weight:bold;">SAP</span>', menuDisabled: true, style: 'background:#E64B3C;color:white !important',

                                                                dataIndex: 'AMOUNT_PENDING_REAL_SAP', width: 90, align: 'center',

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                                }, listeners: {
                                                                    click: 'onGridDataDetailGridPending'
                                                                }
                                                            },
                                                        ]},
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-SummaryMainDataPending',
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
                                        {
                                            width: 190,
                                            id: prototype.id + '-SPACE5',
                                            style: 'background:#AFC6EE; text-align:center; font-weight:bold; color:black;border-right:1px solid white',
                                            html: 'Totals'
                                        },
                                        {width: 65, id: prototype.id + '-QTY_TOTAL_GRANT_PENDING', style: 'background: #AFC6EE;text-align:right;border-right:1px solid white'},
                                        {width: 100, id: prototype.id + '-AMOUNT_TOTAL_GRANT_PENDING', style: 'background: #AFC6EE;text-align:right;border-right:1px solid white'},

                                        {width: 60, id: prototype.id + '-QTY_TOTAL_CHGBACK_ID_UNC', style: 'background: #7AB8EB;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_ID_UNC_USD', style: 'background: #7AB8EB;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_ID_UNC_PENDING_USD', style: 'background: #7AB8EB;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_ID_UNC_SEND', style: 'background: #7AB8EB;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_ID_UNC_SAP', style: 'background: #7AB8EB;text-align:right;border-right:1px solid white'},

                                        {width: 60, id: prototype.id + '-QTY_TOTAL_CHGBACK_IDM_UNC', style: 'background: #F9D88C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_IDM_UNC_USD', style: 'background: #F9D88C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_IDM_UNC_PENDING_USD', style: 'background: #F9D88C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_IDM_UNC_SEND', style: 'background: #F9D88C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_IDM_UNC_SAP', style: 'background: #F9D88C;text-align:right;border-right:1px solid white'},

                                        {width: 60, id: prototype.id + '-QTY_TOTAL_ACRE_UNC_QTY', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_ACRE_UNC_QTY_USD', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_ACRE_UNC_QTY_PENDING_USD', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_ACRE_UNC_QTY_SEND', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_TOTAL_ACRE_UNC_QTY_SAP', style: 'background: #D1FBD2;text-align:right;border-right:1px solid white'},

                                        {width: 60, id: prototype.id + '-QTY_PENDING_REAL', style: 'background: #E64B3C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_PENDING_REAL_USD', style: 'background: #E64B3C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_PENDING_REAL_PENDING_SAP', style: 'background: #E64B3C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_PENDING_REAL_SEND', style: 'background: #E64B3C;text-align:right;border-right:1px solid white'},
                                        {width: 90, id: prototype.id + '-AMOUNT_PENDING_REAL_SAP', style: 'background: #E64B3C;text-align:right;border-right:1px solid white'},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    margin: '30 0 0 20',
                                    layout: {
                                        type: 'hbox',
                                        align: 'top'
                                    },
                                    items: [
                                        // === GRÁFICO PIE EXISTENTE ===
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarSMPending',
                                                    width: 520,
                                                    border: false, // 👈 quitar borde del panel
                                                    bodyBorder: false, // 👈 quitar borde del body
                                                    bodyStyle: {
                                                        border: 'none', // 👈 asegurarse que no haya borde
                                                        background: '#FFFFFF'
                                                    },
                                                    //                    margin: '0 0 0 5',
                                                    hidden: false,
                                                    innerPadding: 28,
                                                    height: 280,
                                                    background: '#FFFFFF',
                                                    animation: {duration: 200},
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'right',
                                                        itemSpacing: 10,
                                                        marker: {size: 16},
                                                        label: {fontSize: 13},
                                                        style: {
                                                            background: '#FFFFFF'
                                                        }
                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            legendField: 'LABEL',
                                                            distortion: 0.7,
                                                            colors: ['#7AB8EB', '#F9D88C', '#D1FBD2', '#E64B3C'],
                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'outside',
                                                                font: '11px Arial',
                                                                calloutLine: {length: 25, width: 1},
                                                                renderer: function (value) {
                                                                    return value.split('\n')[1];
                                                                }
                                                            },
                                                            highlightCfg: {margin: 10},
                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },

                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            margin: '0 0 0 40',
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayBarSMPending',
                                                    width: 800,
                                                    height: 280,
                                                    insetPadding: 20,
                                                    border: false, // 👈 quitar borde
                                                    background: '#FFFFFF', // color de fondo
                                                    legend: {docked: 'bottom'},
                                                    axes: [
                                                        {type: 'numeric', position: 'left', title: 'Amount (USD)', grid: true},
                                                        {type: 'category', position: 'bottom', title: 'Category'}
                                                    ],
                                                    series: [{
                                                            type: 'bar',
                                                            xField: 'category',
                                                            yField: ['USD', 'SEND', 'SAP'],
                                                            stacked: false,
                                                            style: {opacity: 0.95},
                                                            colors: ['#A7C7F2', '#E3D7FF', '#B39DDB'], // 🎨 tonos pastel 💙💚💛
                                                            highlightCfg: {fillStyle: '#FFF2A8'}, // ligero resaltado pastel
                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (tooltip, record, item) {
                                                                    tooltip.setHtml(
                                                                            item.series.getTitle()[item.series.getYFieldIndex(item.field)] +
                                                                            ': ' + Ext.util.Format.number(record.get(item.field), '0,0')
                                                                            );
                                                                }
                                                            }
                                                        }]


                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1875,
                            id: prototype.id + '-boxDataDetail',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetail',
                                    width: 1875,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: '<span style="color:black;font-weight:bold;">Nbr.</span>', dataIndex: 'RN', width: 40, style: 'background:#AFC6EE;border-color:white', summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Society</span>', dataIndex: 'CCUST', width: 60, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Bank Name</span>', dataIndex: 'NAME', width: 170, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 60, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Account Numb.</span>', dataIndex: 'ACCNUMBER', width: 120, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Doc.SAP Bank</span>', dataIndex: 'BANDOC', width: 100, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 140, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Payment<br>Date</span>', dataIndex: 'PAYDATE', width: 80, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Card</span>', style: 'background:#AFC6EE;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">6.dig</span>', dataIndex: 'CAR6', width: 65, style: 'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                            return '';
                                                        }
                                                    },
                                                    {text: '<span style="color:black;font-weight:bold;">4.dig</span>', dataIndex: 'CAR4', width: 95, style: 'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                            return '';
                                                        }
                                                    }

                                                ]
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Auth. Code</span>', dataIndex: 'SAUTHOC', width: 80, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Merchand</span>', dataIndex: 'MERCHAND', width: 90, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Amount USD</span>', dataIndex: 'TOTAL', width: 110, align: 'center', menuDisabled: true, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, ',0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px;background:#AFC6EE;border-color:1px solid white;color:white';
                                                    return '<b style="color:black;font-weight:bold;">' + Ext.util.Format.number(data.totTOTAL, ',0,000.00') + '<b>';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Curr.</span>', dataIndex: 'SCURRENCY', width: 60, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Amount Local</span>', dataIndex: 'SVFOP', width: 110, align: 'center', menuDisabled: true, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, ',0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    console.log(data, 'data')
                                                    metaData.style = 'text-align:right; margin-right:3px;background:#AFC6EE;border-color: 1px solid white !important';
                                                    return '<b style="color:black;font-weight:bold;">' + Ext.util.Format.number(data.totSVFOP, ',0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Neto</span>', dataIndex: 'NETO', width: 110, align: 'center', menuDisabled: true, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    return Ext.util.Format.number(value, ',0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px;background:#AFC6EE;border-color:1px solid white;color:white';
                                                    return '<b style="color:black;font-weight:bold;">' + Ext.util.Format.number(data.totNETO, ',0,000.00') + '<b>';
                                                }
                                            },

                                            {
                                                text: '<span style="color:black;font-weight:bold;">Sales</span>', style: 'background:#AFC6EE;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">Date</span>', dataIndex: 'FTRAN', width: 80, style: 'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                            return '';
                                                        }
                                                    },
                                                    {text: '<span style="color:black;font-weight:bold;">Status</span>', dataIndex: 'DEBSTVAL', width: 60, style: 'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                            return '';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Type</span>', dataIndex: 'TYPE', width: 140, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Settl.<br>Status</span>', dataIndex: 'STVAL', width: 100, style: 'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
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
                        }
                    ]
                },
            ]
        },
        {
            region: 'south',
            xtype: 'panel',
            id: prototype.id + '-pie',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            border: false,
            height: 30,
            margin: '5 0 20 0',
            defaults: {
                border: false
            },
            items: [
                {
                    bodyStyle: 'background: #AFC6EE; border-radius: 5px;',
                    xtype: 'panel',
                    width: '30%',
                    height: '100%',
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
                            width: 50,
                            style: 'margin-top: 7px;color:black;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:black;font-weight:bold'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:black;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:black;font-weight:bold'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:black;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:black;font-weight:bold'
                        }
                    ]
                }
            ]
        }
    ]
}
);


