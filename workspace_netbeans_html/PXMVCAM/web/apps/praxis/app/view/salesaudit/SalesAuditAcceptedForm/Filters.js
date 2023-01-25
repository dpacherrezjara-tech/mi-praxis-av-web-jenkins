Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: false,
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
                    id: prototype.id+'-boxSearchFilter',
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
                            layout: 'vbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: true,
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '6 0 6 0'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            html: 'Search By:',
                                            style: 'font-weight:bold;',
                                            padding: '8px 7px 8px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id+'-cmbOpcion',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["0", "Select"], ["1", "Ticket"], ["2", "Source"],
                                                    ["3", "System Date"], ["4", "Pattern"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 94,
                                            value: "0",
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
//                                                afterrender: function (combo, eOpts) {
//                                                    combo.setValue("0");
//                                                },
//                                                focus: function (combo) {
//                                                    combo.expand();
//                                                },
                                                change: 'cmbOpcion_changeHandler'
                                            }
                                        },
                                        //<editor-fold defaultstate="collapsed" desc="boxFilter01">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-boxFilter01',
                                            hidden: true,
                                            border: false,
                                            layout: 'hbox',
                                            bodyStyle: 'background: transparent;"',
                                            items: [
                                                { xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: '*',
                                                    style: 'font-weight:bold;color:#FF0000;',
                                                    width: 15,
                                                    padding: '4px 0px 4px 0px'
                                                },
                                                { xtype: 'tbspacer', width: 4 },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-txtCia',
                                                    fieldStyle: 'text-align:center;',
                                                    value: '139',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    maskRe: /[0-9]/,
                                                    width: 50,
                                                    listeners: {
                                                        keypress: 'onTextKeypress'
                                                    }
                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-txtFrmaSerie',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    maskRe: /[0-9]/,
                                                    width: 100,
                                                    listeners: {
                                                        keypress: 'onTextKeypress'
                                                    }
                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-txtSeq',
                                                    fieldStyle: 'text-align:center;',
                                                    value: '00',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    maskRe: /[0-9]/,
                                                    width: 50,
                                                    listeners: {
                                                        keypress: 'onTextKeypress'
                                                    }
                                                }
                                            ]
                                        },
                                        //</editor-fold>

                                        //<editor-fold defaultstate="collapsed" desc="boxFilter033">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-boxFilter033',
                                            hidden: true,
                                            border: false,
                                            layout: 'hbox',
                                            bodyStyle: 'background: transparent;"',
                                            items: [
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id+'-lblProcess',
                                                    text: 'Processing Date:',
                                                    hidden: true,
                                                    padding: '4px 0px 4px 0px'
                                                },
                                                {xtype: 'tbspacer', width: 12},
                                                {
                                                    xtype: 'label',
                                                    text: 'From:',
                                                    padding: '4px 0px 4px 0px'
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: '*',
                                                    style: 'font-weight:bold;color:#FF0000;',
                                                    width: 15,
                                                    padding: '4px 0px 4px 0px',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 6},
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id+'-txtFilterDateFrom',
                                                    fieldStyle: 'text-align:center;color:blue;background:white;',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                                    minValue: new Date(1990, 00, 01),
                                                    maxValue : new Date(),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    width: 90,
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
                                                    text: 'To:',
                                                    padding: '4px 0px 4px 0px'
                                                },
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: '*',
                                                    style: 'font-weight:bold;color:#FF0000;',
                                                    width: 15,
                                                    padding: '4px 0px 4px 0px',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 6},
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id+'-txtFilterDateTO',
                                                    fieldStyle: 'text-align:center;color:blue;background:white;',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                                    minValue: new Date(1990, 00, 01),
                                                    maxValue : new Date(),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    width: 90,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                                    },
                                                    listeners: {
                                                        keypress: 'onTextKeypress'
                                                    }
                                                }
                                            ]
                                        },
                                        //</editor-fold>

                                        //<editor-fold defaultstate="collapsed" desc="boxFilter03">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-boxFilter03',
                                            hidden: true,
                                            border: false,
                                            layout: 'hbox',
                                            bodyStyle: 'background: transparent;"',
                                            items: [
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Source:',
                                                    width: 60,
                                                    padding: '4px 0px 4px 0px'
                                                },
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id+'-cmbSource',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["ALL", "ALL"], ["BSP", "BSP"], ["ARC", "ARC"], ["ASR", "ASR"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    allowBlank: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: true,
                                                    width: 65,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners: {
                                                        afterrender: function (combo, eOpts) {
                                                            combo.setValue("ALL");
                                                        },
                                                        focus: function (combo) {
                                                            combo.expand();
                                                        },
                                                        change: 'validaChannel',
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Country:',
                                                    padding: '4 12'
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id+'-txtCountry',
                                                    queryMode: 'local',
                                                    allowBlank: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: true,
                                                    width: 65,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners: {
                                                        focus: function (combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                //<editor-fold defaultstate="collapsed" desc="boxChannel">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-boxChannel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    hidden: true,
                                                    bodyStyle: 'background-color: transparent;',
                                                    defaults: {
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Channel:',
                                                            width: 80
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id+'-cmbChannel',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["ALL", "ALL"], ["ATO", "ATO"], ["CCT", "CCT"], ["CTO", "CTO"], ["WEB", "WEB"], ["GSA", "GSA"], ["FRA", "FRA"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            allowBlank: true,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 65,
                                                            typeAhead: true,
                                                            valueField: 'code', displayField: 'name',
        //                                                    listConfig: {maxHeight: 111, minWidth: 300},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            listeners: {
                                                                afterrender: function (combo, eOpts) {
                                                                    combo.setValue("ALL");
                                                                },
                                                                focus: function (combo) {
                                                                    combo.expand();
                                                                }
                                                            }
                                                        },
                                                    ]
                                                },
                                                //</editor-fold>
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id+'-lblIATA',
                                                    text: 'IATA: ',
                                                    padding: '4px 12px 4px 12px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-txtIATA',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    maskRe: /[0-9a-zA-ZñÑ]/,
                                                    width: 80,
                                                    listeners: {
                                                        change: 'onUpperValue',
                                                        keypress: 'onTextKeypress'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id+'-lblStatus',
                                                    text: 'Status: ',
                                                    hidden: true
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id+'-cmbStatusAgency',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["0", "Active"], ["1", "Closed"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    allowBlank: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: true,
                                                    width: 90,
                                                    hidden: true,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners: {
                                                        afterrender: function (combo, eOpts) {
                                                            combo.setValue("0");
                                                        },
                                                        focus: function (combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id+'-lblAmount',
                                                    text: 'Amount: ',
                                                    padding: '4px 12px 4px 12px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-txtAmount',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 12,
                                                    maskRe: /[0-9.,]/,
                                                    width: 80,
                                                    listeners: {
                                                        keypress: 'onTextKeypress'
                                                    }
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 2},
                        //<editor-fold defaultstate="collapsed" desc="boxFilter02">
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxFilter02',
                            hidden: true,
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
                                    id: prototype.id+'-lblTRNCU',
                                    text: 'Transaccion: ',
                                    width: 93,
                                    padding: '9 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-txtTRNCU',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"], ["SALE", "SALE"], ["EXCH", "EXCH"], ["RFND", "RFND"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 65,
                                    value: "",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        change: 'cmbTransaction_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblFBasis',
                                    text: 'Fare Basis: ',
                                    padding: '9 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbLikeFBasis',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["1", "Equal"], ["2", "Not Equal"], ["3", "Like"], ["4", "Not Like"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 80,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("1");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtFBasis',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 320,
                                    maskRe: /[0-9a-zA-ZñÑ]/,
                                    width: 80,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblCodReason',
                                    text: 'Reason Code: ',
                                    padding: '9 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbLikeReason',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["1", "Equal"], ["2", "Not Equal"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 80,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("1");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-txtCodReason',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 75,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblTypeDocume',
                                    text: 'Document Type: ',
                                    padding: '9 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbOpcionDocumentType',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["TKT", "TKT"], ["EMD", "EMD"], ["VOU", "VOU"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 80,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Booking Date:',
                                    padding: '9 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'datefield',
                                    id: prototype.id+'-txtFilterBookFrom',
                                    fieldStyle: 'text-align:center;color:blue;background:white;',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: false,
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
                                    id: prototype.id+'-lblIT',
                                    text: 'Tour Code: ',
                                    padding: '9 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtIT',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    maskRe: /[0-9a-zA-ZñÑ]/,
                                    width: 100,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblStatusADM',
                                    text: 'Status: ',
                                    padding: '9 0'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbStatusADM',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", ""], ["A", "All"], ["Y", "Suggested"], ["T", "Reaudited BPO"], ["C", "Unregistered Client"], ["S", "Minimum"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 97,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 110},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblRFND',
                                    text: 'Refund Type: ',
                                    padding: '9 0',
                                    hidden: true,
                                    width: 93
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbRFND',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"], ["T", "TOTAL"], ["P", "PARTIAL"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 60,
                                    hidden: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblTRNCO',
                                    text: 'Orig. Trans.: ',
                                    padding: '9 0',
                                    hidden: true,
                                    width: 93
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbTRNCO',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"], ["SALE", "SALE"], ["EXCH", "EXCH"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 60,
                                    hidden: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 2},
                        {
                            xtype: 'panel',
                            hidden: false,
                            width: '100%',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Action: ',
                                    style: 'font-weight:bold;',
                                    width: 70,
                                    padding: '10 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbAction',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["Z", "GENERAL"], ["M", "MASSIVE PATTERN"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 115},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("Z");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'button',
                                    id: prototype.id+'-btnOK',
                                    style: 'font-weight:bold;background:#024F79;',
                                    html: '<strong style="background:#024F79;color:white;">OK</strong>',
                                    border: true,
                                    scale: 'small',
                                    width: 40,
                                    margin: '2 0 2 0',
                                    listeners: {
                                        click: 'btnOK_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});