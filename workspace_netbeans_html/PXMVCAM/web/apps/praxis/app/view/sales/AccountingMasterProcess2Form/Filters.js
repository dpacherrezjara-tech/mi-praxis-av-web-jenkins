Ext.define('Ext.Praxis.view.sales.AccountingMasterProcess2Form.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
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
                // <editor-fold defaultstate="collapsed" desc="boxSearchFilter">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
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
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
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
                                {
                                    xtype: 'label',
                                    html: 'Module',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: '*',
                                    labelSeparator: ':',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cboModulo',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "(Select)"],
                                            ["PSALES", "Sales Accounting"],
                                            ["PADM", "ADM Accounting"],
                                            ["PFOB", "FOB Accounting"],
                                            ["PCONSORTIA", "CONSORTIA Accounting"],
                                            ["PCADUCOS", "Caducos"],
                                            ["PPSALES", "Sales Accounting Pending"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 160,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        change: 'onMostrarFiltrosChange',
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        
                        // <editor-fold defaultstate="collapsed" desc="boxDateFilter">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDateFilter',
//                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
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
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    html: 'Date from',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'datefield',
                                    id:prototype.id+'-txtDateFrom',
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
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    html: 'to',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'datefield',
                                    id:prototype.id+'-txtDateTo',
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
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="boxPeriodFilter">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxPeriodFilter',
//                            width: prototype.widthContenedor,
//                            hidden: true,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
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
                                    html: 'Billing Period',
                                    id: prototype.id + '-lblFlightDate',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 8},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYearFrom',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 80,
                                    hiddenLabel: false,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onFromYearChange',
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonthFrom',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 0,
                                    width: 80,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onFromMonthChange',
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cmbDatePeriodFrom',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["01", "01"],
                                            ["02", "02"],
                                            ["03", "03"],
                                            ["04", "04"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 80,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hidden: true,
                                    listeners:{
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        change: 'onFromPeriodChange',
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYearTo',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 80,
                                    hiddenLabel: false,
                                    hidden: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onToYearChange',
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonthTo',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 0,
                                    width: 80,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onToMonthChange',
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cmbDatePeriodTo',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["01", "01"],
                                            ["02", "02"],
                                            ["03", "03"],
                                            ["04", "04"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 80,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        change: 'onToPeriodChange',
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                }
                                // </editor-fold>
                            ]
                        },
                        // </editor-fold>
                        
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
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
                                { xtype: 'tbspacer', height: 10 },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblStatus',
                                    html: 'Status',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cboEstado',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "(All)"],
                                            ["C", "Completed"],
                                            ["N", "New"],
                                            ["P", "In Process"],
                                            ["E", "Error"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 120,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});