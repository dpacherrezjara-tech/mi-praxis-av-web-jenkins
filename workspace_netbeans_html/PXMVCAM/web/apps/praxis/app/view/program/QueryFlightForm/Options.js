Ext.define('Ext.Praxis.view.program.QueryFlightForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'panel',
            border: true,
            layout: 'hbox',
            bodyStyle: 'background-color: #E3EAF9;',
            defaults: {
                padding: '3 1 2 1',
                anchor: '100%'
            },
            items: [
                {xtype: 'tbspacer', width: 7},
                // <editor-fold defaultstate="collapsed" desc="cmbTipoFecha">
                {
                    xtype:'combo',
                    id: prototype.id + '-cmbTipoFecha',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["DFLIGHT", "Flight Date"],
                            ["FCONT", "Accounting Date"]
                        ]
                    }),
                    queryMode: 'local',
                    hidden: true,
                    readOnly: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 110,
                    disabled: false,
                    typeAhead: true,
                    emptyText: 'All',
                    valueField: 'code', displayField: 'name',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    listeners:{
                        afterrender: function (combo, eOpts) {
                            combo.setValue("DFLIGHT");
                        },
                        focus: function(combo) {
                            combo.expand();
                        },
                        blur: function(combo, event, eOpts) {
                            if (combo.getValue() === null) {
                                combo.setValue("DFLIGHT");
                            }
                        }
                    }
                },
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                {
                    xtype: 'label',
                    html: 'Flight Date',
                    id: prototype.id + '-lblFlightDate',
                    align: 'center',
                    width: 110,
                    fieldStyle: 'text-align: center;',
                    padding: '4px 7px 2px 0px'
                },
                {xtype: 'tbspacer', width: 25},
                {
                    xtype: 'label',
                    text: '(*)',
                    labelSeparator: ':',
                    style: 'font-weight:bold;color:#B41717;',
                    width: 20,
                    padding: '4px 7px 2px 0px',
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'Mandatory Field'
                    }
                },
                {xtype: 'tbspacer', width: 4},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateYear',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    valueField: 'code', displayField: 'name',
                    typeAhead: true,
                    emptyText: 'All',
                    width: 70,
                    hiddenLabel: false,
                    listConfig: {maxHeight: 111},
                    inputAttrTpl: "data-qtip='Select Year'",
                    listeners: {
                        focus: function (combo) {
                            combo.expand();
                        },
                        change: 'onYearChange',
                        keypress: 'onTextKeypress'
                    }
                },
                {xtype: 'tbspacer', width: 4},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: true,
                    autoSelect: true,
                    enableKeyEvents: true,
                    caseSensitive: false,
                    valueField: 'code', displayField: 'name',
                    labelWidth: 0,
                    typeAhead: true,
                    emptyText: 'All',
                    width: 60,
                    anchor: '100%',
                    listConfig: {maxHeight: 111},
                    inputAttrTpl: "data-qtip='Select Month'",
                    listeners: {
                        focus: function (combo) {
                            combo.expand();
                        },
                        blur: function (combo, event, eOpts) {
                            if (combo.getValue() === null) {
                                combo.setValue("");
                            }
                        },
                        change: 'onMonthChange',
                        keypress: 'onTextKeypress'
                    }
                },
                {xtype: 'tbspacer', width: 8},
                {
                    xtype: 'label',
                    html: 'Day From:',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '4px 7px 2px 0px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    forceSelection: true,
                    autoSelect: true,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code', displayField: 'name',
                    typeAhead: true,
                    emptyText: 'All',
                    labelWidth: 0,
                    width: 60,
                    anchor: '100%',
                    listConfig: {maxHeight: 111},
                    inputAttrTpl: "data-qtip='Select Day From'",
                    listeners: {
                        focus: function (combo) {
                            combo.expand();
                        },
                        blur: function (combo, event, eOpts) {
                            if (combo.getValue() === null) {
                                combo.setValue("");
                            }
                        },
                        change: 'onFromDayChange',
                        keypress: 'onTextKeypress'
                    }
                },
                {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'label',
                    html: 'Day To:',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '4px 7px 2px 0px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
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
                        focus: function (combo) {
                            combo.expand();
                        },
                        blur: function (combo, event, eOpts) {
                            if (combo.getValue() === null) {
                                combo.setValue("");
                            }
                        },
                        change: 'onToDayChange',
                        keypress: 'onTextKeypress'
                    }
                },
                // </editor-fold>
                {xtype: 'tbspacer', width: 620}
            ]
        },
        {xtype: 'tbspacer', width: 4},
        {
            xtype: 'panel',
            id: prototype.id+'-boxPaginacion',
            hidden: false,
            width: 100,
            border: false,
            items: [
                {
                    xtype: 'toolbar',
                    cls: 'x-toolbar-pag',
                    items:[
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-first',
                            iconCls: 'prx-icon-pagination-first',
                            tooltip: 'First Page',
                            listeners: {
                                click: 'pagFirst'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-previous',
                            iconCls: 'prx-icon-pagination-previous',
                            tooltip: 'Previous Page',
                            listeners: {
                                click: 'pagPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-next',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next Page',
                            listeners: {
                                click: 'pagNext'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-last',
                            iconCls: 'prx-icon-pagination-last',
                            tooltip: 'Last Page',
                            listeners: {
                                click: 'pagLast'
                            }
                        }
                        ,
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        ,
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin2',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        ,
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin3',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        ,
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin4',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        ,
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin5',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        ,
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin6',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        ,
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin7',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
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
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners: {
                                click: 'btnBack_click'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});