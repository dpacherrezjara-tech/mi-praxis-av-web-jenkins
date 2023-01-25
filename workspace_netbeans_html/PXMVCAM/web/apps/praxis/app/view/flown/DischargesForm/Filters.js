Ext.define('Ext.Praxis.view.flown.DischargesForm.Filters', {
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
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype:'combo',
                            id: prototype.id + '-cbxTipoFecha',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["1", "Creation Date"],
                                    ["2", "Sale Date"]
                                ]
                            }),
                            queryMode: 'local',
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 190,
                            typeAhead: true,
                            emptyText: 'Creation Date',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("1");
                                },
                                focus: function(combo) {
                                    combo.expand();
                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("1");
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: 'From:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
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
                            editable: true,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onFromYearChange',
                                focus: function(combo) {
                                    combo.expand();
                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("");
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
                            editable: true,
                            typeAhead: true,
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
                                focus: function(combo) {
                                    combo.expand();
                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("");
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            hidden: true,
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
                            editable: true,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onToYearChange',
                                focus: function(combo) {
                                    combo.expand();
                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("");
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
                            editable: true,
                            typeAhead: true,
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
                                focus: function(combo) {
                                    combo.expand();
                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("");
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            hidden: true,
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
                
                // <editor-fold defaultstate="collapsed" desc="boxSearchFilter">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxDeciduous',
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
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            html: 'Ticket:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtTKT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 14,
                            maskRe: /[0-9]/,
                            width: 144,
                            listeners:{
                                change: 'onUpperValue',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: 'Type:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbTIPOC',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"],
                                    ["1", "Expired"],
                                    ["2", "Ethnics"],
                                    ["3", "No Refund"]
                                ]
                            }),
                            queryMode: 'local',
                            hiddenLabel: false,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 90,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
                                },
                                focus: function(combo) {
                                    combo.expand();
                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("");
                                    }
                                },
                                keypress: 'onTextKeypress'
                            }
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});