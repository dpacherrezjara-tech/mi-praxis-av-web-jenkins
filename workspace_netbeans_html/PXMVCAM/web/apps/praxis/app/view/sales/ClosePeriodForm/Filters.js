Ext.define('Ext.Praxis.view.sales.ClosePeriodForm.Filters', {
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
                                {
                                    xtype: 'label',
                                    text: 'Sale Date : ',
//                                    style: 'font-weight:bold;',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 17},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '4px 7px 4px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear',
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    width: 75,
                                    valueField: 'code', displayField: 'name',
                                    triggerAction: 'all',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onFromYearChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth',
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    width: 65,
                                    valueField: 'code', displayField: 'name',
                                    triggerAction: 'all',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onFromMonthChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 85},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '4px 7px 4px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear',
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    width: 75,
                                    valueField: 'code', displayField: 'name',
                                    triggerAction: 'all',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onToYearChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth',
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    width: 65,
                                    valueField: 'code', displayField: 'name',
                                    triggerAction: 'all',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onToMonthChange'
                                    }
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
});