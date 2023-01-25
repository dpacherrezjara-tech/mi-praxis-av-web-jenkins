Ext.define('Ext.Praxis.view.sales.BPOProductionForm.Filters', {
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
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        padding: '6px 1px 5px 1px',
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
                                {
                                    xtype: 'label',
                                    text: 'Search:',
                                    padding: '4 0 2 0'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-Cmb_TypeFilter',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["1", "Processing Date"]
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
                                    emptyText: 'Select',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (cmp, eOpts) {
                                            cmp.setValue("1");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '4px 7px 2px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: true,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    width: 70,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onFromYearChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: true,
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 60,
                                    typeAhead: true,
                                    anchor: '100%',
                                    emptyText: 'All',
//                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onFromMonthChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: true,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    width: 60,
                                    typeAhead: true,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onFromDayChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '4px 7px 2px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: true,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    width: 70,
                                    typeAhead: true,
                                    hiddenLabel: false,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onToYearChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: true,
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 60,
                                    emptyText: 'All',
                                    typeAhead: true,
                                    anchor: '100%',
//                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onToMonthChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: true,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    width: 60,
                                    typeAhead: true,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'onToDayChange',
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});