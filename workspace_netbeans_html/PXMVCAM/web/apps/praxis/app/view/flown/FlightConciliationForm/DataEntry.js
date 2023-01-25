Ext.define('Ext.Praxis.view.flown.FlightConciliationForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryFlightConciliationForm',
    requires: [
        'Ext.Praxis.controller.flown.FlightConciliation.DataEntryFlightConciliationController'
    ],
    controller: 'DataEntryFlightConciliationController',
    title: 'Flight Manifest - Data Entry Form',
    header: true,
    height: 720,
    width: 850,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Flight Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtDFLIGHT',
                            fieldStyle: 'text-align:left',
                            value: '',
                            format: 'Ymd',
                            formatText: '',
                            invalidText: 'Type the date in the format: YYYYMMDD',
                            allowBlank: false,
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            width: 80,
                            hideTrigger: true
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Flight Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtNFLIGHT',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            allowBlank: false,
                            maskRe: /[0-9]/,
                            maxLength: 5,
                            readOnly: true,
                            width: 100,
                            validator: function(value) {
                                if (value === "0") {
                                    return "The value entered is too small.";
                                } else
                                    return true;
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSTVAL',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["1", "Stand By"],
                                    ["2", "In Process"],
                                    ["3", "Conciliation"],
                                    ["4", "Closed"],
                                    ["5", "Cancelled"]
                                ]
                            }),
                            queryMode: 'local',
                            hidden: false,
                            readOnly: false,
                            allowBlank: true,
                            hiddenLabel: false,
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 90,
                            typeAhead: true,
                            emptyText: 'In Process',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            hideTrigger: false,
                            listeners: {
                                afterrender: function(combo, eOpts) {
                                    combo.setValue("2");
                                },
                                focus: function(combo) {
                                    combo.expand();
                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("2");
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Departure',
                            style: 'font-weight:bold;color:#000;',
                            width: 110,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Departure City'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCDEPART',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            minLength: 3,
                            maxLength: 3,
                            readOnly: true,
                            maskRe: /[a-zA-Z]/,
                            width: 80,
                            validator: function(value) {
                                if (value === "") {
                                    return "It requires you to enter a Departure City";
                                } else
                                    return true;
                            },
                            listeners: {
                                change: 'onUpperValue'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Arrival',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Arrival City'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCARRIVA',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            minLength: 3,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/,
                            readOnly: true,
                            width: 100,
                            validator: function(value) {
                                if (value === "") {
                                    return "It requires you to enter a Arrival City";
                                } else
                                    return true;
                            },
                            listeners: {
                                change: 'onUpperValue'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Zone',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtZONE',
                            fieldStyle: 'text-align:left',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 90
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Carrier Operator',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCARRI',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            minLength: 1,
                            maxLength: 2,
                            readOnly: true,
                            width: 80,
                            validator: function(value) {
                                if (value === "") {
                                    return "It requires you to enter a Carrier";
                                } else
                                    return true;
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Leg Sequence',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtLEGSEQ',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            minLength: 2,
                            maxLength: 2,
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Flight Multileg',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFMulti',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "None"],
                                    ["L", "Leg"],
                                    ["S", "Segment"]
                                ]
                            }),
                            queryMode: 'local',
                            hidden: false,
                            readOnly: false,
                            allowBlank: true,
                            hiddenLabel: false,
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 90,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            hideTrigger: false
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000; text-decoration: underline; ">SSIM File Information</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            layout: 'column',
                            margin: '0 0 0 7',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Received Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFSENDSS',
                                    fieldStyle: 'text-align:left',
                                    value: '',
                                    format: 'Ymd',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYYMMDD',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    width: 90,
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag SSIM',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbFSTASS',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Stand By"],
                                            ["1", "Received"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    readOnly: false,
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    typeAhead: true,
                                    emptyText: 'Stand By',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function(combo, eOpts) {
                                            combo.setValue("");
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
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag Flown',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbFFLOW',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            [null, '&nbsp;'],
                                            ["P", "Scheduled"],
                                            ["U", "Unscheduled"],
                                            ["C", "Charter"],
                                            ["X", "Canceled"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    readOnly: false,
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        select: function(comp, record, index) {
                                            if (comp.rawValue === "&nbsp;") {
                                                comp.setValue(null);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 0 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Plane Nbr',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNPLANE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 90,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Type Operator',
                                    style: 'font-weight:bold;color:#000;text-align: center',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbTOPER',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            [null, "&nbsp;"],
                                            ["D", "Domestic"],
                                            ["I", "International"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    readOnly: false,
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 100,
                                    value: null,
                                    disabled: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        select: function(comp, record, index) {
                                            if (comp.rawValue === "&nbsp;") {
                                                comp.setValue(null);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 100px 0px 100px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Scheduled time of Passenger</strong>'
                                },
                                {
                                    xtype: 'label',
                                    padding: '0px 100px 0px 140px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">UTC/Local Time Variation</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Departure',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtLOCDEP',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    maskRe: /[0-9]/,
                                    width: 60
                                },
                                {
                                    xtype: 'label',
                                    text: 'Arrival',
                                    margin: '0 0 0 15',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 71
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtLOCARR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    maskRe: /[0-9]/,
                                    width: 60
                                },
                                {
                                    xtype: 'label',
                                    text: 'Departure',
                                    margin: '0 0 0 100',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUTCDEP',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    maskRe: /[0-9+-]/,
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'Arrival',
                                    margin: '0 0 0 15',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 71
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUTCARR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    maskRe: /[0-9+-]/,
                                    width: 60
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">ODS File Information</strong>'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-txtDESCRIP-label',
                                    text: '(*)',
                                    hidden: false,
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 300},
                                {
                                xtype: 'panel',
                                border: false,
                                bodyStyle: 'background: #EFE9E5',
                                items:[
                                   {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDESCRIP',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 50,
                                    inputAttrTpl: "data-qtip='Enter an observation if is needed'",
                                    width: 400,
                                    hidden: false
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDESCRIP2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 50,
                                    inputAttrTpl: "data-qtip='Enter an observation if is needed'",
                                    width: 400,
                                    hidden: false
                                } 
                                ]
                            }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 0 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Received Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFSENDOD',
                                    fieldStyle: 'text-align:left',
                                    value: '',
                                    format: 'Ymd',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYYMMDD',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    width: 100,
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'button',
                                    text: 'Qty Coupons',
                                    tooltip: 'Qty ODS Coupons',
                                    width: 120,
                                    /*listeners: {
//                                        click: 'onQtyCouponsClick'
                                        click: function() {
                                            if (Ext.getCmp(prototype.id + '-txtDESCRIP').isVisible()) {
                                                Ext.getCmp(prototype.id + '-txtDESCRIP-label').hide();
                                                Ext.getCmp(prototype.id + '-txtDESCRIP').hide();
                                            } else {
                                                Ext.getCmp(prototype.id + '-txtDESCRIP-label').show();
                                                Ext.getCmp(prototype.id + '-txtDESCRIP').show();
                                            }
                                        }
                                    }*/
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtQCPNOD',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    readOnly: true,
                                    value: '0',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag ODS',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbFSTAOD',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Stand By"],
                                            ["1", "Received"],
                                            ["2", "Carr Diferente a Cupo"],
                                            ["3", "Cancelled"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hidden: false,
                                    readOnly: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 130,
                                    typeAhead: true,
                                    emptyText: 'Stand By',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    listeners: {
                                        afterrender: function(combo, eOpts) {
                                            combo.setValue("");
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
//                                    value: '',
//                                }
                                }
                            ]

                        },
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 0 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Zulu Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFOPERZUL',
                                    fieldStyle: 'text-align:left',
                                    value: '',
                                    format: 'Ymd',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYYMMDD',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    width: 100,
                                    hideTrigger: true
                                }
//                                {
//                                    xtype: 'label',
//                                    text: 'Qty in Transit',
//                                    style: 'font-weight:bold;color:#000;text-align:center;',
//                                    width: 120
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id+'-txtQCPTRA',
//                                    fieldStyle: 'text-align:right',
//                                    maskRe: /[0-9]/,
//                                    value: '0',
//                                    enforceMaxLength: true,
//                                    maxLength: 3,
//                                    width: 100
//                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Passenger Type</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 0 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Qty Senior',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtQCPAD',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 3,
//                                    readOnly: true,
                                    value: '0',
                                    width: 100,
                                    listeners: {
                                        blur: 'ValidarSuma'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Qty Children',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtQCPCHD',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 3,
//                                    readOnly: true,
                                    value: '0',
                                    width: 100,
                                    listeners: {
                                        blur: 'ValidarSuma'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Qty Infant',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtQCPINF',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 3,
//                                    readOnly: true,
                                    value: '0',
                                    width: 100,
                                    listeners: {
                                        blur: 'ValidarSuma'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 0 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Qty in Transit',
                                    style: 'font-weight:bold;color:#000;text-align:left;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtQCPTRA',
                                    fieldStyle: 'text-align:right',
                                    maskRe: /[0-9]/,
                                    value: '0',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 100,
                                    listeners: {
                                        blur: 'ValidarSuma'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: {"background-color": "rgb(229, 236, 239)"},
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'VCR File Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Received Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtFSENDVC',
                            fieldStyle: 'text-align:left',
                            disabled: false,
                            value: '',
                            format: 'Ymd',
                            formatText: '',
                            invalidText: 'Type the date in the format: YYYYMMDD',
                            allowBlank: true,
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            width: 90,
                            hideTrigger: true
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty Coupons',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQCPNVC',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            readOnly: true,
                            maxLength: 5,
                            value: '0',
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Flag',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id + '-cmbFSTAVC',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "Stand By"],
                                    ["1", "Received"]
                                ]
                            }),
                            queryMode: 'local',
                            hidden: false,
                            readOnly: false,
                            allowBlank: true,
                            hiddenLabel: false,
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 110,
                            typeAhead: true,
                            emptyText: 'Stand By',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            hideTrigger: false,
                            listeners: {
                                afterrender: function(combo, eOpts) {
                                    combo.setValue("");
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
//                            value: '',
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: {"background-color": "rgb(239, 233, 229)"},
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Other Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty OCR',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQCPNOCR',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            readOnly: true,
                            maxLength: 3,
                            value: '0',
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty Manual',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQCPNMA',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            readOnly: true,
                            maxLength: 3,
                            value: '0',
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Total',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQCPNTOT',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            readOnly: true,
                            maxLength: 3,
                            value: '0',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: {"background-color": "rgb(229, 236, 239)"},
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Accounting Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Policy Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFCLOSE',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 8,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty Coupons',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQCPNVAL',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 5,
                            value: '0',
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Flag',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id + '-cmbFSTAPO',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    [null, "&nbsp;"],
                                    ["1", "Pending"],
                                    ["2", "Valued"],
                                    ["3", "Closed"]
                                ]
                            }),
                            queryMode: 'local',
                            readOnly: true,
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 110,
                            value: "1",
                            disabled: true,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                select: function(comp, record, index) {
                                    if (comp.rawValue === "&nbsp;") {
                                        comp.setValue(null);
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Physical Flight Manifest</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 0 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Received Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFSENDFI',
                                    fieldStyle: 'text-align:left',
                                    value: '',
                                    format: 'Ymd',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYYMMDD',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    width: 100,
                                    hideTrigger: true,
                                    listeners: {
                                        blur: function(datefield, e, eOpts) {
                                            var a = datefield.getErrors();
                                            for (var i = 0; i < a.length; i++) {
                                                if (a[i] === 'Type the date in the format: YYYYMMDD') {
                                                    global.Msg({
                                                        msg: 'Date is invalid'
                                                    });
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 20, height: 1},
                                {
                                    xtype: 'label',
                                    text: 'Qty Coupons',
                                    fieldStyle: 'text-align:center',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtQCPNFI',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 5,
                                    value: '0',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 20, height: 1},
                                {
                                    xtype: 'label',
                                    text: 'Qty Coupons NR',
                                    fieldStyle: 'text-align:center',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtQCPNFRE',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 5,
                                    value: '0',
                                    width: 100
                                },
                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 0 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Flag',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Flight Manifest Flag'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbFSTAFI',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Stand By"],
                                            ["1", "Automatic"],
                                            ["2", "Manual"],
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hidden: false,
                                    readOnly: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    typeAhead: true,
                                    emptyText: 'Stand By',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    listeners: {
                                        afterrender: function(combo, eOpts) {
                                            combo.setValue("");
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
//                            value: '',
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 795,
                    border: true,
                    defaults: {
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-USCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 75},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 75},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-USUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 75},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 75},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'btnInsert_clickHandler'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'btnUpdate_clickHandler'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'btnDelete_clickHandler'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'button',
                    id: prototype.id + '-btn-prev',
                    icon: 'resources/img/botones/prev.png',
                    tooltip: 'View Previous Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onPrevClick'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btn-next',
                    icon: 'resources/img/botones/next2.png',
                    tooltip: 'View Next Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onNextClick'
                    }
                }
            ]
        }
    ]
});