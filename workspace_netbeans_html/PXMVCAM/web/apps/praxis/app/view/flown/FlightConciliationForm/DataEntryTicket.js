Ext.define('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTicketFlightConciliationForm',
    requires: [
        'Ext.Praxis.controller.flown.FlightConciliation.DataEntryTicketFlightConciliationController'
    ],
    controller: 'DataEntryTicketFlightConciliationController',
    title: 'Ticket - Data Entry Form',
    header: true,
    height: 770,
    width: 890,
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
            id: prototype.id + '-formDataEntryTicket',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Ticket Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 130,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'CCIA(3) + FORMA(4) + SERIE(6) + CUPON (1)'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTicket',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            allowBlank: false,
                            maskRe: /[0-9]/,
//                            maxLength: 14,
                            readOnly: true,
                            width: 100,
                            enableKeyEvents: true,
                            validator: function (value) {
                                if (parseInt(value) < 111111111) {
                                    return "The value entered is too small.";
                                } else
                                    return true;
                            },
                            listeners: {
                                change: 'buscarDatosVenta'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Check Digit',
                            style: 'font-weight:bold;color:#000;',
                            width: 105
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
                            id: prototype.id + '-txtDCHEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            allowBlank: false,
                            maskRe: /[0-9]/,
                            maxLength: 1,
                            width: 35,
                            validator: function(value){
                                if(value==="0"){
                                    return "The value entered is too small.";
                                } else return true;
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Sequence',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 2,
                            width: 40
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Rolling',
                            style: 'font-weight:bold;color:#000;',
                            width: 70
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSEQRO',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 2,
                            width: 40
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
                            text: 'Leg Sequence',
                            style: 'font-weight:bold;color:#000;',
                            width: 129
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtLEGSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 2,
                            width: 40
                        },
                        {xtype: 'tbspacer', width: 90},
                        {
                            xtype: 'label',
                            text: 'Coupon Use',
                            style: 'font-weight:bold;color:#000;',
                            width: 125
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFDUP',
                            fieldStyle: 'text-align:center',
                            readOnly: true,
                            width: 90
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Flight Information">
                {
                    xtype: 'panel',
                    layout: 'column',
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
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Flight Information</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Departure',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 7',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Departure City'
                                    }
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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCDEPART',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    minLength: 3,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    validator: function(value){
                                        if(value===""){
                                            return "It requires you to enter a Departure City";
                                        } else return true;
                                    },
                                    listeners:{
                                        change: 'onUpperValue',
                                        //key
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Arrival',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 30',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Arrival City'
                                    }
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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCARRIVA',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    minLength: 3,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    validator: function(value){
                                        if(value===""){
                                            return "It requires you to enter a Arrival City";
                                        } else return true;
                                    },
                                    listeners:{
                                        change: 'onUpperValue',
                                        //key
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Zone',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtZONE',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 80,
                                    margin: '0 0 0 10',
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Flight Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 7',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
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
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtDFLIGHT',
                                    fieldStyle: 'text-align:left',
                                    value: '',
                                    minValue: new Date(2000, 00, 01),
                                    maxValue: new Date(2030, 00, 01),
                                    format: 'Ymd',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYYMMDD',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    hideTrigger: true,
                                    listeners: {
                                        //keyDown: txtValidar_keyDownHandler
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flight Number',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 30'
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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNFLIGHT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    maskRe: /[0-9]/,
                                    maxLength: 4,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    validator: function(value){
                                        if(value==="0"){
                                            return "The value entered is too small.";
                                        } else return true;
                                    },
                                    listeners: {
                                        //keyDown: txtValidar_keyDownHandler
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Plane Nbr',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNPLANE',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 80,
                                    margin: '0 0 0 10',
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Source',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbFTE',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["B", "BSP"],
                                            ["A", "ARC"],
                                            ["S", "ASR"],
                                            ["T", "TCN"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    disabled: true,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag Origin',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbSTORG',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["1", "Interline"],
                                            ["2", "Online"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    disabled: true,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Valued Status',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbSTVAL',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["0", "Hard Block"],
                                            ["1", "Pending/Without Sale"],
                                            ["2", "Valued"],
                                            ["3", "Closed"],
                                            ["7", "BPO Volado"],
                                            ["9", "Poliza Errada"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 130,
                                    disabled: true,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'ZULU Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFOPERZUL',
                                    fieldStyle: 'text-align:left',
                                    value: '',
                                    minValue: new Date(2000, 00, 01),
                                    format: 'Ymd',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYYMMDD',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    width: 100,
                                    hideTrigger: true,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Billed Status',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbFINVO',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["1", "On Process"],
                                            ["2", "Audited"],
                                            ["3", "Billed"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    disabled: true,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbFload',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["M", "MANUAL"],
                                            ["1", ""],
                                            ["2", "OCR"],
                                            ["3", "VCR"],
                                            ["4", "FIMS-(OCR)"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    disabled: true,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Sales Information">
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
                                    html: '<strong style="color:#000; text-decoration: underline; ">Sales Information</strong>'
                                },
                                { xtype: 'tbspacer', width: 500 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Document Code',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Examples: TKTT / TKTM / TKTA'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCDOC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    inputAttrTpl: "data-qtip='Examples: TKTT / TKTM / TKTA'",
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Document Type',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbTDOC',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["T", "Ticket"],
                                            ["E", "Excess"],
                                            ["M", "MCO"],
                                            ["F", "Fim"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPSVVTA',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Agent',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAGTIA',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFVTA',
                                    fieldStyle: 'text-align:left',
                                    value: '',
                                    minValue: new Date(2000, 00, 01),
                                    format: 'Ymd',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYYMMDD',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    width: 100,
                                    hideTrigger: true,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Sales Type',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbTVTA',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["D", "Domestic"],
                                            ["I", "International"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Pax Type',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbTPAX',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["AD", "Adult"],
                                            ["CH", "Child"],
                                            ["IN", "Infant"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Coupon Information">
                {
                    xtype: 'panel',
                    layout: 'column',
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
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Coupon Information</strong>'
                                },
                                { xtype: 'tbspacer', width: 500 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Use Type',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbTOPUS',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
//                                            ["", ""],
                                            [null, "&nbsp;"],
                                            ["D", "Domestic"],
                                            ["I", "International"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#000000;',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        select: function (comp, record, index) {
                                            if (comp.rawValue === "&nbsp;") {
                                                comp.setValue(null);
                                            }
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Carrier',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCARR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    width: 50,
                                    margin: '0 0 0 10',
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Cabin',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100,
                                    margin: '0 0 0 80'
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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCABI',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    validator: function(value){
                                        if(value===""){
                                            return "It requires you to enter a Cabin";
                                        } else return true;
                                    },
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Fare Base',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 7'
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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFBASE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    minLength: 1,
                                    maxLength: 15,
                                    width: 100,
                                    margin: '0 0 0 10',
                                    validator: function(value){
                                        if(value===""){
                                            return "It requires you to enter a Fare Basis";
                                        } else return true;
                                    },
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Service Class',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 30'
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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCLAS',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    width: 50,
                                    margin: '0 0 0 10',
                                    validator: function(value){
                                        if(value===""){
                                            return "It requires you to enter a Service Class";
                                        } else return true;
                                    },
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Form Valued Status',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 80'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbFVAL',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["1", "ISR/Sales Value"],
                                            ["2", "Average Value"],
                                            ["3", "VTR Value"],
                                            ["4", "Manual Value"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 130,
                                    disabled: true,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Date Value',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECVAL',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    width: 100,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Qty Pax',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtQTYPAX',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    value: '1',
                                    readOnly: true,
                                    maxLength: 3,
                                    width: 50,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 80'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbMDACP',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["MXN", "MXN"],
                                            ["USD", "USD"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 130,
                                    disabled: true,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVCPN',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    value: '0.00',
                                    maxLength: 15,
                                    width: 100,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Commission',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCOMISI',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    value: '0.00',
                                    maxLength: 15,
                                    width: 100,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Tax',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVTAX',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    value: '0.00',
                                    maxLength: 15,
                                    width: 100,
                                    margin: '0 0 0 10'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'YQ Value',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVYQ',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    value: '0.00',
                                    maxLength: 15,
                                    width: 100,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'MXN Amount',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 300'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVCPMX',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    value: '0.00',
                                    maxLength: 15,
                                    width: 100,
                                    margin: '0 0 0 10'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Amount 16%',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVCPN16',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    value: '0.00',
                                    width: 100,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Amount 0%',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVCPN0',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    value: '0.00',
                                    width: 100,
                                    margin: '0 0 0 10'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'YQ Value 16%',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 7'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVYQ16',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    value: '0.00',
                                    width: 100,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'YQ Value 0%',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVYQ0',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    value: '0.00',
                                    width: 100,
                                    margin: '0 0 0 10'
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Accounting Information">
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
                            bodyStyle: 'background: #EFE9E5',//267
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Accounting Information</strong>'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Accounting ID',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 126',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Accounting Date (YYYYMM)'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtID',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 390,
                                    margin: '0 0 0 10'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',//267
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Accounting Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 268',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Accounting Date (YYYYMM)'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFCONT',
                                    fieldStyle: 'text-align:center',
//                                    enforceMaxLength: true,
                                    readOnly: true,
//                                    maxLength: 6,
                                    width: 74,
                                    margin: '0 0 0 10'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Accounting Status',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 65',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Accounting Status'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbSTCON',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""],
                                            ["1", "Posted"],
                                            ["2", "Provisional Post"],
                                            ["3", "Reverse"],
                                            ["4", "Accounting Reverse"]
                                        ]
                                    }),
                                    fieldStyle: 'font-weight:bold;color:#074066;',
                                    queryMode: 'local',
                                    hidden: false,
                                    allowBlank: true,
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    disabled: true,
                                    typeAhead: true,
                                    emptyText: '',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    margin: '0 0 0 10',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        blur: function (combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: '<strong style="color:#000; text-decoration: underline; ">Control Data</strong>',
                    width: 760,
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
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
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
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
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
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
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
//                {
//                    text: '<strong style="color:black;font-size:13px;">Facsimil</strong>',
//                    id: prototype.id + '-btn-facsimil',
//                    widht: 80,
//                    scale: 'small',
//                    listeners: {
//                        click: 'btnFacsimil_clickHandler'
//                    }
//                },
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