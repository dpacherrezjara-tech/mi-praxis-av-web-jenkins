Ext.define('Ext.Praxis.view.salesaudit.SalesAuditReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
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
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbOpcion',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["1", "Ticket"], ["2", "Source"], ["4", "TPax"]
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
                                        },
                                        change: 'cmbOpcion_changeHandler'
                                    }
                                },
                                //<editor-fold defaultstate="collapsed" desc="boxFilter01">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxFilter01',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        { xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: '*',
                                            style: 'font-weight:bold;color:#FF0000;',
                                            width: 15,
                                            padding: '4px 0px 4px 0px'
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCia',
                                            fieldStyle: 'text-align:center;',
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
                                            id: prototype.id + '-txtFrmaSerie',
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
                                            id: prototype.id + '-txtSeq',
                                            fieldStyle: 'text-align:center;',
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
                                
                                //<editor-fold defaultstate="collapsed" desc="boxFilter02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxFilter02',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: '*',
                                            style: 'font-weight:bold;color:#FF0000;',
                                            width: 15,
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOpcionSource',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["ASR", "ASR"], ["ARC", "ARC"], ["BSP", "BSP"]
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
                                                },
                                                change: 'cmbOpcion_changeHandlerSource'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblCanal',
                                            text: 'Channel: ',
                                            hidden: true,
                                            padding: '4px 12px 4px 12px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtCanal',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "ALL"], ["ATO", "ATO"], ["CCT", "CCT"], ["CTO", "CTO"], ["WEB", "WEB"], ["GSA", "GSA"], ["FRA", "FRA"]
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
                                            hidden: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
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
                                        {xtype: 'tbspacer', width: 12},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblFVent',
                                            text: 'Processing Date:',
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
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 85,
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
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateTO',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 85,
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
                                            id: prototype.id + '-lblIATA',
                                            text: 'IATA: ',
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIATA',
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
                                        {xtype: 'tbspacer', width: 12},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblIT',
                                            text: 'Tour Code: ',
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIT',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /[0-9a-zA-ZñÑ]/,
                                            width: 60,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblTRNCU',
                                            text: 'Transaccion: ',
                                            width: 93,
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtTRNCU',
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
                                        {xtype: 'tbspacer', width: 12},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblFBasis',
                                            text: 'Fare Basis: ',
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFBasis',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 320,
                                            width: 80,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 12},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblCodReason',
                                            text: 'Cod. Reason: ',
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCodReason',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            width: 80,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 12},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblMemo',
                                            text: 'Type: ',
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOpcionMemo',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["0", "PENDING"], ["1", "MATCH"], ["2", "ADM"], ["3", "ACM"], ["4", "ERROR"]
                                                ]
                                            }),
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
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                }
                                            }
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        },
                        {xtype: 'tbspacer', height: 2},
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFilter03',
                            hidden: true,
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblAudit',
                                    text: 'Audited: ',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbOpcionAudit',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["0", "All"], ["1", "Yes"], ["2", "No"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 89,
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
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblStatus',
                                    text: 'Transfer: ',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbOpcionStatus',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["Y", "Suggested"], ["A", "Accepted"], ["N", "Rejected"], ["R", "Reaudited"], ["D", "IATA Disabled"],
                                            ["C", "Unregistered Client"], ["F", "Match Forced"], ["T", "ADM Direct"], ["J", "Justified"], ["Z", "Authorized"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 120,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 125},
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
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTypeDocume',
                                    text: 'Doc. Type: ',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbOpcionDocumentType',
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
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPais',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[0-9a-zA-ZñÑ]/,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue',
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