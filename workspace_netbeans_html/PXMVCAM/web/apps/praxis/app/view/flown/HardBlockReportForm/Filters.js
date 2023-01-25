Ext.define('Ext.Praxis.view.flown.HardBlockReportForm.Filters', {
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
//                    hidden: true,
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
                            html: '<strong style="color:#000;">Flight Date</strong>',
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
                            id: prototype.id + '-cmbDateFromYear',
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
                            id: prototype.id + '-cmbDateFromMonth',
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
//                            listConfig: {maxHeight: 111},
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
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onFromDayChange',
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
                            id: prototype.id + '-cmbDateToYear',
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
                            enableKeyEvents: true,
                            caseSensitive: false,
                            valueField: 'code',
                            displayField: 'name',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
//                            listConfig: {maxHeight: 111},
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
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onToDayChange',
                                keyup: function (combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[0-9]+$/;
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

                // <editor-fold defaultstate="collapsed" desc="panel">
                {
                    xtype: 'panel',
                    id: prototype.id + '-box_fuente',
                    width: prototype.widthContenedor,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    border: false,
                    bodyStyle: 'background: transparent',
                    style: 'border-top: 3px #ffffff solid;border-left: 0px;',
                    padding: '0px 0px 1px 0px',
                    defaults: {
                        padding: '8px 0px 5px 0px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false,
                        selectOnFocus: true,
                        enableKeyEvents: true,
                        enforceMaxLength: true
                    },
                    items: [
                        {xtype: 'tbspacer', width: 450},
                        {
                            xtype: 'label',
                            html: 'Revenue :',
                            style: 'font-weight:bold;',
                            padding: '11px 7px 10px 0px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbRevenue',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"],
                                    ["1", "AM"],
                                    ["2", "OAL"]
                                ]
                            }),
                            queryMode: 'local',
                            hidden: false,
                            readOnly: false,
                            allowBlank: true,
                            hiddenLabel: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 90,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            hideTrigger: false,
                            listeners: {
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
                        },
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'label',
                            html: 'HB Company:',
                            style: 'font-weight:bold;',
                            padding: '11px 7px 10px 0px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbAerolinea',
                            queryMode: 'local',
                            hidden: false,
                            readOnly: false,
                            allowBlank: true,
                            hiddenLabel: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 250,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            hideTrigger: false,
                            listeners: {
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
                                },
                                focus: function (combo) {
                                    combo.expand();
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 25}
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});