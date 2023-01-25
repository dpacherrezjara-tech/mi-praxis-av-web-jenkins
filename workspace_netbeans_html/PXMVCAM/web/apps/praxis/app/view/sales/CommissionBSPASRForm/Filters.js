Ext.define('Ext.Praxis.view.sales.CommissionBSPASRForm.Filters', {
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
                                    text: 'Search By: ',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 17},
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
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cmbDate',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["1", "GSA"], ["2", "ID Lote"], ["3", "Open Date"]
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
                                            cmp.setValue("");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onCmbDateChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                // <editor-fold defaultstate="collapsed" desc="HBox_Option01">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HBox_Option01',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%',
                                        xtype: 'textfield',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        enableKeyEvents: true
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'GSA:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtGSA',
                                            maxLength: 8,
                                            width: 70,
                                            listeners:{
//                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="HBox_Option02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HBox_Option02',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%',
                                        xtype: 'textfield',
                                        enforceMaxLength: true,
                                        enableKeyEvents: true
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'ID Lote: ',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtLote',
                                            fieldStyle: 'text-align:center',
                                            maxLength: 20,
                                            maskRe: /[0-9]/,
                                            width: 130,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Status: ',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype:'combo',
                                            id: prototype.id + '-cbmStatus',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["0", "Pending"], ["1", "Automatic send "], ["2", "Manual send "]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            hiddenLabel: false,
                                            forceSelection: true,
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
                                            listeners:{
                                                afterrender: function (cmp, eOpts) {
                                                    cmp.setValue("");
                                                },
                                                focus: function(combo) {
                                                    combo.expand();
                                                },
                                                blur: function(combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("");
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="HBox_Option03">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HBox_Option03',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%',
                                        xtype:'combo',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        caseSensitive: false,
                                        autoSelect: true,
                                        editable: true,
                                        typeAhead: true,
                                        emptyText: 'All',
                                        valueField: 'code', displayField: 'name',
                                        enableKeyEvents: true,
                                        triggerAction: 'all',
                                        width: 70
                                    },
                                    items: [
                                        {
                                            id: prototype.id + '-cmbDateYear',
                                            listConfig: {maxHeight: 111},
                                            listeners:{
                                                focus: function() { this.expand(); },
                                                blur: function() { if (this.getValue()===null) this.setValue(""); },
                                                keypress: 'onTextKeypress',
                                                change: 'onYearChange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id: prototype.id + '-cmbDateMonth',
                                            listeners:{
                                                focus: function() { this.expand(); },
                                                blur: function() { if (this.getValue()===null) this.setValue(""); },
                                                keypress: 'onTextKeypress',
                                                change: 'onMonthChange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id: prototype.id + '-cmbDateDay',
                                            listConfig: {maxHeight: 111},
                                            listeners:{
                                                focus: function() { this.expand(); },
                                                blur: function() { if (this.getValue()===null) this.setValue(""); },
                                                keypress: 'onTextKeypress'
                                            }
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
});