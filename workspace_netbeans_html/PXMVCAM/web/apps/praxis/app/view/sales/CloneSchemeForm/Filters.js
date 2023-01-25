Ext.define('Ext.Praxis.view.sales.CloneSchemeForm.Filters', {
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
                                    text: 'Search By:',
                                    style: 'font-weight:bold;color:#000;',
                                    padding: '4 0 5 0',
                                    width: 81
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '*',
                                    style: 'font-weight:bold;color:#FF0000;',
                                    width: 15,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTypeCommission',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["U", "Upfront"], ["B", "Backend"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 107,
                                    typeAhead: true,
                                    emptyText: 'All',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 6},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbOpcion',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["C", "Contract Number"], ["E", "Effective Date Open"], ["S", "System Date"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 150,
                                    typeAhead: true,
                                    emptyText: 'Contract Number',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("S");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        change: 'onCmbOpcionChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 11},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCode',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    width: 100,
                                    hidden: true,
                                    enableKeyEvents: true,
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'datefield',
                                    id:prototype.id+'-txtFechaOpen',
                                    fieldStyle: 'text-align:center',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                    value: new Date(),
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 113,
                                    enableKeyEvents: true,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                    },
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblStatus',
                                    text: 'Status:',
                                    style: 'font-weight:bold;color:#000;',
                                    padding: '4 0 5 0',
                                    width: 58
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbStatus',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["R", "[R] REGISTERED"], ["D", "[D] DEVELOPMENT"], ["P", "[P] TEST"], ["U", "[U] UPGRADE"], ["C", "[C] CERTIFICATE"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    editable: true,
                                    width: 150,
                                    typeAhead: true,
                                    emptyText: 'All',
                                    listConfig: {maxHeight: 111},
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});