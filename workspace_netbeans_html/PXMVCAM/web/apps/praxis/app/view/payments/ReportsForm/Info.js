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
                            width: 1765,
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
                                    width: 1765,
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
                                            {text: '<span style="color:black;font-weight:bold;">Nbr.</span>', dataIndex: 'RN', width: 40,style:'background:#AFC6EE;border-color:white',
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Society</span>', dataIndex: 'CCUST', width: 60,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Bank Name</span>', dataIndex: 'NAME', width: 170,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 60,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Account Numb.</span>', dataIndex: 'ACCNUMBER', width: 120,style:'background:#AFC6EE;border-color:white',
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
                                            {text: '<span style="color:black;font-weight:bold;">Doc.SAP Bank</span>', dataIndex: 'BANDOC', width: 100,style:'background:#AFC6EE;border-color:white',
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
                                            {text: '<span style="color:black;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 140,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Payment<br>Date</span>', dataIndex: 'PAYDATE', width: 80,style:'background:#AFC6EE;border-color:white',
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
                                                text: '<span style="color:black;font-weight:bold;">Card</span>',style:'background:#AFC6EE;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">6.dig</span>', dataIndex: 'CAR6', width: 65,style:'background:#AFC6EE;border-color:white',
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
                                                    {text: '<span style="color:black;font-weight:bold;">4.dig</span>', dataIndex: 'CAR4', width: 95,style:'background:#AFC6EE;border-color:white',
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
                                            {text: '<span style="color:black;font-weight:bold;">Auth. Code</span>', dataIndex: 'SAUTHOC', width: 80,style:'background:#AFC6EE;border-color:white',
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
                                            {text: '<span style="color:black;font-weight:bold;">Merchand</span>', dataIndex: 'MERCHAND', width: 90,style:'background:#AFC6EE;border-color:white',
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
                                                text: '<span style="color:black;font-weight:bold;">Total</span>', dataIndex: 'TOTAL', width: 110, align: 'center', menuDisabled: true,style:'background:#AFC6EE;border-color:white',
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
                                            {text: '<span style="color:black;font-weight:bold;">Curr.</span>', dataIndex: 'SCURRENCY', width: 60,style:'background:#AFC6EE;border-color:white',
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
                                                text: '<span style="color:black;font-weight:bold;">Neto</span>', dataIndex: 'NETO', width: 110, align: 'center', menuDisabled: true,style:'background:#AFC6EE;border-color:white',
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
                                                text: '<span style="color:black;font-weight:bold;">Sales</span>',style:'background:#AFC6EE;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">Date</span>', dataIndex: 'FTRAN', width: 80,style:'background:#AFC6EE;border-color:white',
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
                                                    {text: '<span style="color:black;font-weight:bold;">Status</span>', dataIndex: 'DEBSTVAL', width: 60,style:'background:#AFC6EE;border-color:white',
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
                                            {text: '<span style="color:black;font-weight:bold;">Type</span>', dataIndex: 'TYPE', width: 140,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Settl.<br>Status</span>', dataIndex: 'STVAL', width: 100,style:'background:#AFC6EE;border-color:white',
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
                            width: 2090,
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
                                                    width: 2090,
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
                                                                text: '<span style="color:black;font-weight:bold;">Debits USD</span>', menuDisabled: true,style:'background:#AFC6EE;color:black !important',
                                                                columns: [
                                                                    {
                                                                text: '<span style="color:black;font-weight:bold;">Month</span>', style:'background:#AFC6EE;color:black !important',
                                                                dataIndex: 'strFormatDate', width: 120, align: 'center', xtype: 'treecolumn',
                                                                listeners: {
                                                                    click: 'onGridCountry'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return  !record.data.children ? ' ' : value;
                                                                }
                                                            },
                                                                    {
                                                                text: '<span style="color:black;font-weight:bold;">Av Group</span>', style:'background:#AFC6EE;color:black !important',
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
                                                                        text: '<span style="color:black;font-weight:bold;">Grant Total</span>', menuDisabled: true,style:'background:#AFC6EE;color:white !important',
                                                                        columns: [
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true,style:'background:#AFC6EE;color:white !important',
                                                                                dataIndex: 'QTY_GRANT', width: 80, align: 'center',
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
                                                                                 text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true,style:'background:#AFC6EE;color:white !important',
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
                                                                        text: '<span style="color:black;font-weight:bold;">Refund</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                                        columns: [
                                                                            {
                                                                               text: '<span style="color:black;font-weight:bold;">Qty</span>', dataIndex: 'QTY_REFUND', width: 60, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
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
                                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'AMOUNT_REFUND_USD', style:'background:#FBD2D1;color:black !important',width: 80, align: 'center', menuDisabled: true, //flex: 1

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
                                                                                text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                                                columns: [
                                                                                    
                                                                            {
                                                                               text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', dataIndex: 'AMOUNT_REFUND_PENDING_SAP', width: 80, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
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
                                                                                text:  '<span style="color:black;font-weight:bold;">SENT</span>' , dataIndex: 'AMOUNT_REFUND_SEND', style:'background:#FBD2D1;color:black !important',width: 80, align: 'center', menuDisabled: true, //flex: 1

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
                                                                                  text:  '<span style="color:black;font-weight:bold;">SAP</span>' ,
                                                                                 dataIndex: 'AMOUNT_REFUND_SAP', width: 80, style:'background:#FBD2D1;color:black !important',align: 'center ', menuDisabled: true, //flex: 1

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
                                                                        text: '<span style="color:black;font-weight:bold;">Chgbck</span>', menuDisabled: true,style:'background:#CFE9F6;color:black !important',
                                                                         menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true,style:'background:#CFE9F6;color:black !important',
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
                                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true,style:'background:#CFE9F6;color:black !important',
                                                                                 dataIndex: 'AMOUNT_CHGBACK_USD', width: 80, align: 'center', //flex: 1

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
                                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true,style:'background:#CFE9F6;color:black !important',
                                                                         menuDisabled: true,
                                                                        columns: [
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true,style:'background:#CFE9F6;color:black !important',
                                                                                 dataIndex: 'AMOUNT_CHGBACK_PENDING_SAP', width: 80, align: 'center', //flex: 1
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
                                                                                 text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true,style:'background:#CFE9F6;color:black !important',
                                                                              dataIndex: 'AMOUNT_CHGBACK_SEND', width: 80, align: 'center', 

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                                },listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                                            },
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true,style:'background:#CFE9F6;color:black !important',
                                                                               dataIndex: 'AMOUNT_CHGBACK_SAP', width: 80, align: 'center',

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                                },listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                                            },
                                                                        ]},
                                                                            
                                                                        ]
                                                                    }, 
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Reverse Chgbck</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                                        columns: [
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
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
                                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                                                dataIndex: 'AMOUNT_REVERSE_CHGBACK_USD', width: 80, align: 'center',

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
                                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                                        columns: [
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                                                dataIndex: 'AMOUNT_REVERSE_PENDING_CHGBACK_SAP', width: 80, align: 'center',
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
                                                                            {text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                                                 dataIndex: 'AMOUNT_REVERSE_CHGBACK_SEND', width: 80, align: 'center', 
                                                                                
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                                },listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                                            },
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                                                dataIndex: 'AMOUNT_REVERSE_CHGBACK_SAP', width: 80, align: 'center', 

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totACMATCH, ',0,000.00') + '<b>';
                                                                                },listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                                            },
                                                                        ]
                                                                    },
                                                                            
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '<span style="color:black;font-weight:bold;">Acredit</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                                        columns: [
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
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
                                                                                 text: '<span style="color:black;font-weight:bold;">Amount</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                                                dataIndex: 'AMOUNT_ACRED_USD', width: 80, align: 'center', 

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
                                                                        text: '<span style="color:black;font-weight:bold;">Accounting Amount</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                                        columns: [
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">Pending <br> To Sent</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                                                 dataIndex: 'AMOUNT_ACRED_PENDING_SAP', width: 80, align: 'center', 
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
                                                                                text: '<span style="color:black;font-weight:bold;">SENT</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                                                dataIndex: 'AMOUNT_ACRED_SEND', width: 80, align: 'center', 

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                                                },listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                                            },
                                                                            {
                                                                                text: '<span style="color:black;font-weight:bold;">SAP</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                                                
                                                                                dataIndex: 'AMOUNT_ACRED_SAP', width: 80, align: 'center', 

                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                   metaData.style = "color:#057ECB;text-align:right;text-decoration:underline;cursor: pointer";
                                                                                    value = '<b>' + Ext.util.Format.number(value, ',0,000.00') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totAAMATCH, ',0,000.00') + '<b>';
                                                                                },listeners: {
                                                                    click: 'onGridDataDetail'
                                                                }
                                                                            },
                                                                        ]},
                                                                            
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '<span style="color:whitefont-weight:bold;">Pending</span>', menuDisabled: true,style:'background:#E64B3C;color:white !important',
                                                                        columns: [
                                                                            {
                                                                                text: '<span style="color:white;font-weight:bold;">Qty</span>', menuDisabled: true,style:'background:#E64B3C;color:white !important',
                                                                                dataIndex: 'QTY_PENDING', width: 80, align: 'center',
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
                                                                                 text: '<span style="color:white;font-weight:bold;">Amount</span>', menuDisabled: true,style:'background:#E64B3C;color:white !important',
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
                                        {
                                            width: 204,
                                            id: prototype.id + '-SPACE1',
                                            style: 'background:#AFC6EE; text-align:center; font-weight:bold; color:black;',
                                            html: 'Totals'
                                        },
                                         {width: 80, id: prototype.id + '-QTY_TOTAL_GRANT',style:'background: #AFC6EE;text-align:right'},
                                        {width: 100, id: prototype.id + '-AMOUNT_TOTAL_GRANT',style:'background: #AFC6EE;text-align:right'},
                                        {width: 60, id: prototype.id + '-QTY_TOTAL_REFUND',style:'background: #FBD2D1;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REFUND_USD',style:'background: #FBD2D1;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REFUND_PENDING_USD',style:'background: #FBD2D1;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REFUND_SEND',style:'background: #FBD2D1;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REFUND_SAP',style:'background: #FBD2D1;text-align:right'},

                                        {width: 60, id: prototype.id + '-QTY_TOTAL_CHGBACK',style:'background: #CFE9F6;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_USD',style:'background: #CFE9F6;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_PENDING_USD',style:'background: #CFE9F6;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SEND',style:'background: #CFE9F6;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_CHGBACK_SAP',style:'background: #CFE9F6;text-align:right'},

                                         {width: 60, id: prototype.id + '-QTY_TOTAL_REVERSE_CHGBACK',style:'background: #D6D6D6;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_USD',style:'background: #D6D6D6;text-align:right'},
                                         {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD',style:'background: #D6D6D6;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SEND',style:'background: #D6D6D6;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SAP',style:'background: #D6D6D6;text-align:right'},

                                         {width: 60, id: prototype.id + '-QTY_TOTAL_ACRED',style:'background: #D1FBD2;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_ACRED_USD',style:'background: #D1FBD2;text-align:right'},
                                         {width: 80, id: prototype.id + '-AMOUNT_TOTAL_ACRED_PENDING_USD',style:'background: #D1FBD2;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_ACRED_SEND',style:'background: #D1FBD2;text-align:right'},
                                        {width: 80, id: prototype.id + '-AMOUNT_TOTAL_ACRED_SAP',style:'background: #D1FBD2;text-align:right'},



                                         {width: 80, id: prototype.id + '-QTY_TOTAL_PENDING',style:'background: #E64B3C;text-align:right'},
                                        {width: 100, id: prototype.id + '-AMOUNT_TOTAL_PENDING_USD',style:'background: #E64B3C;text-align:right'},
                                        {hidden:true,width: 80, id: prototype.id + '-AMOUNT_TOTAL_PENDING_SEND',style:'background: #E64B3C;text-align:right'},
                                        {hidden:true,width: 80, id: prototype.id + '-AMOUNT_TOTAL_PENDING_SAP',style:'background: #E64B3C;text-align:right'},


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
                    id: prototype.id + '-displayPolarSM',
                    width: 520,
                    border: false,        // 👈 quitar borde del panel
                    bodyBorder: false,    // 👈 quitar borde del body
                    bodyStyle: {
                        border: 'none',   // 👈 asegurarse que no haya borde
                        background: '#FFFFFF'
                    },
//                    margin: '0 0 0 5',
                    hidden: false,
                    innerPadding: 28,
                    height: 280,
                    background: '#FFFFFF',
                    animation: { duration: 200 },
                    interactions: ['rotate', 'itemhighlight'],
                    legend: {
                        docked: 'right',
                        itemSpacing: 10,
                        marker: { size: 16 },
                        label: { fontSize: 13 },
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
                            calloutLine: { length: 25, width: 1 },
                            renderer: function (value) {
                                return value.split('\n')[1];
                            }
                        },
                        highlightCfg: { margin: 10 },
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
            border: false,           // 👈 quitar borde
            background: '#FFFFFF',   // color de fondo
            legend: { docked: 'bottom' },
            axes: [
                { type: 'numeric', position: 'left', title: 'Amount (USD)', grid: true },
                { type: 'category', position: 'bottom', title: 'Category' }
            ],
            series: [{
    type: 'bar',
    xField: 'category',
    yField: ['USD', 'SEND', 'SAP'],
    stacked: false,
    style: { opacity: 0.95 },
    colors: ['#A7C7F2', '#E3D7FF', '#B39DDB'], // 🎨 tonos pastel 💙💚💛
    highlightCfg: { fillStyle: '#FFF2A8' },    // ligero resaltado pastel
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
                            width: 1765,
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
                                    width: 1765,
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
                                            {text: '<span style="color:black;font-weight:bold;">Nbr.</span>', dataIndex: 'RN', width: 40,style:'background:#AFC6EE;border-color:white',summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Society</span>', dataIndex: 'CCUST', width: 60,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Bank Name</span>', dataIndex: 'NAME', width: 170,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 60,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Account Numb.</span>', dataIndex: 'ACCNUMBER', width: 120,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Doc.SAP Bank</span>', dataIndex: 'BANDOC', width: 100,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 140,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Payment<br>Date</span>', dataIndex: 'PAYDATE', width: 80,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Card</span>',style:'background:#AFC6EE;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">6.dig</span>', dataIndex: 'CAR6', width: 65,style:'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                                    },
                                                    {text: '<span style="color:black;font-weight:bold;">4.dig</span>', dataIndex: 'CAR4', width: 95,style:'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                                    }

                                                ]
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Auth. Code</span>', dataIndex: 'SAUTHOC', width: 80,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Merchand</span>', dataIndex: 'MERCHAND', width: 90,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    metaData.unselectableAttr = "unselectable='off'";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Total</span>', dataIndex: 'TOTAL', width: 110, align: 'center', menuDisabled: true,style:'background:#AFC6EE;border-color:white',
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
                                            {text: '<span style="color:black;font-weight:bold;">Curr.</span>', dataIndex: 'SCURRENCY', width: 60,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Neto</span>', dataIndex: 'NETO', width: 110, align: 'center', menuDisabled: true,style:'background:#AFC6EE;border-color:white',
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
                                                text: '<span style="color:black;font-weight:bold;">Sales</span>',style:'background:#AFC6EE;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">Date</span>', dataIndex: 'FTRAN', width: 80,style:'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return value;
                                                        },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                                    },
                                                    {text: '<span style="color:black;font-weight:bold;">Status</span>', dataIndex: 'DEBSTVAL', width: 60,style:'background:#AFC6EE;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                                    },
                                                ]
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Type</span>', dataIndex: 'TYPE', width: 140,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'background:#AFC6EE;border-right: 1px solid white ';
                                                    return '';
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Settl.<br>Status</span>', dataIndex: 'STVAL', width: 100,style:'background:#AFC6EE;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
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


