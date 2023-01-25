Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    bodyStyle: 'background-color: #E3EAEF;',
    border: false,
    margin: '2 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            bodyStyle: 'background-color: transparent;',
            border: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id+'-boxSearchFilter',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background: transparent;',
                    defaults: {
                        padding: '3'
                    },
                    items: [
                        {
                            xtype: 'panel',
//                            width: '100%',
                            width: screen.width-4,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<label style="vertical-align:middle;">Search Type: </label>',
                                    style: 'text-align:center',
                                    width: 90
                                },
                                {
                                    xtype: 'label',
                                    html: '<label style="vertical-align:middle;">(*)</label>',
                                    style: 'color:#9C1717;',
                                    width: 23
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-ComboBy',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Selected"], ["1", "System Date"], ["2", "Memo Number"],
                                            ["4", "Ticket"], ["5", "Accounting Date"], ["13", "Processing Date"],
                                            ["14", "Bcplink Date"], ["12", "Agency"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    width: 123,
                                    value: "",
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'comboby_clickHandler'
                                    }
                                },
                                //<editor-fold defaultstate="collapsed" desc="boxFilter1">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter1',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        { xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            html: '<label style="vertical-align:middle;">(*)</label>',
                                            style: 'color:#9C1717;',
                                            width: 24
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtCia',
                                            fieldStyle: 'text-align:center;',
                                            value: '139',
                                            hidden: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            maskRe: /[0-9]/,
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtFrmaSerie',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            hidden: true,
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
                                            hidden: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            maskRe: /[0-9]/,
                                            width: 50,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblNumber',
                                            html: '<label style="vertical-align:middle;">(*)</label>',
                                            hidden: true,
                                            style: 'color:#9C1717;',
                                            width: 24
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtNumber',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            maskRe: /[0-9]/,
                                            width: 90,
                                            hidden: true,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-campo_cuotry2',
                                            layout: 'hbox',
                                            border: false,
                                            hidden: true,
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: '<label style="vertical-align:middle;">Country:</label>',
                                                    style: 'text-align:center;',
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-cmbCountry2',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    maskRe: /[a-zA-Z]/,
                                                    width: 40,
                                                    listeners: {
                                                        change: 'onUpperValue',
                                                        keypress: 'onTextKeypress'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                
                                //<editor-fold defaultstate="collapsed" desc="boxIATA">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxIATA',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            html: '<label style="vertical-align:middle;">(*)</label>',
                                            style: 'color:#9C1717;',
                                            width: 24
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtIATA',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            width: 90,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                //</editor-fold>
                                
                                //<editor-fold defaultstate="collapsed" desc="boxFilter2">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter2',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: 'From:',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            width: 45
                                        },
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
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'To:',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            width: 45
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id+'-txtFilterDateTo',
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
                                            }
                                        }
                                    ]
                                },
                                //</editor-fold>
                                
                                //<editor-fold defaultstate="collapsed" desc="byGeneral">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-byGeneral',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Types:',
                                            style: 'text-align:center;',
                                            width: 55,
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id+'-cmbSource',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["ADM", "ADM"], ["ACM", "ACM"], ["NTD", "Debit Note"],
                                                    ["NTC", "Credit Note"], ["FAD", "Debit Invoice"], ["FAC", "Credit Invoice"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: false,
                                            width: 95,
                                            value: "",
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Origin:',
                                            style: 'text-align:center;',
                                            width: 55,
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id+'-CmbTypes',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["PR", "Automatic"], ["MA", "Manual"], ["QR", "Querys"],
                                                    ["MS", "MASSIVE"], ["UP", "UpFront"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: false,
                                            width: 90,
                                            value: "",
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Status:',
                                            style: 'text-align:center;',
                                            width: 55,
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id+'-CmbStatus',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["A", "Approved"], ["B", "Acm\Adm na BSPlink\MM"], ["C", "Condoned"],
                                                    ["D", "Disputed"], ["J", "Justified"], ["L", "Acm\Adm BSPlink\MM"], ["N", "Rejected"],
                                                    ["R", "Reaudited"], ["F", "Accredited"], ["P", "Billed"], ["I", "Billed GDS"],
                                                    ["E", "Dispute Rejected "], ["W", "Dispute Approved"], ["U", "Cleared Up"], ["X", "Canceled"],
                                                    ["Z", "Authorized"], ["O", "IATA Disabled"], ["Q", "Unregistered Client"], ["Y", "Pending"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: false,
                                            width: 155,
                                            value: "",
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Area:',
                                            style: 'text-align:center;',
                                            width: 55,
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id+'-cbxSearchArea',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["PR", "Automatic"], ["QR", "Querys"], ["CR", "Crédito y Cobranzas"],
                                                    ["VI", "Venta Indirecta"], ["DI", "Venta Directa"], ["FR", "Franquicias"], ["CM", "Comisiones"],
                                                    ["RS", "Reservas"], ["UP", "UpFront"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 110,
                                            value: "",
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 140},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                focus: function (combo) {
                                                    combo.expand();
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Type:',
                                            style: 'text-align:center;',
                                            width: 55,
                                            padding: '4px 0px 4px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id+'-cbxSearchBy',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["PR", "Automatic"], ["QR", "Querys"], ["UP", "UpFront"], ["FC", "Fact. de Comisiones"],
                                                    ["FA", "Fact. No Enviada"], ["MP", "Malas Practicas"], ["FR", "Franquicias"], ["GR", "General"],
                                                    ["BK", "Backend"], ["CA", "Cancelación de ADMS"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 110,
                                            value: "",
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 140},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
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
                        //<editor-fold defaultstate="collapsed" desc="boxFilter03">
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxFilter03',
                            hidden: true,
                            border: true,
                            layout: 'hbox',
                            width: screen.width-4,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<label style="vertical-align:middle;">Source:</label>',
                                    style: 'text-align:center',
                                    width: 56
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbFuente',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["ASR", "ASR"],
                                            ["ARC", "ARC"], ["BSP", "BSP"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 80,
                                    value: "",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        focus: function (combo) {
                                            combo.expand();
                                        },
                                        change: 'cmbOpcion_changeHandlerSource'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblCanal',
                                    html: '<label style="vertical-align:middle;">Channel: </label>',
                                    style: 'text-align:center',
                                    hidden: true,
                                    width: 56
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-txtCanal',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"], ["ATO", "ATO"], ["CCT", "CCT"],
                                            ["CTO", "CTO"], ["WEB", "WEB"], ["GSA", "GSA"],
                                            ["FRA", "FRA"]
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
                                    hidden: true,
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
                                //<editor-fold defaultstate="collapsed" desc="campo_cuotry">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-campo_cuotry',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<label style="vertical-align:middle;">Country:</label>',
                                            style: 'text-align:center;',
                                            width: 60
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-cmbCountry',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            maskRe: /[a-zA-Z]/,
                                            width: 40,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                //</editor-fold>
                                
                                //<editor-fold defaultstate="collapsed" desc="campo_currency">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-campo_currency',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<label style="vertical-align:middle;">Currency:</label>',
                                            style: 'text-align:center;',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtCur',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            maskRe: /[a-zA-Z]/,
                                            width: 40,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                //</editor-fold>
                                
                                //<editor-fold defaultstate="collapsed" desc="Campo_filtro_Use_Tour">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-Campo_filtro_Use_Tour',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<label style="vertical-align:middle;">Tour Code: </label>',
                                            style: 'text-align:center;',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtIT',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /[a-zA-Z0-9]/,
                                            width: 80,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            html: '<label style="vertical-align:middle;">User: </label>',
                                            style: 'text-align:center',
                                            width: 60
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtUser',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
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
                        //</editor-fold>
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id+'-campo_cantidad',
            layout: 'hbox',
            border: true,
            hidden: true,
            bodyStyle: 'background-color: transparent;',
            items: [
                {xtype: 'tbspacer', width: 443},
                {
                    xtype: 'panel',
                    width: 160,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Currency: ',
                                    style: 'font-weight:bold;',
                                    width: 76
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblCurrency1',
                                    text: '',
                                    style: 'font-weight:bold;',
                                    width: 63
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: 1112,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Qty ADM: ',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtQtyAdm1',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtACM1',
                                    text: 'Qty ACM: ',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtACM2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtNTD1',
                                    text: 'Qty NTD: ',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtNTD2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtNTC1',
                                    text: 'Qty NTC: ',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtNTC2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtFAD1',
                                    text: 'Qty NTC: ',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtFAD2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtFAC1',
                                    text: 'Qty NTC: ',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtFAC2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Amount: ',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtAdm1',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtTktTotal',
                                    width: 70,
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-lblUser',
                                    hidden: true
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtAcm1',
                                    text: 'Amount:',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtAcm2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtNtd1',
                                    text: 'Amount:',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtNtd2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtNtc1',
                                    text: 'Amount:',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtNtc2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtFad1',
                                    text: 'Amount:',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtFad2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-txtAmtFac1',
                                    text: 'Amount:',
                                    style: 'font-weight:bold;',
                                    width: 68
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtAmtFac2',
                                    fieldStyle: 'text-align:right;',
                                    width: 70,
                                    padding: '0 2 0 0'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});