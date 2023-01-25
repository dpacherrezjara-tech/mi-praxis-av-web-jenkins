Ext.define('Ext.Praxis.view.sales.TreasuryControlFiguresForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.TreasuryControlFiguresForm-filters',
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
                    id: prototype.id + '-boxSearchFilter',
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
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Select by: ',
                                    padding: '9 0 0 0',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'color:#9C1717;',
                                    padding: '9 0 0 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTypeDate',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["2", "Processing Date"], ["1", "Ending Date"], ["3", "Accounting Date"],
                                            ["5", "Open Date"], ["4", "Group"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 120,
                                    value: "2",
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    padding: '6 0',
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress',
                                        change: 'CmbDate_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter01">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-BoxFilter01',
                                    border: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'From:',
                                            id: prototype.id+'-LblDateFrom',
                                            padding: '6 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtTypeOfDate_00',
                                            fieldStyle: 'text-align:center',
                                            allowBlank: false,
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            },
                                            listeners:{
                                                keypress: function(obj , e , eOpts) {
                                                    if ( e.getKey() === e.ENTER ){
                                                        Ext.getCmp(prototype.id+'-txtTypeOfDate_01').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'To:',
                                            id: prototype.id+'-LblDateTo',
                                            padding: '6 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtTypeOfDate_01',
                                            fieldStyle: 'text-align:center',
                                            allowBlank: false,
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            },
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Data Validated:',
                                            padding: '6 0'
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'radiogroup',
                                            id:prototype.id+'-rbgCtlStpro',
                                            defaults: {
                                                width: 50
                                            },
                                            items: [
                                                { boxLabel: 'Yes', inputValue: '1', name: 'rbgCtlStpro', checked: true },
                                                { boxLabel: 'No', inputValue: '0', name: 'rbgCtlStpro' },
                                                { boxLabel: 'All', inputValue: '', name: 'rbgCtlStpro' }
                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-BoxFilter02',
                                    hidden: true,
                                    border: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;border-style:solid;border-color:#B7BABC;border-width:2px;border-left-width:1px;border-right-width:1px;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'Group number:',
                                            padding: '6 0',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1530GRUPO',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            maskRe: /[0-9]/,
                                            width: 70,
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4}
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        { xtype: 'tbspacer', height: 4 },
                        //<editor-fold defaultstate="collapsed" desc="BoxFilter03">
                        {
                            xtype: 'panel',
                            id: prototype.id+'-BoxFilter03',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Source: ',
                                    padding: '9 0',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'color:#9C1717;',
                                    padding: '9 0 0 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSource',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["ARC", "ARC"], ["BSP", "BSP"], ["ASR", "ASR"], ["MAN", "MAN"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 120,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    padding: '6 0',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("ARC");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress',
                                        change: 'CmbSource_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Bank:',
                                    id: prototype.id+'-LblBank',
                                    padding: '9 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBank',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"], ["IAP", "IAP"], ["IAR", "IAR"], ["ELW", "ELW"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 90,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    padding: '6 0',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress',
                                        change: 'CmbBank_clickHandler',
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    id: prototype.id+'-LblCountry',
                                    hidden: true,
                                    padding: '9 0 0 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-IN_A1530PSVTA',
                                    fieldStyle: 'text-align:center;',
                                    hidden: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    width: 30,
                                    padding: '6 0',
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Channel',
                                    id: prototype.id+'-LblDistChan',
                                    hidden: true,
                                    padding: '9 0 0 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-IN_A1530SFUEN',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"], ["GSA", "GSA"], ["FRA", "FRA"], ["OFI", "OFI"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    hidden: true,
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 90,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    padding: '6 0',
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
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'label',
                                    text: 'Currency:',
                                    id: prototype.id+'-LblCurr',
                                    padding: '9 0 0 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'color:#9C1717;',
                                    padding: '9 0 0 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-IN_A1530MDA',
                                    fieldStyle: 'text-align:center;',
                                    value: 'USD',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 30,
                                    padding: '6 0',
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'IATA Code',
                                    hidden: true,
                                    id: prototype.id+'-Lbl_IATACode',
                                    padding: '9 0 0 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-IN_A1530AGENT',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    hidden: true,
                                    width: 70,
                                    padding: '6 0',
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Sabre City',
                                    hidden: true,
                                    id: prototype.id+'-Lbl_SabreCity',
                                    padding: '9 0 0 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtA1530CSABR',
                                    fieldStyle: 'text-align:center;',
                                    hidden: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    width: 70,
                                    padding: '6 0',
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        { xtype: 'tbspacer', height: 4 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtGroupSelected',
                            fieldStyle: 'text-align:center;',
                            hidden: true,
                            enableKeyEvents: true,
                            width: 80
                        }
                    ]
                }
            ]
        }
    ]
});