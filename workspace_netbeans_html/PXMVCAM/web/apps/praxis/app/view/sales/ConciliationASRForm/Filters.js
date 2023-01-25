Ext.define('Ext.Praxis.view.sales.ConciliationASRForm.Filters', {
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
                // <editor-fold defaultstate="collapsed" desc="boxFilter1">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFilter1',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    hidden: false,
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
                                    text: 'Search by:',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFilterType',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["FREPOR", "Open Date"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 150,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("FREPOR");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        }
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
                                    width: 75,
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
                                    width: 65,
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
                                    width: 65,
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
                                    width: 75,
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
                                    width: 65,
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
                                    width: 65,
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
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Status Amount',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFilterStatusAmount',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["ALL", "All"], ["Y", "Yes"], ["N", "Not"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 60,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("ALL");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'State',
                                    hidden: true,
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProcessState',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["ALL", "All"], ["INTERACT", "Interact Loaded"], ["MATCH", "Match"], ["AVRA", "Praxis Only"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    hidden: true,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 140,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("ALL");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSt',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["ALL", "All"], ["CL", "Closed"], ["AC", "Automatic Closed"], ["EMPTY", "Empty"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    hidden: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 120,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("ALL");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Station',
                                    hidden: true,
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtWorkstation',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    hidden: true,
                                    maxLength: 8,
                                    value: '00000000',
                                    width: 70
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxFilter2">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFilter2',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    hidden: true,
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
                                    text: 'Search by:',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFilterType02',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["ALL", "All"], ["FPROCE", "Processing Date"], ["FREPOR", "Open Date"], ["GRUPO", "Group"], ["NROID", "ID File"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    autoSelect: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 150,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("FPROCE");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        change: 'cmbFilterType02_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter01',
                                    bodyStyle: 'background: transparent',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Date',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtProcessingDate01',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
//                                            value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'IATA Code:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtIATACode01',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            width: 70
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter02',
                                    bodyStyle: 'background: transparent',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Date',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtOpenDate02',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
//                                            value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'IATA Code:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtIATACode02',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            width: 70
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter03',
                                    bodyStyle: 'background: transparent',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Group:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtGroup03',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 9,
                                            width: 70
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter04',
                                    bodyStyle: 'background: transparent',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'ID File:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtIDFile04',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 9,
                                            width: 70
                                        }
                                    ]
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