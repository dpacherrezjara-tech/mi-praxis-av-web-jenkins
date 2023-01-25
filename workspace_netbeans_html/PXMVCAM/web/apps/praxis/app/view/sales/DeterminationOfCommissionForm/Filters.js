Ext.define('Ext.Praxis.view.sales.DeterminationOfCommissionForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%'
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
                        padding: '6px 1px 6px 1px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    id:prototype.id+'-lbl_from',
                                    text: 'From:',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 80,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
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
                                    id: prototype.id + '-cmbDateFromMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    caseSensitive: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 80,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
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
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    id:prototype.id+'-lbl_to',
                                    text: 'To:',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 80,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
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
                                    id: prototype.id + '-cmbDateToMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    caseSensitive: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 80,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
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
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    id:prototype.id+'-lbl_country',
                                    text: 'Country:',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPais',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    emptyText: 'All',
                                    valueField: 'code', displayField: 'name',
                                    width: 160,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Select By : ',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 83,
                                    padding: '4 0 5 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSelectBy',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["3", "IATA Sale"], ["2", "Ticket"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 125,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'getShowChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtIATA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    width: 130,
                                    enableKeyEvents: true,
                                    listeners:{
                                        keypress: 'onGetListTicketOneKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtLABEL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    hidden: true,
                                    width: 130,
                                    enableKeyEvents: true,
                                    listeners:{
                                        keypress: 'onGetListTicketOneKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtTicket',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    hidden: true,
                                    width: 130,
                                    enableKeyEvents: true,
                                    listeners:{
                                        keypress: 'onGetListTicketOneKeypress'
                                    }
                                },
                                // <editor-fold defaultstate="collapsed" desc="HSCHEMAS">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HSCHEMAS',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Schema:',
                                            id: prototype.id+'-labelChema',
                                            style: 'font-weight:bold;color:#000;',
                                            padding: '4 0 5 0',
                                            width: 68
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtChema',
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 300,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                keyup: function (combo, e) {
                                                    var key = String.fromCharCode(e.getKey());
                                                    var filter = /^[a-zA-Z0-9]+$/;
                                                    var test_bool = filter.test(key);
                                                    if (test_bool) {
                                                        combo.doQuery(key);
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblStatus',
                                    text: 'Status : ',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 83,
                                    padding: '4 0 5 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbStatus',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["P", "Pending"], ["Y", "Processed"], ["D", "IATA Disabled"], ["C", "Not Client Register"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 125,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'getShowChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblEnvironment',
                                    text: 'Environment: ',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 106,
                                    padding: '4 0 5 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbEnvironment',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["P", "Production"], ["T", "Testing"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 125,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("P");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onSetChangeEnvironmentChange'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblUser',
                                    text: 'USERNAME',
                                    hidden: true,
                                    style: 'font-weight:bold;color:#FFFFFF;',
                                    padding: '4 0 5 0'
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