
prototype.id = 'LoadReportForm';
prototype.idInfInteract = 'DataEntryInfInteract';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 768;
prototype.url = CONTEXTPATH + '/LoadReport';

Ext.define('Ext.Praxis.view.sales.LoadReportForm.LoadReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.LoadReportForm',
    requires: [
        'Ext.Praxis.controller.sales.LoadReport.LoadReportController',
        'Ext.Praxis.view.sales.LoadReportForm.DataEntryInfInteract'
    ],
    controller: 'LoadReportController',
    id: prototype.id + '-Contenedor',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,
    defaults: {
        border: false
    },
    listeners: {
        beforeShow: 'OnBeforeShow'
    },
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: prototype.widthContenedor,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        /*{
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items: [
                                {
                                    xtype: 'Paginator',
                                    id: prototype.id + '-paggin',
                                    pagInfo: [
                                        prototype.id + '-lbl-currentPage',
                                        prototype.id + '-lbl-pageCount',
                                        prototype.id + '-lbl-total'
                                    ]
                                }
                            ]
                        },*/
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnSearch',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'btnSearch_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnFilter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Display filter',
                                    listeners: {
                                        click: 'btnFilter_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnExcel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'btnExcel_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnClear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'btnClear_click'
                                    }
                                },
                                /*{
                                    xtype: 'button',
                                    id: prototype.id + '-btnAdd',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'New',
                                    listeners: {
                                        click: 'btnAdd_click'
                                    }
                                },*/
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnBack',
                                    iconCls: 'prx-icon-back',
                                    tooltip: 'Back',
                                    listeners: 'btnBack_click'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-filters',
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        bodyStyle: 'background: transparent',
                        border: false,
                        padding: '5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters',
                            border: false,
                            layout: 'column',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '8px 5px 8px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDate',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 110,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listeners: {
                                        //change: 'onChangeCmbDate'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelFrom',
                                    text: 'From:',
                                    style: 'font-weight:bold;',
                                    padding: '10 5 5 5'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYear',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 70,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onFromYearChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonth',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 55,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listeners: {
                                        change: 'onFromMonthChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateDay',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 55,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onFromDayChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTo',
                                    text: 'To:',
                                    style: 'font-weight:bold;',
                                    padding: '10 5 5 5'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYear2',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 70,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onToYearChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonth2',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 55,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listeners: {
                                        change: 'onToMonthChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateDay2',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 55,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onToDayChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbState',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: 'State',
                                    width: 150,
                                    labelWidth: 40,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbStatus',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 110,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listeners: {
                                        //change: 'onChangeCmbSource'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtStation',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: 'Station',
                                    width: 130,
                                    labelWidth: 45,
                                    enableKeyEvents: true,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbStatusAmt',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: 'Status Amount',
                                    width: 150,
                                    labelWidth: 90,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    id: prototype.id+ '-tabMain',
                    width: 1370,
                    height: 540,
                    anchor: '100%',
                    margin: '1 1 1 1',
                    autoScroll: true,
                    bodyStyle: 'background: transparent',
                    listeners: {
                        tabchange: 'onChangeTab'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="By IATA">
                        {
                            xtype: 'panel',
                            title: 'By IATA',
                            id: prototype.id+ '-tabIata',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'grid',
                                    //padding: '20 0 0 0',
                                    id: prototype.id + '-gridData',
                                    width: 1350,//prototype.widthContenedor,
                                    height: 530,
                                    columnLines: true,
                                    //resizable: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            //resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Item', width: 50, dataIndex: 'item', align: 'right'},
                                            /*{
                                                text: 'Action',
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 50,
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            },*/
                                            {text: 'Open Date', width: 80, dataIndex: 'FREPOR'},
                                            {
                                                text: 'Interact',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Seq', width: 40, dataIndex: 'SEQ'},
                                                    {text: 'Station', width: 70, dataIndex: 'STATION'},
                                                    {text: 'Code', width: 60, dataIndex: 'CODE'},
                                                    {text: 'OP Date', width: 60, dataIndex: 'OPDT'},
                                                    {text: 'OP Time', width: 60, dataIndex: 'OPTM'},
                                                    {text: 'ST', width: 30, dataIndex: 'ST'},
                                                    {text: 'CL Date', width: 60, dataIndex: 'CLDT'},
                                                    {text: 'CL Time', width: 60, dataIndex: 'CLTM'},
                                                    {text: 'XT Date', width: 60, dataIndex: 'XTDT'},
                                                    {text: 'XT Time', width: 60, dataIndex: 'XTTM'},
                                                    {
                                                        text: 'Status<br>Amount', width: 65, dataIndex: 'SAMT',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#sales-load-report-form" style="color:#244066;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onInfInteract'
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Transfer<br>Date', width: 80, dataIndex: 'FTRANS'},
                                            //{text: 'Procesing<br>Date', width: 100, dataIndex: 'A1530FPROC'},
                                            {
                                                text: 'Total Transactions',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Interact', dataIndex: 'XTST', width: 65,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Voids', dataIndex: 'VOIDS', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Differences', dataIndex: 'diffTransactions', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var status = record.data.diffTransactions;
                                                            if (status !== 0) {
                                                                metaData.style = 'text-align:right; margin-left:0px;color:#FF0000;font-weight:bold'
                                                            } else {
                                                                metaData.style = 'text-align:right; margin-left:0px;color:#339900;font-weight:bold'
                                                            }
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'State', width: 80, dataIndex: 'processState'},
                                            {text: 'User', width: 70, dataIndex: 'userLastModify'},
                                            {text: 'Date', width: 80, dataIndex: 'dateLastModify'}
                                        ]
                                    },
                                    viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                        //scrollable: 'vertical'
                                    }
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="By Amount">
                        {
                            xtype: 'panel',
                            title: 'By Amount',
                            id: prototype.id+ '-tabAmount',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'grid',
                                    //padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataAmt',
                                    width: 1350,//prototype.widthContenedor,
                                    height: 530,
                                    columnLines: true,
                                    //resizable: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            //resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Station', width: 65, dataIndex: 'WKSTAT',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-load-report-form" style="color:#244066;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onConciliationTexto'
                                                }
                                            },
                                            {text: 'Open Date', width: 80, dataIndex: 'FREPOR'},
                                            {text: 'Currency', width: 65, dataIndex: 'MDA'},
                                            {
                                                text: 'Header',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 70, dataIndex: 'HDTE'},
                                                    {text: 'Name', width: 50, dataIndex: 'HNAME'},
                                                    {text: 'Status', width: 80, dataIndex: 'HSTATUS'}
                                                ]
                                            },
                                            {
                                                text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cash', dataIndex: 'SCASH', width: 65,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Credit', dataIndex: 'SCREDIT', width: 65,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Exchange', dataIndex: 'TEXCHA', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'T.Voucher', dataIndex: 'TTVOUCHER', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Refund',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cash', dataIndex: 'RCASH', width: 65,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Credit', dataIndex: 'RCREDIT', width: 65,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'T.Voucher', dataIndex: 'RTVOUCHER', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Praxis',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cash', dataIndex: 'NCASH', width: 65,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Credit', dataIndex: 'NCREDIT', width: 65,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Exchange', dataIndex: 'NEXCHA', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'T.Voucher', dataIndex: 'NTVOUCHER', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align :right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'User', width: 70, dataIndex: 'userLastModify'},
                                            {text: 'Date', width: 80, dataIndex: 'dateLastModify'}
                                        ]
                                    },
                                    viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                        //scrollable: 'vertical'
                                    }
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});