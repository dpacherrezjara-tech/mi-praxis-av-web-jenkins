Ext.define('Ext.Praxis.view.flown.MultilegReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
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
                {
                    xtype: 'panel',
                    border: false,
                    width: prototype.widthContenedor,
                    layout: 'hbox',
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
                            //                    emptyText: 'All',
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
                            //                    emptyText: 'All',
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
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'label',
                            html: 'Flight Number:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFlight',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 50,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});