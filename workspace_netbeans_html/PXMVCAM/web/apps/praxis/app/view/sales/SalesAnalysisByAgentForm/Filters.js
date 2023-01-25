Ext.define('Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Filters', {
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
                        //padding: '6px 1px 6px 1px',
                        padding: '1px 1px 1px 1px',
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
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYear',
                                    fieldLabel: 'Year',
                                    labelAlign: 'right',
                                    labelWidth: 35,
                                    width: 100,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSalesSource',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"],
                                            ["ARCARC", "ARC"],
                                            ["BSPBSP", "BSP"],
                                            ["ASRASR", "ASR"],
                                            ["ASRASR", "ASR-ATO"],
                                            ["ASRCTO", "ASR-CTO"],
                                            ["ASRFRA", "ASR-FRA"],
                                            ["ASRGSA", "ASR-GSA"],
                                            ["ASRCCT", "ASR-CCT"],
                                            ["ASRWEB", "ASR-WEB"],
                                            ["MANMAN", "MAN"]
                                        ]
                                    }),
                                    fieldLabel: 'Type',
                                    labelAlign: 'right',
                                    labelWidth: 35,
                                    width: 100,
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function(combo, eOpts) {
                                            combo.setValue("ARCARC");
                                        },
                                        keyup: function(combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
//                                        change: 'onSalesSourceChange'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTransactionType',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [                                            
                                            ["SALETKT", "SALES"],
                                            ["EXCHALL", "EXCH"],
                                            ["RFNDALL", "RFND"],
                                            ["SALEEMD", "EMD"],
                                            ["SALEVOU", "VOU"],
                                            ["SALE****", "OTHER"],
                                            ["ADMSALL", "ADM"],
                                            ["ACMSALL", "ACM"],
                                            ["SALECHRT", "CHARTER"]
                                        ]
                                    }),
                                    fieldLabel: 'Transaction',
                                    labelAlign: 'right',
                                    labelWidth: 70,
                                    width: 150,
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function(combo, eOpts) {
                                            combo.setValue("SALETKT");
                                        },
                                        keyup: function(combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'fieldset',
                                    padding: '2 5 2 1',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbByOrder',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["01", "By code"],
                                                    ["02", "By Name"],
                                                    ["03", "USD Total + -"],
                                                    ["04", "USD Total - +"]
                                                ]
                                            }),
                                            fieldLabel: 'Sorted',
                                            labelAlign: 'right',
                                            labelWidth: 50,
                                            width: 170,
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                afterrender: function(combo, eOpts) {
                                                    combo.setValue("01");
                                                },
                                                keyup: function(combo, e) {
                                                    var key = String.fromCharCode(e.getKey());
                                                    var filter = /^[a-zA-Z0-9]+$/;
                                                    var test_bool = filter.test(key);
                                                    if (test_bool) {
                                                        combo.doQuery(key);
                                                    }
                                                },
                                                change: 'onCmbByOrder'
                                            }
                                        },
                                        //Se activa solo cuando es radio: Agent List
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbByOrder_agent',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["01", "By code"],
                                                    ["02", "By Name"]
                                                ]
                                            }),
                                            fieldLabel: 'Sorted',
                                            labelAlign: 'right',
                                            labelWidth: 50,
                                            width: 170,
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            hidden:true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                afterrender: function(combo, eOpts) {
                                                    combo.setValue("01");
                                                },
                                                keyup: function(combo, e) {
                                                    var key = String.fromCharCode(e.getKey());
                                                    var filter = /^[a-zA-Z0-9]+$/;
                                                    var test_bool = filter.test(key);
                                                    if (test_bool) {
                                                        combo.doQuery(key);
                                                    }
                                                }
                                                //change: 'onCmbByOrder_agent'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txt-filter',
                                            fieldLabel: 'Parameter',
                                            width: 210,
                                            labelWidth: 70,
                                            labelAlign: 'right',
                                            value: '',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                                //change: 'onTxtFilterChange'
                                            }
                                        },
                                        {
                                            xtype: 'numberfield',
                                            id: prototype.id + '-txt-filter-num',
                                            fieldLabel: 'Parameter',
                                            width: 150,
                                            labelWidth: 70,
                                            labelAlign: 'right',
                                            value: '',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'onTextKeypress',
                                               //change: 'onTxtFilterChange'
                                            }
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-rbtnGroupBy',
                                            enableKeyEvents: true,
                                            listeners: {
                                                change: 'Onsearch'
                                            },
                                            items: [
                                                {boxLabel: '<label style="color:#142E7A;font-weight:bold;">By Agent</label>', inputValue: '1', name: 'rbtnGroupBy', checked: true, width: 85},
                                                {boxLabel: '<label style="color:#142E7A;font-weight:bold;">Summary</label>', inputValue: '2', name: 'rbtnGroupBy', width: 85},
                                                {boxLabel: '<label style="color:#142E7A;font-weight:bold;">Agent List</label>', inputValue: '3', name: 'rbtnGroupBy', width: 88},
                                                {boxLabel: '<label style="color:#142E7A;font-weight:bold;">Net Sales</label>', inputValue: '4', name: 'rbtnGroupBy', width: 85},
                                                {boxLabel: '<label style="color:#142E7A;font-weight:bold;">GDS</label>', inputValue: '5', name: 'rbtnGroupBy', width: 85}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});