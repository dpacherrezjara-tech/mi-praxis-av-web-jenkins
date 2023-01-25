Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryReconciliationPaymentForm',
    requires:[
        'Ext.Praxis.controller.payments.ReconciliationPayment.DataEntryReconciliationPaymentController'
    ],
    controller: 'DataEntryReconciliationPaymentController',
    title:'Payment Reconciliation - Data Entry Form',
    header:true,
    height: 640,
    width: 1320,
    resizable:false,
    layout:'fit',
    modal:true,
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
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                width: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-1-boxSearchFilter',
                                            bodyStyle: 'background: #E3EAF9;"',
                                            layout: 'hbox',
                                            border: true,
                                            width: '100%',
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    html: '<strong style="font-weight:bold;">Search By: </strong>',
                                                    padding: '11 0 0 0'
                                                },
                                                {xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id+'-1-cbxSearchBy',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
//                                                            ["", "Select"], ["1", "Ticket"], ["2", "Pax Name"],
                                                            ["3", "PNR"]
//                                                            , ["4", "C.Card"], ["5", "IATA"], ["6","ADM/ACM"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    allowBlank: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: true,
                                                    width: 100,
                                                    value: "3",
//                                                    emptyText: 'Select',
                                                    valueField: 'code', displayField: 'name',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    typeAhead: true,
                                                    padding: '9 0 0 0',
                                                    triggerAction: 'all',
                                                    listeners: {
                                                        change: 'cbxSearchBy_changeHandler'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-1-Box_Option01',
                                                    bodyStyle: 'background: transparent;',
                                                    layout: 'hbox',
                                                    padding: '9 0 0 0',
                                                    border: false,
                                                    hidden: true,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Ticket Number:',
                                                            padding: '4 0 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtTicketCia',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            width: 40,      
                                                            value: '',
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                keypress: 'onTextKeypress',
                                                                keyup: 'txtFilterValue_keyUpHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtTicketForSer',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 10,
                                                            width: 110,
                                                            value: '',
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                keypress: 'onTextKeypress',
                                                                keyup: 'txtFilterValue_keyUpHandler'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-1-Box_Option02',
                                                    bodyStyle: 'background: transparent;',
                                                    layout: 'hbox',
                                                    padding: '9 0 0 0',
                                                    border: false,
                                                    hidden: true,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Passenger Name:',
                                                            padding: '4 0 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtPassenger',
                                                            fieldStyle: 'text-align:left;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 45,
                                                            width: 250,
                                                            value: '',
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-1-Box_Option03',
                                                    bodyStyle: 'background: transparent;',
                                                    layout: 'hbox',
                                                    padding: '9 0 0 0',
                                                    border: false,
                                                    hidden: false,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'PNR:',
                                                            padding: '4 0 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtPNR',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 6,
                                                            width: 80,
                                                            value: '',
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-1-Box_Option04',
                                                    bodyStyle: 'background: transparent;',
                                                    layout: 'hbox',
                                                    padding: '9 0 0 0',
                                                    border: false,
                                                    hidden: true,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Credit Card:',
                                                            padding: '4 0 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtNREF_P1',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 6,
                                                            width: 60,
                                                            value: '',
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                keypress: 'onTextKeypress',
                                                                keyup: 'txtFilterValue_keyUpHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtNREF_F1',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 6,
                                                            value: '******',
                                                            readOnly: true,
                                                            width: 50,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtNREF_P2',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 4,
                                                            width: 50,
                                                            value: '',
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                keypress: 'onTextKeypress',
                                                                keyup: 'txtFilterValue_keyUpHandler'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-1-Box_OptionDates',
                                                    bodyStyle: 'background: transparent;',
                                                    layout: 'hbox',
                                                    padding: '9 0 0 0',
                                                    border: false,
                                                    hidden: true,
                                                    items: [
                                                        {xtype: 'tbspacer', width: 8},
                                                        {
                                                            xtype: 'label', text: 'Issue Date from:', padding: '4 0 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'datefield',
                                                            id:prototype.id+'-1-txtFromDate',
                                                            fieldStyle: 'text-align:center',
                                                            format: 'Y/m/d',
                                                            formatText: '',
                                                            invalidText: 'Format valid YYYY/MM/DD',
                                                            minValue: new Date(1990, 00, 01),
                                                            maskRe: /[0-9/]/,
                                                            editable: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 10,
                                                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                                            width: 90
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'label', text: 'to', padding: '4 0 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'datefield',
                                                            id:prototype.id+'-1-txtToDate',
                                                            fieldStyle: 'text-align:center',
                                                            format: 'Y/m/d',
                                                            formatText: '',
                                                            invalidText: 'Format valid YYYY/MM/DD',
                                                            minValue: new Date(1990, 00, 01),
                                                            maskRe: /[0-9/]/,
                                                            editable: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 10,
                                                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                                            width: 90
                                                        },
                                                        {xtype: 'tbspacer', width: 8},
                                                        {
                                                            xtype: 'label', text: 'IATA:', padding: '4 0 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtIATA',
                                                            fieldStyle: 'text-align:center',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 8,
                                                            width: 100,
                                                            maskRe: /[0-9/]/,
                                                            value: '',
                                                            listeners: {
                                                                //keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', flex: 2},
                                                //<editor-fold defaultstate="collapsed" desc="boxPaginacion">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-1-boxPaginacion',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 100,
                                                    border: false,
                                                    hidden:true,
                                                    padding: '8 0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'-1-btn-pag-first',
                                                            iconCls: 'prx-icon-pagination-first',
                                                            style: 'background: transparent;',
                                                            tooltip: 'First Page',
                                                            border: false,
                                                            hidden: true,
                                                            listeners: {
                                                                click: 'pagFirst'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'-1-btn-pag-previous',
                                                            iconCls: 'prx-icon-pagination-previous',
                                                            style: 'background: transparent;',
                                                            tooltip: 'Previous Page',
                                                            border: false,
                                                            listeners: {
                                                                click: 'pagPrevious'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'-1-btn-pag-next',
                                                            iconCls: 'prx-icon-pagination-next',
                                                            style: 'background: transparent;',
                                                            tooltip: 'Next Page',
                                                            border: false,
                                                            listeners: {
                                                                click: 'pagNext'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'-1-btn-pag-last',
                                                            iconCls: 'prx-icon-pagination-last',
                                                            style: 'background: transparent;',
                                                            tooltip: 'Last Page',
                                                            border: false,
                                                            hidden: true,
                                                            listeners: {
                                                                click: 'pagLast'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'pagingtoolbar',
                                                            id: prototype.id+'-1-paggin',
                                                            pageSize: 10,
                                                            border: false,
                                                            displayInfo: false,
                                                            hidden: true
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    hidden: true,
                                                    padding: '4 0',
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id+'-1-btnSearch',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    listeners: {
                                                                        click: 'imgSearch_clickHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-1-btnExcel',
                                                                    iconCls: 'prx-icon-excel',
                                                                    tooltip: 'Export to Excel',
                                                                    listeners: {
                                                                        click: 'imgExcel_click'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id+'-1-btnClear',
                                                                    iconCls: 'prx-icon-clear',
                                                                    tooltip: 'Clear Options',
                                                                    listeners: {
                                                                        click: 'imgClear_clickHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id+'-1-btnBack',
                                                                    iconCls: 'prx-icon-back',
                                                                    tooltip: 'Back',
                                                                    listeners: {
                                                                        click: 'imgBack_clickHandler'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 4}
                                            ]
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', height: 5},
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-1-boxMainData',
                                    border: false,
                                    flex: 3,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        width: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridData">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id+'-1-gridData',
                                            height: 487,
                                            columnLines: true,
                                            plugins: [
                                                { 
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1
                                                }
                                            ],                                            
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Nbr', dataIndex: 'ROYKEY', width: 35, hidden: true
                                                    },
                                                    {
                                                        text: 'Passenger Name', dataIndex: 'A720PAX', width: 280,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        },
                                                        editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'Ticket Number', dataIndex: 'TICKET', width: 150,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'CC Number', dataIndex: 'A1531NREF', width: 120,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'Approved Code', dataIndex: 'IN_IATA', width: 120,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'Issue<br/>Orig.', dataIndex: 'A720CIUVTA', width: 60
                                                    },
                                                    {
                                                        text: 'Issue Date', dataIndex: 'A720FECVTA', width: 80
                                                    },
                                                    {
                                                        text: 'IATA', dataIndex: 'A720AGENTE', width: 80, editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'Fare', dataIndex: 'A720TARIFA', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'A1531VFOP', width: 130,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Cur', dataIndex: 'A720MONEDA', width: 40
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'A720PNR', width: 80,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: 'Edit',
                                                        width: 39,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'gridData_act1_clickHandler'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="pie">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-1-pie',
                                            border: true,
                                            hidden: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: false
                                            },
                                            padding: '1px 0px 1px 0px',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 25,
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
                                                            id: prototype.id+'-1-lblPagActual',
                                                            text: '1',
                                                            width: 50
                                                        },
//                                                        {
//                                                            text: 'Of',
//                                                            width: 50
//                                                        },
                                                        {
                                                            id: prototype.id+'-1-lblPagTotal',
                                                            text: '0',
                                                            hidden: true,
                                                            width: 50
                                                        },
//                                                        {xtype: 'tbspacer', width: 100},
//                                                        {
//                                                            text: 'Total found',
//                                                            width: 80
//                                                        },
                                                        {
                                                            id: prototype.id+'-1-lblRowsTotal',
                                                            text: '0',
                                                            hidden: true,
                                                            width: 50
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
  }
);