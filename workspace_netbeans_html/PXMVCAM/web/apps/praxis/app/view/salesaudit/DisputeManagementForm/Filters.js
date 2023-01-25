Ext.define('Ext.Praxis.view.salesaudit.DisputeManagementForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    margin: '2 0',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSearchFilter',
                            width: '100%',
                            hidden: true,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    html: 'Search Type: ',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'color:#9C1717;',
                                    width: 23
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-ComboBy',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Selected"], ["1", "System Date"], ["2", "Memo Number"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 110,
                                    value: "",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'comboby_clickHandler',
                                    }
                                },
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: 'From:',
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
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        keypress: 'onTextKeypress',
                                        change: 'cbxDateFromYear_changeHandler'
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
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                        keypress: 'onTextKeypress',
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
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
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 65},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-HB_BAIR',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Airline:',
                                            padding: '4px 0px 4px 0px'
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype:'combo',
                                            id: prototype.id + '-cmbAirline2',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 260,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners:{
                                                focus: function(combo) {
                                                    combo.expand();
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-HB_BDAIR',
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Airline:',
                                            padding: '4px 0px 4px 0px'
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype:'combo',
                                            id: prototype.id + '-cmbAirline',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 260,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners:{
                                                focus: function(combo) {
                                                    combo.expand();
                                                }
                                            }
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', width: 47 },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPERNUM',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["01", "01"], ["02", "02"], ["03", "03"], ["04", "04"]
                                        ]
                                    }),
                                    fieldLabel: 'Period',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 60,
                                    width: 113,
                                    anchor: '100%',
                                    listeners:{
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                { xtype: 'tbspacer', width: 47 },
                                {
                                    xtype: 'label',
                                    text: 'Invoice Number:',
                                    padding: '10px 0px 4px 0px'
                                },
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtBNUMBER',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 11,
                                    maskRe: /[0-9a-zA-Z]/,
                                    width: 105,
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 2},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    html: 'Search by:',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cmbTTRAN',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["OB", "Outgoing Billing"], ["IB", "Incoming Billing"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    readOnly: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 150,
                                    disabled: false,
                                    typeAhead: true,
                                    emptyText: 'All',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("OB");
                                        }
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