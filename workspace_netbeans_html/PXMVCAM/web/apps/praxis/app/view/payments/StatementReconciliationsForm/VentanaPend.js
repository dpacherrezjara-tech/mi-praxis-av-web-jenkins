Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.VentanaPend', {
    extend: 'Ext.window.Window',
    alias: 'widget.VentanaPendStatementReconciliationsForm',
    requires: [
        'Ext.Praxis.controller.payments.StatementReconciliations.VentanaPendController'
    ],
    controller: 'VentanaPendController',
    title: 'Query MPF060',
    header: true,
    height: 770,
    width: 760,
    resizable: false,
    
    layout: 'fit',
    modal: false,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            bodyStyle: 'background-color: #E3EAF9;',
            layout: {
                type: 'vbox',
//                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    border: true,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    width: 742,
//                    margin: '0 0 10 445',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxPaginacion_PEND',
                            hidden: false,
                            width: 100,
                            border: false,
                            items: [
                                {
                                    xtype: 'toolbar',
                                    cls: 'x-toolbar-pag',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn-pag-first_PEND',
                                            iconCls: 'prx-icon-pagination-first',
                                            tooltip: 'First Page',
                                            handler: 'pagFirst'

                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn-pag-previous_PEND',
                                            iconCls: 'prx-icon-pagination-previous',
                                            tooltip: 'Previous Page',
                                            handler: 'pagPrevious'

                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn-pag-next_PEND',
                                            iconCls: 'prx-icon-pagination-next',
                                            tooltip: 'Next Page',
                                            handler: 'pagNext'

                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn-pag-last_PEND',
                                            iconCls: 'prx-icon-pagination-last',
                                            tooltip: 'Last Page',
                                            handler: 'pagLast'

                                        },
                                        {
                                            xtype: 'pagingtoolbar',
                                            id: prototype.id + '-paggin_PEND',
                                            pageSize: 10,
                                            border: false,
                                            displayInfo: false,
                                            hidden: true
                                        },
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'panel',
                            border: true,
                            items: [
                                {
                                    xtype: 'toolbar',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearch_PEND',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            handler: 'searchQueryPend'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnExcel_PEND',
                                            iconCls: 'prx-icon-excel',
                                            tooltip: 'Export to Excel',
                                            handler: 'exportQueryPend'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnClear_PEND',
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Clear Options',
                                            handler: 'cleanFiltersQueryPend'
                                        },
//                                        {
//                                            xtype: 'button',
//                                            id: prototype.id + '-btnBack_PEND',
//                                            iconCls: 'prx-icon-back',
//                                            tooltip: 'Back'
//                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                        
                    
                },
                {
                    xtype: 'panel',
//                    id: prototype.id + '-panelScanCard',
                    layout: 'hbox',
                    hidden: false,
                    border: false,
//                    margin: '0 2 10 5px',
                    bodyStyle: 'background-color: #E3EAF9;',
                    items: [
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Value Date:',
                            textAlign: 'center',
//                            labelStyle: 'background: #E3EAF9',
//                            style: 'font-weight:bold;color:#0B333C;',
                            margin: '4 4 4 4',
                            width: 70
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtADATE_PEND',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            formatText: '',
                            invalidText: 'Format valid YYYY/MM/DD',
                            minValue: new Date(1990, 00, 01),
                            maskRe: /[0-9/]/,
                            editable: false,
                            enforceMaxLength: true,
                            maxLength: 10,
                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Sale Date:',
                            textAlign: 'center',
//                            style: 'font-weight:bold;color:#0B333C;',
                            margin: '4 4 4 4',
                            width: 70
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtFromSDATE_PEND',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            formatText: '',
                            invalidText: 'Format valid YYYY/MM/DD',
                            minValue: new Date(1990, 00, 01),
                            maskRe: /[0-9/]/,
                            editable: false,
                            enforceMaxLength: true,
                            maxLength: 10,
                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Acc Number:',
                            textAlign: 'center',
//                            style: 'font-weight:bold;color:#0B333C;',
                            margin: '4 4 4 4',
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtACCNUMBER_PEND',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 16,
                            width: 120,
                            enableKeyEvents: true,
                        },
                        
                        
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    boder: false,
                    bodyStyle: 'background-color: #E3EAF9;',
                    items: [
                        
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Amount:',
                            textAlign: 'center',
//                            style: 'font-weight:bold;color:#0B333C;',
                            margin: '4 4 4 4',
                            width: 70
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtNETO_PEND',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 16,
                            width: 90,
                            enableKeyEvents: true,
                        },
                        {xtype: 'tbspacer', width: 14},
                        {
                            xtype: 'label',
                            text: 'Doc. Type:',
//                            padding: '3 0 0 25',
                            width: 70,
                        },
                        {xtype: 'tbspacer', width: 9},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDocType_PEND',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'value',
                            displayField: 'description',
                            fieldStyle: 'text-align: left;',
                            width: 90,
                            hidden: false,
                            value: '',
                             store: {
                                fields: ['value', 'description'],
                                data: [
                                    { value: '', description: 'All'},
                                    { value: 'S', description: 'Sales' },
                                    { value: 'D', description: 'Debits' }
                                ]
                            }
                        },
                        {xtype: 'tbspacer', width: 19},
                        {
                            xtype: 'label',
                            text: 'Unique Code:',
                            textAlign: 'center',
//                            style: 'font-weight:bold;color:#0B333C;',
                            margin: '4 0 4 4',
                            width: 75
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtUNICODE_PEND',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 15,
                            width: 120,
                            enableKeyEvents: true,
                            listeners: {
//                                change: 'cambiaParams'
                            }
                        },
                    ]
                },
                {
                    xtype: 'panel',
//                    id: prototype.id + '-panelScanCard2',
                    layout: 'hbox',
                    hidden: false,
                    border: false,
//                    margin: '0 2 0 20',
                    bodyStyle: 'background-color: #E3EAF9;',
                    items: [
                        
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Card Code:',
                            textAlign: 'center',
//                            style: 'font-weight:bold;color:#0B333C;',
                            margin: '4 4 4 4',
                            width: 70
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSCARCOD_PEND',
//                            style: 'font-weight:bold;color:#0B333C;',
                            fieldStyle: 'text-align:left;',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            value: '',
                            width: 273,
                            labelWidth: 10,
                            hidden: false,
                            hiddenLabel: false,
                            editable: false
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Code Bank',
                            id: prototype.id + '-cmbBank_PEND',
                            queryMode: 'local',
                            margin: '0 0 0 23',
                            valueField: 'CODEBANK',
                            displayField: 'IN_CODE_IN_NAME',
                            emptyText: 'All',
                            value: '',
                            fieldStyle: 'text-align: left;',
                            width: 250,
                            labelWidth: 85,
                            labelAlign: 'left'
                        }
                        
                        
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelPendings',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: false,
                    width: 742,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataPendings',
                            bodyStyle: 'background: transparent;',
                            width: 742,
                            titleAlign: 'center',
                            columnLines: true,
                            enableColumnMove: false,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    resizable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                            return value;
                                        }
                                    },
                                    {text: 'Doc. Type', dataIndex: 'descTDOC', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Code. Bank', dataIndex: 'CODEBANK', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Unique Code', dataIndex: 'UNICODE', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Doc SAP Bank', dataIndex: 'BANDOC', width: 110, hidden: true,
                                        listeners: {
                                            click: 'onGridDetDetails'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = record.data.STVAL == 'Match' ? "text-align:center;color:#057ECB" : "text-align:center;";
                                            return record.data.STVAL == 'Match' ? '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>' : value;
                                        },
                                    },
                                    {
                                        text: 'Conciliacion - Fase I',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Abono<br>Date', dataIndex: 'ADATE', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                                    return value;
                                                }
                                            },
                                            {text: 'Neto EECC', dataIndex: 'NETO', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetLiquidaByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETO, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                    return value
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetLiquidaByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETOC, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },

                                    {
                                        text: 'Qty',
                                        columns: [
                                            {
                                                text: 'Sett.', dataIndex: 'QTYSETT', width: 50, align: 'center', 
                                                listeners: {
//                                                            click: 'onGridDataCross'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#244066;text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPendings').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return data.lngTotQTOTSAL;
                                                }
                                            }
                                        ]
                                    },
                                ]
                            }
                        }
                        
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie_PEND',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    width: 742,
                    hidden: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    items: [
                        {
                            xtype: 'panel',
                            width: 742,
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
                                    id: prototype.id + '-lbl-currentPage_PEND',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount_PEND',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total_PEND',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
    ]
}
);