Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryLog', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLogProMasterTicketForm',
    requires: [
        'Ext.Praxis.controller.program.ProMasterTicket.DataEntryLogProMasterTicketController'
    ],
    controller: 'DataEntryLogProMasterTicketController',
    title: 'Payment Log - Browser',
    header: true,
    width: 1600,
    height: 660,
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
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%',
                        width: '100%'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                margin: '6 0 0 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Create Date',
                                    style: 'font-weight:bold;',
                                    padding: '4 0',
                                    width: 89
                                },
                                {xtype: 'tbspacer', width: 4},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-2-cmbDateFromYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: true,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 70,
                                    listConfig: {maxHeight: 111, minWidth: 70},
                                    listeners: {
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-2-cmbDateFromMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {minWidth: 60},
                                    width: 60,
                                    anchor: '100%',
                                    listeners: {
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-2-cmbDateFromDay',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    width: 60,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    listeners: {
                                        change: 'cbxDateFromDay_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-2-cmbDateToYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: true,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 70,
                                    hiddenLabel: false,
                                    listConfig: {maxHeight: 111, minWidth: 70}
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-2-cmbDateToMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {minWidth: 60},
                                    width: 60,
                                    anchor: '100%'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-2-cmbDateToDay',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 60,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111, minWidth: 60}
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 93},
                                {
                                    xtype: 'label',
                                    text: 'Ticket:',
                                    style: 'font-weight:bold;',
                                    padding: '4 0',
                                    width: 57
                                },
                                {
                                    xtype: 'textfield',
                                    value: '139',
                                    id: prototype.id+'-2-txtTicketCia',
                                    fieldStyle: 'text-align:center',
                                    maxLength: 3,
                                    width: 40,
                                    listeners:{
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    value: '99999999999',
                                    id: prototype.id+'-2-txtTicketForSer',
                                    fieldStyle: 'text-align:center',
                                    width: 110,
                                    maxLength: 11,
                                    listeners:{
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 42},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id+'-2-btn',
                                    boxLabel: '<b>Compare</b>',
                                    checked: true,
                                    width: 94,
                                    listeners:{
                                        change: 'btn_LogCompare',
                                    }
                                },
                                {xtype: 'tbspacer', width: 113},
                                //<editor-fold defaultstate="collapsed" desc="boxPagination">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-2-boxPagination',
                                    width: 197,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btn-pag-first',
                                                    iconCls: 'prx-icon-pagination-first',
                                                    tooltip: 'First Page',
                                                    listeners: {
                                                        click: 'pagFirst'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btn-pag-previous',
                                                    iconCls: 'prx-icon-pagination-previous',
                                                    tooltip: 'Previous Page',
                                                    listeners: {
                                                        click: 'pagPrevious'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btn-pag-next',
                                                    iconCls: 'prx-icon-pagination-next',
                                                    tooltip: 'Next Page',
                                                    listeners: {
                                                        click: 'pagNext'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btn-pag-last',
                                                    iconCls: 'prx-icon-pagination-last',
                                                    tooltip: 'Last Page',
                                                    listeners: {
                                                        click: 'pagLast'
                                                    }
                                                },
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id+'-2-paggin',
                                                    pageSize: 10,
                                                    border: false,
                                                    displayInfo: false,
                                                    hidden: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'panel',
                                    border: true,
                                    margin: '4 0',
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btnSearch',
                                                    iconCls: 'prx-icon-search',
                                                    tooltip: 'Search',
                                                    listeners: {
                                                        click: 'imgSearch_clickHandler'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btnExcel',
                                                    iconCls: 'prx-icon-excel',
                                                    tooltip: 'Export to Excel',
                                                    listeners: {
                                                        click: 'imgExcel_clickHandler'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btnClear',
                                                    iconCls: 'prx-icon-clear',
                                                    tooltip: 'Clear Options',
                                                    listeners: {
                                                        click: 'imgClear_clickHandler'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id+'-2-btnBack',
                                                    iconCls: 'prx-icon-back',
                                                    tooltip: 'Back',
                                                    listeners: {
                                                        click: 'imgBack_clickHandler'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 5},
                        {
                            region: 'center',
                            id: prototype.id+'-2-boxMainData',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: true,
                                align: 'center'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-2-gridData',
                                    width: '99%',
                                    height: 432,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Create',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    { text: 'User', dataIndex: 'USCR', width: 70 },
                                                    { text: 'Date', dataIndex: 'strFecha2', width: 70 },
                                                    { text: 'Hour', dataIndex: 'strFecha', width: 60 }
                                                ]
                                            },
                                            {
                                                text: 'Trans.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    { text: 'Date', dataIndex: 'AIDATE', width: 60 }
                                                ]
                                            },
                                            {
                                                text: 'Doc.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    { text: 'Type', dataIndex: 'strDescrip', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'strDescrip3', flex: 1,//width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescrip3 + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Error', dataIndex: 'CERROR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.CERROR+' - '+data.A1531CAPL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'FOP SALES',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            { text: 'Code', dataIndex: 'SCARCOD', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strSCARCOD + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            { text: 'Number', dataIndex: 'SCARDN', width: 95,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Autho.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            { text: 'Code', dataIndex: 'SAUTHOC', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    { text: 'PNR', dataIndex: 'SPNR', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Curr.', dataIndex: 'SCURRENCY', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Amount', dataIndex: 'SVFOP', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'FOP ACCB',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            { text: 'Code', dataIndex: 'ACARCOD', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#b5d0f9;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strACARCOD + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            { text: 'Number', dataIndex: 'ACARDN', width: 95,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#b5d0f9;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Autho.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            { text: 'Code', dataIndex: 'AAUTHOC', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#b5d0f9;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    { text: 'PNR', dataIndex: 'APNR', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#b5d0f9;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Curr.', dataIndex: 'ACURRENCY', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#b5d0f9;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Amount', dataIndex: 'AVFOP', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b5d0f9;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Merchant',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    { text: 'Number', dataIndex: 'MERCHN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Descrip. Message', dataIndex: 'MENSA', width: 130,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.MENSA + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="boxPaginacion">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-2-boxPaginacion',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    width: '99%',
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            height: '100%',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                margin: '3px 0px 0px 5px'
                                            },
                                            items: [
                                                {
                                                    text: 'Page',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id+'-2-lblPagActual',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id+'-2-lblPagTotal',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id+'-2-lblRowsTotal',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                    ]
                }
            ]
        }
    ],
    dockedItems: [
    ]
});