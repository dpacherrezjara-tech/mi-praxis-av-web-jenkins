Ext.define('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryQueryTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryQueryTicketFlightConciliationForm',
    requires: [
        'Ext.Praxis.controller.flown.FlightConciliation.DataEntryQueryTicketFlightConciliationController'
    ],
    controller: 'DataEntryQueryTicketFlightConciliationController',
    title: 'Ticket Program',
    header: true,
    width: 890,
    height: 860,
    border: false,
    resizable: true,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntryQueryTicket',
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    width: 876,
                    items: [
                        {xtype: 'tbspacer', height: 3},
                        // <editor-fold defaultstate="collapsed" desc="Options">
                        {
                            xtype: 'panel',
                            layout : {
                                type : 'hbox',
                                pack : 'end'
                            },
                            border: false,
                            width: 876,
                            items: [
                                {
                                    xtype: 'panel',
                                    border: true,
                                    width: 600,
                                    layout: 'hbox',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        padding: '5px 1px 5px 1px',
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
                                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                        {
                                            xtype: 'label',
                                            html: 'Flight Date',
                                            id: prototype.id + '-lblFlightDate2',
                                            align: 'center',
                                            width: 90,
                                            fieldStyle: 'text-align: center;',
                                            padding: '6px 7px 6px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            labelSeparator: ':',
                                            style: 'font-weight:bold;color:#B41717;',
                                            width: 20,
                                            padding: '6px 7px 6px 0px',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateYear2',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: true,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            valueField: 'code',
                                            displayField: 'name',
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
                                            id: prototype.id + '-cmbDateMonth2',
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
                                            labelWidth: 0,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            width: 60,
                                            anchor: '100%',
//                                                    listConfig: {maxHeight: 111},
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
                                            padding: '6px 7px 6px 0px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromDay2',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: true,
                                            forceSelection: true,
                                            autoSelect: true,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
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
                                            padding: '6px 7px 6px 0px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToDay2',
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
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'panel',
                                    border: false,
                                    id: prototype.id+'-boxPaginacion2',
                                    width: 100,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items:[
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-first2',
                                                    iconCls: 'prx-icon-pagination-first',
                                                    tooltip: 'First Page',
                                                    listeners: {
                                                        click: 'pagFirst'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-previous2',
                                                    iconCls: 'prx-icon-pagination-previous',
                                                    tooltip: 'Previous Page',
                                                    listeners: {
                                                        click: 'pagPrevious'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-next2',
                                                    iconCls: 'prx-icon-pagination-next',
                                                    tooltip: 'Next Page',
                                                    listeners: {
                                                        click: 'pagNext'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-pag-last2',
                                                    iconCls: 'prx-icon-pagination-last',
                                                    tooltip: 'Last Page',
                                                    listeners: {
                                                        click: 'pagLast'
                                                    }
                                                }
                                                ,
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-QueryTicket-paggin',
                                                    pageSize: 10,
                                                    border: false,
                                                    displayInfo: false,
                                                    hidden: true
                                                }
                                                ,
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-QueryTicket-paggin2',
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
                                                    id: prototype.id + '-btnSearch2',
                                                    iconCls: 'prx-icon-search',
                                                    tooltip: 'Search',
                                                    listeners: {
                                                        click: 'btnSearch_click'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnFilter2',
                                                    iconCls: 'prx-icon-filter',
                                                    tooltip: 'Display filter',
                                                    listeners: {
                                                        click: 'btnFilter_click'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnExcel2',
                                                    iconCls: 'prx-icon-excel',
                                                    tooltip: 'Export to Excel',
                                                    listeners: {
                                                        click: 'btnExcel_click'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnClear2',
                                                    iconCls: 'prx-icon-clear',
                                                    tooltip: 'Clear Options',
                                                    listeners: {
                                                        click: 'btnClear_click'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnBack2',
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
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', height: 3},
                        // <editor-fold defaultstate="collapsed" desc="Filters">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSearchFilter',
                            bodyStyle: 'background-color: #E3EAF9;',
                            layout : 'hbox',
                            border: true,
                            width: 876,
                            items: [
                                {
                                    xtype: 'form',
                                    border: false,
                                    bodyStyle: 'background: transparent',
                                    padding: '0px 0px 0px 0px',
                                    layout: 'vbox',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            width: 876,
                                            layout: 'hbox',
                                            bodyStyle: 'background: transparent;"',
                                            padding: '4px 4px 4px 4px',
                                            defaults: {
                                                labelStyle: 'font-weight:bold;',
                                                padding: '4px 4px 4px 4px',
                                                anchor: '100%'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 110},
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    width: 590,
                                                    layout: 'vbox',
                                                    bodyStyle: 'background-color: #FFFFFF;',
                                                    padding: '4px 4px 4px 4px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        padding: '4px 4px 4px 4px',
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        // <editor-fold defaultstate="collapsed" desc="cabecera">
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            width: 590-15,
                                                            bodyStyle: 'background: #E3EAF9',
                                                            layout: 'hbox',
                                                            padding: '10px 4px 0px 10px',
                                                            defaults: {
                                                                labelStyle: 'font-weight:bold;',
                                                                anchor: '100%'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 30},
                                                                {
                                                                    xtype: 'label',
                                                                    html: '<strong style="color:#000;">And/Or</strong>',
                                                                    align: 'center',
                                                                    fieldStyle: 'text-align: center;',
                                                                    padding: '2px 7px 2px 0px'
                                                                },
                                                                {xtype: 'tbspacer', width: 110},
                                                                {
                                                                    xtype: 'label',
                                                                    html: '<strong style="color:#000;">Field</strong>',
                                                                    align: 'center',
                                                                    fieldStyle: 'text-align: center;',
                                                                    padding: '2px 7px 2px 0px'
                                                                },
                                                                {xtype: 'tbspacer', width: 82},
                                                                {
                                                                    xtype: 'label',
                                                                    html: '<strong style="color:#000;">Condition</strong>',
                                                                    align: 'center',
                                                                    fieldStyle: 'text-align: center;',
                                                                    padding: '2px 7px 2px 0px'
                                                                },
                                                                {xtype: 'tbspacer', width: 50},
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
                                                            width: 590-15,
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
                                                                {xtype: 'tbspacer', width: 30},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Select...',
                                                                    width: 70,
                                                                    padding: '4px 0px 0px 0px'
                                                                },
                                                                {xtype: 'tbspacer', width: 46},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCampo1',
                                                                    fieldStyle: 'text-align:left',
                                                                    width: 120,
                                                                    padding: '0px 0px 0px 0px'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbCampo1',
                                                                    queryMode: 'local',
                                                                    hidden: true,
                                                                    hiddenLabel: false,
                                                                    forceSelection: true,
                                                                    selectOnFocus: true,
                                                                    caseSensitive: false,
                                                                    autoSelect: true,
                                                                    editable: true,
                                                                    width: 120,
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
                                                                    id: prototype.id + '-imgInfo1',
                                                                    icon: 'resources/img/botones/16x16/information.png',
                                                                    style: 'background: #E3EAF9',
                                                                    tooltip: 'View Fields',
                                                                    padding: '4px 0px 0px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'btnImgInfo_click'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 15},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador1',
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
                                                                    id: prototype.id + '-txtValue1',
                                                                    fieldStyle: 'text-align:left',
                                                                    width: 110,
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
                                                            width: 590-15,
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
                                                                {xtype: 'tbspacer', width: 30},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector2',
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
                                                                    id: prototype.id + '-txtCampo2',
                                                                    fieldStyle: 'text-align:left',
                                                                    width: 120,
                                                                    padding: '0px 0px 0px 0px'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbCampo2',
                                                                    queryMode: 'local',
                                                                    hidden: true,
                                                                    hiddenLabel: false,
                                                                    forceSelection: true,
                                                                    selectOnFocus: true,
                                                                    caseSensitive: false,
                                                                    autoSelect: true,
                                                                    editable: true,
                                                                    width: 120,
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
                                                                    id: prototype.id + '-imgInfo2',
                                                                    icon: 'resources/img/botones/16x16/information.png',
                                                                    style: 'background: #E3EAF9',
                                                                    tooltip: 'View Fields',
                                                                    padding: '4px 0px 0px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'btnImgInfo_click'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 15},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador2',
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
                                                                    id: prototype.id + '-txtValue2',
                                                                    fieldStyle: 'text-align:left',
                                                                    width: 110,
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
                                                            width: 590-15,
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
                                                                {xtype: 'tbspacer', width: 30},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector3',
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
                                                                    id: prototype.id + '-txtCampo3',
                                                                    fieldStyle: 'text-align:left',
                                                                    width: 120,
                                                                    padding: '0px 0px 0px 0px'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbCampo3',
                                                                    queryMode: 'local',
                                                                    hidden: true,
                                                                    hiddenLabel: false,
                                                                    forceSelection: true,
                                                                    selectOnFocus: true,
                                                                    caseSensitive: false,
                                                                    autoSelect: true,
                                                                    editable: true,
                                                                    width: 120,
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
                                                                    id: prototype.id + '-imgInfo3',
                                                                    icon: 'resources/img/botones/16x16/information.png',
                                                                    style: 'background: #E3EAF9',
                                                                    tooltip: 'View Fields',
                                                                    padding: '4px 0px 0px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'btnImgInfo_click'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 15},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador3',
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
                                                                    id: prototype.id + '-txtValue3',
                                                                    fieldStyle: 'text-align:left',
                                                                    width: 110,
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
                                                            width: 590-15,
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
                                                                {xtype: 'tbspacer', width: 30},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector4',
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
                                                                    id: prototype.id + '-txtCampo4',
                                                                    fieldStyle: 'text-align:left',
                                                                    width: 120,
                                                                    padding: '0px 0px 0px 0px'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbCampo4',
                                                                    queryMode: 'local',
                                                                    hidden: true,
                                                                    hiddenLabel: false,
                                                                    forceSelection: true,
                                                                    selectOnFocus: true,
                                                                    caseSensitive: false,
                                                                    autoSelect: true,
                                                                    editable: true,
                                                                    width: 120,
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
                                                                    id: prototype.id + '-imgInfo4',
                                                                    icon: 'resources/img/botones/16x16/information.png',
                                                                    style: 'background: #E3EAF9',
                                                                    tooltip: 'View Fields',
                                                                    padding: '4px 0px 0px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'btnImgInfo_click'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 15},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador4',
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
                                                                    id: prototype.id + '-txtValue4',
                                                                    fieldStyle: 'text-align:left',
                                                                    width: 110,
                                                                    padding: '0px 0px 0px 0px',
                                                                    listeners:{
                                                                        keypress: 'onTextKeypress'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        // <editor-fold defaultstate="collapsed" desc="Fila 5">
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            width: 590-15,
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
                                                                    id: prototype.id + '-imgInfo',
                                                                    icon: 'resources/img/botones/16x16/information.png',
                                                                    style: 'background: #E3EAF9',
                                                                    tooltip: 'View Help Information',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'btnImgInfoHelp_click'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 370},
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
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    width: 160,
                                                    height: 184,
                                                    layout : {
                                                        type : 'vbox',
                                                        pack : 'end'
                                                    },
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4px 4px 4px 4px',
                                                    defaults: {
                                                        labelStyle: 'font-weight:bold;',
                                                        padding: '4px 4px 4px 4px',
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            width: 160-15,
                                                            bodyStyle: 'background: #E3EAF9',
                                                            layout : {
                                                                type : 'hbox',
                                                                pack : 'end'
                                                            },
                                                            padding: '10px 4px 0px 10px',
                                                            defaults: {
                                                                labelStyle: 'font-weight:bold;',
                                                                anchor: '100%'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id+'-imgSwap',
                                                                    border: false,
                                                                    align: 'center',
                                                                    icon: 'resources/img/exchange.png',
                                                                    style: 'background: #E3EAEF;',
                                                                    tooltip: 'Back',
                                                                    scale: 'large',
                                                                    handler: 'onSwapTKT_Click',
                                                                    width: 25
                                                                },
                                                                {xtype: 'tbspacer', width: 10}
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', height: 3},
                        // <editor-fold defaultstate="collapsed" desc="Info">
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAF9;',
                            border: true,
                            width: 876,
                            height: 560,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxMainData2',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    hidden: false,
                                    border: false,
                                    width: 876,
                                    height: 550,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: #E3EAF9;',
                                        border: true,
                                        height: 520
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridData2">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData2',
                                            width: 852,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Ticket', dataIndex: 'strTicket', width: 130
                                                    },
                                                    {
                                                        text: 'Flight Information',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatDate', width: 90
                                                            },
                                                            {
                                                                text: 'Nbr', dataIndex: 'NFLIGHT', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Orig', dataIndex: 'CDEPART', width: 65
                                                            },
                                                            {
                                                                text: 'Dest', dataIndex: 'CARRIVA', width: 65
                                                            },
                                                            {
                                                                text: 'Plane', dataIndex: 'NPLANE', width: 50
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Coupon',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Operation', dataIndex: 'TOPUS', width: 70
                                                            },
                                                            {
                                                                text: 'Carrier', dataIndex: 'CARR', width: 60
                                                            },
                                                            {
                                                                text: 'Cabin', dataIndex: 'CABI', width: 60
                                                            },
                                                            {
                                                                text: 'Value', dataIndex: 'VCPN', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Com.', dataIndex: 'COMISI', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Curr.', dataIndex: 'MDACP', width: 60
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="pie10">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-pie10',
                                            width: 852,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            border: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: true
                                            },
                                            padding: '1px 0px 1px 0px',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 852,
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
                                                            id: prototype.id + '-lbl-currentPage10',
                                                            text: '1',
                                                            width: 50
                                                        },
                                                        {
                                                            text: 'Of',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-pageCount10',
                                                            text: '0',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            text: 'Total found',
                                                            width: 80
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-total10',
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
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxSwapData',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    hidden: true,
                                    border: false,
                                    width: 876,
                                    height: 550,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: #E3EAF9;',
                                        border: true,
                                        height: 520
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridSwapData">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridSwapData',
                                            width: 852,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Ticket', dataIndex: 'strTicket', width: 130
                                                    },
                                                    {
                                                        text: 'Accounting',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatDate2', width: 80
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatFVTA', width: 90
                                                            },
                                                            {
                                                                text: 'Country', dataIndex: 'PSVVTA', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescPSVVTA+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Agent', dataIndex: 'AGTIA', width: 80
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Coupon',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Operation', dataIndex: 'TOPUS', width: 70
                                                            },
                                                            {
                                                                text: 'Carrier', dataIndex: 'CARR', width: 60
                                                            },
                                                            {
                                                                text: 'Cabin', dataIndex: 'CABI', width: 60
                                                            },
                                                            {
                                                                text: 'Value', dataIndex: 'VCPN', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Com.', dataIndex: 'COMISI', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Curr.', dataIndex: 'MDACP', width: 60
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="pie11">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-pie11',
                                            width: 852,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            border: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: true
                                            },
                                            padding: '1px 0px 1px 0px',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 852,
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
                                                            id: prototype.id + '-lbl-currentPage11',
                                                            text: '1',
                                                            width: 50
                                                        },
                                                        {
                                                            text: 'Of',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-pageCount11',
                                                            text: '0',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            text: 'Total found',
                                                            width: 80
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-total11',
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
                        // </editor-fold>
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
            ]
        }
    ]
});