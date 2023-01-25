Ext.define('Ext.Praxis.view.flown.RevenueByOperationForm.Filters', {
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
//                            html: '<strong style="color:#000;">Flight Date</strong>',
                            text: 'Flight Date',
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
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111},
                            listeners: {
//                                change: 'onFromYearChange',
                                change: 'cbxDateFromYear_changeHandler',
//                                focus: function(combo) {
//                                    combo.expand();
//                                },
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
//                                change: 'onFromMonthChange',
                                change: 'cbxDateFromMonth_changeHandler',
//                                focus: function(combo) {
//                                    combo.expand();
//                                },
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
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            hidden: true,
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
//                                focus: function(combo) {
//                                    combo.expand();
//                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("");
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
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onToYearChange',
//                                focus: function(combo) {
//                                    combo.expand();
//                                },
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
//                                focus: function(combo) {
//                                    combo.expand();
//                                },
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
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            hidden: true,
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
//                                focus: function(combo) {
//                                    combo.expand();
//                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("");
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        // </editor-fold>
                        
                        {xtype: 'tbspacer', width: 700},
                        {
                            xtype: 'radiogroup',
                            id: prototype.id+'-rbgpDetail',
                            defaultType: 'radiofield',
                            style: 'text-align: right;',
                            layout: 'hbox',
                            items: [
                                {
                                    id: prototype.id+'-rbAll',
                                    boxLabel  : '<label style="color:#142E7A;">All</label>',
                                    inputValue: 'MXN',
                                    checked: true,
                                    name: 'rbgpDetail',
                                    listeners: {
                                        change: 'rgchange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    id: prototype.id+'-rbZone',
                                    boxLabel  : '<label style="color:#142E7A;">By Zone</label>',
                                    inputValue: 'Z',
                                    name: 'rbgpDetail',
                                    listeners: {
                                        change: 'rgchange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    id: prototype.id+'-rbCity',
                                    boxLabel  : '<label style="color:#142E7A;">By City Pair</label>',
                                    inputValue: 'C',
                                    name: 'rbgpDetail',
                                    listeners: {
                                        change: 'rgchange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    id: prototype.id+'-rbNPlane',
                                    boxLabel  : '<label style="color:#142E7A;">By Aircraft</label>',
                                    inputValue: 'P',
                                    name: 'rbgpDetail',
                                    listeners: {
                                        change: 'rgchange'
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