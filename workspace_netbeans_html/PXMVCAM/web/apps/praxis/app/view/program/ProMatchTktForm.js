prototype.MatchTkt = {
    id: 'ProMatchTktForm',
    url: CONTEXTPATH+'/ProMatchTkt',
    widthContenedor: 1220
};
Ext.define('Ext.Praxis.view.program.ProMatchTktForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProMatchTktForm',
    requires: [
        'Ext.Praxis.controller.program.ProMatchTktController'
    ],
    controller: 'ProMatchTktController',
    title: 'CCMP',
    header: true,
    width: 1220,
    height: 920,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            width: '100%',
            xtype: 'form',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    border: false,
                    padding: '10 15',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Options">
                        {
                            xtype: 'panel',
                            width: '100%',
                            border: false,
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="filter 1">
                                        {
                                            xtype: 'panel',
                                            border: true,
                                            layout: 'hbox',
                                            width: 920,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            defaults: {
                                                padding: '5 0',
                                                anchor: '100%'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    id: prototype.MatchTkt.id+'-lblSalesDate',
                                                    text: 'Sale Date',
                                                    padding: '7 0',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    text: '(*)',
                                                    labelSeparator: ':',
                                                    style: 'font-weight:bold;color:#9C1717;',
                                                    width: 30,
                                                    padding: '4px 7px 2px 0px',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    }
                                                },
                                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.MatchTkt.id+'-cmbDateYear',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    allowBlank: false,
                                                    autoSelect: true,
                                                    enableKeyEvents: true,
                                                    forceSelection: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    valueField: 'code', displayField: 'name',
                                                    typeAhead: true,
                                                    emptyText: 'All',
                                                    width: 70,
                                                    listConfig: {maxHeight: 111},
                                                    inputAttrTpl: "data-qtip='Select Year'",
                                                    listeners: {
        //                                                focus: function (combo) {
        //                                                    combo.expand();
        //                                                },
        //                                                change: 'onYearChange',
                                                        keypress: 'onTextKeypress'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.MatchTkt.id+'-cmbDateMonth',
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    allowBlank: false,
                                                    forceSelection: true,
                                                    editable: true,
                                                    autoSelect: true,
                                                    enableKeyEvents: true,
                                                    caseSensitive: false,
                                                    valueField: 'code', displayField: 'name',
                                                    emptyText: 'All',
                                                    width: 60,
                                                    anchor: '100%',
                                                    inputAttrTpl: "data-qtip='Select Month'",
                                                    listeners: {
                                                        keypress: 'onTextKeypress'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    html: 'Day From:',
                                                    align: 'center',
                                                    fieldStyle: 'text-align: center;',
                                                    padding: '7 0'
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.MatchTkt.id+'-cmbDateFromDay',
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    allowBlank: false,
                                                    editable: true,
                                                    forceSelection: true,
                                                    autoSelect: true,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'code', displayField: 'name',
                                                    typeAhead: true,
                                                    emptyText: 'All',
        //                                            labelWidth: 0,
                                                    width: 60,
                                                    anchor: '100%',
                                                    listConfig: {maxHeight: 111},
                                                    inputAttrTpl: "data-qtip='Select Day From'",
                                                    listeners: {
        //                                                focus: function (combo) {
        //                                                    combo.expand();
        //                                                },
        //                                                blur: function (combo, event, eOpts) {
        //                                                    if (combo.getValue() === null) {
        //                                                        combo.setValue("");
        //                                                    }
        //                                                },
                                                        keypress: 'onTextKeypress',
                                                        change: 'cbxDateFromDay_changeHandler',
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    html: 'Day To:',
//                                                    align: 'center',
//                                                    fieldStyle: 'text-align: center;',
                                                    padding: '7 0'
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.MatchTkt.id+'-cmbDateToDay',
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    allowBlank: false,
                                                    forceSelection: true,
                                                    editable: true,
                                                    autoSelect: true,
                                                    enableKeyEvents: true,
                                                    caseSensitive: false,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    typeAhead: true,
                                                    emptyText: 'All',
                                                    labelWidth: 0,
                                                    width: 60,
                                                    anchor: '100%',
                                                    listConfig: {maxHeight: 111},
                                                    inputAttrTpl: "data-qtip='Select Day To'",
                                                    listeners: {
        //                                                focus: function (combo) {
        //                                                    combo.expand();
        //                                                },
        //                                                blur: function (combo, event, eOpts) {
        //                                                    if (combo.getValue() === null) {
        //                                                        combo.setValue("");
        //                                                    }
        //                                                },
                                                        keypress: 'onTextKeypress'
                                                    }
                                                },
                                                // </editor-fold>
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Transaction Type:',
                                                    padding: '7 0',
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.MatchTkt.id+'-cmbTranType',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["S", "Sales"], ["R", "Refund"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    allowBlank: false,
                                                    autoSelect: true,
                                                    enableKeyEvents: true,
                                                    forceSelection: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    value: "",
                                                    valueField: 'code', displayField: 'name',
                                                    typeAhead: true,
                                                    emptyText: 'All',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'FOP:',
                                                    padding: '7 0',
                                                    width: 45
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.MatchTkt.id+'-cmbFOP',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["", "All"], ["CC", "Credit Card"], ["CA", "Cash"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    allowBlank: false,
                                                    autoSelect: true,
                                                    enableKeyEvents: true,
                                                    forceSelection: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    value: "",
                                                    valueField: 'code', displayField: 'name',
                                                    typeAhead: true,
                                                    emptyText: 'All',
                                                    width: 100
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', width: 100},
                                        //<editor-fold defaultstate="collapsed" desc="boxPaginacion">
                                        {
                                            xtype: 'panel',
                                            id: prototype.MatchTkt.id+'-boxPaginacion',
                                            hidden: true,
                                            width: 100,
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    cls: 'x-toolbar-pag',
                                                    items:[
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-btn-pag-first',
                                                            iconCls: 'prx-icon-pagination-first',
                                                            tooltip: 'First Page',
                                                            listeners: {
                                                                click: 'pagFirst'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-btn-pag-previous',
                                                            iconCls: 'prx-icon-pagination-previous',
                                                            tooltip: 'Previous Page',
                                                            listeners: {
                                                                click: 'pagPrevious'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-btn-pag-next',
                                                            iconCls: 'prx-icon-pagination-next',
                                                            tooltip: 'Next Page',
                                                            listeners: {
                                                                click: 'pagNext'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-btn-pag-last',
                                                            iconCls: 'prx-icon-pagination-last',
                                                            tooltip: 'Last Page',
                                                            listeners: {
                                                                click: 'pagLast'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'pagingtoolbar',
                                                            id: prototype.MatchTkt.id+'-paggin',
                                                            pageSize: 10,
                                                            border: false,
                                                            displayInfo: false,
                                                            hidden: true
                                                        }
        //                                                ,
        //                                                {
        //                                                    xtype: 'pagingtoolbar',
        //                                                    id: prototype.MatchTkt.id+'-paggin2',
        //                                                    pageSize: 10,
        //                                                    border: false,
        //                                                    displayInfo: false,
        //                                                    hidden: true
        //                                                }
        //                                                ,
        //                                                {
        //                                                    xtype: 'pagingtoolbar',
        //                                                    id: prototype.MatchTkt.id+'-paggin3',
        //                                                    pageSize: 10,
        //                                                    border: false,
        //                                                    displayInfo: false,
        //                                                    hidden: true
        //                                                }
        //                                                ,
        //                                                {
        //                                                    xtype: 'pagingtoolbar',
        //                                                    id: prototype.MatchTkt.id+'-paggin4',
        //                                                    pageSize: 10,
        //                                                    border: false,
        //                                                    displayInfo: false,
        //                                                    hidden: true
        //                                                }
        //                                                ,
        //                                                {
        //                                                    xtype: 'pagingtoolbar',
        //                                                    id: prototype.MatchTkt.id+'-paggin5',
        //                                                    pageSize: 10,
        //                                                    border: false,
        //                                                    displayInfo: false,
        //                                                    hidden: true
        //                                                }
        //                                                ,
        //                                                {
        //                                                    xtype: 'pagingtoolbar',
        //                                                    id: prototype.MatchTkt.id+'-paggin6',
        //                                                    pageSize: 10,
        //                                                    border: false,
        //                                                    displayInfo: false,
        //                                                    hidden: true
        //                                                }
        //                                                ,
        //                                                {
        //                                                    xtype: 'pagingtoolbar',
        //                                                    id: prototype.MatchTkt.id+'-paggin7',
        //                                                    pageSize: 10,
        //                                                    border: false,
        //                                                    displayInfo: false,
        //                                                    hidden: true
        //                                                }
                                                    ]
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        //<editor-fold defaultstate="collapsed" desc="button">
                                        {
                                            xtype: 'panel',
                                            border: true,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-btnSearch',
                                                            iconCls: 'prx-icon-search',
                                                            tooltip: 'Search',
                                                            listeners: {
                                                                click: 'imgSearch_clickHandler'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-btnFilter',
                                                            iconCls: 'prx-icon-filter',
                                                            tooltip: 'Display filter',
                                                            listeners: {
                                                                click: 'imgFilter_clickHandler'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-btnExcel',
                                                            iconCls: 'prx-icon-excel',
                                                            tooltip: 'Export to Excel',
                                                            listeners: {
                                                                click: 'imgExcel_clickHandler'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-btnClear',
                                                            iconCls: 'prx-icon-clear',
                                                            tooltip: 'Clear Options',
                                                            listeners: {
                                                                click: 'imgClear_clickHandler'
                                                            }
                                                        },
                                                        {
                                                            xtype:'button',
                                                            id: prototype.MatchTkt.id+'-imgMatch',
                                                            icon: 'resources/img/botones/Change.png',
                                                            tooltip: 'Apply Manual Match',
                                                            listeners: {
                                                                click: 'imgMatch_clickHandler'
                                                            }
                                                        }
        //                                                ,{
        //                                                    xtype: 'button',
        //                                                    id: prototype.MatchTkt.id+'-btnBack',
        //                                                    iconCls: 'prx-icon-back',
        //                                                    tooltip: 'Back',
        //                                                    listeners: {
        //                                                        click: 'btnBack_click'
        //                                                    }
        //                                                }
                                                    ]
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                {xtype: 'tbspacer', height: 2},
                                //<editor-fold defaultstate="collapsed" desc="filter 2">
                                {
                                    xtype: 'panel',
                                    border: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    width: 920,
                                    defaults: {
                                        padding: '5 0',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Status:',
                                            paddin: '5 0',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 3},
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            labelSeparator: ':',
                                            style: 'font-weight:bold;color:#9C1717;',
                                            width: 30,
                                            padding: '4px 7px 2px 0px',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.MatchTkt.id+'-cmbStatus',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["1", "Match"], ["2", "Sales Without ACCB"], ["3", "ACCB Without Sales"],
                                                    ["4", "Match Difference"], ["5", "Match Manual"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            allowBlank: false,
                                            autoSelect: true,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            value: "",
                                            valueField: 'code', displayField: 'name',
                                            typeAhead: true,
                                            width: 131,
                                            listConfig: {maxHeight: 111}
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Comment : ',
                                            width: 100,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Comment'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            labelSeparator: ':',
                                            style: 'font-weight:bold;color:#9C1717;',
                                            width: 25,
                                            padding: '4px 7px 2px 0px',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MatchTkt.id+'-txtComment',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maxLength: 54,
                                            maskRe: /[a-zA-Z]/,
                                            width: 400
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 4},
                        {
                            xtype: 'panel',
                            id: prototype.MatchTkt.id+'-boxSearchFilter',
                            layout: {
                                type: 'hbox',
                                align: 'bottom'
                            },
                            width: '100%',
                            items: [
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'panel',
                                    id: prototype.MatchTkt.id+'-accordion',
                                    layout: 'vbox',
                                    height: 194,
                                    width: 800,
                                    defaults: {
                                        width: 650
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            title: 'Conditions',
                                            id: prototype.MatchTkt.id+'-Conditions',
                                            border: true,
                                            layout: 'vbox',
                                            bodyStyle: 'background-color: #FFFFFF;',
                                            collapsible: true,
                                            titleCollapse: true,
                                            animCollapse: true,
                                            collapsed: false,
                                            defaults: {
                                                padding: '4',
                                                width: 624,
                                                anchor: '100%'
                                            },
                                            listeners: {
                                                beforeexpand: function() {
                                                    Ext.getCmp(prototype.MatchTkt.id+'-MoreConditions').collapse();
                                                },
                                                collapse: function() {
                                                    Ext.getCmp(prototype.MatchTkt.id+'-MoreConditions').expand();
                                                }
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="cabecera">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '10px 4px 0px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        labelAlign: 'right',
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
//                                                        {xtype: 'tbspacer', width: 30},
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#000;">And/Or</strong>',
                                                            align: 'center',
                                                            fieldStyle: 'text-align: center;',
                                                            padding: '2px 7px 2px 0px'
                                                        },
                                                        {xtype: 'tbspacer', width: 160},
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#000;">Field</strong>',
                                                            align: 'center',
                                                            fieldStyle: 'text-align: center;',
                                                            padding: '2px 7px 2px 0px'
                                                        },
                                                        {xtype: 'tbspacer', width: 130},
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#000;">Condition</strong>',
                                                            align: 'center',
                                                            fieldStyle: 'text-align: center;',
                                                            padding: '2px 7px 2px 0px'
                                                        },
                                                        {xtype: 'tbspacer', width: 60},
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#000;">Value</strong>',
                                                            align: 'center',
                                                            fieldStyle: 'text-align: center;',
                                                            padding: '2px 7px 2px 0px'
                                                        }
                                                    ]
                                                },
                                                // </editor-fold>
                                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '3px 4px 0px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        hiddenLabel: false,
                                                        labelAlign: 'right',
                                                        xtype: 'textfield',
                                                        hidden: false,
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
//                                                        {xtype: 'tbspacer', width: 30},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Select...',
                                                            width: 70,
                                                            padding: '4px 0px 0px 0px'
                                                        },
                                                        {xtype: 'tbspacer', width: 46},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtCampo1',
                                                            fieldStyle: 'text-align:left',
                                                            width: 220,
                                                            padding: '0px 0px 0px 0px'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbCampo1',
                                                            queryMode: 'local',
                                                            hidden: true,
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 220,
                                                            typeAhead: true,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-imgInfo1',
                                                            icon: 'resources/img/botones/16x16/information.png',
                                                            style: 'background: #E3EAF9',
                                                            tooltip: 'View Fields',
                                                            padding: '4px 0px 0px 0px',
                                                            border: false,
                                                            listeners: {
                                                                click: 'imgInfo_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbOperador1',
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtValue1',
                                                            fieldStyle: 'text-align:left',
                                                            width: 120,
                                                            padding: '0px 0px 0px 0px',
                                                            listeners:{
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                // </editor-fold>
                                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '3px 4px 0px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        hiddenLabel: false,
                                                        labelAlign: 'right',
                                                        xtype: 'textfield',
                                                        hidden: false,
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
//                                                        {xtype: 'tbspacer', width: 30},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbConector2',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["AND", "And"],
                                                                    ["OR", "Or"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("AND");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("AND");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 46},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtCampo2',
                                                            fieldStyle: 'text-align:left',
                                                            width: 220,
                                                            padding: '0px 0px 0px 0px'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbCampo2',
                                                            queryMode: 'local',
                                                            hidden: true,
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 220,
                                                            typeAhead: true,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-imgInfo2',
                                                            icon: 'resources/img/botones/16x16/information.png',
                                                            style: 'background: #E3EAF9',
                                                            tooltip: 'View Fields',
                                                            padding: '4px 0px 0px 0px',
                                                            border: false,
                                                            listeners: {
                                                                click: 'imgInfo_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbOperador2',
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtValue2',
                                                            fieldStyle: 'text-align:left',
                                                            width: 120,
                                                            padding: '0px 0px 0px 0px',
                                                            listeners:{
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                // </editor-fold>
                                                // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '3px 4px 0px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        hiddenLabel: false,
                                                        labelAlign: 'right',
                                                        xtype: 'textfield',
                                                        hidden: false,
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
//                                                        {xtype: 'tbspacer', width: 30},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbConector3',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["AND", "And"],
                                                                    ["OR", "Or"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("AND");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("AND");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 46},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtCampo3',
                                                            fieldStyle: 'text-align:left',
                                                            width: 220,
                                                            padding: '0px 0px 0px 0px'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbCampo3',
                                                            queryMode: 'local',
                                                            hidden: true,
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 220,
                                                            typeAhead: true,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-imgInfo3',
                                                            icon: 'resources/img/botones/16x16/information.png',
                                                            style: 'background: #E3EAF9',
                                                            tooltip: 'View Fields',
                                                            padding: '4px 0px 0px 0px',
                                                            border: false,
                                                            listeners: {
                                                                click: 'imgInfo_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbOperador3',
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtValue3',
                                                            fieldStyle: 'text-align:left',
                                                            width: 120,
                                                            padding: '0px 0px 0px 0px',
                                                            listeners:{
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                // </editor-fold>
                                                // <editor-fold defaultstate="collapsed" desc="Fila 4">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '3px 4px 0px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        hiddenLabel: false,
                                                        labelAlign: 'right',
                                                        xtype: 'textfield',
                                                        hidden: false,
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
//                                                        {xtype: 'tbspacer', width: 30},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbConector4',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["AND", "And"],
                                                                    ["OR", "Or"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("AND");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("AND");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 46},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtCampo4',
                                                            fieldStyle: 'text-align:left',
                                                            width: 220,
                                                            padding: '0px 0px 0px 0px'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbCampo4',
                                                            queryMode: 'local',
                                                            hidden: true,
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 220,
                                                            typeAhead: true,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-imgInfo4',
                                                            icon: 'resources/img/botones/16x16/information.png',
                                                            style: 'background: #E3EAF9',
                                                            tooltip: 'View Fields',
                                                            padding: '4px 0px 0px 0px',
                                                            border: false,
                                                            listeners: {
                                                                click: 'imgInfo_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbOperador4',
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtValue4',
                                                            fieldStyle: 'text-align:left',
                                                            width: 120,
                                                            padding: '0px 0px 0px 0px',
                                                            listeners:{
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'More Conditions',
                                            id: prototype.MatchTkt.id+'-MoreConditions',
                                            border: true,
                                            layout: 'vbox',
                                            bodyStyle: 'background-color: #FFFFFF;',
                                            collapsible: true,
                                            titleCollapse: true,
                                            animCollapse: true,
                                            collapsed: true,
                                            defaults: {
                                                padding: '4',
                                                width: 624,
                                                anchor: '100%'
                                            },
                                            listeners: {
                                                beforeexpand: function() {
                                                    Ext.getCmp(prototype.MatchTkt.id+'-Conditions').collapse();
                                                },
                                                collapse: function() {
                                                    Ext.getCmp(prototype.MatchTkt.id+'-Conditions').expand();
                                                }
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="Fila 5">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '3px 4px 0px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        hiddenLabel: false,
                                                        labelAlign: 'right',
                                                        xtype: 'textfield',
                                                        hidden: false,
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
//                                                        {xtype: 'tbspacer', width: 30},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbConector5',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["AND", "And"],
                                                                    ["OR", "Or"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("AND");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("AND");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 46},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtCampo5',
                                                            fieldStyle: 'text-align:left',
                                                            width: 220,
                                                            padding: '0px 0px 0px 0px'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbCampo5',
                                                            queryMode: 'local',
                                                            hidden: true,
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 220,
                                                            typeAhead: true,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-imgInfo5',
                                                            icon: 'resources/img/botones/16x16/information.png',
                                                            style: 'background: #E3EAF9',
                                                            tooltip: 'View Fields',
                                                            padding: '4px 0px 0px 0px',
                                                            border: false,
                                                            listeners: {
                                                                click: 'imgInfo_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbOperador5',
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtValue5',
                                                            fieldStyle: 'text-align:left',
                                                            width: 120,
                                                            padding: '0px 0px 0px 0px',
                                                            listeners:{
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                // </editor-fold>
                                                // <editor-fold defaultstate="collapsed" desc="Fila 6">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '3px 4px 0px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        hiddenLabel: false,
                                                        labelAlign: 'right',
                                                        xtype: 'textfield',
                                                        hidden: false,
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
//                                                        {xtype: 'tbspacer', width: 30},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbConector6',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["AND", "And"],
                                                                    ["OR", "Or"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("AND");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("AND");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 46},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtCampo6',
                                                            fieldStyle: 'text-align:left',
                                                            width: 220,
                                                            padding: '0px 0px 0px 0px'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbCampo6',
                                                            queryMode: 'local',
                                                            hidden: true,
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 220,
                                                            typeAhead: true,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-imgInfo6',
                                                            icon: 'resources/img/botones/16x16/information.png',
                                                            style: 'background: #E3EAF9',
                                                            tooltip: 'View Fields',
                                                            padding: '4px 0px 0px 0px',
                                                            border: false,
                                                            listeners: {
                                                                click: 'imgInfo_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbOperador6',
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtValue6',
                                                            fieldStyle: 'text-align:left',
                                                            width: 120,
                                                            padding: '0px 0px 0px 0px',
                                                            listeners:{
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                // </editor-fold>
                                                // <editor-fold defaultstate="collapsed" desc="Fila 7">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '3px 4px 0px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        hiddenLabel: false,
                                                        labelAlign: 'right',
                                                        xtype: 'textfield',
                                                        hidden: false,
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
//                                                        {xtype: 'tbspacer', width: 30},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbConector7',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["AND", "And"],
                                                                    ["OR", "Or"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("AND");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("AND");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 46},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtCampo7',
                                                            fieldStyle: 'text-align:left',
                                                            width: 220,
                                                            padding: '0px 0px 0px 0px'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbCampo7',
                                                            queryMode: 'local',
                                                            hidden: true,
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 220,
                                                            typeAhead: true,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-imgInfo7',
                                                            icon: 'resources/img/botones/16x16/information.png',
                                                            style: 'background: #E3EAF9',
                                                            tooltip: 'View Fields',
                                                            padding: '4px 0px 0px 0px',
                                                            border: false,
                                                            listeners: {
                                                                click: 'imgInfo_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.MatchTkt.id+'-cmbOperador7',
                                                            queryMode: 'local',
                                                            hiddenLabel: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 70,
                                                            typeAhead: true,
                                                            typeAheadDelay: 1,
                                                            emptyText: 'All',
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '0px 0px 0px 0px',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                },
                                                                blur: function (combo, event, eOpts) {
                                                                    if (combo.getValue() === null) {
                                                                        combo.setValue("");
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.MatchTkt.id+'-txtValue7',
                                                            fieldStyle: 'text-align:left',
                                                            width: 120,
                                                            padding: '0px 0px 0px 0px',
                                                            listeners:{
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        }
                                                    ]
                                                },
                                                // </editor-fold>
                                                // <editor-fold defaultstate="collapsed" desc="Fila 8">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    layout: 'hbox',
                                                    padding: '3px 4px 10px 10px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        anchor: '100%',
                                                        hiddenLabel: false,
                                                        labelAlign: 'right',
                                                        xtype: 'textfield',
                                                        hidden: false,
                                                        selectOnFocus: true,
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', width: 7},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.MatchTkt.id+'-imgInfo',
                                                            icon: 'resources/img/botones/16x16/information.png',
                                                            style: 'background: #E3EAF9',
                                                            tooltip: 'View Help Information',
                                                            padding: '3px 0px 3px 0px',
                                                            border: false,
                                                            listeners: {
                                                                click: 'btnImgInfoHelp_click'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 360},
                                                        {
                                                            xtype: 'label',
                                                            text: '(*) Required Fields',
                                                            labelSeparator: '',
                                                            style: 'font-weight:bold;color:#B41717;',
                                                            width: 150,
                                                            padding: '3px 0px 3px 0px',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'Mandatory Field'
                                                            }
                                                        }
                                                    ]
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.MatchTkt.id+'-cmbApply',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["1", "Credit Card"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 130,
                                    value: "",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'button',
                                    style: 'font-weight:bold;',
                                    html: '<strong style="font-weight:bold;">Apply</strong>',
                                    border: true,
                                    scale: 'small',
                                    width: 90,
                                    listeners: {
                                        click: 'Apply_clickHandler'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 4},
                        {
                            xtype: 'panel',
                            id: prototype.MatchTkt.id+'-boxConsultas',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.MatchTkt.id+'-vskDataGrid',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.MatchTkt.id+'-boxMainData',
                                            hidden: false,
                                            width: '100%',
                                            bodyStyle: 'background: transparent;',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                border: true,
                                                height: 480
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridDetTicket">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.MatchTkt.id+'-gridDetTicket',
                                                    width: 1120,
                                                    height: 520,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            
                                                            {
                                                                text: 'Ticket', flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', dataIndex: 'strTicket', flex: 1,//width: 120,
                                                                        listeners: {
                                                                            click: 'gridData_VIEWTKT_clickHandler',
                                                                        },                                                                        
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">'+value+'</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'strPEM', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                    metaData.style = "text-align:center;color:"+color;
                                                                    metaData.tdAttr = 'data-qtip="'+data.strPEM+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'STVAL', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                    metaData.style = "text-align:center;color:"+color;
                                                                    metaData.tdAttr = 'data-qtip="'+data.strDescStatus+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Error',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'CERROR', width: 130,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                            metaData.style = "text-align:left;color:"+color;
                                                                            metaData.tdAttr = 'data-qtip="'+data.CERROR+'"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                    metaData.style = "text-align:center;color:"+color;
                                                                    metaData.tdAttr = 'data-qtip="'+data.strSORIG+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Tr', dataIndex: 'strCampo', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                    metaData.style = "text-align:center;color:"+color;
                                                                    metaData.tdAttr = 'data-qtip="'+data.TRNCU+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale',
                                                                id: prototype.MatchTkt.id+'-hcDetTkt',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'SDATE', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                            metaData.style = "text-align:center;color:"+color;
                                                                            metaData.tdAttr = 'data-qtip="'+data.SDATE+'"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Ctry', dataIndex: 'SCOUNTRY', width: 45,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                    metaData.style = "text-align:center;color:"+color;
                                                                    metaData.tdAttr = 'data-qtip="'+data.strDescCountry+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                    metaData.style = "text-align:center;color:"+color;
                                                                    metaData.tdAttr = 'data-qtip="'+data.strMoneda+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                    metaData.style = "text-align:right;color:"+color;
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit Card',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                            metaData.style = "text-align:center;color:"+color;
                                                                            metaData.tdAttr = 'data-qtip="'+data.strDescCard+'"';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Number', dataIndex: 'SCARDN', width: 140,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                            metaData.style = "text-align:center;color:"+color;
                                                                            metaData.tdAttr = 'data-qtip="'+data.SCARDN+'"';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                            metaData.style = "text-align:center;color:"+color;
                                                                            metaData.tdAttr = 'data-qtip="'+data.SAUTHOC+'"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                    metaData.style = "text-align:center;color:"+color;
                                                                    metaData.tdAttr = 'data-qtip="'+data.SPNR+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Agent',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                            metaData.style = "text-align:center;color:"+color;
                                                                            metaData.tdAttr = 'data-qtip="'+data.SAGENT+'"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Bank',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Status', dataIndex: 'BSTVAL', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                                            metaData.style = "text-align:center;color:"+color;
                                                                            metaData.tdAttr = 'data-qtip="'+data.BSTVAL+'"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                                {
                                    xtype: 'panel',
                                    id: prototype.MatchTkt.id+'-boxPagDetail',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
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
                                                    id: prototype.MatchTkt.id+'-lblPagActual',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.MatchTkt.id+'-lblPagTotal',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.MatchTkt.id+'-lblRowsTotal',
                                                    text: '0',
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
    ],
    dockedItems: [
    ]
});